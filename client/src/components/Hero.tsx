import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Award, FileText, DollarSign, Users, UserCircle, Pill, FlaskConical, Video, BarChart3, ChevronRight, Mic2, Brain, Zap, Shield, Smartphone, Sparkles } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/futuristic_glass_medical_interface_abstract_3d.png";
import oncSeal from "@assets/generated_images/onc_certified_health_it_seal_3d_gold_and_blue.png";
import doctorPortrait from "@assets/generated_images/friendly_doctor_portrait.png";
import clinicInterior from "@assets/generated_images/diverse_doctors_hallway_patient_2.png";
import doctorTablet from "@assets/generated_images/doctor_using_tablet.png";
import medicalTeam from "@assets/generated_images/medical_team_collaboration.png";

const AI_MESSAGES = [
  { Icon: Mic2,       text: "AI listens to your patient encounters and auto-generates clinical notes in real time — no manual charting needed." },
  { Icon: Brain,      text: "AI recommends the right ICD & CPT billing codes directly from your clinical notes — fewer denials, faster reimbursement." },
  { Icon: Zap,        text: "One tap completes the full workflow — record, transcribe, fill the note, and populate the superbill." },
  { Icon: Smartphone, text: "Scribe from any device — smartphone, tablet, or desktop. No extra hardware required." },
  { Icon: Shield,     text: "Every AI interaction is HIPAA-compliant with built-in PHI protection and full audit logging." },
  { Icon: Sparkles,   text: "AI auto-fills any specialty template — surfaces patient history and context right where you need it." },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setCurrent(c => (c + 1) % AI_MESSAGES.length), 3500);
    return () => clearInterval(t);
  }, []);
  const CurrentIcon = AI_MESSAGES[current].Icon;
  return (
    <section className="relative pt-[92px] pb-2 md:pt-[119px] md:pb-3 overflow-hidden bg-slate-50/50">
      {/* Dense Professional Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      
      {/* Stronger Ambient Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-blue-200/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-100/30 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Left Content - Tighter Layout */}
          <div className="lg:w-1/2 max-w-2xl text-left">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {/* Premium Certification Badge Row */}
              <div className="flex flex-wrap gap-3 mb-6">
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-emerald-200 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_20px_rgba(16,185,129,0.5)] transition-all cursor-default animate-pulse">
                    <Award className="h-4 w-4 text-emerald-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                      ONC 2015 Edition Certified
                    </span>
                 </div>
                 <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-blue-200 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_20px_rgba(59,130,246,0.5)] transition-all cursor-default animate-pulse">
                    <ShieldCheck className="h-4 w-4 text-blue-500" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700">
                      21st Century Cures Act Certified
                    </span>
                 </div>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 leading-[1.1] mb-4 tracking-tight">
                Practice the way <br />
                <span className="text-primary">
                  you want
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-snug font-medium max-w-xl">
                A highly configurable, template-based EHR engine that adapts to your workflow. Create detailed clinical notes quickly and efficiently.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link href="/book-demo">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-sm font-bold uppercase tracking-wide shadow-lg shadow-blue-900/20 bg-primary hover:bg-blue-700 rounded-md transition-all hover:-translate-y-0.5"
                    data-testid="button-book-demo"
                  >
                     Book Demo
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="h-12 px-8 text-sm font-bold uppercase tracking-wide rounded-md transition-all hover:-translate-y-0.5 bg-cyan-500 hover:bg-cyan-400 text-white border-0"
                    style={{
                      boxShadow: "0 0 16px 4px rgba(6,182,212,0.55), 0 0 32px 8px rgba(6,182,212,0.25)",
                      animation: "cyan-glow 2s ease-in-out infinite",
                    }}
                    data-testid="button-contact-us"
                  >
                    Contact Us
                  </Button>
                </Link>
              </div>
              <style>{`
                @keyframes cyan-glow {
                  0%, 100% { box-shadow: 0 0 16px 4px rgba(6,182,212,0.55), 0 0 32px 8px rgba(6,182,212,0.25); }
                  50% { box-shadow: 0 0 24px 8px rgba(6,182,212,0.80), 0 0 48px 16px rgba(6,182,212,0.40); }
                }
              `}</style>

              {/* Clean Stats Row - Integrated */}
              <div className="flex items-center gap-8 border-t border-slate-200 pt-6">
                <div className="flex flex-col">
                  <span className="text-[23px] font-bold text-slate-900 leading-none">99.9%</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Platform Uptime</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[23px] font-bold text-slate-900 leading-none">HIPAA Secure</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Fully Compliant</span>
                </div>
                <Link href="/ai-features">
                  <div className="flex flex-col group cursor-pointer">
                    <span className="text-[23px] font-bold text-primary leading-none group-hover:text-blue-700 transition-colors flex items-center gap-1">
                      Special AI Features <ChevronRight className="h-5 w-5 mt-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">Smart Charting</span>
                  </div>
                </Link>
              </div>
              {/* AI Feature Rotating Card */}
              <Link href="/ai-features">
                <div className="mt-6 cursor-pointer group">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current}
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.4 }}
                      className="flex items-start gap-3 px-4 py-3 bg-primary/5 border border-primary/20 rounded-xl group-hover:border-primary/40 group-hover:bg-primary/8 transition-colors"
                    >
                      <div className="shrink-0 h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                        <CurrentIcon className="h-4 w-4 text-primary" />
                      </div>
                      <p className="text-sm text-slate-600 leading-snug">
                        {AI_MESSAGES[current].text}
                      </p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right Content - Zig-Zag Image Grid */}
          <div className="lg:w-1/2 relative">
            <div className="grid grid-cols-2 gap-4">
              {/* Row 1 */}
              <motion.div
                initial={{ opacity: 0.9, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="h-48 md:h-56 rounded-2xl border-4 border-white shadow-2xl overflow-hidden"
              >
                <img src={doctorPortrait} alt="Dr. Sarah Chen" className="w-full h-full object-cover" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0.9, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="h-48 md:h-56 rounded-2xl border-4 border-white shadow-2xl overflow-hidden mt-8"
              >
                <img src={medicalTeam} alt="Medical Team of Doctors" className="w-full h-full object-cover" />
              </motion.div>

              {/* Row 2 */}
              <motion.div
                initial={{ opacity: 0.9, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="h-48 md:h-56 rounded-2xl border-4 border-white shadow-2xl overflow-hidden -mt-4"
              >
                <img src={doctorTablet} alt="Dermatology Patient Records" className="w-full h-full object-cover" />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0.9, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                whileHover={{ scale: 1.03 }}
                className="h-48 md:h-56 rounded-2xl border-4 border-white shadow-2xl overflow-hidden mt-4"
              >
                <img src={clinicInterior} alt="MD Charts Doctors" className="w-full h-full object-cover" />
              </motion.div>
            </div>


          </div>

        </div>
      </div>

          </section>
  );
}

