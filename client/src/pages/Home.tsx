import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { RCMSection } from "@/components/RCMSection";
import { Specialties } from "@/components/Specialties";
import { ComplianceSection } from "@/components/ComplianceSection";
import { BlogSection } from "@/components/BlogSection";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import {
  FileText,
  DollarSign,
  Users,
  ShieldCheck,
  Pill,
  FlaskConical,
  Video,
  UserCircle,
  BarChart3,
  ArrowRight,
  Sparkles,
  Lock,
  HelpCircle
} from "lucide-react";

export default function Home() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "demo" | "contact" | "trial" | "rcm_audit";
    title: string;
  }>({ isOpen: false, type: "demo", title: "" });
  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      <Hero />

      {/* Solutions Showcase */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Our Solutions</h2>
            <h3 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900">
              Everything Your Practice Needs
            </h3>
            <p className="text-slate-500 mt-3 max-w-2xl mx-auto text-lg">
              A fully integrated suite of tools designed for modern medical practices.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: FileText, title: "Electronic Health Records", desc: "Configurable, template-based EHR with smart charting, clinical decision support, and specialty-specific workflows.", href: "/ehr", color: "bg-blue-50 text-blue-600 border-blue-100" },
              { icon: DollarSign, title: "Revenue Cycle Management", desc: "End-to-end billing, claims management, denial tracking, and automated payment posting for maximum collections.", href: "/rcm", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
              { icon: Users, title: "Practice Management", desc: "Scheduling, patient registration, insurance verification, and front-office workflow automation.", href: "/practice-management", color: "bg-purple-50 text-purple-600 border-purple-100" },
              { icon: UserCircle, title: "Patient Engagement", desc: "Patient portal, online scheduling, automated reminders, and secure messaging to keep patients connected.", href: "/patient-engagement", color: "bg-amber-50 text-amber-600 border-amber-100" },
              { icon: Pill, title: "e-Prescribing", desc: "EPCS-certified electronic prescribing with formulary checks, drug interactions, and pharmacy routing.", href: "/features/e-prescribing", color: "bg-rose-50 text-rose-600 border-rose-100" },
              { icon: FlaskConical, title: "Lab Integration", desc: "Bi-directional lab interfaces for seamless order entry and results delivery from major reference labs.", href: "/features/lab-integration", color: "bg-cyan-50 text-cyan-600 border-cyan-100" },
              { icon: Video, title: "Telehealth", desc: "HIPAA-compliant HD video visits with integrated scheduling, documentation, and billing.", href: "/features/telehealth", color: "bg-indigo-50 text-indigo-600 border-indigo-100" },
              { icon: BarChart3, title: "Analytics & Reporting", desc: "Real-time dashboards, financial analytics, and custom report builder.", href: "/features/analytics", color: "bg-teal-50 text-teal-600 border-teal-100" },
              { icon: Sparkles, title: "AI-Powered Insights", desc: "Intelligent clinical assistance with smart documentation suggestions, coding recommendations, and predictive analytics.", href: "/ehr", color: "bg-violet-50 text-violet-600 border-violet-100" },
              { icon: ShieldCheck, title: "Compliance & Security", desc: "ONC 2015 Edition certified, HIPAA compliant, with audit trails, role-based access, and data encryption.", href: "/compliance", color: "bg-slate-50 text-slate-600 border-slate-200" },
              { icon: Lock, title: "HIPAA & Data Security", desc: "Enterprise-grade encryption, secure cloud hosting, automatic backups, and comprehensive access controls to protect patient data.", href: "/compliance", color: "bg-orange-50 text-orange-600 border-orange-100" },
              { icon: HelpCircle, title: "Dedicated Support", desc: "Personal account manager, 24/7 technical support, free training, and guided onboarding for a seamless transition.", href: "/support", color: "bg-pink-50 text-pink-600 border-pink-100" },
            ].map((solution, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                <Link href={solution.href}>
                  <div className={`group p-6 rounded-xl border ${solution.color.split(' ')[2]} bg-white hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer h-full`} data-testid={`card-solution-${i}`}>
                    <div className={`h-12 w-12 rounded-lg ${solution.color.split(' ')[0]} flex items-center justify-center mb-4`}>
                      <solution.icon className={`h-6 w-6 ${solution.color.split(' ')[1]}`} />
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">{solution.title}</h4>
                    <p className="text-sm text-slate-500 leading-relaxed mb-3">{solution.desc}</p>
                    <span className="inline-flex items-center text-sm font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn more <ArrowRight className="h-4 w-4 ml-1" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Logos */}
      <section className="py-8 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">Trusted Integrations & Partners</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 opacity-70">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-slate-700">ACOG</span>
              <span className="text-[10px] text-slate-500 leading-tight">The American College of<br/>Obstetricians and Gynecologists</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                </div>
              </div>
              <span className="text-xl font-medium text-slate-700">twilio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[16px] border-b-red-500"></div>
              <span className="text-lg font-bold text-slate-700">TRIZETTO</span>
              <span className="text-[10px] text-slate-500 ml-1">Provider Solutions<sup>®</sup></span>
            </div>
            <div className="flex items-center gap-1">
              <div className="text-emerald-500 text-xl">✦</div>
              <span className="text-xl font-bold text-slate-700">DrFirst</span>
              <span className="text-[10px] text-slate-500 ml-1">Unite the Healthiverse<sup>®</sup></span>
            </div>
          </div>
        </div>
      </section>

      <Features />
      <RCMSection />
      <Specialties />
      <ComplianceSection />
      <BlogSection />
      
      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        {/* Abstract pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Ready to streamline your practice?
          </h2>
          <p className="text-blue-100 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join hundreds of high-performing practices that have switched to MD Charts EHR to save time, reduce burnout, and increase revenue.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo">
              <Button 
                size="lg" 
                variant="secondary" 
                className="h-14 px-8 text-primary font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
                data-testid="button-schedule-demo"
              >
                Schedule a Demo
              </Button>
            </Link>
            <Button 
              size="lg" 
              className="h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold text-lg"
              onClick={() => setModalState({ isOpen: true, type: "contact", title: "Contact Sales" })}
              data-testid="button-contact-sales"
            >
              Contact Sales
            </Button>
          </div>
          <p className="mt-6 text-blue-200 text-sm">No credit card required. Free migration assistance.</p>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        requestType={modalState.type}
        title={modalState.title}
      />
    </div>
  );
}
