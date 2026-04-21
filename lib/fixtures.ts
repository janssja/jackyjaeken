import type {
  Category,
  Product,
  Service,
  SiteSettings,
  ZondagbuffetSlot,
} from "./types";

// Editorial food photography from Unsplash (warm, natural light, Marquet-style)
const img = {
  hero: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=2400&auto=format&fit=crop",
  table: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?q=80&w=2400&auto=format&fit=crop",
  buffet: "https://images.unsplash.com/photo-1555244162-803834f70033?q=80&w=1800&auto=format&fit=crop",
  bbq: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=1800&auto=format&fit=crop",
  grill: "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1800&auto=format&fit=crop",
  sandwich: "https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=1800&auto=format&fit=crop",
  bread: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1800&auto=format&fit=crop",
  italian: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1800&auto=format&fit=crop",
  brunch: "https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=1800&auto=format&fit=crop",
  wedding: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1800&auto=format&fit=crop",
  baby: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?q=80&w=1800&auto=format&fit=crop",
  coffee: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1800&auto=format&fit=crop",
  plate: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=1800&auto=format&fit=crop",
  venue: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?q=80&w=1800&auto=format&fit=crop",
  association: "https://images.unsplash.com/photo-1530062845289-9109b2c9c868?q=80&w=1800&auto=format&fit=crop",
  material: "https://images.unsplash.com/photo-1587334207407-b65ac60e47a4?q=80&w=1800&auto=format&fit=crop",
  chef: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=1800&auto=format&fit=crop",
  ingredients: "https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1800&auto=format&fit=crop",
};

export const siteSettings: SiteSettings = {
  name: "Traiteur Jacky Jaeken",
  tagline: "Ambachtelijke catering sinds decennia",
  phone: "089 56 31 82",
  email: "info@traiteurdienstjackyjaeken.be",
  address: {
    street: "Rijksweg 770",
    city: "Dilsen-Stokkem",
    postal: "3650",
    country: "België",
  },
  openingHours: [
    { day: "Maandag", hours: "10:00 — 16:00" },
    { day: "Dinsdag", hours: "08:00 — 19:00" },
    { day: "Woensdag", hours: "08:00 — 18:00" },
    { day: "Donderdag", hours: "08:00 — 19:00" },
    { day: "Vrijdag", hours: "08:00 — 18:00" },
    { day: "Zaterdag", hours: "08:00 — 18:00" },
    { day: "Zondag", hours: "10:00 — 16:00" },
  ],
  social: [
    { label: "Facebook", url: "https://www.facebook.com/traiteurdienstjackyjaeken" },
    { label: "LinkedIn", url: "https://www.linkedin.com/company/traiteurdienst-jacky-jaeken" },
  ],
};

export const services: Service[] = [
  {
    slug: "buffetten",
    title: "Buffetten op maat",
    summary:
      "Van koude en warme buffetten tot Teppanyaki en walking dinners — elf buffetstijlen, telkens afgestemd op uw gezelschap en gelegenheid.",
    heroImage: img.buffet,
    features: [
      "Koude buffetten",
      "Warme buffetten",
      "Kaas- en charcuterie",
      "Pasta- en risotto",
      "Teppanyaki",
      "Brunchbuffet",
      "Dessertbuffet",
      "IJsbuffet",
      "Walking dinner",
      "Thematische buffetten",
    ],
    priceIndication: "Prijs op aanvraag",
    bodyHtml:
      "<p>Ieder buffet bouwen we op rond uw gasten — het seizoen, de sfeer, het moment. We werken met verse, lokale producten en stellen graag een menu samen dat past bij uw budget en gastenlijst.</p><p>Minimumbezetting varieert per buffetstijl. Voor alle buffetten voorzien we desgewenst bediening door onze eigen geuniformeerde medewerkers (€40/uur excl. btw).</p>",
    ctaLabel: "Vraag een offerte",
    ctaType: "contact",
    order: 1,
  },
  {
    slug: "koffietafel",
    title: "Koffietafel",
    summary:
      "Een verzorgde koffietafel met zachte aandacht voor familie en vrienden in een moeilijk moment. Drie niveaus, steeds met dezelfde zorg.",
    heroImage: img.coffee,
    features: [
      "Basis — €16/persoon (broodjes, Limburgse vlaaien, dranken)",
      "Luxe — €18/persoon (verfijnde broodjes, Limburgse vlaaien)",
      "Extra luxe — €20/persoon (half-open kunstig opgemaakte broodjes)",
      "Inclusief 3 uur bediening + opbouw",
      "Optioneel: aperitief €4, dessert €3, soep vanaf €2",
    ],
    priceIndication: "Vanaf €16 per persoon",
    bodyHtml:
      "<p>We verzorgen de koffietafel in onze feestzaal of op een locatie naar keuze. Vaste kost €200 (vanaf 20 gasten) of €150 (vanaf 100 gasten). Extra uur aan €100.</p>",
    ctaLabel: "Reserveer een datum",
    ctaType: "contact",
    order: 2,
  },
  {
    slug: "babyborrel",
    title: "Babyborrel",
    summary:
      "Vier het begin in onze feestzaal met buitenspeeltuin. All-in formule, vier uur lang zorgeloos vieren met familie en vrienden.",
    heroImage: img.baby,
    features: [
      "Volwassenen — €35/persoon (all-in)",
      "Kinderen 3–12 jaar — €20/persoon",
      "Onder 3 jaar — gratis",
      "Koffie, thee, frisdrank, wijnen, bier",
      "Hapjes, desserten, chocoladefontein, ijs",
      "Vier uur bediening, minimum 50 gasten",
    ],
    priceIndication: "€35 per volwassene (all-in)",
    bodyHtml:
      "<p>Onze feestzaal heeft een ruime buitenspeeltuin — perfect voor de kleinsten. Optioneel voorzien we een springkasteel en kinderanimatie.</p>",
    ctaLabel: "Vraag beschikbaarheid",
    ctaType: "contact",
    order: 3,
  },
  {
    slug: "feestzaal",
    title: "Onze feestzaal",
    summary:
      "Een volledig uitgeruste feestzaal met buitenspeeltuin, voor zondagbuffetten, familiemomenten en bedrijfsevents tot enkele honderden gasten.",
    heroImage: img.venue,
    features: [
      "Zondagbuffet elke week (12:00 — 15:00)",
      "Bruiloften en jubilea",
      "Bedrijfsfeesten en teambuildings",
      "DJ, fotograaf en wedding planner beschikbaar",
      "Ruime buitenspeeltuin voor kinderen",
      "Parking op eigen terrein",
    ],
    priceIndication: "Vanaf €30 per persoon",
    bodyHtml:
      "<p>De feestzaal is zeven dagen per week beschikbaar. We denken graag mee over timing, decoratie en begeleidende diensten — van fotograaf tot band.</p>",
    ctaLabel: "Plan een bezichtiging",
    ctaType: "contact",
    order: 4,
  },
  {
    slug: "zelf-samenstellen",
    title: "Zelf samenstellen",
    summary:
      "Stel uw eigen meergangenmenu samen uit onze selectie — van aperitief tot dessert. Vanaf 12 personen.",
    heroImage: img.plate,
    features: [
      "Voorgerechten en soepen",
      "Tussengerechten",
      "Hoofdgerechten vlees en vis",
      "Desserten",
      "Kindermenu's",
      "Vanaf 12 personen",
    ],
    priceIndication: "Prijs op basis van selectie",
    bodyHtml:
      "<p>Ideaal voor kleinere gezelschappen die toch alle vrijheid willen. We bespreken uw voorkeuren en stellen samen een menu samen dat past.</p>",
    ctaLabel: "Start uw menu",
    ctaType: "contact",
    order: 5,
  },
  {
    slug: "eetdagen-verenigingen",
    title: "Eetdagen & verenigingen",
    summary:
      "We ondersteunen scholen, clubs en verenigingen met eetdagen als fundraiser. Eenvoudige afspraken, sterke marges voor uw kas.",
    heroImage: img.association,
    features: [
      "Eetdagen voor verenigingen",
      "Schoolevenementen",
      "Fundraising en mosselfeesten",
      "Vaste afspraken, duidelijke marges",
    ],
    priceIndication: "Prijs in overleg",
    bodyHtml:
      "<p>Al vele jaren werken we samen met lokale verenigingen. We brengen ervaring, materiaal en organisatie — u brengt de gasten en de saamhorigheid.</p>",
    ctaLabel: "Contact ons",
    ctaType: "contact",
    order: 6,
  },
  {
    slug: "huur-materiaal",
    title: "Verhuur materiaal",
    summary:
      "Borden, bestek, glazen, chafing dishes en BBQ-installaties. Alles wat u nodig heeft voor een geslaagd feest op locatie.",
    heroImage: img.material,
    features: [
      "Borden, bestek en glazen",
      "Chafing dishes (€8/stuk)",
      "BBQ-installatie (€100)",
      "Tafellinnen",
      "Bediening op locatie (€40/uur excl. btw)",
    ],
    priceIndication: "Huurprijzen in overleg",
    bodyHtml:
      "<p>Combineer materiaalverhuur met een van onze catering-formules, of huur afzonderlijk. Plaatsing en ophaling kunnen we voor u verzorgen.</p>",
    ctaLabel: "Vraag een prijsopgave",
    ctaType: "contact",
    order: 7,
  },
];

export const categories: Category[] = [
  {
    slug: "bbq",
    title: "BBQ",
    description:
      "Drie formules, allemaal met verse salades, gemarineerd vlees en zelfgemaakte sauzen. Vanaf 6 personen.",
    heroImage: img.bbq,
    order: 1,
  },
  {
    slug: "broodjes-boxen",
    title: "Broodjes-boxen",
    description:
      "Luxe broodjesboxen voor meetings, lunches en recepties. Mini-broodjes om los bij te bestellen.",
    heroImage: img.sandwich,
    order: 2,
  },
  {
    slug: "food-boxes",
    title: "Food boxes",
    description:
      "All-in foodboxen die we bij u afleveren — Italiaans of brunch, voor intieme gezelschappen vanaf 2 personen.",
    heroImage: img.italian,
    order: 3,
  },
];

export const products: Product[] = [
  // BBQ — tiered kind
  {
    _id: "bbq-main",
    kind: "tiered",
    categorySlug: "bbq",
    slug: "bbq-formules",
    title: "BBQ formules",
    summary:
      "Kies uit drie formules — van klassiek tot premium. Alle formules inclusief aardappel met remoulade, pastasalade, groenten, brood, boter en sauzen.",
    heroImage: img.bbq,
    gallery: [img.grill, img.ingredients],
    basePrice: 16,
    unit: "per_person",
    minGuests: 6,
    leadTimeDays: 4,
    available: true,
    featured: true,
    variants: [
      {
        id: "formule-1",
        name: "Formule 1 — Klassiek",
        description: "Witte pens, rundsvlees, souvlaki, hamburger",
        priceDelta: 0,
        includedItems: [
          "Witte pens",
          "Rundsvlees",
          "Souvlaki",
          "Hamburger",
          "Aardappel met remoulade",
          "Pastasalade",
          "Groentenschotel",
          "Brood, boter en sauzen",
        ],
      },
      {
        id: "formule-2",
        name: "Formule 2 — Uitgebreid",
        description: "Scampi, zalm, souvlaki, exotische kip, spek, aardappelspies",
        priceDelta: 4,
        includedItems: [
          "Scampi",
          "Zalm",
          "Souvlaki",
          "Exotische kip",
          "Spek",
          "Aardappelspies",
          "Pastasalade",
          "Groentenschotel",
          "Brood, boter en sauzen",
        ],
      },
      {
        id: "formule-3",
        name: "Formule 3 — Premium",
        description: "Zalm of scampi of tong, lam, steak, spek, worst, spareribs",
        priceDelta: 6,
        includedItems: [
          "Zalm / scampi / tong (naar keuze)",
          "Lam",
          "Steak",
          "Spek",
          "Worst",
          "Spareribs",
          "Aardappel met remoulade",
          "Pastasalade",
          "Groentenschotel",
        ],
      },
      {
        id: "formule-kids",
        name: "Kids BBQ",
        description: "Kindvriendelijke formule voor onze jongste gasten",
        priceDelta: -8,
        includedItems: [
          "Mini worst",
          "Kipfilet",
          "Hamburgertje",
          "Frietjes of aardappel",
          "Appelmoes",
        ],
      },
    ],
    allergens: ["Gluten", "Lactose", "Schaaldieren (formule 2/3)"],
  },

  // Broodjes-boxen — box-with-addons
  {
    _id: "box-deluxe",
    kind: "box-with-addons",
    categorySlug: "broodjes-boxen",
    slug: "deluxe-broodjes-box",
    title: "Deluxe Broodjes Box",
    summary: "30 mini gevulde broodjes, gemengde broodsoorten — onze klassieker voor recepties en lunches.",
    heroImage: img.sandwich,
    gallery: [img.bread],
    basePrice: 50,
    unit: "per_box",
    leadTimeDays: 2,
    available: true,
    featured: true,
    addonIds: ["mini-luxe", "mini-standaard", "broodjeslolly"],
  },
  {
    _id: "box-zwart-brood",
    kind: "box-with-addons",
    categorySlug: "broodjes-boxen",
    slug: "zwart-brood-box",
    title: "Zwart Brood Box",
    summary: "40 sneetjes zwart brood met kaas, kip en mosterd — hartig en voedzaam.",
    heroImage: img.bread,
    basePrice: 50,
    unit: "per_box",
    leadTimeDays: 2,
    available: true,
    addonIds: ["mini-luxe", "mini-standaard"],
  },
  {
    _id: "box-italiaans-brood",
    kind: "box-with-addons",
    categorySlug: "broodjes-boxen",
    slug: "italiaanse-brood-box",
    title: "Italiaanse Brood Box",
    summary: "30 ciabatta-broodjes met Italiaanse vleeswaren, kazen en kruiden.",
    heroImage: img.italian,
    basePrice: 50,
    unit: "per_box",
    leadTimeDays: 2,
    available: true,
    addonIds: ["mini-luxe", "mini-standaard"],
  },

  // Losse mini-broodjes (used as addons)
  {
    _id: "mini-standaard",
    kind: "fixed",
    categorySlug: "losse-broodjes",
    slug: "mini-broodje-standaard",
    title: "Mini broodje — standaard",
    summary: "Klassieke mini-broodjes, per stuk",
    heroImage: img.sandwich,
    basePrice: 1.6,
    unit: "per_item",
    leadTimeDays: 2,
    available: true,
  },
  {
    _id: "mini-luxe",
    kind: "fixed",
    categorySlug: "losse-broodjes",
    slug: "mini-broodje-luxe",
    title: "Mini broodje — luxe",
    summary: "Luxe gevulde mini-broodjes, per stuk",
    heroImage: img.bread,
    basePrice: 1.7,
    unit: "per_item",
    leadTimeDays: 2,
    available: true,
  },
  {
    _id: "broodjeslolly",
    kind: "fixed",
    categorySlug: "losse-broodjes",
    slug: "broodjeslolly",
    title: "Broodjeslolly",
    summary: "Broodjeslollies — minimum 10 stuks",
    heroImage: img.sandwich,
    basePrice: 3,
    unit: "per_item",
    minGuests: 10,
    leadTimeDays: 2,
    available: true,
  },

  // Food boxes — fixed kind
  {
    _id: "box-italiaans",
    kind: "fixed",
    categorySlug: "food-boxes",
    slug: "italiaanse-food-box",
    title: "Italiaanse Food Box",
    summary: "Tapas, pasta, soep, brood en tiramisu — Italië aan uw tafel. Optioneel met wijn (+€10).",
    heroImage: img.italian,
    gallery: [img.plate, img.table],
    basePrice: 30,
    unit: "per_person",
    minGuests: 2,
    leadTimeDays: 2,
    available: true,
    featured: true,
  },
  {
    _id: "box-brunch",
    kind: "fixed",
    categorySlug: "food-boxes",
    slug: "luxe-brunchbox",
    title: "Luxe Brunchbox",
    summary: "Ambachtelijk gebak, brood, vleeswaren, kaas, pannenkoeken, eieren, spek, worstjes, soep, lasagne en dessert.",
    heroImage: img.brunch,
    basePrice: 30,
    unit: "per_person",
    minGuests: 2,
    leadTimeDays: 2,
    available: true,
  },
];

// Upcoming Sunday buffet slots (prototype data — 8 weeks ahead)
function nextSundays(count: number): string[] {
  const sundays: string[] = [];
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const day = today.getDay();
  const diff = (7 - day) % 7 || 7;
  const firstSunday = new Date(today);
  firstSunday.setDate(today.getDate() + diff);
  for (let i = 0; i < count; i++) {
    const d = new Date(firstSunday);
    d.setDate(firstSunday.getDate() + i * 7);
    sundays.push(d.toISOString());
  }
  return sundays;
}

export const zondagbuffetSlots: ZondagbuffetSlot[] = nextSundays(8).map((date, i) => ({
  _id: `slot-${date.slice(0, 10)}`,
  date,
  capacity: 80,
  booked: [12, 28, 45, 8, 60, 20, 0, 5][i] ?? 0,
  priceAdult: 30,
  priceYouth: 20,
  priceChild: 15,
  priceToddler: 2.5,
  menuHtml: [
    "<p><strong>Voorgerechten</strong></p><ul><li>Carpaccio van rund met parmezaan en pijnboompitten</li><li>Soep van het huis</li><li>Scampi's in Provençaalse saus</li></ul>",
    "<p><strong>Hoofdgerechten</strong></p><ul><li>Kalfswangetjes gestoofd in rode wijn</li><li>Gebakken zalmfilet met beurre blanc</li><li>Gevulde kalkoenrolletjes met wildsaus</li></ul>",
    "<p><strong>Desserten</strong></p><ul><li>Assortiment Limburgse vlaaien</li><li>Chocolademousse</li><li>Vers fruit en slagroom</li></ul>",
  ].join(""),
  status: i === 6 ? "closed" : "open",
}));

// Lookup helpers
export function findProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function findProductById(id: string): Product | undefined {
  return products.find((p) => p._id === id);
}

export function findCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function productsByCategory(slug: string): Product[] {
  return products.filter((p) => p.categorySlug === slug);
}

export function findService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function findSlot(id: string): ZondagbuffetSlot | undefined {
  return zondagbuffetSlots.find((s) => s._id === id);
}

export function featuredProducts(): Product[] {
  return products.filter((p) => p.featured);
}
