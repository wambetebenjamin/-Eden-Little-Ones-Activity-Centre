import { MapPin, Phone, MessageCircle, Clock } from "lucide-react";
import ContactForm from "@/components/forms/ContactForm";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/MotionReveal";

const HOURS = [
  ["Monday – Friday", "8:00am – 6:00pm"],
  ["Saturday", "9:00am – 5:00pm"],
  ["Sunday", "Closed (private events by arrangement)"],
];

export default function ContactSection() {
  return (
    <section id="contact" className="bg-light py-20">
      <div className="container-eden">
        <Reveal className="mx-auto mb-12 max-w-2xl text-center">
          <span className="eyebrow mb-4">Contact Us</span>
          <h2 className="mb-4 text-3xl sm:text-4xl">Visit Us in Lavington</h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="card-eden flex items-start gap-3 p-5">
              <MapPin className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-semibold text-dark">Address</p>
                <p className="text-body text-ink">James Gichuru Road, Lavington, Nairobi, Kenya</p>
              </div>
            </div>
            <div className="card-eden flex items-start gap-3 p-5">
              <Phone className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-semibold text-dark">Phone</p>
                <a href="tel:+254112272061" className="text-body text-ink">+254 112 272 061</a>
              </div>
            </div>
            <a
              href={buildWhatsAppLink("Hello! I would like to enquire about Eden Little Ones Activity Centre.")}
              target="_blank" rel="noopener noreferrer"
              className="card-eden flex items-start gap-3 p-5 transition hover:shadow-lg"
            >
              <MessageCircle className="mt-1 shrink-0 text-primary" size={20} />
              <div>
                <p className="font-semibold text-dark">WhatsApp</p>
                <p className="text-body text-ink">Chat with us instantly</p>
              </div>
            </a>
            <div className="card-eden p-5">
              <div className="mb-3 flex items-center gap-2">
                <Clock className="text-primary" size={20} />
                <p className="font-semibold text-dark">Opening Hours</p>
              </div>
              <table className="schedule-table w-full">
                <tbody>
                  {HOURS.map(([day, hours]) => (
                    <tr key={day}>
                      <td className="font-semibold text-dark">{day}</td>
                      <td>{hours}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="h-64 overflow-hidden rounded-eden border border-light shadow-eden-sm">
              <iframe
                title="Eden Little Ones Activity Centre map"
                src="https://www.google.com/maps?q=Lavington,+Nairobi,+Kenya&output=embed"
                className="h-full w-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-xl">Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
