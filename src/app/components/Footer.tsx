import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Headphones } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-background border-t border-border text-muted-foreground px-4 pt-20">
      <div className="max-w-7xl mx-auto">
        {/* TOP GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* LEFT – LOGO + DESCRIPTION */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/nature3.jpg" // replace with your logo
                alt="Voltsq "
                width={48}
                height={48}
                className="rounded-full border border-primary/20"
              />
              <h2 className="text-2xl text-primary font-bold tracking-tight">Voltsq </h2>
            </div>

            <p className="text-sm leading-relaxed mb-6 max-w-md text-foreground/80">
              Everything a traditional financial institution is not. We
              provide simpler and more profitable ways to become financially successful and secure in the digital era.
            </p>

            <div className="flex items-center gap-4 mb-8">
              <Link href="#" className="p-2 bg-card hover:bg-primary/10 rounded-full border border-border transition-all">
                <Facebook size={18} className="text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" className="p-2 bg-card hover:bg-primary/10 rounded-full border border-border transition-all">
                <Twitter size={18} className="text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" className="p-2 bg-card hover:bg-primary/10 rounded-full border border-border transition-all">
                <Instagram size={18} className="text-muted-foreground hover:text-primary" />
              </Link>
              <Link href="#" className="p-2 bg-card hover:bg-primary/10 rounded-full border border-border transition-all">
                <Linkedin size={18} className="text-muted-foreground hover:text-primary" />
              </Link>
            </div>

            <h4 className="text-foreground font-semibold mb-2">
              General Risk Disclaimer
            </h4>

            <p className="text-xs leading-relaxed text-muted-foreground/70">
              Nothing on this website or in our services constitutes a
              solicitation, advice, endorsement, or offer to buy or sell
              financial instruments by Voltsq GROUP. You are solely responsible
              for evaluating the benefits and risks of using any information or
              content. All investments carry substantial risk.
            </p>
          </div>

          {/* MIDDLE – NAVIGATION LINKS */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <div>
              <h4 className="text-foreground font-semibold mb-6">
                Social Links
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/company-profile"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Company PDF
                  </Link>
                </li>
                <li>
                  <Link
                    href="/register"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact-us"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <Headphones size={16} />
                    Get Support
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">
                Resources
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/about-us"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/certification"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Certification
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    Privacy
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-foreground font-semibold mb-6">
                Services
              </h4>
              <ul className="space-y-4 text-sm">
                <li>
                  <Link
                    href="/services"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    All Services
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faqs"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link
                    href="/license"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors" />
                    License
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:support@voltsq.com"
                    className="flex items-center gap-2 hover:text-primary transition-all group"
                  >
                    <Mail size={16} />
                    support@voltsq.com
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* BROKERAGE SERVICES */}
        <div className="mb-12">
          <h4 className="text-foreground font-semibold mb-2">
            Brokerage Services
          </h4>
          <p className="text-xs text-muted-foreground leading-relaxed max-w-5xl">
            Our brokerage services include margin-based products, which carry
            the risk of losing your initial deposit. Before trading, consider
            your investment objectives, risk tolerance, and experience level.
            Trading with high leverage can result in significant gains or
            losses. Margin products may not suit all investors, and you should
            fully understand the risks involved. Seek independent financial
            advice if necessary.
          </p>
        </div>

        {/* REGULATORY LOGOS */}
        <div className="flex flex-col md:flex-row gap-10 items-start mb-12">
          <div className="flex items-center gap-4">
            <Image
              src="/images/financial.png"
              alt="Financial Commission"
              width={48}
              height={48}
            />
            <p className="text-xs text-gray-400 max-w-md">
              Voltsq is a member of The Financial Commission, an international
              organization engaged in the resolution of disputes within the
              financial services industry in the Forex market.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Image
              src="/images/exchange.png"
              alt="SEC"
              width={48}
              height={48}
            />
            <p className="text-xs text-gray-400 max-w-md">
              Voltsq is regulated by the UK/US Securities and Exchange
              Commission. Investing involves risk and may result in loss.
            </p>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-white/10 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <span>© 2025 Voltsq . All Rights Reserved.</span>

          <div className="flex gap-4">
            <Link href="#">About</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Buy Digital Currency</Link>
            <Link href="#">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
