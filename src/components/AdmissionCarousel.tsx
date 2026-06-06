import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

import {
  countryDestinations,
  type CountryDestination,
} from "@/data/countryDestinations";
import { australiaUniversities } from "@/data/universities/Australia";
import type { University } from "@/types/universities";

export default function AdmissionCarousel() {
  const [selectedCountry, setSelectedCountry] =
    useState<CountryDestination | null>(null);
  const [selectedUniversity, setSelectedUniversity] =
    useState<University | null>(null);
  const [visible, setVisible] = useState(true);
  const [popupIndex, setPopupIndex] = useState(0);

  const swiperRef = useRef<any>(null);
  const countries: CountryDestination[] = countryDestinations || [];
  const universities: University[] = australiaUniversities || [];

  useEffect(() => {
    countries.forEach((country) => {
      const image = new Image();
      image.src = country.image;
    });
  }, [countries]);

  useEffect(() => {
    universities.forEach((university) => {
      const image = new Image();
      image.src = university.image;
    });
  }, [universities]);

  useEffect(() => {
    if (!visible || universities.length === 0) return;

    const interval = setInterval(() => {
      setPopupIndex((prev) => (prev + 1) % universities.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [visible, universities.length]);

  const currentUniversity = universities[popupIndex];

  return (
    <LayoutGroup>
      <div className="relative overflow-hidden bg-[#061226] px-3 pb-16 pt-16 md:px-6 md:pt-20">
        <div className="max-w-[1600px] mx-auto">
          <div className="mb-6 text-center">
            <p className="text-yellow-400 text-xs sm:text-sm font-semibold uppercase tracking-widest mb-2">
              Study Destinations
            </p>
            <h2 className="text-white text-2xl sm:text-3xl md:text-5xl font-bold">
              Choose Your Country
            </h2>
          </div>

          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center"
          >
            {"<"}
          </button>

          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white w-10 h-10 rounded-full items-center justify-center"
          >
            {">"}
          </button>

          <div className="relative pb-10">
            <Swiper
              modules={[Autoplay, Pagination]}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
              centeredSlides
              loop
              autoplay={{ delay: 2500, disableOnInteraction: false }}
              speed={700}
              watchSlidesProgress
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
              {countries.map((country) => (
                <SwiperSlide key={country.id}>
                  {({ isActive }) => (
                    <motion.div
                      layoutId={`card-${country.id}`}
                      animate={{
                        scale: isActive ? 1 : 0.85,
                        opacity: isActive ? 1 : 0.6,
                      }}
                      className="relative h-[250px] md:h-[380px] cursor-pointer"
                      onClick={() => setSelectedCountry(country)}
                    >
                      <motion.img
                        layoutId={`img-${country.id}`}
                        src={country.image}
                        className="w-full h-full object-cover rounded-xl bg-slate-800"
                        alt={country.name}
                        loading="eager"
                        decoding="async"
                        draggable={false}
                      />

                      {isActive && (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-xl" />

                          <div className="absolute bottom-4 left-4 text-white">
                            <h2 className="text-sm md:text-lg font-semibold">
                              {country.name}
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

            <div className="custom-pagination mt-6 flex justify-center gap-2"></div>
          </div>
        </div>

        <AnimatePresence>
          {selectedCountry && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setSelectedCountry(null)}
            >
              <motion.div
                layoutId={`card-${selectedCountry.id}`}
                className="relative bg-white w-[calc(100%-2rem)] max-w-lg rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedCountry(null)}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>

                <motion.img
                  layoutId={`img-${selectedCountry.id}`}
                  src={selectedCountry.image}
                  className="w-full h-48 object-cover"
                  alt={selectedCountry.name}
                  loading="eager"
                  decoding="async"
                  draggable={false}
                />

                <div className="p-5 space-y-4 text-sm">
                  <div>
                    <p className="text-yellow-600 text-xs font-bold uppercase tracking-widest">
                      Why study here
                    </p>
                    <h2 className="font-bold text-xl text-slate-950">
                      {selectedCountry.name}
                    </h2>
                  </div>

                  <p className="text-slate-700 leading-relaxed">
                    {selectedCountry.whyStudyHere}
                  </p>

                  <Link
                    to={selectedCountry.route}
                    className="inline-flex rounded-md bg-yellow-400 px-4 py-2 font-semibold text-slate-950 transition hover:bg-yellow-300"
                  >
                    Explore More Now
                  </Link>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {selectedUniversity && (
            <motion.div
              className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
              onClick={() => setSelectedUniversity(null)}
            >
            <motion.div
              layoutId={`ad-card-${selectedUniversity.id}`}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 25,
              }}
                className="relative bg-white w-[calc(100%-2rem)] max-w-lg rounded-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedUniversity(null)}
                  className="absolute top-3 right-3 bg-black/50 text-white p-2 rounded-full"
                >
                  <X size={16} />
                </button>

               <motion.img
                layoutId={`ad-img-${selectedUniversity.id}`}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 25,
                }}
                  src={selectedUniversity.image}
                  className="w-full h-48 object-cover"
                  alt={selectedUniversity.name}
                />

                <div className="p-4 space-y-2 text-sm">
                  <h2 className="font-bold text-lg">
                    {selectedUniversity.name}
                  </h2>

                  {selectedUniversity.sections.map((section, i) => {
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
                          {section.value.map((region, idx) => (
                            <p key={idx}>
                              <b>{region.states}:</b> {region.requirement}
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

        <AnimatePresence>
  {visible && currentUniversity && (
    <motion.div
      layoutId={`ad-card-${currentUniversity.id}`}
      initial={{ opacity: 0, y: 18, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 14, scale: 0.98 }}
      transition={{
        type: "spring",
        stiffness: 130,
        damping: 24,
        mass: 0.9,
      }}
      className="fixed bottom-6 right-6 z-40 w-72 cursor-pointer overflow-hidden rounded-xl shadow-2xl"
      onClick={() => setSelectedUniversity(currentUniversity)}
    >
              <div className="relative h-40 overflow-hidden bg-slate-900">
                <AnimatePresence mode="sync">
                  <motion.img
                    key={currentUniversity.id}
                    layoutId={`ad-img-${currentUniversity.id}`}
                    src={currentUniversity.image}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.02, filter: "blur(4px)" }}
                    transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  />
                </AnimatePresence>

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setVisible(false);
                  }}
                  className="absolute top-2 right-2 bg-black/60 text-white p-1 rounded-full"
                >
                  <X size={14} />
                </button>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentUniversity.name}
                    className="absolute bottom-3 left-3 pr-4 text-sm font-semibold text-white drop-shadow"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  >
                    {currentUniversity.name}
                  </motion.div>
                </AnimatePresence>
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
