import logging

from django.conf import settings
from django.core.mail import send_mail
from rest_framework import viewsets, filters, status
from rest_framework.response import Response

from .models import Category, Product, Enquiry
from .serializers import CategorySerializer, ProductSerializer, EnquirySerializer

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
        cat = self.request.query_params.get('category')  # accepts id or slug
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
    http_method_names = ['post', 'head', 'options']  # public can only submit
    throttle_scope = 'enquiry'

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        enquiry = serializer.save()
        self._notify(enquiry)
        return Response(
            {'message': 'Enquiry received. We will get back to you within 24 hours.'},
            status=status.HTTP_201_CREATED,
        )

    def _notify(self, e):
        """Email the business. Never let a mail failure break the submission."""
        try:
            lines = [
                f'New enquiry from the SAI website',
                '',
                f'Name:       {e.name}',
                f'Company:    {e.company or "-"}',
                f'Phone:      {e.phone}',
                f'Email:      {e.email}',
                f'Gauge type: {e.gauge_type or "-"}',
                f'Thread/size:{e.thread_size or "-"}',
                f'Standard:   {e.standard or "-"}',
                f'Quantity:   {e.quantity if e.quantity is not None else "-"}',
                '',
                'Message:',
                e.message or '(none)',
            ]
            send_mail(
                subject=f'New enquiry — {e.name} ({e.gauge_type or "general"})',
                message='\n'.join(lines),
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[settings.ENQUIRY_NOTIFY_EMAIL],
                fail_silently=False,
            )
        except Exception:  # noqa: BLE001
            log.exception('Enquiry saved but notification email failed (id=%s)', e.pk)
