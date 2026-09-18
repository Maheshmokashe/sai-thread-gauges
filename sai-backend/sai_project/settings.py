from pathlib import Path
from decouple import config, Csv

BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = config('SECRET_KEY', default='dev-insecure-key-change-in-production')
DEBUG = config('DJANGO_DEBUG', default=True, cast=bool)

# Comma-separated hostnames in prod, e.g. sai-backend.onrender.com,saithreadgauges.com
ALLOWED_HOSTS = config('ALLOWED_HOSTS', default='*', cast=Csv())

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # third party
    'rest_framework',
    'corsheaders',
    'django_filters',
    # local
    'gauges',
]

MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sai_project.urls'
WSGI_APPLICATION = 'sai_project.wsgi.application'

TEMPLATES = [{
    'BACKEND': 'django.template.backends.django.DjangoTemplates',
    'DIRS': [],
    'APP_DIRS': True,
    'OPTIONS': {'context_processors': [
        'django.template.context_processors.debug',
        'django.template.context_processors.request',
        'django.contrib.auth.context_processors.auth',
        'django.contrib.messages.context_processors.messages',
    ]},
}]

# ── Database ──────────────────────────────────────────────────────────
# The catalogue is seeded during each deploy. SQLite keeps the free Render
# deployment independent of expiring managed databases.
DATABASES = {'default': {
    'ENGINE': 'django.db.backends.sqlite3',
    'NAME': BASE_DIR / 'db.sqlite3',
}}

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'Asia/Kolkata'
USE_I18N = True
USE_TZ = True

# ── Static & media ────────────────────────────────────────────────────
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STORAGES = {
    'default': {'BACKEND': 'django.core.files.storage.FileSystemStorage'},
    'staticfiles': {'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'},
}
MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

# ── DRF ───────────────────────────────────────────────────────────────
REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_THROTTLE_CLASSES': ['rest_framework.throttling.ScopedRateThrottle'],
    'DEFAULT_THROTTLE_RATES': {'enquiry': '10/hour'},
}

# ── CORS ──────────────────────────────────────────────────────────────
# In production set CORS_ALLOWED_ORIGINS=https://saithreadgauges.com,https://www.saithreadgauges.com
CORS_ALLOWED_ORIGINS = config(
    'CORS_ALLOWED_ORIGINS',
    default='http://localhost:3000,http://127.0.0.1:3000',
    cast=Csv(),
)
CORS_ALLOW_ALL_ORIGINS = DEBUG  # convenient in dev only

# ── Email (enquiry notifications) ─────────────────────────────────────
# Dev default prints emails to the console. For real delivery set:
#   EMAIL_HOST, EMAIL_HOST_USER, EMAIL_HOST_PASSWORD (e.g. a Gmail App Password)
EMAIL_BACKEND = config(
    'EMAIL_BACKEND',
    default='django.core.mail.backends.console.EmailBackend',
)
EMAIL_HOST = config('EMAIL_HOST', default='smtp.gmail.com')
EMAIL_PORT = config('EMAIL_PORT', default=587, cast=int)
EMAIL_USE_TLS = config('EMAIL_USE_TLS', default=True, cast=bool)
EMAIL_HOST_USER = config('EMAIL_HOST_USER', default='')
EMAIL_HOST_PASSWORD = config('EMAIL_HOST_PASSWORD', default='')
DEFAULT_FROM_EMAIL = config('DEFAULT_FROM_EMAIL', default='SAI Website <no-reply@saithreadgauges.com>')
# Where new enquiries are sent:
ENQUIRY_NOTIFY_EMAIL = config('ENQUIRY_NOTIFY_EMAIL', default='saithreadgauges@gmail.com')

# ── Security (production only) ────────────────────────────────────────
if not DEBUG:
    SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
    SECURE_HSTS_INCLUDE_SUBDOMAINS = True
    SECURE_HSTS_PRELOAD = True
    CSRF_TRUSTED_ORIGINS = config(
        'CSRF_TRUSTED_ORIGINS',
        default='https://saithreadgauges.com,https://www.saithreadgauges.com',
        cast=Csv(),
    )
