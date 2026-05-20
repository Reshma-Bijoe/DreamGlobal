import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
      <div className="relative overflow-hidden bg-[#061226] px-3 pb-16 pt-16 md:px-6 md:pt-20">

        {/* HEADER */}
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6 text-center">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
              Australian Universities
            </p>
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold">
              Admission Intakes Open Now
            </h2>
          </div>

          {/* NAV BUTTONS */}
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

          {/* 🔥 SWIPER + CUSTOM PAGINATION WRAPPER */}
          <div className="relative pb-10"> {/* space for dots */}

            <Swiper
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              centeredSlides
              loop
              autoplay={{ delay: 2500 }}
              spaceBetween={16}
              slidesPerView={1.1}
              pagination={{
                el: ".custom-pagination",
                clickable: true,
              }}
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
                        alt={uni.name}
                      />

                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />

                          <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-sm md:text-lg font-semibold">
                              {uni.name}
                            </h2>
                            <div className="w-8 h-[2px] bg-yellow-400 mt-1" />
                          </div>
                        </>
                      )}
                    </motion.div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>

            {/* ✅ CUSTOM PAGINATION BELOW */}
            <div className="custom-pagination mt-6 flex justify-center gap-2"></div>
          </div>
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {selectedUni && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setSelectedUni(null)}
            >
              <motion.div
                layoutId={`card-${selectedUni.id}`}
                className="bg-white w-full max-w-lg rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedUni(null)}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full"
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

        {/* POPUP */}
        <AnimatePresence>
          {visible && currentUni && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-6 right-6 z-40 w-72 rounded-xl overflow-hidden shadow-xl cursor-pointer"
              onClick={() => setSelectedUni(currentUni)}
            >
              <div className="relative h-40">
                <motion.img
                  key={currentUni.id}
                  src={currentUni.image}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>

                <div className="absolute bottom-3 left-3 text-white text-sm font-semibold">
                  {currentUni.name}
                </div>
              </div>

              <div className="bg-white px-4 py-3 flex justify-between items-center">
                <span>Explore Now</span>
                <button className="bg-yellow-400 px-3 py-1 rounded font-semibold">
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
