import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock, BookOpen } from "lucide-react";
import { Button } from "./ui/button";
import { blogPosts } from "@/lib/blogData";
import { getBlogImage } from "@/lib/blogImages";

const featuredPosts = blogPosts.slice(0, 3);

export function BlogSection() {
  return (
    <section id="blog" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-semibold text-primary">Latest Insights</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
              Healthcare Technology Resources
            </h2>
            <p className="text-lg text-slate-600">
              Stay ahead of industry trends with expert advice on EHR systems, practice management, billing, and specialty-specific solutions.
            </p>
          </div>
          <Link href="/blog">
            <Button variant="outline" className="shrink-0" data-testid="button-view-all-articles">
              View All Articles <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredPosts.map((post, i) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 flex flex-col h-full group"
              data-testid={`card-blog-home-${post.id}`}
            >
              <div className="h-48 relative overflow-hidden">
                {(getBlogImage(post.slug) || post.image) ? (
                  <img
                    src={getBlogImage(post.slug) || post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-blue-100">
                    <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center">
                      <BookOpen className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                )}
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary uppercase tracking-wide shadow-sm">
                  {post.categoryLabel}
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {post.date}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                
                <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-1 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <Link href={`/blog/${post.slug}`}>
                  <span className="inline-flex items-center text-sm font-semibold text-primary hover:text-blue-700 transition-colors">
                    Read Article <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
