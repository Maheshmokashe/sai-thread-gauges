// Product photos bundled with the app, keyed by the backend `image_key`.
import m2_5x0_45 from './products/m2_5x0_45.jpg';
import m5x0_75 from './products/m5x0_75.jpg';
import m14x1_5 from './products/m14x1_5.jpg';
import bsp118 from './products/bsp-1-1-8.jpg';
import bsptRc from './products/bspt-rc-1-4.jpg';
import npt14 from './products/npt-1-4.jpg';
import snap154 from './products/snap-15-4.jpg';
import snap1875 from './products/snap-18-75.jpg';
import custom from './products/custom.jpg';
import heroRings from './products/hero-rings.jpg';
import customThreadRing from './products/custom-thread-ring.jpg';
import unf1x12_2b from './products/unf-1x12-2b.jpg';
import m22x1_5_6h from './products/m22x1_5-6h.jpg';

import lmm400 from './facility/lmm400.jpg';
import acmeLatheLongBed from './facility/acme-lathe-long-bed.jpg';
import acmeLatheRamHead from './facility/acme-lathe-ram-head.jpg';
import jonesShipmanGrinder from './facility/jones-shipman-grinder.jpg';
import companyCard from './facility/company-card.jpg';

export const PRODUCT_IMAGES = {
  m2_5x0_45,
  m5x0_75,
  m14x1_5,
  'bsp-1-1-8': bsp118,
  'bspt-rc-1-4': bsptRc,
  'npt-1-4': npt14,
  'snap-15-4': snap154,
  'snap-18-75': snap1875,
  custom,
  'custom-thread-ring': customThreadRing,
  'unf-1x12-2b': unf1x12_2b,
  'm22x1_5-6h': m22x1_5_6h,
};

export const HERO_IMAGE = heroRings;
export const CATEGORY_IMAGES = {
  'thread-plug': m14x1_5,
  'thread-ring': m2_5x0_45,
  taper: bsptRc,
  snap: snap154,
  special: custom,
};
export const FACILITY = {
  lmm400,
  acmeLatheLongBed,
  acmeLatheRamHead,
  jonesShipmanGrinder,
  companyCard,
};

// Resolve the best image for a product: an admin upload wins, else the bundled asset.
export function productImage(product) {
  if (product && product.image) return product.image;
  if (product && PRODUCT_IMAGES[product.image_key]) return PRODUCT_IMAGES[product.image_key];
  return custom;
}
