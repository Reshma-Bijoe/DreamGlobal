import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/faqs";
import { blogVisuals } from "@/data/blogVisuals";

const Blogs = () => (
  <div className="career-theme min-h-screen">
    <Navbar />

    <main className="bg-[#fffdf8] px-4 pb-20 pt-36 md:pt-32">
      <section className="container mx-auto max-w-6xl">
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

        <Link to={`/blogs/${blogPosts[0].slug}`} className="group mt-10 grid overflow-hidden rounded-2xl border border-[color:var(--career-border)] bg-white shadow-sm md:grid-cols-2">
          <div className="overflow-hidden"><img src={blogVisuals[blogPosts[0].slug].image} alt={blogVisuals[blogPosts[0].slug].alt} width={960} height={640} className="h-full min-h-56 w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" fetchPriority="high" /></div>
          <div className="flex flex-col justify-center p-6 sm:p-9">
            <p className="career-eyebrow">Featured guide · {blogPosts[0].category}</p>
            <h2 className="career-heading mt-4 font-heading text-3xl font-semibold leading-tight sm:text-4xl">{blogPosts[0].title}</h2>
            <p className="career-copy mt-4 text-base leading-7">{blogPosts[0].excerpt}</p>
            <p className="career-copy mt-5 flex items-center gap-2 text-sm"><Clock3 size={16} aria-hidden="true" />{blogPosts[0].readTime}</p>
            <span className="mt-6 flex items-center gap-2 text-sm font-bold text-[#956b19]">Explore the guide<ArrowRight size={17} aria-hidden="true" /></span>
          </div>
        </Link>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.slice(1).map((post) => (
            <Link
              key={post.title}
              to={`/blogs/${post.slug}`}
              className="career-card group flex flex-col overflow-hidden rounded-2xl transition duration-300 hover:-translate-y-1 hover:shadow-[var(--career-shadow-float)]"
            >
              <div className="overflow-hidden"><img src={blogVisuals[post.slug].image} alt={blogVisuals[post.slug].alt} width={960} height={600} loading="lazy" className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-105 motion-reduce:transform-none" /></div>
              <div className="flex flex-1 flex-col p-5 sm:p-6">
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
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>

    <Footer />
  </div>
);

export default Blogs;
