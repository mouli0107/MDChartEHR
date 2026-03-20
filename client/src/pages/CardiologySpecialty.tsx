import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { 
  Heart, Activity, Zap, FileHeart, Calendar, Pill, 
  Check, Star, ChevronRight, Play, Monitor,
  Shield, Award, Clock, Users, Stethoscope, HeartPulse,
  Facebook, Twitter, Linkedin, Instagram, ArrowRight, Phone
} from "lucide-react";

import heroTeamImage from "@assets/generated_images/diverse_laughing_cardiologists_treating_patient.png";
import echoImage from "@assets/generated_images/diverse_doctors_echocardiogram_exam.png";
import ecgImage from "@assets/generated_images/black_doctor_ecg_review_patient.png";
import stressTestImage from "@assets/generated_images/diverse_doctors_cardiac_stress_test.png";

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const capabilities = [
  { icon: HeartPulse, label: "ECG Integration", desc: "Automatic 12-lead interpretation" },
  { icon: Monitor, label: "Echo Reports", desc: "Seamless imaging integration" },
  { icon: Activity, label: "Stress Testing", desc: "Bruce protocol workflows" },
  { icon: Shield, label: "Device Management", desc: "Pacemaker & ICD tracking" },
  { icon: Pill, label: "Cardiac Meds", desc: "Smart prescribing tools" },
  { icon: FileHeart, label: "Risk Scoring", desc: "Framingham & ACC/AHA" },
];

const workflows = [
  {
    title: "Diagnostic Testing",
    image: ecgImage,
    features: [
      "12-lead ECG with auto-interpretation",
      "Holter & event monitor analysis", 
      "Nuclear stress test protocols",
      "Cardiac CT/MRI documentation",
      "Coronary calcium scoring"
    ]
  },
  {
    title: "Interventional Procedures",
    image: echoImage,
    features: [
      "Cardiac catheterization workflows",
      "PCI documentation templates",
      "Pacemaker/ICD implant records",
      "EP study & ablation notes",
      "Post-procedure care plans"
    ]
  },
  {
    title: "Heart Failure Management",
    image: stressTestImage,
    features: [
      "ACC/AHA staging protocols",
      "LVEF tracking over time",
      "Medication optimization",
      "Cardiac rehab documentation",
      "Remote monitoring integration"
    ]
  }
];

const stats = [
  { value: "20+", label: "Cardiology Templates" },
  { value: "Fast", label: "Average Documentation" },
  { value: "High", label: "Clean Claim Rate" },
  { value: "Growing", label: "Practices Trust Us" }
];

const testimonial = {
  quote: "CardioCharts has completely transformed how we document. The ECG integration saves our team significant time every day. The cardiac-specific templates understand exactly how cardiologists think and work.",
  author: "Dr. James Mitchell, MD, FACC",
  role: "Director of Cardiology",
  practice: "HeartCare Associates, New York"
};

export default function CardiologySpecialty() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "demo" | "contact";
    title: string;
  }>({ isOpen: false, type: "demo", title: "" });

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero - Full Width Split Design */}
      <section className="min-h-screen flex flex-col lg:flex-row">
        {/* Left Content */}
        <div className="lg:w-1/2 bg-slate-900 text-white flex items-center py-32 lg:py-0">
          <div className="container mx-auto px-8 lg:px-16 max-w-2xl">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8">
                <Heart className="h-4 w-4" />
                CARDIOLOGY EHR SOLUTION
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Built for the
                <span className="block text-primary">Rhythm of Cardiology</span>
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                From ECG interpretation to complex interventional procedures - CardioCharts speaks your language and matches your workflow.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="/book-demo">
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white"
                    data-testid="button-hero-demo"
                  >
                    Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-slate-600 text-white hover:bg-slate-800"
                  onClick={() => setModalState({ isOpen: true, type: "contact", title: "Contact Us" })}
                  data-testid="button-hero-contact"
                >
                  <Phone className="mr-2 h-4 w-4" /> Talk to Sales
                </Button>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8 border-t border-slate-700">
                {stats.map((stat, idx) => (
                  <div key={idx}>
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Right Image */}
        <div className="lg:w-1/2 relative">
          <motion.div
            initial={{ opacity: 1, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="h-full"
          >
            <img 
              src={heroTeamImage} 
              alt="Cardiology team" 
              className="w-full h-full object-cover min-h-[500px] lg:min-h-screen"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/50 to-transparent lg:from-slate-900/30"></div>
            
            {/* Floating Badge */}
            <div className="hidden lg:block absolute bottom-8 left-8 bg-white rounded-2xl p-6 shadow-2xl max-w-xs">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center flex-shrink-0">
                  <Check className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <div className="font-bold text-slate-900">ONC 2015 Certified</div>
                  <div className="text-sm text-slate-500">HIPAA Compliant & 21st Century Cures Ready</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Capabilities Strip */}
      <section className="py-6 bg-primary text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 md:gap-12">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <cap.icon className="h-5 w-5" />
                <div>
                  <div className="font-bold text-sm">{cap.label}</div>
                  <div className="text-xs text-white/70">{cap.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Sections - Alternating Layout */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center mb-20"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Every Cardiology Workflow, Covered
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Purpose-built templates for diagnostic, interventional, and preventive cardiology
            </p>
          </motion.div>

          <div className="space-y-32">
            {workflows.map((workflow, idx) => (
              <motion.div
                key={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={slideUp}
                className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 items-center`}
              >
                {/* Image */}
                <div className="lg:w-1/2">
                  <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                    <img 
                      src={workflow.image} 
                      alt={workflow.title} 
                      className="w-full h-[400px] object-cover"
                      loading="lazy"
                      width="800"
                      height="400"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                    <div className="absolute bottom-6 left-6 right-6">
                      <span className="inline-block bg-primary text-white text-sm font-bold px-4 py-2 rounded-full">
                        {workflow.title}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="lg:w-1/2">
                  <h3 className="text-3xl font-bold text-slate-900 mb-6">{workflow.title}</h3>
                  <div className="space-y-4">
                    {workflow.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl hover:bg-primary/5 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <Check className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-slate-700 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial - Large Quote */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Heart className="w-[600px] h-[600px]" />
          </div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-amber-400 text-amber-400" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10">
              "{testimonial.quote}"
            </blockquote>
            
            <div>
              <div className="font-bold text-xl text-primary">{testimonial.author}</div>
              <div className="text-slate-400">{testimonial.role}</div>
              <div className="text-slate-500 text-sm">{testimonial.practice}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Feature Cards - Horizontal Scroll Style */}
      <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={slideUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">
              Why Cardiologists Choose Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Features designed by cardiologists, for cardiologists
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: HeartPulse, title: "ECG Auto-Interpretation", desc: "AI-assisted rhythm analysis with customizable interpretation templates. Significantly reduce reading time." },
              { icon: Monitor, title: "Imaging Integration", desc: "Direct echo and nuclear imaging imports with structured reporting. View trends over time." },
              { icon: Activity, title: "Stress Test Protocols", desc: "Built-in Bruce, modified Bruce, and pharmacologic protocols with automatic stage tracking." },
              { icon: Shield, title: "Device Clinic Ready", desc: "Complete pacemaker and ICD device management with remote monitoring integration." },
              { icon: Clock, title: "Fast Documentation", desc: "Cardiology-specific smart phrases and templates cut documentation time dramatically." },
              { icon: Award, title: "High Clean Claims", desc: "Automatic CPT code suggestions and compliance checks reduce denials significantly." }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  <feature.icon className="h-7 w-7 text-primary group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Centered Card */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-12 text-center text-white shadow-2xl"
          >
            <Heart className="h-16 w-16 text-primary mx-auto mb-6" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Cardiology Practice?
            </h2>
            <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
              Trusted by cardiology practices nationwide who document faster, bill smarter, and focus more on patient care.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white px-8"
                  data-testid="button-cta-trial"
                >
                  Book Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState(prev => ({ ...prev, isOpen: false }))}
        title={modalState.title}
        requestType={modalState.type}
      />
    </div>
  );
}
