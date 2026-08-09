import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { WHATSAPP_URL } from "../lib/careerCounsellingData";

const contactCards = [
  {
    label: "Email",
    value: "dreamglobalin@gmail.com",
    href: "mailto:dreamglobalin@gmail.com",
    icon: Mail,
  },
  {
    label: "Phone",
    value: "+91 88486 74757",
    href: "tel:+918848674757",
    icon: Phone,
  },
  {
    label: "WhatsApp",
    value: "Chat with DreamGlobal",
    href: WHATSAPP_URL,
    icon: MessageCircle,
  },
];

const Contact = () => {
  return (
    <div className="career-theme min-h-screen bg-white">
      <Navbar />

      <main className="career-hero-surface pt-36 md:pt-40">
        <section className="px-4 py-16 md:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="career-eyebrow">Contact DreamGlobal</p>
              <h1 className="career-heading mt-5 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                Speak with our counselling team.
              </h1>
              <p className="career-copy mt-5 text-base leading-8 sm:text-lg">
                Reach out for career counselling, higher studies guidance,
                study-abroad support, or admission questions.
              </p>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {contactCards.map((card) => {
                const Icon = card.icon;

                return (
                  <a
                    key={card.label}
                    href={card.href}
                    target={card.href.startsWith("http") ? "_blank" : undefined}
                    rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="career-card rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)]"
                  >
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[color:var(--career-primary)] text-white">
                      <Icon size={21} />
                    </span>
                    <p className="career-eyebrow mt-5">{card.label}</p>
                    <p className="mt-2 break-words text-lg font-bold text-[color:var(--career-primary-ink)]">
                      {card.value}
                    </p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="px-4 pb-20">
          <div className="container mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
            <div className="career-card rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--career-primary-soft)] text-[color:var(--career-primary)]">
                  <MapPin size={20} />
                </span>
                <div>
                  <h2 className="career-heading font-heading text-2xl font-bold">
                    Office
                  </h2>
                  <p className="career-copy mt-2 leading-7">
                    DreamGlobal supports students and families across India
                    through phone, WhatsApp, and online counselling.
                  </p>
                </div>
              </div>
            </div>

            <div className="career-card rounded-2xl p-7">
              <div className="flex items-start gap-4">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[color:var(--career-primary-soft)] text-[color:var(--career-primary)]">
                  <Clock size={20} />
                </span>
                <div>
                  <h2 className="career-heading font-heading text-2xl font-bold">
                    Counselling Hours
                  </h2>
                  <p className="career-copy mt-2 leading-7">
                    Send a message anytime. The team will respond and confirm
                    the next available counselling slot.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
