import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { href: "/about-us", label: "About Us" },
  { href: "/our-messages", label: "Messages" },
  { href: "/events", label: "Events" },
  { href: "/our-music", label: "Music" },
  { href: "/store", label: "Store" },
];

const connectLinks = [
  { href: "/givings", label: "Givings" },
  { href: "/healing-school", label: "Healing School" },
  { href: "/prayer-request", label: "Prayer Request" },
  { href: "/gallery", label: "Gallery" },
  { href: "/live", label: "Watch Live" },
];

const socials = [
  { href: "https://youtube.com/@aocmizioncity808", icon: "fa-youtube", label: "YouTube" },
  { href: "https://instagram.com/aocmizioncity", icon: "fa-instagram", label: "Instagram" },
  { href: "https://www.facebook.com/aocmizioncity", icon: "fa-facebook", label: "Facebook" },
  { href: "https://twitter.com/aocmizioncity", icon: "fa-twitter", label: "Twitter" },
  { href: "https://wa.me/+2349027293178", icon: "fa-whatsapp", label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0a1128] text-white">
      {/* Newsletter Banner */}
      <div className="bg-[#1a237e]">
        <div className="max-w-7xl mx-auto px-4 py-10 md:flex items-center justify-between gap-8">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">Stay Connected</h3>
            <p className="text-white/70 text-sm">Get updates on events, messages and more</p>
          </div>
          <div className="flex-1 max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="AOCMI" className="h-16" />
              <div>
                <p className="font-bold text-xl leading-tight">AOCMI</p>
                <p className="text-white/50 text-xs">Zion City</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Ambassador of Christ Ministries International — devoted to expository
              preaching and teaching of God&apos;s word.
            </p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                  title={s.label}
                >
                  <i className={`fab ${s.icon} text-sm`} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Connect
            </h4>
            <ul className="space-y-2.5">
              {connectLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/60 text-sm hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-sm uppercase tracking-wider mb-4 text-white/80">
              Contact Us
            </h4>
            <div className="space-y-3 text-sm text-white/60">
              <p className="flex items-start gap-2">
                <i className="fas fa-phone mt-1 text-xs" />
                +234 902 729 3178
              </p>
              <p className="flex items-start gap-2">
                <i className="fas fa-envelope mt-1 text-xs" />
                hello@aocmi.com
              </p>
              <p className="flex items-start gap-2">
                <i className="fas fa-map-marker-alt mt-1 text-xs" />
                Jos, Plateau State, Nigeria
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-white/40">
          <p>&copy; {new Date().getFullYear()} AOCMI Zion City. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
