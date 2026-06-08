import { ArrowRight, BookOpen, Clock3 } from "lucide-react";
import { Link } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { blogPosts } from "@/data/faqs";

const Blogs = () => (
  <div className="min-h-screen bg-background">
    <Navbar />

    <main className="px-4 pb-16 pt-52 sm:pt-48">
      <section className="container mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-border pb-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">
              DreamGlobal Blogs
            </p>
            <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
              Practical study abroad guides for students and families.
            </h1>
          </div>

          <Link
            to="/faqs"
            className="inline-flex w-fit items-center justify-center gap-2 rounded-md border border-border bg-card px-4 py-2.5 text-sm font-semibold text-foreground transition hover:border-primary/50 hover:text-primary"
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
              className="flex min-h-[260px] flex-col rounded-lg border border-border bg-card p-5 shadow-sm"
            >
              <div className="flex items-center justify-between gap-3 text-xs font-bold uppercase tracking-[0.14em] text-primary">
                <span>{post.category}</span>
                <BookOpen size={16} />
              </div>
              <h2 className="mt-5 font-heading text-2xl font-semibold leading-snug text-foreground">
                {post.title}
              </h2>
              <p className="mt-4 flex-1 text-sm leading-7 text-muted-foreground">
                {post.excerpt}
              </p>
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
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
