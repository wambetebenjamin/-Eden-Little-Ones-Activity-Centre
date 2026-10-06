import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CheckCircle, Clock, Users, Banknote, Calendar, Star } from "lucide-react";
import { activities, getActivityBySlug } from "@/lib/data/activities";
import { testimonials } from "@/lib/data/testimonials";
import ActivityIcon from "@/components/ActivityIcon";
import BookActivityButton from "@/components/BookActivityButton";

export const revalidate = 300;

export function generateStaticParams() {
  return activities.map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const activity = getActivityBySlug(params.slug);
  if (!activity) return {};
  return {
    title: activity.name,
    description: activity.shortDescription,
    openGraph: {
      title: `${activity.name} | Eden Little Ones Activity Centre`,
      description: activity.shortDescription,
      images: [{ url: activity.image }],
    },
  };
}

export default function ActivityDetailPage({ params }: { params: { slug: string } }) {
  const activity = getActivityBySlug(params.slug);
  if (!activity) notFound();

  const reviews = testimonials.filter((t) => t.activity === activity.name);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: activity.name,
    description: activity.description,
    image: `https://www.edenlittleones.co.ke${activity.image}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "KES",
      price: activity.priceKES,
      availability: "https://schema.org/InStock",
    },
  };

  const eventJsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: `${activity.name} Session`,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: "Eden Little Ones Activity Centre",
      address: "Lavington, Nairobi, Kenya",
    },
    description: activity.schedule,
  };

  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(eventJsonLd) }} />

      <div className="relative h-[42vh] min-h-[320px] w-full">
        <Image src={activity.image} alt={activity.name} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-dark/10" />
        <div className="container-eden absolute inset-x-0 bottom-0 pb-8 text-white">
          <span className="eyebrow mb-3 border-white text-white"><ActivityIcon icon={activity.icon} size={14} className="mr-1 inline" /> Ages {activity.ageRange}</span>
          <h1 className="text-3xl text-white sm:text-5xl">{activity.name}</h1>
        </div>
      </div>

      <div className="container-eden grid grid-cols-1 gap-10 py-14 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <p className="mb-8 text-body text-ink">{activity.description}</p>

          <h2 className="mb-3 text-xl">What Children Will Learn</h2>
          <ul className="mb-8 space-y-2">
            {activity.willLearn.map((item) => (
              <li key={item} className="flex items-start gap-2 text-body text-ink">
                <CheckCircle size={16} className="mt-1 shrink-0 text-secondary" /> {item}
              </li>
            ))}
          </ul>

          <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <h2 className="mb-3 text-xl">Materials Provided</h2>
              <ul className="space-y-2">
                {activity.materialsProvided.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body text-ink">
                    <CheckCircle size={16} className="mt-1 shrink-0 text-secondary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="mb-3 text-xl">What to Bring</h2>
              <ul className="space-y-2">
                {activity.whatToBring.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-body text-ink">
                    <CheckCircle size={16} className="mt-1 shrink-0 text-secondary" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h2 className="mb-3 text-xl">Schedule</h2>
          <table className="schedule-table mb-10 w-full">
            <thead>
              <tr>
                <th className="text-left">Days &amp; Times</th>
                <th className="text-left">Duration</th>
                <th className="text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{activity.schedule}</td>
                <td>{activity.duration}</td>
                <td>KES {activity.priceKES.toLocaleString()} / child</td>
              </tr>
            </tbody>
          </table>

          {reviews.length > 0 && (
            <>
              <h2 className="mb-4 text-xl">Parent Reviews</h2>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {reviews.map((r) => (
                  <div key={r.parentName} className="card-eden p-5">
                    <div className="mb-2 flex gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={14} className={i < r.rating ? "fill-primary text-primary" : "text-light"} />
                      ))}
                    </div>
                    <p className="mb-2 text-body text-ink">&ldquo;{r.review}&rdquo;</p>
                    <p className="text-meta text-ink">{r.parentName}, child aged {r.childAge}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <aside className="h-fit rounded-eden bg-white p-6 shadow-eden lg:sticky lg:top-28">
          <p className="mb-4 flex items-center gap-2 text-2xl font-semibold text-primary">
            <Banknote size={22} /> KES {activity.priceKES.toLocaleString()}
          </p>
          <ul className="mb-6 space-y-2 text-body text-ink">
            <li className="flex items-center gap-2"><Users size={16} className="text-primary" /> Ages {activity.ageRange}</li>
            <li className="flex items-center gap-2"><Clock size={16} className="text-primary" /> {activity.duration}</li>
            <li className="flex items-center gap-2"><Calendar size={16} className="text-primary" /> {activity.schedule}</li>
          </ul>
          <BookActivityButton activitySlug={activity.slug} />
        </aside>
      </div>
    </article>
  );
}
