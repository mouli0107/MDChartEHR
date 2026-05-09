import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { RCMSection } from "@/components/RCMSection";
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
  HelpCircle,
  Heart,
  Stethoscope,
  Baby,
  SmilePlus,
  Activity,
  CheckCircle,
  Star,
  Calendar,
  ClipboardList,
  MonitorSmartphone,
  Headphones,
  TrendingUp,
  Quote,
  Brain,
  Mic2,
  Wand2,
  Bot,
  Zap
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

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

      {/* Popular Specialties Scroll */}
      <section className="py-1.5 bg-slate-50 border-b border-slate-100 overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 mb-1.5">
          <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest">Popular Specialties</p>
        </div>
        <div className="relative">
          <div className="flex animate-scroll gap-6 whitespace-nowrap">
            {[...Array(3)].map((_, setIndex) => (
              <div key={setIndex} className="flex gap-6 shrink-0">
                {[
                  { name: "Cardiology", href: "/specialties/cardiology", Icon: Heart },
                  { name: "Dermatology", href: "/specialties/dermatology", Icon: Stethoscope },
                  { name: "Family Medicine", href: "/specialties/family-medicine", Icon: Users },
                  { name: "OB/GYN", href: "/specialties/obgyn", Icon: Baby },
                  { name: "Pediatrics", href: "/specialties/pediatrics", Icon: SmilePlus },
                  { name: "Urology", href: "/specialties/urology", Icon: Activity },
                ].map((specialty, i) => (
                  <Link key={i} href={specialty.href}>
                    <div className="inline-flex items-center gap-2.5 px-5 py-3 bg-white border border-slate-200 rounded-lg hover:border-primary hover:shadow-md transition-all cursor-pointer group" data-testid={`scroll-specialty-${specialty.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      <div className="h-8 w-8 rounded-md bg-primary/10 flex items-center justify-center shrink-0">
                        <specialty.Icon className="h-4 w-4 text-primary" />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 group-hover:text-primary transition-colors">{specialty.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation Bar */}
      <section className="bg-[#2da0c7]">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {[
              { icon: FileText, abbr: "EHR", title: "Electronic Health Records", href: "/ehr" },
              { icon: DollarSign, abbr: "RCM", title: "Revenue Cycle Management", href: "/rcm" },
              { icon: Users, abbr: "PM", title: "Practice Management", href: "/practice-management" },
              { icon: UserCircle, abbr: "Portal", title: "Patient Engagement", href: "/patient-engagement" },
            ].map((item, i) => (
              <Link key={i} href={item.href}>
                <div className="flex items-center gap-3 px-6 py-5 text-white hover:bg-white/10 transition-colors cursor-pointer border-r border-white/20 last:border-r-0" data-testid={`nav-category-${item.abbr.toLowerCase()}`}>
                  <div className="h-10 w-10 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                    <item.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-tight">{item.abbr}</p>
                    <p className="text-xs text-white/80 leading-tight">{item.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome to MD Charts */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
              <motion.p variants={fadeInUp} className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Welcome to MD Charts</motion.p>
              <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-4">
                Focus on what matters: providing the best care for your patients
              </motion.h2>
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 leading-relaxed">
                We want you to work smarter, not harder. MD Charts is a user-friendly EHR system and Practice Management solution designed by doctors, for doctors.
              </motion.p>
              <motion.div variants={fadeInUp} className="space-y-4">
                {[
                  "Intuitive system, quick to learn",
                  "Document notes in less than 2 minutes",
                  "AI-Powered Charting with Ambient Scribe technology",
                  "Custom accelerators and templates to speed up documentation",
                  "AutoConsult Letters for seamless referral communication",
                  "Remote Check-in for contactless patient intake",
                  "Customized reporting for actionable insights",
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3" data-testid={`welcome-feature-${i}`}>
                    <CheckCircle className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="grid grid-cols-2 gap-4">
              {[
                { value: "See More", label: "Patients Daily", color: "text-primary" },
                { value: "< 2 min", label: "Note Documentation", color: "text-emerald-600" },
                { value: "99%", label: "First-Pass Claim Rate", color: "text-amber-600" },
                { value: "4.8", label: "Software Advice Rating", color: "text-violet-600", icon: true },
              ].map((stat, i) => (
                <div key={i} className="bg-slate-50 rounded-xl p-6 border border-slate-100" data-testid={`welcome-stat-${i}`}>
                  <div className="flex items-center gap-1 mb-1">
                    <span className={`text-2xl font-bold ${stat.color}`}>{stat.value}</span>
                    {stat.icon && <Star className="h-5 w-5 text-amber-400 fill-amber-400" />}
                  </div>
                  <span className="text-xs text-slate-500 font-medium">{stat.label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose MD Charts */}
      <section className="py-20 bg-slate-50 border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Why MD Charts</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-3">
              Why Choose MD Charts?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              With so many EHR systems available, here's what sets MD Charts apart
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: "AI-Powered Platform", desc: "MD Charts brings AI to key areas of your workflow — from Ambient Scribe charting to AI Medical Coding — so your team spends less time on admin and more time on care." },
              { icon: MonitorSmartphone, title: "User-Friendly Interface", desc: "Quick and easy to use, so you can see more patients and spend less time on documentation. Click Less, Care More\u2122." },
              { icon: ClipboardList, title: "Highly Customizable", desc: "Tailor the system to fit your practice perfectly, with fully customizable template objects and workflow configurations." },
              { icon: Headphones, title: "World-Class Support", desc: "Training and troubleshooting are always available\u2014just a message or call away. Customer-focused, friendly and professional." },
              { icon: TrendingUp, title: "Reliable and Scalable", desc: "A dependable system that grows with your practice, adapting as your needs evolve with 99.9% uptime." },
              { icon: ShieldCheck, title: "ONC Certified & Secure", desc: "ONC 2015 Edition certified, HIPAA compliant with secure patient data, Direct Messaging, and integration with national emergency databases." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-8 border border-slate-200 hover:shadow-lg transition-shadow"
                data-testid={`why-card-${i}`}
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-5">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/why-mdcharts">
              <Button size="lg" className="h-12 px-8 font-semibold" data-testid="button-learn-why">
                Learn More <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Our Clients Love */}
      <section className="py-20 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Platform Features</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-3">
              Features Our Clients Love
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Calendar, title: "Appointment Scheduling", desc: "Schedule and manage appointments online. Send reminders via text or email. Launch telehealth visits with a single text\u2014no app required." },
              { icon: DollarSign, title: "Billing & Payment", desc: "Streamline your complete billing process and accept payments online. Go paperless with our electronic billing system and save on costs." },
              { icon: ClipboardList, title: "Electronic Patient Intake", desc: "Save time by allowing patients to fill out forms electronically and upload them directly into the patient\u2019s note." },
              { icon: Mic2, title: "Ambient AI Scribe", desc: "Let AI listen and document while you focus on your patient. Ambient Scribe captures conversations and generates structured clinical notes automatically." },
              { icon: BarChart3, title: "Customized Reporting", desc: "Create reports tailored to your specific needs. Track MIPS scores to maximize reimbursement rates with 100+ out-of-the-box reports." },
              { icon: MonitorSmartphone, title: "Mobile App & Image Upload", desc: "High-quality mobile photo capture, QR code chart uploads, and allow patients to upload photos, insurance cards and licenses." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group"
                data-testid={`feature-loved-${i}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-11 w-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-1">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
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
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 rounded bg-[#00857c] flex items-center justify-center">
                <span className="text-white text-[10px] font-bold">Q</span>
              </div>
              <span className="text-xl font-bold text-slate-700">Quest</span>
              <span className="text-[10px] text-slate-500 ml-0.5">Diagnostics<sup>®</sup></span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-5 h-5 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
                  <path d="M12 2L2 7v10l10 5 10-5V7L12 2z" fill="#0072CE" opacity="0.9"/>
                  <path d="M12 4L4 8v8l8 4 8-4V8l-8-4z" fill="#fff" opacity="0.3"/>
                </svg>
              </div>
              <span className="text-xl font-bold text-slate-700">Labcorp</span>
            </div>
          </div>
        </div>
      </section>

      {/* AI Highlight Strip */}
      <section className="py-16 bg-gradient-to-br from-slate-900 to-slate-800 border-y border-slate-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 text-primary px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Sparkles className="h-3.5 w-3.5" />
              AI-Powered
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Smarter Care Starts with Smarter Tools
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg">
              MD Charts applies AI where it counts most — reducing administrative burden so your team can focus on what matters most.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Mic2,
                title: "Ambient AI Scribe",
                desc: "Listens during patient visits and automatically generates structured clinical notes — no typing required.",
                badge: "Live Transcription"
              },
              {
                icon: Wand2,
                title: "AI Medical Coding",
                desc: "Analyzes visit notes and suggests accurate ICD-10 and CPT codes instantly, reducing claim errors and speeding up billing.",
                badge: "Coding Intelligence"
              },
              {
                icon: Zap,
                title: "Auto-Updated SOAP Notes",
                desc: "AI listens to the patient encounter and automatically populates your SOAP notes — Subjective, Objective, Assessment, and Plan — ready for your review the moment the visit ends.",
                badge: "SOAP Documentation"
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-7 hover:bg-white/10 transition-colors"
                data-testid={`ai-feature-${i}`}
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary/80 bg-primary/10 px-2.5 py-1 rounded-full">{item.badge}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Link href="/ehr">
              <Button size="lg" className="h-12 px-8 font-semibold bg-primary hover:bg-primary/90" data-testid="button-explore-ai">
                <Brain className="h-4 w-4 mr-2" /> Explore AI Features <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Features />
      <RCMSection />

      {/* Testimonials */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Testimonials</p>
            <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-slate-900 mb-3">
              What Our Clients Say
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { quote: "I have been very satisfied user of MD Charts for over 9 years. Program is user friendly for providers, MA's, front desk and billers. Unlike most EHR programs, my providers actually see more patients a day due to the ease of use and customization of the program.", name: "Kerri", role: "Practice Administrator" },
              { quote: "Makes my job so much easier. Reports are there when you need it. Also support team can help with reports of any type.", name: "TJ Barrett", role: "Office Manager, Great Neck OB GYN" },
              { quote: "I highly recommend the team at MD Charts! They have consistently gone above and beyond for us. MD Charts has been extremely knowledgeable, professional, friendly, pleasant, timely, and patient while working with us. Not to mention the fantastic value for the money.", name: "Progressive Medical Group", role: "Multi-Specialty Practice" },
              { quote: "I like the reports I'm able to run. I have to print and print to disk all different areas of a chart for record releases. Appreciate the flexibility of this software.", name: "Pamela", role: "Medical Records" },
              { quote: "The help and support has been great. Very responsive team that goes above and beyond to help resolve any issues.", name: "Tikva", role: "Office Staff" },
              { quote: "MD Charts has transformed our practice workflow completely. The customizable templates save us hours every day, and the billing integration has significantly improved our collections.", name: "Jason Applebaum, MD", role: "Dermatology Practice" },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-md transition-shadow flex flex-col"
                data-testid={`testimonial-${i}`}
              >
                <Quote className="h-8 w-8 text-primary/20 mb-3" />
                <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">{testimonial.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-xs text-slate-500">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/resources/testimonials">
              <Button variant="outline" size="lg" className="h-12 px-8 font-semibold" data-testid="button-all-testimonials">
                View All Testimonials <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Award Badge */}
      <section className="py-10 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
            <div className="flex items-center gap-3 bg-slate-50 rounded-xl px-6 py-4 border border-slate-200">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-amber-400 fill-amber-400" />
                ))}
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">4.8</p>
                <p className="text-xs text-slate-500">Software Advice Rating</p>
              </div>
            </div>
            <div className="bg-slate-50 rounded-xl px-6 py-4 border border-slate-200">
              <p className="text-sm font-bold text-slate-900">MD Charts: A Top Choice in the Best Dermatology EMR Shortlist</p>
              <p className="text-xs text-slate-500 mt-1">Recognized by The Medical Practice for excellence in dermatology EHR</p>
            </div>
          </div>
        </div>
      </section>

      <ComplianceSection />
      <BlogSection />
      
      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Still have questions or want to book a demo?
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
                Book a Demo
              </Button>
            </Link>
            <Link href="/resources/faqs">
              <Button 
                size="lg" 
                className="h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 hover:border-white font-semibold text-lg"
                data-testid="button-explore-faqs"
              >
                Explore Our FAQs
              </Button>
            </Link>
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
