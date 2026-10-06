import Link from "next/link";
import { Facebook, Instagram, MapPin, Mail, Phone, MessageCircle } from "lucide-react";
import NewsletterForm from "@/components/forms/NewsletterForm";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { Reveal } from "@/components/MotionReveal";

export default function Footer() {
  return (
    <footer className="bg-dark text-white">
      <Reveal className="container-eden grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className="mb-3 font-display text-xl text-white">
            Eden <span className="text-primary">Little Ones</span>
          </h3>
          <p className="mb-5 text-body text-white/70">
            Nairobi&apos;s favourite activity centre for children aged 2 to 12 — play,
            arts and development in the heart of Lavington.
          </p>
          <div className="rounded-eden border border-white/15 bg-white/5 p-4">
            <h4 className="mb-2 text-sm font-semibold text-white">Newsletter</h4>
            <NewsletterForm compact />
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4 border-white text-white">Quick Links</h4>
          <ul className="space-y-3 text-body">
            <li><Link href="/#activities" className="text-white/80 hover:text-primary">Activities</Link></li>
            <li><Link href="/#birthday" className="text-white/80 hover:text-primary">Birthday Parties</Link></li>
            <li><Link href="/schools" className="text-white/80 hover:text-primary">School Groups</Link></li>
            <li><Link href="/#membership" className="text-white/80 hover:text-primary">Membership</Link></li>
            <li><Link href="/blog" className="text-white/80 hover:text-primary">Blog</Link></li>
            <li><Link href="/book" className="text-white/80 hover:text-primary">Book Now</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="eyebrow mb-4 border-white text-white">Legal</h4>
          <ul className="space-y-3 text-body">
            <li><Link href="/legal/privacy-policy" className="text-white/80 hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/legal/terms" className="text-white/80 hover:text-primary">Terms &amp; Conditions</Link></li>
            <li><Link href="/legal/cookie-policy" className="text-white/80 hover:text-primary">Cookie Policy</Link></li>
          </ul>
          <h4 className="eyebrow mb-4 mt-6 border-white text-white">Follow Us</h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Facebook" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-primary"><Facebook size={18} /></a>
            <a href="#" aria-label="Instagram" className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-primary"><Instagram size={18} /></a>
            <a
              href={buildWhatsAppLink("Hello! I would like to enquire about Eden Little Ones Activity Centre.")}
              target="_blank" rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 hover:bg-primary"
            >
              <MessageCircle size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="eyebrow mb-4 border-white text-white">Visit Us</h4>
          <ul className="space-y-3 text-body text-white/80">
            <li className="flex gap-2"><MapPin size={18} className="shrink-0 text-primary" /> Lavington, Nairobi, Kenya</li>
            <li className="flex gap-2"><Phone size={18} className="shrink-0 text-primary" /> +254 112 272 061</li>
            <li className="flex gap-2"><Mail size={18} className="shrink-0 text-primary" /> hello@edenlittleones.co.ke</li>
          </ul>
        </div>
      </Reveal>

      <div className="border-t border-white/10 py-6">
        <div className="container-eden flex flex-col items-center justify-between gap-2 text-meta text-white/60 md:flex-row">
          <p>© {new Date().getFullYear()} Eden Little Ones Activity Centre. All rights reserved.</p>
          <p>Lavington, Nairobi, Kenya</p>
        </div>
      </div>
    </footer>
  );
}
