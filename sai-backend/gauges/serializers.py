from rest_framework import serializers
from .models import Category, Product, Enquiry


class CategorySerializer(serializers.ModelSerializer):
    product_count = serializers.SerializerMethodField()

    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'blurb', 'product_count']

    def get_product_count(self, obj):
        return obj.products.filter(is_active=True).count()


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.ReadOnlyField()
    category_slug = serializers.ReadOnlyField(source='category.slug')
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'category', 'category_name', 'category_slug',
            'summary', 'description',
            'thread_size', 'thread_class', 'standard', 'standard_ref',
            'go_id', 'nogo_id',
            'material', 'hardness', 'finish', 'calibration',
            'image', 'image_key', 'is_featured',
        ]

    def get_image(self, obj):
        if obj.image:
            request = self.context.get('request')
            url = obj.image.url
            return request.build_absolute_uri(url) if request else url
        return None


class EnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Enquiry
        fields = [
            'id', 'name', 'company', 'email', 'phone',
            'gauge_type', 'thread_size', 'standard', 'quantity', 'message',
        ]
