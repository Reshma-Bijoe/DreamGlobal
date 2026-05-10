import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
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
  const swiperRef = useRef<any>(null);

  const safeUniversities: University[] = universities || [];

  return (
    <div className="relative overflow-hidden bg-[#061226] px-3 pb-10 pt-20 md:px-6">
      
      {/* 🔥 MAX WIDTH CONTAINER */}
      <div className="max-w-[1600px] mx-auto relative">
        <div className="mb-8 text-center px-4">
          <p className="text-yellow-400 text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] mb-2">
            Australian Universities
          </p>
          <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold font-serif">
            Admissions Open Now
          </h2>
          <p className="text-white/70 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Explore top university options and click any image to view admission details.
          </p>
        </div>

        {/* 🔥 NAV BUTTONS */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden md:flex absolute left-2 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full items-center justify-center"
        >
          ‹
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden md:flex absolute right-2 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full items-center justify-center"
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
            320: { slidesPerView: 1.1 },
            480: { slidesPerView: 1.2 },
            640: { slidesPerView: 1.4 },
            768: { slidesPerView: 1.8 },
            1024: { slidesPerView: 2.2 },
            1280: { slidesPerView: 2.5 },
            1536: { slidesPerView: 3 },
          }}
        >
          {safeUniversities.map((uni) => (
            <SwiperSlide key={uni.id}>
              {({ isActive }) => (
                <motion.div
                  animate={{
                    scale: isActive ? 1 : 0.88,
                    opacity: isActive ? 1 : 0.6,
                  }}
                  transition={{ duration: 0.4 }}
                  className="relative h-[45vw] min-h-[220px] max-h-[420px] md:h-[380px] cursor-pointer"
                  onClick={() => setSelectedUni(uni)}
                >
                  <img
                    src={uni.image}
                    className="w-full h-full object-cover rounded-xl"
                    alt={uni.name}
                  />

                  {isActive && (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl"
                      />

                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="absolute bottom-4 left-4 text-white"
                      >
                        <h2 className="text-[12px] sm:text-sm md:text-base lg:text-lg font-semibold">
                          {uni.name}
                        </h2>
                        <div className="w-8 h-[2px] bg-yellow-400 mt-1 rounded"></div>
                      </motion.div>
                    </>
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
            className="fixed inset-0 bg-black/70 flex items-end md:items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedUni(null)}
          >
            <motion.div
              initial={{ y: "100%", scale: 0.95 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: "100%" }}
              transition={{ duration: 0.3 }}
              className="bg-white w-full md:max-w-xl lg:max-w-2xl rounded-t-2xl md:rounded-2xl overflow-hidden relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* ❌ CLOSE BUTTON */}
              <button
                onClick={() => setSelectedUni(null)}
                className="absolute top-3 right-3 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-10"
              >
                <X size={18} />
              </button>

              {/* 🖼 IMAGE */}
              <img
                src={selectedUni.image}
                className="w-full h-44 sm:h-52 object-cover"
                alt={selectedUni.name}
              />

              {/* 📄 CONTENT */}
              <div className="p-4 sm:p-5 space-y-4 text-xs sm:text-sm text-gray-700 max-h-[70vh] overflow-y-auto">
                <h2 className="text-base sm:text-lg font-bold">
                  {selectedUni.name}
                </h2>

                {/* 🔥 DYNAMIC SECTIONS */}
                {selectedUni.sections?.length ? (
                  selectedUni.sections.map((section, i) => {
                    if (!section || !section.value) return null;

                    if (section.type === "text") {
                      return (
                        <p key={i}>
                          <b className="text-gray-900">{section.title}:</b>{" "}
                          {section.value}
                        </p>
                      );
                    }

                    if (section.type === "list") {
                      if (!section.value.length) return null;

                      return (
                        <div key={i}>
                          <p className="font-semibold text-gray-900 mb-1">
                            {section.title}
                          </p>
                          <ul className="space-y-1">
                            {section.value.map((item, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <span className="text-yellow-500">•</span>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    }

                    if (section.type === "regions") {
                      if (!section.value.length) return null;

                      return (
                        <div key={i}>
                          <p className="font-semibold text-gray-900 mb-1">
                            {section.title}
                          </p>
                          <div className="space-y-1">
                            {section.value.map((r, idx) => (
                              <p key={idx}>
                                <b>{r.states}:</b> {r.requirement}
                              </p>
                            ))}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })
                ) : (
                  <p className="text-gray-500">No details available</p>
                )}

                {/*
                <button className="mt-4 w-full bg-yellow-400 py-2 rounded-lg font-semibold text-sm sm:text-base hover:bg-yellow-500 transition">
                  Apply Now
                </button>
                */}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
