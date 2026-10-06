import NewsletterForm from "@/components/forms/NewsletterForm";

export default function NewsletterSection() {
  return (
    <section className="bg-secondary py-16 text-white">
      <div className="container-eden text-center">
        <h2 className="mb-3 text-3xl text-white">Stay in the Loop</h2>
        <p className="mx-auto mb-8 max-w-xl text-body text-white/85">
          Monthly activity updates and parenting tips, straight to your inbox.
        </p>
        <div className="mx-auto max-w-xl">
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
