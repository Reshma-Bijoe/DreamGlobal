import { ArrowLeft, Clock3 } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogPost } from "@/data/faqs";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);

  if (!post) {
    return (
      <div className="career-theme min-h-screen">
        <Navbar />
        <main className="career-hero-surface relative min-h-[50vh] overflow-hidden px-4 pb-20 pt-36 text-center md:pt-32">
          <h1 className="career-heading font-heading text-3xl font-bold">
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className="mt-6 inline-flex rounded-md bg-[color:var(--career-primary-ink)] px-5 py-3 text-sm font-semibold text-white"
          >
            Back to blogs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="career-theme min-h-screen">
      <Navbar />

      <main className="career-hero-surface relative overflow-hidden px-4 pb-16 pt-36 md:pt-32">
        <article className="container mx-auto max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--career-primary-deep)]"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <p className="career-eyebrow mt-8">
            {post.category}
          </p>
          <h1 className="career-heading mt-4 font-heading text-4xl font-bold leading-tight sm:text-5xl">
            {post.title}
          </h1>
          <p className="career-copy mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            <Clock3 size={16} className="text-primary" />
            {post.readTime}
          </p>

          <div className="career-card mt-10 space-y-6 rounded-lg p-5 sm:p-7">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="career-copy text-base leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
