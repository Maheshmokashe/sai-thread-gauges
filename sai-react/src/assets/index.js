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

import lathe from './facility/lathe.jpg';
import grinder from './facility/grinder.jpg';
import threading from './facility/threading.jpg';
import lmm400 from './facility/lmm400.jpg';
import signboard from './facility/signboard.jpg';

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
};

export const HERO_IMAGE = heroRings;
export const CATEGORY_IMAGES = {
  'thread-plug': m14x1_5,
  'thread-ring': m2_5x0_45,
  taper: bsptRc,
  snap: snap154,
  special: custom,
};
export const FACILITY = { lathe, grinder, threading, lmm400, signboard };

// Resolve the best image for a product: an admin upload wins, else the bundled asset.
export function productImage(product) {
  if (product && product.image) return product.image;
  if (product && PRODUCT_IMAGES[product.image_key]) return PRODUCT_IMAGES[product.image_key];
  return custom;
}
