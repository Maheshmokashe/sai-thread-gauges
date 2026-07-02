from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, ProductViewSet, EnquiryViewSet

router = DefaultRouter()
router.register('categories', CategoryViewSet)
router.register('products', ProductViewSet)
router.register('enquiries', EnquiryViewSet)

urlpatterns = router.urls
