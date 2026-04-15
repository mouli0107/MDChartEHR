import { useState, useEffect } from "react";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { getPostBySlug, getRelatedPosts, blogPosts as staticBlogPosts } from "@/lib/blogData";
import { getBlogImage } from "@/lib/blogImages";
import { Footer } from "@/components/Footer";
import {
  Calendar,
  Clock,
  ArrowLeft,
  ArrowRight,
  User,
  Facebook,
  Twitter,
  Linkedin,
  BookOpen,
  ChevronRight,
  Loader2
} from "lucide-react";
import ReactMarkdown from "react-markdown";

interface BlogPostData {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  author: string;
  date?: string;
  publishedAt?: string;
  readTime: string;
  image?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
}

function getDate(post: BlogPostData) {
  return post.date || post.publishedAt || "";
}

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPostData[]>(staticBlogPosts as BlogPostData[]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) { setLoading(false); return; }
    // Try API first, fall back to static data
    fetch(`/api/blog/posts/${slug}`)
      .then(r => r.ok ? r.json() : null)
      .then(data => {
        if (data && data.id) {
          setPost(data);
        } else {
          const staticPost = getPostBySlug(slug);
          setPost(staticPost as BlogPostData | null);
        }
      })
      .catch(() => {
        const staticPost = getPostBySlug(slug);
        setPost(staticPost as BlogPostData | null);
      })
      .finally(() => setLoading(false));

    // Fetch all posts for "More Articles" — merge DB + static
    fetch("/api/blog/posts")
      .then(r => r.ok ? r.json() : null)
      .then((dbPosts: BlogPostData[] | null) => {
        if (dbPosts && Array.isArray(dbPosts) && dbPosts.length > 0) {
          const dbSlugs = new Set(dbPosts.map((p: BlogPostData) => p.slug));
          const staticOnly = (staticBlogPosts as BlogPostData[]).filter(p => !dbSlugs.has(p.slug));
          setAllPosts([...dbPosts, ...staticOnly]);
        }
      })
      .catch(() => {/* keep static fallback */});
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-sans flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white font-sans">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Article Not Found</h1>
          <p className="text-slate-600 mb-8">The article you're looking for doesn't exist.</p>
          <Link href="/blog">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const relatedPosts = allPosts
    .filter(p => p.category === post.category && String(p.id) !== String(post.id))
    .slice(0, 3);

  const morePosts = allPosts
    .filter(p => String(p.id) !== String(post.id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-primary/8 via-cyan-100/30 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-slate-100 to-transparent rounded-full blur-2xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-8">
            <Link href="/blog" className="hover:text-primary transition-colors font-medium">Blog</Link>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <span className="text-primary font-medium">{post.categoryLabel}</span>
          </div>

          <motion.div
            initial={{ opacity: 0.9, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl"
          >
            <div className="inline-block mb-6">
              <span className="text-sm font-semibold text-primary">{post.categoryLabel}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {post.metaTitle || post.title}
            </h1>

            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              {post.metaDescription || post.excerpt}
            </p>

            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500">
              <span className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <span className="font-medium">{post.author}</span>
              </span>
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                {getDate(post)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-400" />
                {post.readTime}
              </span>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      </section>

      {/* Featured Image */}
      {(getBlogImage(post.slug) || post.image) && (
        <section className="relative py-8">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="max-w-4xl mx-auto"
            >
              <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200">
                <img
                  src={getBlogImage(post.slug) || post.image!}
                  alt={post.title}
                  className="w-full h-64 md:h-96 object-cover"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* Article Content */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0.9, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-12"
              >
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 mt-0 leading-tight">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <div className="mt-12 mb-6 first:mt-0">
                        <h2 className="text-2xl font-bold text-slate-900 pb-3 border-b-2 border-primary/20 inline-block">
                          {children}
                        </h2>
                      </div>
                    ),
                    h3: ({ children }) => (
                      <h3 className="text-xl font-bold text-slate-800 mt-8 mb-4 flex items-center gap-2">
                        <span className="w-1 h-6 bg-primary rounded-full"></span>
                        {children}
                      </h3>
                    ),
                    h4: ({ children }) => (
                      <h4 className="text-lg font-semibold text-slate-800 mt-6 mb-3">
                        {children}
                      </h4>
                    ),
                    p: ({ children }) => (
                      <p className="text-slate-600 leading-relaxed mb-5 text-base md:text-lg">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-6 space-y-3 pl-0 list-none">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-6 space-y-3 pl-0 list-none">
                        {children}
                      </ol>
                    ),
                    li: ({ children }) => (
                      <li className="flex items-start gap-3 text-slate-600 leading-relaxed bg-slate-50/50 rounded-lg p-3 border-l-3 border-primary/30">
                        <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></span>
                        <span className="flex-1">{children}</span>
                      </li>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-bold text-slate-900">{children}</strong>
                    ),
                    em: ({ children }) => (
                      <em className="italic text-slate-700">{children}</em>
                    ),
                    blockquote: ({ children }) => (
                      <blockquote className="my-8 bg-gradient-to-r from-primary/5 to-cyan-50 border-l-4 border-primary rounded-r-xl p-6 italic text-slate-700">
                        {children}
                      </blockquote>
                    ),
                    a: ({ href, children }) => (
                      <a href={href} className="text-primary font-medium hover:underline underline-offset-2">
                        {children}
                      </a>
                    ),
                    hr: () => (
                      <hr className="my-10 border-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    ),
                  }}
                >
                  {post.content}
                </ReactMarkdown>
              </motion.div>

              {/* Share Section */}
              <div className="mt-12 pt-8 border-t border-slate-200">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium text-slate-600">Share this article:</span>
                    <div className="flex gap-2">
                      <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" data-testid="button-share-twitter">
                        <Twitter className="h-4 w-4" />
                      </a>
                      <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" data-testid="button-share-facebook">
                        <Facebook className="h-4 w-4" />
                      </a>
                      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-primary hover:text-white transition-colors" data-testid="button-share-linkedin">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                  <Link href="/blog">
                    <Button variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                    </Button>
                  </Link>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* CTA Card */}
                <div className="bg-gradient-to-br from-primary to-blue-700 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-3">Ready to Transform Your Practice?</h3>
                  <p className="text-blue-100 text-sm mb-6">
                    See how MD Charts can streamline your workflows and boost revenue.
                  </p>
                  <Link href="/book-demo">
                    <Button variant="secondary" className="w-full" data-testid="button-sidebar-demo">
                      Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <div className="bg-slate-50 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">Related Articles</h3>
                    <div className="space-y-4">
                      {relatedPosts.map((related) => (
                        <Link key={related.id} href={`/blog/${related.slug}`}>
                          <div className="group cursor-pointer">
                            <h4 className="text-sm font-semibold text-slate-800 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                              {related.title}
                            </h4>
                            <span className="text-xs text-slate-500">{getDate(related)}</span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {/* Categories */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-slate-900 mb-4">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: "derm", label: "Dermatology" },
                      { id: "ehr", label: "EHR" },
                      { id: "obgyn", label: "OB/GYN" },
                      { id: "pediatrics", label: "Pediatrics" },
                      { id: "practice-management", label: "Practice Management" },
                    ].map(cat => (
                      <Link key={cat.id} href="/blog">
                        <span className="inline-block px-3 py-1.5 bg-white rounded-full text-sm text-slate-600 hover:bg-primary hover:text-white transition-colors cursor-pointer">
                          {cat.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* More Articles */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-slate-900">More Articles</h2>
            <Link href="/blog">
              <Button variant="outline">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {morePosts.map((article) => {
              const articleImage = getBlogImage(article.slug) || article.image;
              return (
                <motion.article
                  key={article.id}
                  initial={{ opacity: 0.9, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-200 hover:shadow-xl transition-all"
                >
                  <div className="h-40 bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">
                    {articleImage ? (
                      <img
                        src={articleImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                          <BookOpen className="h-7 w-7 text-primary" />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-bold text-primary uppercase tracking-wide">{article.categoryLabel}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                    </h3>
                    <p className="text-sm text-slate-600 line-clamp-2 mb-4">{article.excerpt}</p>
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>{getDate(article)}</span>
                      <span>{article.readTime}</span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
