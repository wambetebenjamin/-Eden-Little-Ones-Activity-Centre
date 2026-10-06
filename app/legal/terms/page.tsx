import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "Terms and Conditions for Eden Little Ones Activity Centre, Lavington, Nairobi.",
};

export default function TermsPage() {
  return (
    <div className="container-eden max-w-3xl py-16">
      <span className="eyebrow mb-4">Legal</span>
      <h1 className="mb-6 text-3xl sm:text-4xl">Terms &amp; Conditions</h1>
      <p className="mb-8 text-meta text-ink">Last updated: October 2026</p>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">1. Booking Terms</h2>
        <p className="text-body text-ink">
          All activity, birthday party, school group and membership bookings are
          subject to availability and confirmed only once a deposit (where
          applicable) is received. Prices are listed in Kenyan Shillings (KES)
          and are subject to change without notice; confirmed bookings honour the
          price at the time of payment.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">2. Cancellation Policy</h2>
        <ul className="list-disc space-y-2 pl-6 text-body text-ink">
          <li>Activity sessions cancelled more than 48 hours in advance receive a full credit toward a future session.</li>
          <li>Birthday party bookings cancelled more than 14 days before the event receive a 50% refund of the deposit; cancellations within 14 days forfeit the deposit.</li>
          <li>School group bookings cancelled more than 7 days in advance may reschedule at no charge.</li>
          <li>No-shows are non-refundable and non-transferable.</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">3. Parental Consent Requirements</h2>
        <p className="text-body text-ink">
          A parent or legal guardian must complete every booking and enquiry form
          on behalf of their child. By booking, you confirm you are the parent or
          legal guardian of the child(ren) named, consent to their participation
          in the selected activity, and agree to disclose any relevant medical
          conditions or allergies at the time of booking.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-3 text-xl">4. Liability During Activities</h2>
        <p className="text-body text-ink">
          Eden Little Ones Activity Centre maintains qualified, First Aid
          certified staff and appropriate supervision ratios at all times.
          Parents are required to disclose any medical conditions, allergies or
          special needs prior to a session. While we take every reasonable
          precaution, participation in physical activities carries an inherent
          risk of minor injury, and Eden Little Ones Activity Centre&apos;s
          liability is limited to incidents arising from our negligence, to the
          extent permitted by Kenyan law.
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-xl">5. Governing Law</h2>
        <p className="text-body text-ink">
          These Terms are governed by and construed in accordance with the laws
          of the Republic of Kenya. Any disputes arising from these Terms shall
          be subject to the exclusive jurisdiction of the courts of Kenya.
        </p>
      </section>
    </div>
  );
}
