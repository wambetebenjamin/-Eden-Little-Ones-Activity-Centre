import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy Policy for Eden Little Ones Activity Centre, Lavington, Nairobi.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container-eden max-w-3xl py-16">
      <span className="eyebrow mb-4">Legal</span>
      <h1 className="mb-6 text-3xl sm:text-4xl">Privacy Policy</h1>
      <p className="mb-6 text-meta text-ink">Last updated: October 2026</p>

      <p className="mb-8 rounded-eden bg-light p-5 text-body text-dark">
        Eden Little Ones Activity Centre does <strong>not</strong> collect personal
        data directly from children under 13. All information submitted through
        this website — bookings, enquiries, newsletter sign-ups — is provided by a
        parent or guardian on the child&apos;s behalf.
      </p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">1. Children&apos;s Data and Extra Protections</h2>
        <p className="text-body text-ink">
          We collect limited information about children only to deliver our
          services safely — for example, a child&apos;s first name, age and any
          allergy or medical note a parent chooses to share at booking. This
          information is used solely for activity planning, safeguarding and
          emergency response, is accessible only to authorised facilitators and
          administrators, and is never used for marketing. We do not knowingly
          collect data directly from children; all such information is submitted
          by a parent or guardian.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">2. Parent Contact Data</h2>
        <p className="text-body text-ink">
          When you contact us, subscribe to our newsletter, or make an enquiry, we
          collect your name, phone number and email address. We use this data to
          respond to enquiries, send booking confirmations, and — only with your
          consent — send occasional newsletters. You may withdraw consent at any
          time by using the unsubscribe link or contacting us directly.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">3. Booking Data</h2>
        <p className="text-body text-ink">
          Activity, birthday party, school group and membership bookings require
          information such as parent name, phone, email, child age(s), session
          details and payment reference. This data is stored securely (Vercel KV)
          and used to manage your booking, process M-Pesa deposits, and provide
          session reminders. Payment card or M-Pesa PIN details are never seen or
          stored by us — payments are processed directly by Safaricom&apos;s Daraja
          platform.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">4. Analytics</h2>
        <p className="text-body text-ink">
          With your consent (see our Cookie Policy), we use privacy-respecting
          analytics to understand how visitors use our site, so we can improve
          activities and content. Analytics data is aggregated and not used to
          identify individual children.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">5. Your Rights</h2>
        <p className="mb-3 text-body text-ink">
          Under the Kenya Data Protection Act, 2019, you have the right to:
        </p>
        <ul className="list-disc space-y-2 pl-6 text-body text-ink">
          <li>Access the personal data we hold about you and your child</li>
          <li>Request correction of inaccurate data</li>
          <li>Request deletion of your data, subject to legal retention requirements</li>
          <li>Withdraw consent for marketing communications at any time</li>
          <li>Lodge a complaint with the Office of the Data Protection Commissioner, Kenya</li>
        </ul>
      </section>

      <section>
        <h2 className="mb-3 text-xl">6. Contact</h2>
        <p className="text-body text-ink">
          For any privacy questions or to exercise your rights, contact our Data
          Protection Officer at{" "}
          <a href="mailto:privacy@edenlittleones.co.ke" className="text-primary underline">
            privacy@edenlittleones.co.ke
          </a>{" "}
          or call +254 112 272 061.
        </p>
      </section>
    </div>
  );
}
