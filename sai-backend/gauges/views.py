import json
import logging
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import filters, status, viewsets
from rest_framework.response import Response

from .models import Category, Enquiry, Product
from .serializers import CategorySerializer, EnquirySerializer, ProductSerializer

log = logging.getLogger(__name__)


class CategoryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer


class ProductViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Product.objects.filter(is_active=True).select_related('category')
    serializer_class = ProductSerializer
    lookup_field = 'slug'
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['name', 'summary', 'description', 'thread_size', 'go_id', 'nogo_id']
    ordering_fields = ['name', 'created_at']

    def get_queryset(self):
        qs = super().get_queryset()
        cat = self.request.query_params.get('category')
        if cat:
            if cat.isdigit():
                qs = qs.filter(category__id=cat)
            else:
                qs = qs.filter(category__slug=cat)
        if self.request.query_params.get('featured') in ('1', 'true', 'True'):
            qs = qs.filter(is_featured=True)
        return qs


class EnquiryViewSet(viewsets.ModelViewSet):
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer
    http_method_names = ['post', 'head', 'options']
    throttle_scope = 'enquiry'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        notification_sent = self._notify(enquiry)
        return Response(
            {
                'message': (
                    'Enquiry received and emailed to SAI.' if notification_sent else
                    'Enquiry saved, but the notification email could not be sent.'
                ),
                'notification_sent': notification_sent,
            },
            status=status.HTTP_201_CREATED if notification_sent else status.HTTP_202_ACCEPTED,
        )

    def _notify(self, enquiry):
        """Email the business and report whether delivery was accepted."""
        try:
            lines = [
                'New enquiry from the SAI website',
                '',
                f'Name:       {enquiry.name}',
                f'Company:    {enquiry.company or "-"}',
                f'Phone:      {enquiry.phone}',
                f'Email:      {enquiry.email}',
                f'Gauge type: {enquiry.gauge_type or "-"}',
                f'Thread/size:{enquiry.thread_size or "-"}',
                f'Standard:   {enquiry.standard or "-"}',
                f'Quantity:   {enquiry.quantity if enquiry.quantity is not None else "-"}',
                '',
                'Message:',
                enquiry.message or '(none)',
            ]
            subject = f'New enquiry — {enquiry.name} ({enquiry.gauge_type or "general"})'
            message = '\n'.join(lines)

            if settings.RESEND_API_KEY:
                payload = json.dumps({
                    'from': settings.RESEND_FROM_EMAIL,
                    'to': [settings.ENQUIRY_NOTIFY_EMAIL],
                    'reply_to': enquiry.email,
                    'subject': subject,
                    'text': message,
                }).encode('utf-8')
                request = Request(
                    'https://api.resend.com/emails',
                    data=payload,
                    headers={
                        'Authorization': f'Bearer {settings.RESEND_API_KEY}',
                        'Content-Type': 'application/json',
                    },
                    method='POST',
                )
                with urlopen(request, timeout=15) as response:
                    return 200 <= response.status < 300

            if settings.DEBUG:
                return bool(send_mail(
                    subject=subject,
                    message=message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[settings.ENQUIRY_NOTIFY_EMAIL],
                    fail_silently=False,
                ))

            log.error('RESEND_API_KEY is not configured; enquiry id=%s', enquiry.pk)
            return False
        except (HTTPError, URLError, TimeoutError, OSError, ValueError):
            log.exception('Enquiry saved but notification email failed (id=%s)', enquiry.pk)
            return False
