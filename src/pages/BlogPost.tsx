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
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="container mx-auto px-4 pb-20 pt-52 text-center sm:pt-48">
          <h1 className="font-heading text-3xl font-bold text-foreground">
            Blog not found
          </h1>
          <Link
            to="/blogs"
            className="mt-6 inline-flex rounded-md bg-secondary px-5 py-3 text-sm font-semibold text-white"
          >
            Back to blogs
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="px-4 pb-16 pt-52 sm:pt-48">
        <article className="container mx-auto max-w-3xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <p className="mt-8 text-sm font-bold uppercase tracking-[0.18em] text-primary">
            {post.category}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-bold leading-tight text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <Clock3 size={16} className="text-primary" />
            {post.readTime}
          </p>

          <div className="mt-10 space-y-6 rounded-lg border border-border bg-card p-5 shadow-sm sm:p-7">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-8 text-muted-foreground"
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
