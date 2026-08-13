import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ChevronDown,
  Mail,
  Megaphone,
  Menu,
  MessageCircle,
  Phone,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import DreamGlobalLogo from "@/assets/DreamGlobalLogo.jpeg";
import { countryDestinations } from "@/data/countryDestinations";
import { WHATSAPP_URL } from "@/lib/careerCounsellingData";

const navLinks: { label: string; to: string }[] = [
  { label: "Home", to: "/" },
];

const pageLinks: { label: string; to: string }[] = [];

const companyLinks: { label: string; to: string }[] = [
  { label: "About Us", to: "/#about" },
  { label: "Founder", to: "/founder" },
  { label: "Contact Us", to: "/book-consultation" },
];

const moreLinks = [
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [studyOptionsOpen, setStudyOptionsOpen] = useState(false);
  const [countriesOpen, setCountriesOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [careerToolkitOpen, setCareerToolkitOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [showChatTip, setShowChatTip] = useState(true);
  const location = useLocation();
  const isHigherStudiesPage = location.pathname === "/higher-studies";
  const isCareerCounsellingPage = location.pathname === "/career-counselling";
  const isFounderPage = location.pathname === "/founder";
  const isCareerPage = ["/career-counselling", "/founder", "/contact"].includes(
    location.pathname
  );
  const showAdmissionBanner = !isCareerCounsellingPage && !isFounderPage;
  const solidNavbar = scrolled || isCareerPage;
  const activeNavLinks = pageLinks;
  const sectionHref = (href: string) =>
    isHigherStudiesPage ? href : `/higher-studies${href}`;
  const desktopNavTextClass = solidNavbar
    ? "text-muted-foreground hover:text-primary"
    : "text-white drop-shadow-sm hover:text-gold";
  const desktopNavItemClass = `whitespace-nowrap text-base font-semibold transition ${desktopNavTextClass}`;
  const replaySection = (hash: string) => {
    window.dispatchEvent(
      new CustomEvent("dreamglobal:section-replay", { detail: { hash } })
    );
  };
  const openCounsellingForm = () => {
    window.dispatchEvent(new CustomEvent("dreamglobal:open-counselling-form"));
  };

  useEffect(() => {
    const getHeroScrollLimit = () => {
      if (isCareerPage) return 12;

      const firstSection = document.querySelector("main section");

      if (!(firstSection instanceof HTMLElement)) return 40;

      return firstSection.offsetTop + firstSection.offsetHeight - 120;
    };

    const onScroll = () => setScrolled(window.scrollY > getHeroScrollLimit());
    onScroll();
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [isCareerPage, location.pathname]);

  useEffect(() => {
    const timer = setTimeout(() => setShowChatTip(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        solidNavbar ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      {showAdmissionBanner && (
        <div className="gold-gradient-bg text-primary-foreground">
          <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.12em] sm:text-sm">
            <Megaphone size={16} />
            <span>
              Multiple university admission intakes are open. Contact us now and hurry
              to secure your seat ! Free Counselling !!
            </span>
          </div>
        </div>
      )}

      {/* TOP BAR */}
      <div className="bg-secondary py-2 border-b border-white/10">
        <div className="container mx-auto flex flex-col items-center gap-2 px-4 text-xs text-white/80 sm:text-sm md:flex-row md:justify-end md:gap-6">
          <a
            href="mailto:dreamglobalin@gmail.com"
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Mail size={14} className="text-gold" />
            <span>dreamglobalin@gmail.com</span>
          </a>

          <a
            href="tel:+918848674757"
            className="flex items-center gap-2 hover:text-gold transition-colors"
          >
            <Phone size={14} className="text-gold" />
            <span>+91 88486 74757</span>
          </a>
        </div>
      </div>

      {/* MAIN NAVBAR */}
      <div className="container relative mx-auto flex items-center justify-between px-4 py-3 sm:py-4">
        {/* LOGO */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3 font-bold tracking-wide"
        >
          <img
            src={DreamGlobalLogo}
            alt="Dream Global Logo"
            className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14 rounded-full"
          />
          <span className="flex flex-col leading-none">
            <span className="dream-gradient-text text-2xl font-bold sm:text-4xl">
              DreamGlobal
            </span>
            <span className="dream-gradient-text mt-1 text-[0.55rem] font-bold uppercase tracking-[0.1em] sm:text-[0.65rem] lg:text-xs">
              Career Counselling & Higher Studies Solutions
            </span>
          </span>
        </Link>

        {/* DESKTOP MENU */}
        <div className="ml-auto hidden items-center justify-end gap-5 xl:flex 2xl:gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={desktopNavItemClass}
            >
              {link.label}
            </Link>
          ))}

          {activeNavLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={desktopNavItemClass}
            >
              {link.label}
            </Link>
          ))}

          <div
            className="relative"
            onMouseEnter={() => setCareerToolkitOpen(true)}
            onMouseLeave={() => setCareerToolkitOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCareerToolkitOpen((current) => !current)}
              className={`flex items-center gap-1 ${desktopNavItemClass}`}
              aria-expanded={careerToolkitOpen}
            >
              Career Counselling
              <ChevronDown
                size={16}
                className={`transition ${careerToolkitOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {careerToolkitOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                >
                  <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-yellow-600">
                    Career Counselling
                  </p>
                  <Link
                    to="/career-counselling"
                    onClick={() => setCareerToolkitOpen(false)}
                    className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                  >
                    Explore Career Counselling
                  </Link>
                  {careerResourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setCareerToolkitOpen(false)}
                      className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                    >
                      {link.label}
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div
            className="relative"
            onMouseEnter={() => setCompanyOpen(true)}
            onMouseLeave={() => setCompanyOpen(false)}
          >
            <button
              type="button"
              onClick={() => setCompanyOpen((current) => !current)}
              className={`flex items-center gap-1 ${desktopNavItemClass}`}
              aria-expanded={companyOpen}
            >
              Company
              <ChevronDown
                size={16}
                className={`transition ${companyOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full z-50 w-48 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                >
                  <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-yellow-600">
                    Company
                  </p>
                  {companyLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setCompanyOpen(false)}
                      className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {!isCareerPage && <div
            className="relative"
            onMouseEnter={() => setMoreOpen(true)}
            onMouseLeave={() => setMoreOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMoreOpen((current) => !current)}
              className={`flex items-center gap-1 ${desktopNavItemClass}`}
              aria-expanded={moreOpen}
            >
              More
              <ChevronDown
                size={16}
                className={`transition ${moreOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {moreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full z-50 w-52 -translate-x-1/2 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                >
                  <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-yellow-600">
                    Explore
                  </p>
                  {moreLinks.map((link) =>
                    "href" in link ? (
                      <a
                        key={link.href}
                        href={sectionHref(link.href)}
                        onClick={() => {
                          replaySection(link.href);
                          setMoreOpen(false);
                        }}
                        className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMoreOpen(false)}
                        className="block px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>}

          <div
            className="relative"
            onMouseEnter={() => setStudyOptionsOpen(true)}
            onMouseLeave={() => {
              setStudyOptionsOpen(false);
              setCountriesOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setStudyOptionsOpen((current) => !current)}
              className={`flex items-center gap-1 ${desktopNavItemClass}`}
              aria-expanded={studyOptionsOpen}
            >
              Higher Studies
              <ChevronDown
                size={16}
                className={`transition ${
                  studyOptionsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {studyOptionsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-1/2 top-full z-50 w-60 -translate-x-1/2 rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                >
                  <p className="px-4 pb-2 pt-1 text-xs font-bold uppercase tracking-widest text-yellow-600">
                    Higher Studies
                  </p>
                  <Link
                    to="/higher-studies"
                    onClick={() => {
                      setStudyOptionsOpen(false);
                      setCountriesOpen(false);
                    }}
                    className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                  >
                    Explore Higher Studies
                  </Link>
                  <Link
                    to="/mbbs"
                    onClick={() => {
                      setStudyOptionsOpen(false);
                      setCountriesOpen(false);
                    }}
                    className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                  >
                    MBBS
                  </Link>

                  <div
                    className="relative"
                    onMouseEnter={() => setCountriesOpen(true)}
                    onMouseLeave={() => setCountriesOpen(false)}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between px-4 py-2 text-left text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                    >
                      Countries
                      <ChevronDown
                        size={15}
                        className="-rotate-90 text-yellow-700"
                      />
                    </button>

                    <AnimatePresence>
                      {countriesOpen && (
                        <motion.div
                          initial={{ opacity: 0, x: 8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          className="absolute left-full top-0 z-50 w-56 overflow-hidden rounded-lg border border-slate-200 bg-white py-2 shadow-xl"
                        >
                          <Link
                            to="/countries"
                            onClick={() => {
                              setStudyOptionsOpen(false);
                              setCountriesOpen(false);
                            }}
                            className="block border-b border-slate-100 px-4 py-2 text-sm font-bold text-slate-900 transition hover:bg-yellow-50"
                          >
                            All countries
                          </Link>
                          {countryDestinations.map((country) => (
                            <Link
                              key={country.id}
                              to={country.route}
                              onClick={() => {
                                setStudyOptionsOpen(false);
                                setCountriesOpen(false);
                              }}
                              className="block px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-yellow-50 hover:text-slate-950"
                            >
                              {country.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-2">
            {isCareerPage ? (
              <Link
                to="/career-counselling#counselling-form"
                onClick={openCounsellingForm}
                className="gold-gradient-bg whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Book Free Counselling
              </Link>
            ) : (
              <a
                href="https://dreamglobal.edumilestones.com/"
                className="gold-gradient-bg whitespace-nowrap rounded-md px-4 py-2 text-sm font-semibold text-primary-foreground hover:opacity-90"
              >
                Start Your Journey
              </a>
            )}

            <div className="relative ml-2 flex items-center justify-center">
              <AnimatePresence>
                {showChatTip && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    className="absolute right-0 top-full z-50 -translate-x-1/2 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-2 text-sm text-white shadow-lg"
                  >
                    Chat with us
                    <div className="absolute bottom-full right-4 border-b-4 border-l-4 border-r-4 border-transparent border-b-gray-900" />
                  </motion.div>
                )}
              </AnimatePresence>

              <span className="absolute h-12 w-12 rounded-full bg-green-400 opacity-30 animate-ping " />

              <motion.a
                href={WHATSAPP_URL}
                className="relative flex h-12 w-12 items-center justify-center rounded-full bg-green-500 text-white shadow-lg "
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ scale: 1.12 }}
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={24} />
              </motion.a>
            </div>
          </div>
        </div>

        {/* MOBILE ACTIONS */}
        <div className="flex items-center gap-2 xl:hidden">
          <motion.a
            href={WHATSAPP_URL}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-500 text-white shadow-lg shadow-green-900/20"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            whileTap={{ scale: 0.94 }}
            aria-label="Chat on WhatsApp"
          >
            <span className="absolute h-10 w-10 rounded-full bg-green-400 opacity-25 animate-ping" />
            <MessageCircle size={21} className="relative" />
          </motion.a>

          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border bg-background/80 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] bg-slate-950/35 backdrop-blur-[2px] xl:hidden"
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              className="ml-auto flex h-full w-[min(22rem,88vw)] flex-col overflow-y-auto border-l border-slate-200 bg-white p-5 shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-6 flex items-center justify-between gap-4">
                <span className="font-heading text-xl font-bold text-slate-950">
                  Menu
                </span>
                <button
                  type="button"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-800 transition hover:bg-slate-50"
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                >
                  <X size={21} />
                </button>
              </div>

            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => {
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </Link>
              ))}

              {activeNavLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className="text-foreground"
                >
                  {link.label}
                </Link>
              ))}

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  Company
                </p>
                <div className="grid gap-2">
                  {companyLinks.map((link) => (
                    <Link
                      key={link.to}
                      to={link.to}
                      onClick={() => setMobileOpen(false)}
                      className="text-foreground"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  Career Counselling
                </p>
                <div className="grid gap-2">
                  <Link
                    to="/career-counselling"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-foreground"
                  >
                    Explore Career Counselling
                  </Link>
                  {careerResourceLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {!isCareerPage && <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  Explore
                </p>
                <div className="grid gap-2">
                  {moreLinks.map((link) =>
                    "href" in link ? (
                      <a
                        key={link.href}
                        href={sectionHref(link.href)}
                        onClick={() => {
                          replaySection(link.href);
                          setMobileOpen(false);
                        }}
                        className="text-foreground"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        key={link.to}
                        to={link.to}
                        onClick={() => setMobileOpen(false)}
                        className="text-foreground"
                      >
                        {link.label}
                      </Link>
                    )
                  )}
                </div>
              </div>}

              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-widest text-yellow-600">
                  Higher Studies
                </p>
                <div className="grid gap-2">
                  <Link
                    to="/higher-studies"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-foreground"
                  >
                    Explore Higher Studies
                  </Link>
                  <Link
                    to="/mbbs"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-foreground"
                  >
                    MBBS 
                  </Link>
                  <Link
                    to="/countries"
                    onClick={() => setMobileOpen(false)}
                    className="font-semibold text-foreground"
                  >
                    All countries
                  </Link>
                  {countryDestinations.map((country) => (
                    <Link
                      key={country.id}
                      to={country.route}
                      onClick={() => setMobileOpen(false)}
                      className="text-foreground"
                    >
                      {country.name}
                    </Link>
                  ))}
                </div>
              </div>

              {isCareerPage ? (
                <Link
                  to="/career-counselling#counselling-form"
                  onClick={() => {
                    openCounsellingForm();
                    setMobileOpen(false);
                  }}
                  className="gold-gradient-bg text-primary-foreground px-5 py-2.5 rounded-md text-center"
                >
                  Book Free Counselling
                </Link>
              ) : (
                <a
                  href="https://dreamglobal.edumilestones.com/"
                  className="gold-gradient-bg text-primary-foreground px-5 py-2.5 rounded-md text-center"
                >
                  Start Your Journey
                </a>
              )}
            </div>
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
