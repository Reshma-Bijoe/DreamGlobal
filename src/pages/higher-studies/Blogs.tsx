import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/faqs";

const Blogs = () => (
  <div className="career-theme min-h-screen">
    <Navbar />

    <main className="career-hero-surface relative overflow-hidden px-4 pb-16 pt-36 md:pt-32">
      <section className="container mx-auto max-w-[96rem]">
        <div className="flex flex-col gap-5 border-b border-[color:var(--career-border)] pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="career-eyebrow">
              DreamGlobal Blogs
            </p>
            <h1 className="career-heading mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
              Practical guidance for career and study abroad decisions.
            </h1>
          </div>

          <Link
            to="/faqs"
            className="career-gold-card inline-flex w-fit items-center justify-center gap-2 rounded-md px-4 py-2.5 text-sm font-semibold text-[color:var(--career-primary-ink)] transition hover:-translate-y-0.5"
          >
            View FAQs
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {blogPosts.map((post) => (
            <Link
              key={post.title}
              to={`/blogs/${post.slug}`}
              className="career-card flex min-h-[260px] flex-col rounded-lg p-5 transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)]"
            >
              <div className="career-eyebrow flex items-center justify-between gap-3">
                <span>{post.category}</span>
                <BookOpen size={16} />
              </div>
              <h2 className="career-heading mt-5 font-heading text-2xl font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="career-copy mt-4 flex-1 text-sm leading-7">
                {post.excerpt}
              </p>
              <p className="career-copy mt-5 inline-flex items-center gap-2 text-sm font-semibold">
                <Clock3 size={15} className="text-primary" />
                {post.readTime}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Read more
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Blogs;
