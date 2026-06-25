import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  FileCheck2,
  GraduationCap,
  MessageCircle,
  Sparkles,
  X,
} from "lucide-react";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import testimonial1 from "@/testimonial/testimonial1.jpeg";
import testimonial2 from "@/testimonial/testimonial2.jpeg";
import testimonial3 from "@/testimonial/testimonial3.jpeg";
import testimonial4 from "@/testimonial/testimonial4.jpeg";

const admissionLetters = [
  {
    title: "A Dream Turned Official",
    image: testimonial1,
    note: "A real milestone from a student's study abroad journey.",
  },
  {
    title: "The Seat Was Secured",
    image: testimonial2,
    note: "Proof that the right guidance can turn plans into paperwork.",
  },
  {
    title: "One Step Closer to Campus",
    image: testimonial3,
    note: "Another student, another seat secured, another dream moving.",
  },
  {
    title: "The Journey Began Here",
    image: testimonial4,
    note: "Every letter starts with one decision to begin.",
  },
];

const highlights = [
  "Profile shortlisting",
  "University applications",
  "Offer letter follow-up",
  "Visa guidance",
];

const SuccessLetters = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const swipeStartX = useRef<number | null>(null);
  const activeLetter = admissionLetters[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % admissionLetters.length);
    }, 3600);

    return () => window.clearInterval(timer);
  }, []);

  const moveCarousel = (direction: "next" | "previous") => {
    setActiveIndex((current) => {
      if (direction === "next") {
        return (current + 1) % admissionLetters.length;
      }

      return (
        (current - 1 + admissionLetters.length) % admissionLetters.length
      );
    });
  };

  const getOffset = (index: number) => {
    const total = admissionLetters.length;
    const rawOffset = (index - activeIndex + total) % total;
    return rawOffset > total / 2 ? rawOffset - total : rawOffset;
  };

  const handleSwipeStart = (clientX: number) => {
    swipeStartX.current = clientX;
  };

  const handleSwipeEnd = (clientX: number) => {
    if (swipeStartX.current === null) return;

    const distance = clientX - swipeStartX.current;
    swipeStartX.current = null;

    if (Math.abs(distance) < 45) return;

    moveCarousel(distance > 0 ? "previous" : "next");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="overflow-hidden pb-16 pt-44 sm:pt-40">
        <section className="relative bg-secondary px-4 py-14 text-white sm:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(214,161,51,0.28),transparent_34%),radial-gradient(circle_at_85%_10%,rgba(255,255,255,0.12),transparent_28%)]" />
          <div className="container relative mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-md border border-white/15 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.18em] text-gold">
                <Sparkles size={15} />
                Student Success Letters
              </div>
              <h1 className="mt-6 font-heading text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
                The next admission letter could be yours.
              </h1>
              <p className="mt-5 max-w-xl text-base leading-8 text-white/75 sm:text-lg">
                These are sample admission letters received by previous
                candidates. Let them be a little reminder: the dream becomes
                real the day your name appears on the offer.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <a
                  href="https://dreamglobal.edumilestones.com/"
                  className="gold-gradient-bg inline-flex items-center justify-center gap-2 rounded-md px-5 py-3 text-sm font-bold text-primary-foreground transition hover:opacity-90"
                >
                  Start Your Journey
                  <ArrowRight size={17} />
                </a>
                <a
                  href="https://wa.me/918848674757"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/15"
                >
                  <MessageCircle size={17} />
                  Talk to a Counsellor
                </a>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={() => setPreviewIndex(activeIndex)}
              className="group relative mx-auto w-full max-w-[410px] rounded-lg border border-white/15 bg-white/10 p-3 shadow-2xl shadow-black/30 backdrop-blur"
              whileHover={{ y: -6 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute -left-5 top-8 hidden rotate-[-7deg] rounded-md bg-gold px-4 py-2 text-xs font-black uppercase tracking-[0.16em] text-secondary shadow-xl sm:block">
                Your turn next
              </div>
              <div className="aspect-[3/4] overflow-hidden rounded-md bg-white">
                <img
                  src={activeLetter.image}
                  alt={activeLetter.title}
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="mt-3 flex items-center justify-between gap-3 text-left">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold">
                    Featured Letter
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Tap to view clearly
                  </p>
                </div>
                <FileCheck2 className="text-gold" size={28} />
              </div>
            </motion.button>
          </div>
        </section>

        <section className="px-4 py-14 sm:py-20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
                  Letters that opened doors
                </p>
                <h2 className="mt-3 font-heading text-3xl font-bold leading-tight text-foreground sm:text-4xl">
                  Swipe through real admission wins.
                </h2>
              </div>

              <div className="hidden">
                <button
                  type="button"
                  onClick={() => moveCarousel("previous")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition hover:border-primary/50 hover:text-primary"
                  aria-label="Previous admission letter"
                >
                  <ArrowLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => moveCarousel("next")}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-md border border-border bg-card text-foreground shadow-sm transition hover:border-primary/50 hover:text-primary"
                  aria-label="Next admission letter"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
            </div>

            <div className="relative mt-10">
              <button
                type="button"
                onClick={() => moveCarousel("previous")}
                className="absolute left-0 top-1/2 z-40 inline-flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-secondary/85 text-white shadow-lg transition hover:bg-secondary sm:h-12 sm:w-12"
                aria-label="Previous admission letter"
              >
                <ArrowLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => moveCarousel("next")}
                className="absolute right-0 top-1/2 z-40 inline-flex h-11 w-11 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-secondary/85 text-white shadow-lg transition hover:bg-secondary sm:h-12 sm:w-12"
                aria-label="Next admission letter"
              >
                <ArrowRight size={20} />
              </button>

              <div
                className="relative h-[610px] touch-pan-y overflow-hidden rounded-lg bg-slate-50 px-3 py-8 sm:h-[690px] lg:h-[720px]"
                onTouchStart={(event) =>
                  handleSwipeStart(event.touches[0].clientX)
                }
                onTouchEnd={(event) =>
                  handleSwipeEnd(event.changedTouches[0].clientX)
                }
                onMouseDown={(event) => handleSwipeStart(event.clientX)}
                onMouseUp={(event) => handleSwipeEnd(event.clientX)}
                onMouseLeave={() => {
                  swipeStartX.current = null;
                }}
              >
                <div className="absolute inset-x-0 bottom-6 z-20 flex justify-center gap-2">
                  {admissionLetters.map((letter, index) => (
                    <button
                      key={letter.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`h-2.5 rounded-full transition-all ${
                        index === activeIndex
                          ? "w-8 bg-primary"
                          : "w-2.5 bg-secondary/25 hover:bg-secondary/45"
                      }`}
                      aria-label={`Show ${letter.title}`}
                    />
                  ))}
                </div>

                <div className="relative mx-auto h-full max-w-5xl">
                  {admissionLetters.map((letter, index) => {
                    const offset = getOffset(index);
                    const isActive = offset === 0;
                    const isVisible = Math.abs(offset) <= 1;

                    return (
                      <motion.button
                        key={letter.title}
                        type="button"
                        onClick={() =>
                          isActive
                            ? setPreviewIndex(index)
                            : setActiveIndex(index)
                        }
                        className={`absolute left-1/2 top-8 w-[90%] max-w-[460px] rounded-lg border bg-card p-3 text-left shadow-xl transition-colors sm:w-[64%] sm:max-w-[420px] lg:w-[41%] ${
                          isActive
                            ? "border-primary/60"
                            : "border-border hover:border-primary/40"
                        }`}
                        initial={false}
                        animate={{
                          x: `calc(-50% + ${offset * 330}px)`,
                          y: isActive ? 0 : 34,
                          rotate: isActive ? 0 : offset * -7,
                          scale: isActive ? 1 : 0.82,
                          opacity: isVisible ? (isActive ? 1 : 0.56) : 0,
                          zIndex: isActive ? 30 : 10 - Math.abs(offset),
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 180,
                          damping: 24,
                        }}
                      >
                        <div className="aspect-[3/4] overflow-hidden rounded-md bg-muted">
                          <img
                            src={letter.image}
                            alt={letter.title}
                            className="h-full w-full object-contain"
                            loading={index === 0 ? "eager" : "lazy"}
                          />
                        </div>
                        <div className="mt-4 flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-heading text-xl font-bold text-foreground">
                              {letter.title}
                            </h3>
                            <p className="mt-2 text-sm leading-6 text-muted-foreground">
                              {isActive
                                ? "Tap the highlighted letter to view it clearly."
                                : letter.note}
                            </p>
                          </div>
                          <GraduationCap
                            className={`mt-1 shrink-0 ${
                              isActive
                                ? "text-primary"
                                : "text-muted-foreground"
                            }`}
                            size={24}
                          />
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 rounded-lg border border-border bg-secondary p-5 text-white shadow-sm sm:grid-cols-2 lg:grid-cols-4">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-3">
                  <CheckCircle2 className="shrink-0 text-gold" size={20} />
                  <span className="text-sm font-semibold">{highlight}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4">
          <div className="container mx-auto max-w-5xl rounded-lg border border-primary/25 bg-primary/10 px-5 py-8 text-center sm:px-10 sm:py-10">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              Your name. Your university. Your letter.
            </p>
            <h2 className="mt-3 font-heading text-3xl font-bold text-foreground sm:text-4xl">
              Let us help you make the next success story yours.
            </h2>
            <Link
              to="/callback/mbbs"
              className="mt-6 inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-5 py-3 text-sm font-bold text-white transition hover:bg-accent"
            >
              Request a Callback
              <ArrowRight size={17} />
            </Link>
          </div>
        </section>
      </main>

      <AnimatePresence>
        {previewIndex !== null && (
          <motion.div
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 px-4 py-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewIndex(null)}
          >
            <motion.div
              className="relative flex max-h-full w-full max-w-4xl items-center justify-center"
              initial={{ scale: 0.96, y: 14 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: 14 }}
            >
              <button
                type="button"
                onClick={() => setPreviewIndex(null)}
                className="absolute right-0 top-0 z-10 inline-flex h-10 w-10 -translate-y-12 items-center justify-center rounded-md bg-white text-secondary shadow-lg transition hover:bg-gold"
                aria-label="Close admission letter preview"
              >
                <X size={20} />
              </button>
              <img
                src={admissionLetters[previewIndex].image}
                alt={admissionLetters[previewIndex].title}
                className="max-h-[84vh] w-auto rounded-lg bg-white object-contain shadow-2xl"
                onClick={(event) => event.stopPropagation()}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default SuccessLetters;
