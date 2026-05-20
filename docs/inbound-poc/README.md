# Inbound Shopify Dawn POC

English-only Shopify-style demo inside `apps/web`. Non-destructive: disable with one env var.

## URLs (locale `en`)

| Page | Path |
|------|------|
| GENTEM collection | `/en/products/gentemstick` |
| Product samples (5, images from gentemstick.com CDN) | `/en/products/26-27-aloha-nokaoi` … `26-27-baby-mantaray-148` |
| Tune-up booking | `/en/booking/tune-up` |
| Express checkout (demo) | `/en/checkout` |

## Disable / rollback

```env
NEXT_PUBLIC_INBOUND_SHOPIFY_POC=false
```

Redeploy. Black-site header returns on those routes (404). Remove banner on `/en` automatically.

## Presentation flow

1. `/en` → **GENTEMSTICK · English shop demo** banner (honest POC label)
2. `/en/products/gentemstick#products` → 5 board cards (tap for product page)
3. Open any product → **Add to cart** → drawer slides in
4. **Buy it now** → `/en/checkout` (Apple Pay / Google Pay mock)
5. `/en/booking/tune-up` → Sesami-style date form

## Vercel

Same project `spray`, root `apps/web`. No second project required for this integrated POC.

Commit as **Seeker-x1** for Hobby deploy.
