# Traiteur Jacky Jaeken — site + webshop

Editorial-luxury rebuild van [traiteurdienstjackyjaeken.be](https://www.traiteurdienstjackyjaeken.be/)
in de stijl van [marquet.nyc](https://www.marquet.nyc/), met geïntegreerde webshop en
zondagbuffet-boeking.

## Stack

- **Next.js 15** (App Router) + **React 19** + TypeScript (strict)
- **Tailwind** + CSS custom properties voor design tokens
- **Source Serif 4** (display) + **Inter** (body) via `next/font`
- **Zustand** (cart, persist → localStorage)
- **better-sqlite3** (orders, lokaal in `./data/orders.db`)
- **Mollie** voor betalingen (Bancontact first, iDEAL, creditcard)
- **Sanity** klaar voor latere uitbreiding — op dit moment leest de site uit `lib/fixtures.ts`

## Snel starten

```bash
npm install
cp .env.example .env.local   # optioneel — werkt ook zonder
npm run dev                   # http://localhost:3000
```

De site werkt volledig zonder extra config: content komt uit `lib/fixtures.ts`,
en de checkout valt terug op een dev-bypass (betaling meteen als "paid" gemarkeerd)
zolang `MOLLIE_API_KEY` niet gezet is.

## Echte Mollie-betalingen testen

1. Maak een test-account op [mollie.com](https://my.mollie.com/) en kopieer een `test_...` API key.
2. Vul `MOLLIE_API_KEY=test_xxx` in `.env.local`.
3. (Optioneel) Voor echte webhook-calls op localhost:
   ```bash
   npx ngrok http 3000
   # Kopieer de https URL naar PUBLIC_WEBHOOK_URL
   ```
   Zonder ngrok polt de success-pagina zelf de Mollie-status — werkt ook prima voor demo.
4. Herstart de dev-server, doorloop checkout → kies Bancontact → testbetaling.

## Project-structuur

```
app/
├── (site)/          Home, diensten, over-ons, contact, footer-pagina's
├── (shop)/          Shop, cart, checkout, success, zondagbuffet
└── api/
    ├── checkout/    POST — valideert prijzen server-side + Mollie create
    └── webhooks/mollie/  POST — updaten order status

components/
├── site/            Header, Footer, Hero, NumberedSection, ServiceCard, ...
├── shop/            ProductCard, ProductDetail (3 varianten), CartLineRow, CheckoutForm
└── booking/         ZondagbuffetCalendar, GuestTierInput

lib/
├── cart/            Zustand store, discriminated union types, pricing helpers
├── orders/          SQLite repository + schema
├── mollie/          Client wrapper
├── content.ts       Content loader + server-side line validators
├── fixtures.ts      Alle producten/diensten/slots (1 bestand, makkelijk editen)
├── types.ts         Domain types
├── format.ts        EUR + datum (nl-BE)
└── env.ts           zod-validated env

styles/tokens.css    Design tokens (CSS custom properties)
```

## Informatie-architectuur

18 originele nav-items → **6 top-level** + footer-pagina's:

| Nav          | Route              | Inhoud                                                          |
|--------------|--------------------|-----------------------------------------------------------------|
| Diensten     | `/diensten`        | Maatwerk: buffetten, koffietafel, babyborrel, feestzaal, ...   |
| Webshop      | `/shop`            | BBQ, broodjes-boxen, food boxes (directe verkoop)              |
| Zondagbuffet | `/zondagbuffet`    | Eigen boekingsflow met datum + 4 gast-tiers                    |
| Over ons     | `/over-ons`        | Verhaal, team, feestzaal, waarden                              |
| Contact      | `/contact`         | Formulier + adres + openingsuren                               |
| (Footer)     | `/partners`, `/vacatures`, `/algemene-voorwaarden`, `/privacy` | |

## Hoe de webshop werkt

Drie product-types in één polymorf schema:

| Kind              | Voorbeeld               | Eigenschappen                                               |
|-------------------|-------------------------|-------------------------------------------------------------|
| `fixed`           | Food box Italiaans      | Vaste prijs per eenheid, optionele min-aantal               |
| `tiered`          | BBQ formules            | Base + variants met price delta (Formule 1/2/3/Kids)        |
| `box-with-addons` | Deluxe broodjes-box     | Vaste box-prijs + optionele losse broodjes als add-ons      |

Zondagbuffet is géén product — het is een **`zondagbuffetSlot`** doctype met:
- datum (een zondag)
- capaciteit + huidige boekingen
- vier prijstiers (adult/youth/child/toddler)
- wekelijks menu (rich text)

Drie types delen dezelfde Zustand cart via een discriminated union.

## Cart → checkout flow

1. Klant voegt items toe (Zustand → localStorage).
2. `/cart` toont alles, `/checkout` verzamelt klantgegevens + levering.
3. POST `/api/checkout`:
   - Revalideert elke prijs server-side (nooit client trusten).
   - Controleert min-gasten en zondagbuffet-capaciteit.
   - Schrijft `pending` order naar SQLite.
   - Roept `mollie.payments.create` met redirect + (optioneel) webhook.
   - Antwoordt met `checkoutUrl`.
4. Klant betaalt op Mollie → redirect naar `/checkout/success?token=...`.
5. Webhook (of polling-fallback) markeert order als `paid|failed|canceled`.

## Content beheren

Voor de prototype-fase bewerk je `lib/fixtures.ts` rechtstreeks:

- `services[]` — maatwerk-diensten
- `categories[]` en `products[]` — webshop-inhoud
- `zondagbuffetSlots[]` — bookbare zondagen (standaard 8 weken vooruit gegenereerd)
- `siteSettings` — bedrijfsinfo

**Migratie naar Sanity** (later):
- Schemas zijn al gedefinieerd in `lib/types.ts` — bouw Sanity schemas 1-op-1.
- Vervang `lib/fixtures.ts` calls in `lib/content.ts` door GROQ queries.
- De rest van de codebase verandert niet.

## Scripts

```bash
npm run dev         # dev server
npm run dev:tunnel  # dev server + ngrok (voor Mollie webhooks)
npm run build       # productie build
npm run start       # productie server
npm run typecheck   # strict TypeScript check
npm run lint        # ESLint (Next.js config)
```

## Verificatie — wat getest is

- [x] TypeScript strict mode, zero errors
- [x] Homepage rendert met transparent-over-hero header, goud-cursieve highlights
- [x] Scroll maakt header solid (transition)
- [x] Shop-index → categorie → product detail navigatie
- [x] BBQ productdetail met variant-picker toont prijzen en inclusies per formule
- [x] Add-to-cart werkt, toont in header badge, persisteert in localStorage
- [x] Cart-pagina toont subtotaal + qty-stepper + verwijderknop
- [x] Checkout-formulier → POST `/api/checkout` → SQLite order aangemaakt
- [x] Dev bypass toont success-pagina met "Dank u, Jan." + totaal + referentie-ID
- [x] Zondagbuffet-pagina toont kalender + guest-tier input + reserveringspaneel
- [x] Diensten-detailpagina (consultation) toont richtprijs + features + contact CTA

## Wat nog te doen voor productie

- **Eigen fotografie** vervangt de Unsplash placeholders (nu via `next/image remotePatterns`)
- **E-mail confirmatie** (Resend of SMTP) in `/api/webhooks/mollie` bij `paid`
- **Zondagbuffet capaciteit** decrement via Sanity/DB in dezelfde webhook
- **Sanity Studio** embedden op `/studio` + content migreren
- **SEO**: `app/sitemap.ts`, per-page `generateMetadata`, JSON-LD schema.org LocalBusiness
- **Analytics**: Plausible of Umami (GDPR-vriendelijk, geen banner nodig)
- **Deploy**: Vercel (Next.js native) + Cloudflare voor assets
- **Domein migratie**: redirect-map voor oude URL's

## Design systeem

**Kleuren** (editorial luxury)
- `cream #F5EFE6` — basis
- `cream-deep #EDE4D3` — alternating sections
- `charcoal #1F1B17` — hoofdtekst
- `gold #D9A441` — enige accent (CTAs, highlights, numbers)

**Typografie**
- Display/headings: **Source Serif 4** (300–600)
- Body/UI: **Inter** (300–600)
- Eyebrow labels: uppercase, 0.18em tracking, small size

**Ritme**
- Sections: `py-section` (clamp 4rem → 10rem)
- Gutter: `px-gutter` (clamp 1.25rem → 3rem)
- Breakpoints: xs 480 · sm 768 · md 992 · lg 1200 (matcht Marquet)

## Licentie

Privé — © Traiteurdienst Jacky Jaeken.
