from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    blurb = models.CharField(max_length=200, blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        verbose_name_plural = 'Categories'
        ordering = ['order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)


class Product(models.Model):
    STANDARD_CHOICES = [
        ('IS', 'IS (Indian Standard)'),
        ('ISO', 'ISO'),
        ('BS', 'BS (British Standard)'),
        ('ASME', 'ASME (American)'),
        ('DIN', 'DIN (German)'),
        ('CUSTOM', 'Custom / Non-Standard'),
    ]

    name = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True)
    category = models.ForeignKey(
        Category, on_delete=models.SET_NULL, null=True, related_name='products'
    )
    summary = models.CharField(max_length=200, blank=True, help_text='One-line summary for cards')
    description = models.TextField(blank=True)

    # Thread / dimensional spec
    thread_size = models.CharField(max_length=60, blank=True, help_text='e.g. M14×1.5')
    thread_class = models.CharField(max_length=20, blank=True, help_text='e.g. 6G, 6g, L1')
    standard = models.CharField(max_length=10, choices=STANDARD_CHOICES, default='IS')
    standard_ref = models.CharField(max_length=100, blank=True, help_text='e.g. IS 1880 / ISO 1502')

    # GO / NOGO gauge identification numbers
    go_id = models.CharField(max_length=50, blank=True, help_text='e.g. R2509/12')
    nogo_id = models.CharField(max_length=50, blank=True, help_text='e.g. R2509/13')

    # Material & quality
    material = models.CharField(max_length=100, default='OHNS / HCHCr tool steel')
    hardness = models.CharField(max_length=50, default='58–62 HRC')
    finish = models.CharField(max_length=100, default='Precision ground & lapped')
    calibration = models.CharField(max_length=100, default='Calibrated on Octagon LMM 400')

    # Imagery: uploaded image (admin) OR a key that maps to a bundled frontend asset
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    image_key = models.CharField(
        max_length=40, blank=True,
        help_text='Bundled frontend asset key, e.g. m14x1_5',
    )

    is_featured = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['category__order', 'name']

    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)[:220]
        super().save(*args, **kwargs)

    @property
    def category_name(self):
        return self.category.name if self.category else ''


class Enquiry(models.Model):
    name = models.CharField(max_length=100)
    company = models.CharField(max_length=150, blank=True)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    gauge_type = models.CharField(max_length=100, blank=True)
    thread_size = models.CharField(max_length=100, blank=True)
    standard = models.CharField(max_length=100, blank=True)
    quantity = models.PositiveIntegerField(null=True, blank=True)
    message = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = 'Enquiries'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.name} — {self.gauge_type or "general"} ({self.created_at:%Y-%m-%d})'
