import { ArrowLeft, ArrowRight, CheckCircle2, Clock3, Lightbulb } from "lucide-react";
import { Link, useParams } from "react-router-dom";

import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { getBlogPost } from "@/data/faqs";
import { blogVisuals } from "@/data/blogVisuals";
import BlogDiagram from "@/components/BlogDiagram";

const BlogPost = () => {
  const { slug } = useParams();
  const post = getBlogPost(slug);
  const visual = post ? blogVisuals[post.slug] : undefined;

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
    <div className="career-theme min-h-screen bg-[#fffdf8]">
      <Navbar />

      <main className="px-4 pb-20 pt-36 md:pt-32">
        <article className="container mx-auto max-w-6xl">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--career-primary-deep)]"
          >
            <ArrowLeft size={16} />
            Back to blogs
          </Link>

          <header className="mt-7 grid items-center gap-8 border-b border-[color:var(--career-border)] pb-10 lg:grid-cols-[1fr_1fr] lg:gap-12">
          <div>
          <p className="career-eyebrow">
            {post.category}
          </p>
          <h1 className="career-heading mt-4 font-heading text-3xl font-bold leading-[1.12] sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>
          <p className="career-copy mt-5 text-base leading-7">{post.excerpt}</p>
          <p className="career-copy mt-5 inline-flex items-center gap-2 text-sm font-semibold">
            <Clock3 size={16} className="text-primary" />
            {post.readTime}
          </p>
          </div>
          {visual && (
            <div className="relative">
              <div aria-hidden="true" className="absolute -bottom-3 -right-3 h-3/4 w-3/4 rounded-2xl bg-[#eed79a]" />
              <img src={visual.image} alt={visual.alt} width={960} height={720} className="relative aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" fetchPriority="high" />
            </div>
          )}
          </header>

          <div className="mt-10 grid items-start gap-10 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-14">
            <nav aria-label="In this guide" className="rounded-2xl border border-[color:var(--career-border)] bg-white p-5 lg:sticky lg:top-32">
              <p className="career-eyebrow">In this guide</p>
              <ol className="mt-4 space-y-3">
                {post.sections.map((section, index) => (
                  <li key={section.heading}>
                    <a href={`#section-${index + 1}`} className="flex gap-3 text-sm leading-5 text-[#435568] transition hover:text-[#926611]">
                      <span className="shrink-0 text-[#a97510]">{String(index + 1).padStart(2, "0")}</span>
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          <div className="min-w-0 space-y-8">
            {visual && (
              <aside className="flex gap-4 rounded-r-xl border-l-4 border-[#d6a329] bg-[#fbf2da] p-5 sm:p-6">
                <Lightbulb aria-hidden="true" size={23} className="mt-1 shrink-0 text-[#946719]" />
                <div><p className="text-xs font-bold uppercase tracking-[0.14em] text-[#805916]">Keep this in mind</p><p className="mt-2 text-base font-medium leading-7 text-[#173c54]">{visual.takeaway}</p></div>
              </aside>
            )}
            <div className="space-y-4">
            {post.content.map((paragraph) => (
              <p
                key={paragraph}
                className="career-copy text-base leading-8"
              >
                {paragraph}
              </p>
            ))}
            </div>
            {post.sections.map((section, index) => (
              <section id={`section-${index + 1}`} key={section.heading} className="scroll-mt-36 space-y-4 pt-3">
                <div className="flex items-start gap-3">
                <span className="mt-1 shrink-0 text-sm font-bold text-[#a97510]">{String(index + 1).padStart(2, "0")}</span>
                <h2 className="career-heading font-heading text-2xl font-semibold leading-snug sm:text-3xl">
                  {section.heading}
                </h2>
                </div>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph} className="career-copy text-base leading-8">
                    {paragraph}
                  </p>
                ))}
                {index === 1 && visual && <BlogDiagram visual={visual} />}
                {section.checklist && (
                  <div className="rounded-2xl bg-[#173c54] p-5 sm:p-7">
                    <h3 className="font-heading text-2xl font-semibold text-white">Your next steps</h3>
                    <ul className="mt-4 space-y-3 text-base leading-7 text-white/90">
                      {section.checklist.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 size={19} aria-hidden="true" className="mt-1 shrink-0 text-[#ecc55b]" /><span>{item}</span></li>)}
                    </ul>
                  </div>
                )}
              </section>
            ))}
            {post.resources.length > 0 && (
              <aside className="border-t border-[color:var(--career-border)] pt-6" aria-label="Official resources">
                <h2 className="career-heading font-heading text-xl font-semibold">Official resources for further reading</h2>
                <ul className="mt-3 space-y-3">
                  {post.resources.map((resource) => (
                    <li key={resource.url}>
                      <a href={resource.url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-[color:var(--career-primary-deep)] underline underline-offset-4 hover:text-[color:var(--career-primary-ink)]">
                        {resource.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </aside>
            )}
            <Link to="/book-consultation" className="career-primary-button inline-flex items-center gap-2 rounded-lg px-5 py-3 text-sm font-bold">Talk through your next step<ArrowRight size={17} aria-hidden="true" /></Link>
          </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
