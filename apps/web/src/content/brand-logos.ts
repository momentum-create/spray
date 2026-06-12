/**
 * @deprecated Import from `@/content/brands` instead.
 * Shim re-export for gradual migration.
 */
import { brandLogosCompat } from "./brands";

export const brandLogos = brandLogosCompat;

export type BrandLogo = (typeof brandLogos)[number];
