import type { Metadata } from "next";
import { Users, CheckCircle, Calendar } from "lucide-react";
import SchoolBookingForm from "@/components/forms/SchoolBookingForm";

export const metadata: Metadata = {
  title: "School & Group Bookings",
  description: "Curriculum-aligned field trip activities for school groups of 15 or more children at Eden Little Ones Activity Centre, Lavington, Nairobi.",
};

const curriculumActivities = [
  "Science Lab — hands-on experiments aligned with CBC science strands",
  "Nature Explorers — ecology and environmental studies in our garden",
  "Coding for Kids & Robotics Basics — STEM and computational thinking",
  "Drama Club — language, expression and performance skills",
  "Storytelling — literacy and oral tradition for younger grades",
];

export default function SchoolsPage() {
  return (
    <div>
      <div className="hero-header relative bg-dark py-20 text-white">
        <div className="container-eden text-center">
          <span className="eyebrow mb-4 border-white text-white"><Users size={14} className="mr-1 inline" /> For Schools</span>
          <h1 className="mb-4 text-3xl text-white sm:text-5xl">School Visit Programme</h1>
          <p className="mx-auto max-w-2xl text-body text-white/85">
            A full day of curriculum-aligned, hands-on learning for your pupils — safely
            hosted at our Lavington centre.
          </p>
        </div>
      </div>

      <section className="container-eden py-16">
        <div className="mb-14 grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl">Why Bring Your School to Eden?</h2>
            <p className="mb-4 text-body text-ink">
              Our School Visit Programme is designed for groups of 15 or more children,
              combining structured, curriculum-aligned activities with safe, supervised
              play. Every visit includes a dedicated facilitator team, First Aid cover,
              and a programme tailored to your pupils&apos; age group.
            </p>
            <ul className="space-y-2 text-body text-ink">
              <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 text-secondary" /> Groups of 15+ children welcomed</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 text-secondary" /> Curriculum-aligned activity options</li>
              <li className="flex items-start gap-2"><CheckCircle size={16} className="mt-1 text-secondary" /> First Aid certified staff on site</li>
              <li className="flex items-start gap-2"><Calendar size={16} className="mt-1 text-secondary" /> Flexible half-day and full-day slots</li>
            </ul>
          </div>
          <div className="card-eden p-6">
            <h3 className="mb-4 text-xl">Curriculum-Aligned Activities</h3>
            <ul className="space-y-3 text-body text-ink">
              {curriculumActivities.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="mt-1 shrink-0 text-secondary" /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <h2 className="mb-6 text-center text-2xl">Group Booking Enquiry</h2>
          <SchoolBookingForm />
        </div>
      </section>
    </div>
  );
}
