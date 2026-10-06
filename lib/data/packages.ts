export interface BirthdayPackage {
  slug: string;
  name: string;
  image: string;
  inclusions: string[];
  maxChildren: number;
  duration: string;
  venueSetup: string;
  startingPriceKES: number;
}

export const birthdayPackages: BirthdayPackage[] = [
  {
    slug: "eden-basic-party",
    name: "Eden Basic Party",
    image: "/images/birthday/eden-basic-party.jpg",
    inclusions: [
      "2 hours of venue access",
      "One facilitated activity of your choice",
      "Simple table decor",
      "Juice and snacks for all children",
    ],
    maxChildren: 15,
    duration: "2 hours",
    venueSetup: "Shared garden pavilion with themed table settings",
    startingPriceKES: 15000,
  },
  {
    slug: "eden-explorer-party",
    name: "Eden Explorer Party",
    image: "/images/birthday/eden-explorer-party.jpg",
    inclusions: [
      "3 hours of venue access",
      "Two facilitated activities",
      "Full themed decor",
      "Meal and snacks for all children",
      "Dedicated party host",
    ],
    maxChildren: 25,
    duration: "3 hours",
    venueSetup: "Private indoor hall with full themed decoration",
    startingPriceKES: 28000,
  },
  {
    slug: "eden-royale-party",
    name: "Eden Royale Party",
    image: "/images/birthday/eden-royale-party.jpg",
    inclusions: [
      "4 hours of venue access",
      "Three facilitated activities",
      "Premium themed decor and photo backdrop",
      "Full meal, snacks and mocktail bar for all children",
      "Dedicated party host and photographer",
    ],
    maxChildren: 40,
    duration: "4 hours",
    venueSetup: "Exclusive use of indoor hall and garden with premium decor",
    startingPriceKES: 48000,
  },
];

export const partyAddOns = [
  { id: "extra-time", label: "Extra 30 minutes", priceKES: 4000 },
  { id: "custom-cake", label: "Custom themed cake", priceKES: 5500 },
  { id: "party-bags", label: "Party bags for guests", priceKES: 300 },
  { id: "photos", label: "Professional photos", priceKES: 6000 },
];
