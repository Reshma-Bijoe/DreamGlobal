import { Quote, Star } from "lucide-react";

type TestimonialItem = {
  name: string;
  detail: string;
  rating: string;
  quote: string;
  category?: string;
};

type TestimonialCarouselProps = {
  items: TestimonialItem[];
  ariaLabel: string;
};

const TestimonialCarousel = ({ items, ariaLabel }: TestimonialCarouselProps) => (
  <div
    className="career-review-viewport overflow-hidden py-2"
    aria-label={ariaLabel}
  >
    <div className="career-review-track flex w-max gap-5">
      {[...items, ...items].map((testimonial, index) => (
        <article
          key={`${testimonial.name}-${testimonial.detail}-${index}`}
          className="career-card w-[18rem] shrink-0 rounded-2xl p-6 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)] sm:w-[21rem] lg:w-[23rem]"
        >
          <div className="flex min-h-64 flex-col">
            <div className="flex items-center justify-between gap-3">
              <span className="career-gold-pill inline-flex items-center rounded-full px-3 py-1 text-[0.68rem] font-bold uppercase tracking-[0.12em]">
                {testimonial.category ?? "Student Story"}
              </span>
              <Quote size={22} className="text-[color:var(--career-primary)]" />
            </div>
            <p className="career-copy mt-5 text-sm leading-7">
              {testimonial.quote}
            </p>
            <div className="mt-auto border-t border-[color:var(--career-border)] pt-4">
              <p className="font-bold text-[color:var(--career-primary-ink)]">
                {testimonial.name}
              </p>
              <p className="career-copy mt-1 text-xs font-semibold uppercase tracking-[0.14em]">
                {testimonial.detail}
              </p>
              <div className="mt-3 flex items-center gap-2 text-sm font-bold text-[color:var(--career-primary-ink)]">
                <span
                  className="flex text-amber-400"
                  aria-label={`${testimonial.rating} out of 5 stars`}
                >
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} size={15} className="fill-current" />
                  ))}
                </span>
                <span>{testimonial.rating}/5</span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  </div>
);

export default TestimonialCarousel;
