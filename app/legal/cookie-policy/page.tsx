import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie Policy for Eden Little Ones Activity Centre, Lavington, Nairobi.",
};

export default function CookiePolicyPage() {
  return (
    <div className="container-eden max-w-3xl py-16">
      <span className="eyebrow mb-4">Legal</span>
      <h1 className="mb-6 text-3xl sm:text-4xl">Cookie Policy</h1>
      <p className="mb-8 text-meta text-ink">Last updated: October 2026</p>

      <p className="mb-8 text-body text-ink">
        Eden Little Ones Activity Centre uses cookies to remember your booking
        preferences and improve our site, in line with the Kenya Data Protection
        Act, 2019. You can manage your preferences at any time using the cookie
        banner on our site.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">Necessary Cookies</h2>
        <p className="text-body text-ink">
          Required for core site functionality such as the booking system and
          cookie preference storage. These cannot be disabled.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">Analytics Cookies</h2>
        <p className="text-body text-ink">
          Help us understand how visitors use the site so we can improve
          activities, pages and content. Only active with your consent.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">Marketing Cookies</h2>
        <p className="text-body text-ink">
          Used to show relevant offers for activities, birthday parties and
          membership. Only active with your consent.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl">Managing Your Preferences</h2>
        <p className="text-body text-ink">
          You can change your cookie preferences at any time by clearing your
          browser&apos;s local storage for this site, which will show the cookie
          banner again on your next visit.
        </p>
      </section>
    </div>
  );
}
