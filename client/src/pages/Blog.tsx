import { useState, useEffect } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { blogPosts as staticBlogPosts, blogCategories, getPostsByCategory as staticGetPostsByCategory } from "@/lib/blogData";
import { getBlogImage } from "@/lib/blogImages";
import { Footer } from "@/components/Footer";
import {
  Calendar,
  Clock,
  ArrowRight,
  Search,
  BookOpen,
  Sparkles,
  User
} from "lucide-react";

interface BlogPost {
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
}

function getDate(post: BlogPost) {
  return post.date || post.publishedAt || "";
}

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [posts, setPosts] = useState<BlogPost[]>(staticBlogPosts as BlogPost[]);

  useEffect(() => {
    fetch("/api/blog/posts")
      .then(r => r.ok ? r.json() : null)
      .then((dbPosts: BlogPost[] | null) => {
        if (dbPosts && Array.isArray(dbPosts) && dbPosts.length > 0) {
          // Merge DB posts with static posts — DB posts override static by slug
          const dbSlugs = new Set(dbPosts.map(p => p.slug));
          const staticOnly = (staticBlogPosts as BlogPost[]).filter(p => !dbSlugs.has(p.slug));
          setPosts([...dbPosts, ...staticOnly]);
        }
      })
      .catch(() => {/* keep static fallback */});
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === "all" || post.category === selectedCategory;
    const matchesSearch = !searchQuery ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      <Navbar />

      {/* Elegant Hero Section */}
      <section className="relative pt-28 pb-12 overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f9ff_1px,transparent_1px),linear-gradient(to_bottom,#f0f9ff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>

        {/* Soft gradient orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-100/40 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0.9, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Elegant badge */}
            <div className="inline-flex items-center gap-2 bg-white border border-primary/20 rounded-full px-4 py-1.5 mb-5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-slate-600">Insights & Resources</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4 leading-tight tracking-tight">
              Healthcare Technology <span className="text-primary">Insights</span>
            </h1>

            <p className="text-base md:text-lg text-slate-500 mb-8 max-w-2xl mx-auto leading-relaxed">
              Expert advice on EHR systems, practice management, and specialty-specific healthcare solutions.
            </p>

            {/* Elegant Search Bar */}
            <div className="max-w-xl mx-auto">
              <div className="relative bg-white rounded-xl shadow-md shadow-slate-200/50 border border-slate-100 overflow-hidden">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles by topic or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-5 py-3.5 text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl text-sm"
                  data-testid="input-blog-search"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Elegant Category Tabs */}
      <section className="sticky top-16 z-30 bg-white/80 backdrop-blur-lg border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 py-3 overflow-x-auto scrollbar-hide">
            {blogCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.id
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
                }`}
                data-testid={`button-category-${category.id}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post - Only show when viewing all */}
      {selectedCategory === "all" && !searchQuery && featuredPost && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <motion.article
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl shadow-slate-200/50 border border-slate-100"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="h-72 lg:h-[420px] relative overflow-hidden">
                  {(getBlogImage(featuredPost.slug) || featuredPost.image) ? (
                    <img
                      src={getBlogImage(featuredPost.slug) || featuredPost.image!}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/5 to-cyan-50 flex items-center justify-center">
                      <BookOpen className="h-16 w-16 text-primary/30" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <div className="absolute top-6 left-6 bg-white/95 backdrop-blur px-4 py-2 rounded-full shadow-sm">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{featuredPost.categoryLabel}</span>
                  </div>
                  <div className="absolute bottom-6 left-6 bg-primary text-white px-4 py-2 rounded-full text-xs font-semibold">
                    Featured Article
                  </div>
                </div>

                <div className="p-10 lg:p-14 flex flex-col justify-center bg-gradient-to-br from-white to-slate-50/50">
                  <div className="flex items-center gap-5 text-sm text-slate-400 mb-6">
                    <span className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" /> {getDate(featuredPost)}
                    </span>
                    <span className="flex items-center gap-2">
                      <Clock className="h-4 w-4" /> {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 mb-5 leading-snug">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-500 mb-8 leading-relaxed text-base">
                    {featuredPost.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-sm font-medium text-slate-600">{featuredPost.author}</span>
                    </div>
                    <Link href={`/blog/${featuredPost.slug}`}>
                      <Button className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-6" data-testid="button-read-featured">
                        Read Article <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          </div>
        </section>
      )}

      {/* Blog Posts Grid */}
      <section className="py-10 pb-16">
        <div className="container mx-auto px-4">
          {selectedCategory === "all" && !searchQuery && (
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-bold text-slate-900">All Articles</h2>
              <span className="text-sm text-slate-400">{filteredPosts.length} articles</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchQuery}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredPosts.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0.9, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-300"
                  data-testid={`card-blog-${post.id}`}
                >
                  {/* Card Image */}
                  <div className="h-52 relative overflow-hidden">
                    {(getBlogImage(post.slug) || post.image) ? (
                      <img
                        src={getBlogImage(post.slug) || post.image!}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/5 to-cyan-50">
                        <BookOpen className="h-12 w-12 text-primary/20" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-full shadow-sm">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{post.categoryLabel}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" /> {getDate(post)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" /> {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-slate-900 mb-3 line-clamp-2 group-hover:text-primary transition-colors leading-snug">
                      <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>

                    <p className="text-slate-500 text-sm leading-relaxed mb-5 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-5 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <span className="text-xs text-slate-500">{post.author}</span>
                      </div>
                      <Link href={`/blog/${post.slug}`}>
                        <span className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                          Read <ArrowRight className="ml-1 h-3.5 w-3.5" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredPosts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-slate-300" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
              <p className="text-slate-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Elegant CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              Discover how MD Charts EHR can streamline your workflows and boost revenue with a personalized demo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo">
                <Button size="lg" className="h-14 px-8 font-semibold bg-primary hover:bg-primary/90 shadow-lg shadow-primary/25" data-testid="button-blog-demo">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="h-14 px-8 border-slate-600 text-slate-300 hover:bg-slate-800 hover:text-white" data-testid="button-blog-contact">
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
