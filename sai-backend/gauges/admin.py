from django.contrib import admin
from django.utils.html import format_html
from .models import Category, Product, Enquiry


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'order')
    prepopulated_fields = {'slug': ('name',)}
    ordering = ('order',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'category', 'thread_size', 'standard', 'is_featured', 'is_active')
    list_filter = ('category', 'standard', 'is_featured', 'is_active')
    search_fields = ('name', 'thread_size', 'go_id', 'nogo_id')
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_featured', 'is_active')


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'gauge_type', 'phone', 'created_at', 'is_read')
    list_filter = ('is_read', 'standard', 'created_at')
    search_fields = ('name', 'company', 'email', 'phone', 'message')
    readonly_fields = ('created_at',)
    list_editable = ('is_read',)
