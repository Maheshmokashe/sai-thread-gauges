from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import JsonResponse


def health(_request):
    return JsonResponse({'status': 'ok', 'service': 'sai-thread-gauges-api'})


urlpatterns = [
    path('', health),
    path('admin/', admin.site.urls),
    path('api/', include('gauges.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
