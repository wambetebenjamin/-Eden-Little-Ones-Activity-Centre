export interface MembershipTier {
  slug: string;
  name: string;
  priceLabel: string;
  priceKES: number;
  billing: string;
  inclusions: string[];
  activityCredits: string;
  birthdayDiscount: string;
  priorityBooking: boolean;
}

export const membershipTiers: MembershipTier[] = [
  {
    slug: "eden-explorer-monthly",
    name: "Eden Explorer Monthly",
    priceLabel: "KES 2,500 / child / month",
    priceKES: 2500,
    billing: "Billed monthly, per child",
    inclusions: [
      "4 activity sessions per month",
      "10% off birthday party packages",
      "Member-only newsletter",
    ],
    activityCredits: "4 credits / month",
    birthdayDiscount: "10%",
    priorityBooking: false,
  },
  {
    slug: "eden-family-monthly",
    name: "Eden Family Monthly",
    priceLabel: "KES 4,000 / month for up to 3 children",
    priceKES: 4000,
    billing: "Billed monthly, up to 3 children",
    inclusions: [
      "12 shared activity sessions per month",
      "15% off birthday party packages",
      "Priority booking windows",
    ],
    activityCredits: "12 shared credits / month",
    birthdayDiscount: "15%",
    priorityBooking: true,
  },
  {
    slug: "eden-annual",
    name: "Eden Annual",
    priceLabel: "KES 25,000 / child / year",
    priceKES: 25000,
    billing: "Billed annually, per child",
    inclusions: [
      "Unlimited activity sessions",
      "20% off birthday party packages",
      "Priority booking and free event invites",
    ],
    activityCredits: "Unlimited",
    birthdayDiscount: "20%",
    priorityBooking: true,
  },
];
