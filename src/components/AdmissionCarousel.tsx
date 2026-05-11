import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

import { australiaUniversities as universities } from "@/data/universities/Australia";

/* ---------------- TYPES ---------------- */

type Section =
  | { title: string; type: "text"; value: string }
  | { title: string; type: "list"; value: string[] }
  | {
      title: string;
      type: "regions";
      value: { states: string; requirement: string }[];
    };

type University = {
  id: string;
  name: string;
  image: string;
  sections: Section[];
};

/* ---------------- COMPONENT ---------------- */

export default function AdmissionCarousel() {
  const [selectedUni, setSelectedUni] = useState<University | null>(null);
  const [visible, setVisible] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const swiperRef = useRef<any>(null);

  const safeUniversities: University[] = universities || [];

  /* 🔥 AUTO POPUP ROTATION */
  useEffect(() => {
    if (!visible || safeUniversities.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % safeUniversities.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [visible, safeUniversities.length]);

  const currentUni = safeUniversities[currentIndex];

  return (
    <LayoutGroup>
      <div className="relative overflow-hidden bg-[#061226] px-3 pb-10 pt-1 md:px-6 md:pt-2">

        {/* 🔥 HEADER */}
        <div className="max-w-[1600px] mx-auto relative">
          <div className="mb-5 text-center px-4">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-2">
              Australian Universities
            </p>
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold font-serif">
              Admissions Open Now
            </h2>
          </div>

          {/* 🔥 NAV BUTTONS */}
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center"
          >
            ‹
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center"
          >
            ›
          </button>

          {/* 🔥 CAROUSEL */}
          <Swiper
            modules={[Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            centeredSlides
            loop
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            spaceBetween={16}
            slidesPerView={1.1}
            breakpoints={{
              640: { slidesPerView: 1.4 },
              768: { slidesPerView: 1.8 },
              1024: { slidesPerView: 2.2 },
            }}
          >
            {safeUniversities.map((uni) => (
              <SwiperSlide key={uni.id}>
                {({ isActive }) => (
                  <motion.div
                    layoutId={`card-${uni.id}`}
                    animate={{
                      scale: isActive ? 1 : 0.85,
                      opacity: isActive ? 1 : 0.6,
                    }}
                    className="relative h-[250px] md:h-[380px] cursor-pointer"
                    onClick={() => setSelectedUni(uni)}
                  >
                    <motion.img
                      layoutId={`img-${uni.id}`}
                      src={uni.image}
                      className="w-full h-full object-cover rounded-xl"
                    />

                    {isActive && (
                      <div className="absolute bottom-4 left-4 text-white">
                        <h2 className="text-sm md:text-lg font-semibold">
                          {uni.name}
                        </h2>
                      </div>
                    )}
                  </motion.div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* 🔥 MODAL */}
        <AnimatePresence>
          {selectedUni && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setSelectedUni(null)}
            >
              <motion.div
                layoutId={`card-${selectedUni.id}`}
                className="relative bg-white w-full max-w-lg rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute top-3 right-3 z-10 bg-black/50 text-white p-2 rounded-full"
                  aria-label="Close details"
                >
                  <X size={16} />
                </button>

                <motion.img
                  layoutId={`img-${selectedUni.id}`}
                  src={selectedUni.image}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4 space-y-2 text-sm">
                  <h2 className="font-bold text-lg">{selectedUni.name}</h2>

                  {selectedUni.sections.map((section, i) => {
                    if (section.type === "text") {
                      return (
                        <p key={i}>
                          <b>{section.title}:</b> {section.value}
                        </p>
                      );
                    }

                    if (section.type === "list") {
                      return (
                        <ul key={i} className="list-disc pl-5">
                          {section.value.map((item, idx) => (
                            <li key={idx}>{item}</li>
                          ))}
                        </ul>
                      );
                    }

                    if (section.type === "regions") {
                      return (
                        <div key={i}>
                          {section.value.map((r, idx) => (
                            <p key={idx}>
                              <b>{r.states}:</b> {r.requirement}
                            </p>
                          ))}
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* 🔥 POPUP */}
        <AnimatePresence>
          {visible && currentUni && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-24 right-4 z-40 w-[calc(100vw-2rem)] max-w-sm rounded-xl overflow-hidden shadow-xl sm:right-6 sm:w-96"
            >
              <div className="relative h-48 sm:h-52 overflow-hidden bg-[#061226]">
                <AnimatePresence initial={false}>
                  <motion.img
                    key={currentUni.id}
                    src={currentUni.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.035 }}
                    animate={{ opacity: 1, scale: 1.08 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      opacity: { duration: 0.9, ease: "easeInOut" },
                      scale: { duration: 3.2, ease: [0.22, 1, 0.36, 1] },
                    }}
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                <button
                  onClick={() => setVisible(false)}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                  aria-label="Close admissions popup"
                >
                  <X size={14} />
                </button>

                <AnimatePresence initial={false} mode="popLayout">
                  <motion.div
                    key={`${currentUni.id}-title`}
                    className="absolute bottom-3 left-4 right-4 text-white text-sm font-semibold"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {currentUni.name}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="bg-white px-5 py-4 flex items-center justify-between text-sm">
                <span className="font-medium">Explore Now</span>
                <button
                  onClick={() => setSelectedUni(currentUni)}
                  className="bg-yellow-400 px-4 py-1.5 rounded font-semibold"
                >
                  Know More
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </LayoutGroup>
  );
}
