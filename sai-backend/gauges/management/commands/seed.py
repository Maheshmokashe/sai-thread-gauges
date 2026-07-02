"""
Seed the real SAI product catalogue.
Run:  python manage.py seed
(idempotent — safe to run repeatedly)
"""
from django.core.management.base import BaseCommand
from gauges.models import Category, Product


CATEGORIES = [
    ('Thread Plug Gauges', 'thread-plug', 'GO / NOGO plug gauges for internal threads', 1),
    ('Thread Ring Gauges', 'thread-ring', 'GO / NOGO ring gauges for external threads', 2),
    ('Taper Thread Gauges', 'taper', 'BSPT & NPT taper plug and ring gauges', 3),
    ('Snap Gauges', 'snap', 'GO / NOGO snap gauges for shaft diameters', 4),
    ('Non-Standard / Custom', 'special', 'Gauges built to your drawing and specification', 5),
]

PRODUCTS = [
    dict(
        name='M2.5 × 0.45 – 6g Thread Ring Gauge', slug='m2-5x0-45-6g-ring',
        cat='thread-ring', image_key='m2_5x0_45',
        summary='GO / NOGO ring gauge pair for M2.5×0.45 external threads',
        thread_size='M2.5×0.45', thread_class='6g', standard='IS',
        standard_ref='IS 2334 / ISO 1502', go_id='R2509/12', nogo_id='R2509/13',
        description='Precision GO/NOGO thread ring gauge pair for checking M2.5×0.45-6g '
                    'external threads. Ground and lapped, supplied with a calibration record.',
        featured=True,
    ),
    dict(
        name='M5 × 0.75 – 6g Thread Ring Gauge', slug='m5x0-75-6g-ring',
        cat='thread-ring', image_key='m5x0_75',
        summary='GO / NOGO ring gauge pair for M5×0.75 external threads',
        thread_size='M5×0.75', thread_class='6g', standard='IS',
        standard_ref='IS 2334 / ISO 1502', go_id='R2509/14', nogo_id='R2509/15',
        description='GO/NOGO thread ring gauge pair for M5×0.75-6g external threads. '
                    'Hardened, precision ground and calibrated on our Octagon LMM 400.',
        featured=True,
    ),
    dict(
        name='M14 × 1.5 – 6G Thread Plug Gauge', slug='m14x1-5-6g-plug',
        cat='thread-plug', image_key='m14x1_5',
        summary='GO / NOGO plug gauge for M14×1.5 internal threads',
        thread_size='M14×1.5', thread_class='6G', standard='IS',
        standard_ref='IS 1880 / ISO 1502', go_id='H2509/221', nogo_id='',
        description='Double-ended GO/NOGO thread plug gauge for M14×1.5-6G internal threads. '
                    'Tool-steel body, hardened and precision ground.',
        featured=True,
    ),
    dict(
        name='1.1/8" × 11 BSP Thread Plug Gauge', slug='1-1-8-x-11-bsp-plug',
        cat='thread-plug', image_key='bsp-1-1-8',
        summary='British Standard Pipe GO / NOGO plug gauge',
        thread_size='1.1/8"×11', thread_class='', standard='BS',
        standard_ref='BS 2779', go_id='A-524', nogo_id='',
        description='GO/NOGO plug gauge for 1.1/8"×11 BSP (parallel pipe) internal threads '
                    'to BS 2779.',
    ),
    dict(
        name='RC 1/4" × 19 BSPT Taper Ring Gauge', slug='rc-1-4-x-19-bspt-ring',
        cat='taper', image_key='bspt-rc-1-4',
        summary='Taper pipe thread ring gauge to BS 21',
        thread_size='RC 1/4"×19', thread_class='', standard='BS',
        standard_ref='BS 21', go_id='R1082', nogo_id='',
        description='Taper pipe thread ring gauge for RC 1/4"×19 BSPT external taper threads '
                    'to BS 21.',
    ),
    dict(
        name='1/4" × 18 NPTL1 Taper Ring Gauge', slug='1-4-x-18-nptl1-ring',
        cat='taper', image_key='npt-1-4',
        summary='American taper pipe thread ring gauge (L1)',
        thread_size='1/4"×18', thread_class='L1', standard='ASME',
        standard_ref='ASME B1.20.1 · R99{B}', go_id='R2509/11', nogo_id='',
        description='L1 taper pipe thread ring gauge for 1/4"×18 NPT to ASME B1.20.1.',
    ),
    dict(
        name='Ø15.4 − 0.1 Snap Gauge', slug='snap-15-4',
        cat='snap', image_key='snap-15-4',
        summary='GO / NOGO snap gauge for shaft inspection',
        thread_size='Ø15.4 (−0.1)', thread_class='', standard='IS',
        standard_ref='IS 3455', go_id='H2603/58', nogo_id='',
        description='GO/NOGO gap (snap) gauge for a 15.4 mm shaft with a −0.1 tolerance band, '
                    'built to customer drawing H2603/58.',
    ),
    dict(
        name='Ø18.75 + 0.20 Snap Gauge', slug='snap-18-75',
        cat='snap', image_key='snap-18-75',
        summary='GO / NOGO snap gauge for shaft inspection',
        thread_size='Ø18.75 (+0.20)', thread_class='', standard='IS',
        standard_ref='IS 3455', go_id='H2603/57', nogo_id='',
        description='GO/NOGO gap (snap) gauge for a 18.75 mm shaft with a +0.20 tolerance band, '
                    'built to customer drawing H2603/57.',
    ),
    dict(
        name='Non-Standard / Custom Gauges', slug='custom-gauges',
        cat='special', image_key='custom',
        summary='Plug, ring, snap and special-profile gauges to your drawing',
        thread_size='Any', thread_class='', standard='CUSTOM',
        standard_ref='To customer drawing', go_id='', nogo_id='',
        description='We manufacture non-standard and special-profile gauges — Trapezoidal, ACME, '
                    'BSPT/NPT taper, and one-off sizes — built to your drawing and tolerance. '
                    'Send us a drawing for a quote.',
        featured=True,
    ),
]


class Command(BaseCommand):
    help = 'Seed the real SAI product catalogue (idempotent).'

    def handle(self, *args, **opts):
        cats = {}
        for name, slug, blurb, order in CATEGORIES:
            c, _ = Category.objects.update_or_create(
                slug=slug, defaults={'name': name, 'blurb': blurb, 'order': order})
            cats[slug] = c

        for p in PRODUCTS:
            data = dict(p)
            slug = data.pop('slug')
            cat = cats[data.pop('cat')]
            data['is_featured'] = data.pop('featured', False)
            data['category'] = cat
            Product.objects.update_or_create(slug=slug, defaults=data)

        self.stdout.write(self.style.SUCCESS(
            f'Seeded {len(cats)} categories and {len(PRODUCTS)} products.'))
