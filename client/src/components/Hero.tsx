import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, Award, FileText, DollarSign, Users, UserCircle, Pill, FlaskConical, Video, BarChart3 } from "lucide-react";
import { Link } from "wouter";
import heroImage from "@assets/generated_images/futuristic_glass_medical_interface_abstract_3d.png";
import oncSeal from "@assets/generated_images/onc_certified_health_it_seal_3d_gold_and_blue.png";
import doctorPortrait from "@assets/generated_images/friendly_doctor_portrait.png";
import clinicInterior from "@assets/generated_images/diverse_doctors_hallway_patient_2.png";
import doctorTablet from "@assets/generated_images/doctor_using_tablet.png";
import medicalTeam from "@assets/generated_images/medical_team_collaboration.png";

export function Hero() {
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
              </div>

              {/* Clean Stats Row - Integrated */}
              <div className="flex items-center gap-8 border-t border-slate-200 pt-6">
                {[
                  { label: "Platform Uptime", value: "99.9%" },
                  { label: "Fully Compliant", value: "HIPAA Secure" },
                  { label: "Smart Charting", value: "AI Powered" },
                ].map((stat, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[23px] font-bold text-slate-900 leading-none">{stat.value}</span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mt-1">{stat.label}</span>
                  </div>
                ))}
              </div>
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

