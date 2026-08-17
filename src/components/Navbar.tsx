import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  Mail,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";
import { countryDestinations } from "@/data/countryDestinations";
import { WHATSAPP_URL } from "@/lib/careerCounsellingData";

type MobileNavSection = "career" | "higher" | "company" | "more" | null;

const companyLinks = [
  { label: "About Us", to: "/#about" },
  { label: "Founder", to: "/founder" },
  { label: "Contact Us", to: "/book-consultation" },
];

const moreLinks = [
  { label: "Services", to: "/#services" },
  { label: "Testimonials", to: "/testimonials" },
  { label: "FAQs", to: "/faqs" },
  { label: "Blogs", to: "/blogs" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

const careerResourceLinks = [
  {
    label: "Career Booster",
    href: "https://dreamglobal.edumilestones.com/career-boosters/",
  },
  {
    label: "Career Suitability",
    href: "https://dreamglobal.edumilestones.com/login/suitability#pro_gra",
  },
  {
    label: "Career Library",
    href: "https://dreamglobal.edumilestones.com/global-career-library/",
  },
];

const dropdownItemClass =
  "block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12";
const mobileItemClass =
  "rounded px-2 py-1.5 text-sm font-semibold text-slate-700 transition hover:bg-[#D4A24C]/12";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState<MobileNavSection>(null);

  const closeMobileMenu = () => {
    setIsMenuOpen(false);
    setMobileNavOpen(null);
  };

  const toggleMobileSection = (section: Exclude<MobileNavSection, null>) => {
    setMobileNavOpen((current) => (current === section ? null : section));
  };

  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-[#0A2342]/10 bg-[linear-gradient(90deg,#fffdf8_0%,#f8fbff_55%,#eaf5ff_100%)] shadow-[0_1px_16px_rgba(10,35,66,0.06)]">
      <div className="border-b border-white/10 bg-secondary py-2 text-white">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-xs font-semibold text-white/80 sm:text-sm md:flex-row md:justify-end md:gap-6">
          <a
            href="mailto:dreamglobalin@gmail.com"
            className="inline-flex items-center gap-2 transition hover:text-[#D6A329]"
          >
            <Mail size={14} className="text-[#D6A329]" />
            dreamglobalin@gmail.com
          </a>
          <a
            href="tel:+918848674757"
            className="inline-flex items-center gap-2 transition hover:text-[#D6A329]"
          >
            <Phone size={14} className="text-[#D6A329]" />
            +91 88486 74757
          </a>
        </div>
      </div>

      <div className="flex h-[72px] w-full items-center gap-3 px-6 md:h-[78px] lg:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={DreamGlobalLogo}
            alt="DreamGlobal Logo"
            className="h-11 w-11 rounded-full object-cover md:h-12 md:w-12"
          />
          <span className="flex flex-col leading-none">
            <span className="dream-gradient-text text-[1.45rem] font-bold md:text-[1.9rem]">
              DreamGlobal
            </span>
            <span className="dream-gradient-text mt-1 hidden text-[0.62rem] font-extrabold uppercase tracking-[0.08em] lg:block lg:text-[0.68rem]">
              Career Counselling & Higher Education Solutions
            </span>
          </span>
        </Link>

        <div className="ml-auto hidden flex-1 items-center justify-end gap-5 text-sm font-semibold text-[#061D3D] lg:flex">
          <Link
            to="/"
            className="order-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
          >
            Home
          </Link>

          <div className="group relative order-2">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
            >
              Career Counselling
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                Career Counselling
              </p>
              <Link
                to="/career-counselling"
                className={`${dropdownItemClass} border-b border-slate-100`}
              >
                Explore Career Counselling
              </Link>
              {careerResourceLinks.map((link) => (
                <a key={link.href} href={link.href} className={dropdownItemClass}>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          <div className="group relative order-3">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
            >
              Higher Studies
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                Higher Studies
              </p>
              <Link
                to="/higher-studies"
                className={`${dropdownItemClass} border-b border-slate-100`}
              >
                Explore Higher Studies
              </Link>
              <Link
                to="/mbbs"
                className={`${dropdownItemClass} border-b border-slate-100`}
              >
                MBBS
              </Link>
              <div className="group/countries relative">
                <button
                  type="button"
                  className="flex w-full items-center justify-between border-b border-slate-100 px-4 py-2 text-left text-sm font-bold text-slate-900 transition hover:bg-[#D4A24C]/12"
                >
                  Countries
                  <ChevronDown size={15} className="-rotate-90 text-[#C88A18]" />
                </button>
                <div className="invisible absolute left-full top-0 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover/countries:visible group-hover/countries:opacity-100">
                  <Link
                    to="/countries"
                    className={`${dropdownItemClass} border-b border-slate-100`}
                  >
                    All Countries
                  </Link>
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      className="block px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-[#D4A24C]/12 hover:text-slate-950"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="group relative order-4">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
            >
              Company
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                Company
              </p>
              {companyLinks.map((link) => (
                <Link key={link.to} to={link.to} className={dropdownItemClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="group relative order-5">
            <button
              type="button"
              className="flex items-center gap-1 whitespace-nowrap transition hover:text-[color:var(--career-primary)]"
            >
              More
              <ChevronDown size={15} />
            </button>
            <div className="invisible absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 opacity-0 shadow-xl transition group-hover:visible group-hover:opacity-100">
              <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-[#C88A18]">
                More
              </p>
              {moreLinks.map((link) => (
                <Link key={link.to} to={link.to} className={dropdownItemClass}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-3 lg:ml-0">
          <a
            href={WHATSAPP_URL}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#24C65A] text-white shadow-[0_10px_22px_-12px_rgba(36,198,90,0.85)] transition hover:bg-[#1FB04F]"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={22} />
          </a>
          <Link
            to="/book-consultation"
            className="dream-gold-button hidden h-9 items-center justify-center rounded-md px-4 text-[0.82rem] font-bold shadow-[0_14px_28px_-18px_rgba(200,138,24,0.9)] transition sm:inline-flex"
          >
            Book a Consultation
          </Link>
          <button
            type="button"
            onClick={() => {
              setIsMenuOpen((current) => {
                if (current) setMobileNavOpen(null);
                return !current;
              });
            }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-[#0A2342]/15 bg-white/70 text-[#0A2342] shadow-sm backdrop-blur transition hover:border-[#C88A18] hover:text-[#C88A18] lg:hidden"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="border-t border-[#0A2342]/10 bg-white/95 px-4 py-4 shadow-[0_18px_36px_-30px_rgba(10,35,66,0.55)] backdrop-blur lg:hidden">
          <nav className="grid gap-2 text-sm font-bold text-[#061D3D]">
            <Link
              to="/"
              onClick={closeMobileMenu}
              className="rounded-md border border-[#0A2342]/10 p-3 font-bold text-[#061D3D] transition hover:bg-[#D4A24C]/12"
            >
              Home
            </Link>
            <div className="order-2 rounded-md border border-[#0A2342]/10 p-3">
              <button
                type="button"
                onClick={() => toggleMobileSection("career")}
                className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                aria-expanded={mobileNavOpen === "career"}
              >
                Career Counselling
                <ChevronDown
                  size={16}
                  className={`transition ${mobileNavOpen === "career" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileNavOpen === "career" && (
                <div className="mt-2 grid gap-1">
                  <Link to="/career-counselling" onClick={closeMobileMenu} className={mobileItemClass}>
                    Explore Career Counselling
                  </Link>
                  {careerResourceLinks.map((link) => (
                    <a key={link.href} href={link.href} onClick={closeMobileMenu} className={mobileItemClass}>
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
            <div className="order-3 rounded-md border border-[#0A2342]/10 p-3">
              <button
                type="button"
                onClick={() => toggleMobileSection("higher")}
                className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                aria-expanded={mobileNavOpen === "higher"}
              >
                Higher Studies
                <ChevronDown
                  size={16}
                  className={`transition ${mobileNavOpen === "higher" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileNavOpen === "higher" && (
                <div className="mt-2 grid gap-1">
                  <Link to="/higher-studies" onClick={closeMobileMenu} className={mobileItemClass}>
                    Explore Higher Studies
                  </Link>
                  <Link to="/mbbs" onClick={closeMobileMenu} className={mobileItemClass}>
                    MBBS
                  </Link>
                  <p className="px-2 pt-2 text-xs font-extrabold uppercase tracking-[0.12em] text-[#C88A18]">
                    Countries
                  </p>
                  <Link to="/countries" onClick={closeMobileMenu} className={mobileItemClass}>
                    All Countries
                  </Link>
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      onClick={closeMobileMenu}
                      className="rounded px-2 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-[#D4A24C]/12"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="order-4 rounded-md border border-[#0A2342]/10 p-3">
              <button
                type="button"
                onClick={() => toggleMobileSection("company")}
                className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                aria-expanded={mobileNavOpen === "company"}
              >
                Company
                <ChevronDown
                  size={16}
                  className={`transition ${mobileNavOpen === "company" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileNavOpen === "company" && (
                <div className="mt-2 grid gap-1">
                  {companyLinks.map((link) => (
                    <Link key={link.to} to={link.to} onClick={closeMobileMenu} className={mobileItemClass}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="order-5 rounded-md border border-[#0A2342]/10 p-3">
              <button
                type="button"
                onClick={() => toggleMobileSection("more")}
                className="flex w-full items-center justify-between font-bold text-[#061D3D]"
                aria-expanded={mobileNavOpen === "more"}
              >
                More
                <ChevronDown
                  size={16}
                  className={`transition ${mobileNavOpen === "more" ? "rotate-180" : ""}`}
                />
              </button>
              {mobileNavOpen === "more" && (
                <div className="mt-2 grid gap-1">
                  {moreLinks.map((link) => (
                    <Link key={link.to} to={link.to} onClick={closeMobileMenu} className={mobileItemClass}>
                      {link.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              to="/book-consultation"
              onClick={closeMobileMenu}
              className="order-6 dream-gold-button mt-2 rounded-md px-3 py-3 text-left transition"
            >
              Book a Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
