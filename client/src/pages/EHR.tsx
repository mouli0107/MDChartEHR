import { motion } from "framer-motion";
import { FileText, Zap, Shield, Clock, Layers, CheckCircle2, ArrowRight, Sparkles, Mic, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import ehrDashboardImage from "@assets/image_1773987891246.png";
import patientChartImage from "@assets/image_1773988273994.png";
import dermchartsSlide from "@assets/mdcharts_dermcharts_slide.png";
import aiMedicalIcon from "@assets/generated_images/ai_medical_charting_icon.png";
import aiScribeIcon from "@assets/generated_images/ai_ambient_scribe_icon.png";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Charting",
    description: "Voice-to-note AI generates structured clinical notes from patient conversations, cutting charting time dramatically."
  },
  {
    icon: Layers,
    title: "Specialty Templates",
    description: "Specialty-specific templates that adapt to your unique workflow and documentation needs."
  },
  {
    icon: Shield,
    title: "ONC 2015 Edition Certified",
    description: "Fully certified and compliant with Meaningful Use, MIPS, and 21st Century Cures Act requirements."
  },
  {
    icon: Sparkles,
    title: "AI Medical Coding",
    description: "AI extracts ICD and CPT codes directly from patient conversations and passes them to the RCM module automatically."
  }
];

const modules = [
  "Patient Demographics",
  "Problem List Management", 
  "Medication Management",
  "Allergy Documentation",
  "Lab Results Integration",
  "Ambient Scribe",
  "AI Medical Coding",
  "e-Prescribing (EPCS)",
  "Clinical Decision Support",
  "Progress Notes",
  "Visit Summaries",
  "Immunization Records",
  "Growth Charts"
];

export default function EHRPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-x-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-amber-700">
                  <Shield className="h-4 w-4" />
                  ONC 2015 Edition Certified
                </div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  21st Century Cures Act Certified
                </div>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Click Less <br/>
                <span className="text-primary">Care More</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-4 leading-relaxed">
                A highly configurable, template-based EHR engine that adapts to your workflow. 
                Create detailed clinical notes quickly and efficiently.
              </p>
              <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/20 rounded-lg px-4 py-2.5 mb-6">
                <Sparkles className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm text-slate-700">AI listens to your patient encounters and auto-generates clinical notes in real time — no manual charting needed</span>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/book-demo">
                  <Button 
                    size="lg" 
                    className="h-12 px-8"
                    data-testid="button-ehr-demo"
                  >
                    Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <a href="#clinical-modules">
                  <Button size="lg" variant="outline" className="h-12 px-8" data-testid="button-view-features">
                    View Features
                  </Button>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img 
                  src={dermchartsSlide} 
                  alt="MD Charts EHR specialty platforms" 
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Showcase Section - Pabau Style Side-by-Side */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 1, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-32"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                Streamline your<br />clinical workflow
              </h2>
              
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                Managing unsigned items, medications, and clinical notes can be overwhelming — <strong className="text-slate-900">taking up to 2 hours every single day</strong>.
              </p>
              
              <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                MD Charts handles this for you, with smart queues that organize unsigned items by category — from medications and MA notes to lab orders and superbills.
              </p>
              
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                From one central dashboard, manage all pending tasks efficiently, so you can focus on what matters most — treating patients.
              </p>

              {/* AI Callout */}
              <div className="flex items-start gap-4 bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6">
                <img src={aiScribeIcon} alt="AI Ambient Scribe" className="h-14 w-14 rounded-lg object-cover flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <Sparkles className="h-3.5 w-3.5 text-primary" />
                    <span className="text-xs font-bold uppercase tracking-wide text-primary">AI Powered</span>
                  </div>
                  <p className="text-sm text-slate-600">Our AI documentation tool converts real-time patient conversations into structured SOAP notes automatically — so you can stay focused on care, not documentation.</p>
                </div>
              </div>
              
              <Link href="/book-demo">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-primary border-primary hover:bg-primary/5">
                  Schedule a Demo
                </Button>
              </Link>
            </motion.div>

            {/* Right Screenshot - Larger */}
            <motion.div
              initial={{ opacity: 1, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200 bg-white">
                <img 
                  src={ehrDashboardImage} 
                  alt="MD Charts EHR Dashboard showing unsigned items management" 
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Patient Chart Section - Cyan Background */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 overflow-hidden">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Left Screenshot */}
            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative rounded-lg overflow-hidden shadow-2xl bg-white">
                <img 
                  src={patientChartImage} 
                  alt="MD Charts Patient Chart with comprehensive medical history" 
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div
              initial={{ opacity: 1 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-4">
                Go paperless with digital patient records
              </h2>
              
              <p className="text-base text-white/90 mb-3 leading-relaxed">
                MD Charts' patient management system has been tailor-made to cater for the heavy documentation needs of medical patient workflows.
              </p>
              
              <p className="text-base text-white/90 mb-3 leading-relaxed">
                Access complete patient history at a glance — allergies, medications, critical items, and visit notes — all organized in a single view.
              </p>
              
              <p className="text-base text-white/90 mb-6 leading-relaxed">
                From allergy alerts to SOAP notes and lab orders — all the information you need is securely stored in one place and can be accessed from anywhere.
              </p>
              
              <Link href="/book-demo">
                <Button variant="outline" size="lg" className="rounded-full px-8 h-12 bg-transparent border-white text-white hover:bg-white hover:text-primary">
                  Book Your Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Providers Choose Our EHR
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="clinical-modules" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Comprehensive Clinical Modules
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need for complete patient care documentation
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {modules.map((module, i) => {
              const isAI = module === "Ambient Scribe" || module === "AI Medical Coding";
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 1, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.03 }}
                  className={`flex items-center gap-3 rounded-lg p-4 border ${isAI ? "bg-primary/5 border-primary/30" : "bg-white border-slate-200"}`}
                >
                  {isAI
                    ? <Sparkles className="h-5 w-5 text-primary shrink-0" />
                    : <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                  }
                  <span className={`text-sm font-medium ${isAI ? "text-primary" : "text-slate-700"}`}>{module}</span>
                  {isAI && <span className="ml-auto text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded">AI</span>}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to transform your clinical documentation?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of providers who have reduced charting time and improved patient care.
          </p>
          <Link href="/book-demo">
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-14 px-8"
              data-testid="button-schedule-demo"
            >
              Schedule Your Demo
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
