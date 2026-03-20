import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, Clock, DollarSign, FileText, Zap, Shield,
  Check, Star, ArrowRight, Phone, MousePointer,
  Facebook, Twitter, Linkedin, Layers, TrendingUp, Lock
} from "lucide-react";

import heroImage from "@assets/generated_images/diverse_family_doctors_with_family.png";
import checkupImage from "@assets/generated_images/family_medicine_annual_checkup.png";
import consultImage from "@assets/generated_images/family_medicine_health_consultation.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const softwareBenefits = [
  { 
    icon: Clock, 
    title: "Complete Notes Quickly", 
    desc: "FamilyCharts auto-populates patient history, medications, and problem list. Smart templates adapt to each visit type - from well-child to Medicare AWV.",
    stat: "Faster"
  },
  { 
    icon: DollarSign, 
    title: "Capture Every Dollar", 
    desc: "Built-in coding guidance ensures correct E&M levels. TriZetto clearinghouse integration gets claims paid faster with high clean claim rates.",
    stat: "Optimized"
  },
  { 
    icon: Shield, 
    title: "MIPS Made Easy", 
    desc: "Automatic quality measure tracking with real-time dashboards. Hit your MIPS targets without the headache - compliance built right into your workflow.",
    stat: "Compliant"
  },
  { 
    icon: MousePointer, 
    title: "Click Less, Care More", 
    desc: "Intuitive interface designed by family physicians. Less time on the computer means more time actually connecting with your patients.",
    stat: "More Face Time"
  }
];

const features = [
  { icon: Layers, title: "Comprehensive Templates", desc: "Pre-built templates for every family medicine scenario - well visits, chronic care, AWV, acute visits, and procedures" },
  { icon: TrendingUp, title: "Chronic Care Management", desc: "CCM billing workflows with automatic time tracking and care plan documentation" },
  { icon: Zap, title: "Same-Day Sick Visits", desc: "Rapid documentation templates for acute visits - complete chief complaint to assessment quickly" },
  { icon: DollarSign, title: "Revenue Cycle Built-In", desc: "TriZetto clearinghouse handles claims, eligibility checks, and payment posting automatically" },
  { icon: Users, title: "Patient Portal Included", desc: "Secure messaging, online scheduling, and records access keeps patients engaged between visits" },
  { icon: Lock, title: "Enterprise Security", desc: "Bank-level encryption, automatic backups, and complete HIPAA compliance included" }
];

const stats = [
  { value: "Fast", label: "Documentation Speed" },
  { value: "High", label: "Clean Claim Rate" },
  { value: "Significant", label: "Cost Savings" },
  { value: "Growing", label: "FM Practices" }
];

const integrations = [
  "TriZetto Clearinghouse", "DrFirst e-Prescribing", "Quest Diagnostics", 
  "LabCorp", "Surescripts", "Immunization Registries"
];

const visitTypes = [
  { type: "Well-Child Visits", time: "Quick", template: "AAP Bright Futures aligned" },
  { type: "Annual Physicals", time: "Fast", template: "Preventive care checklists" },
  { type: "Medicare AWV", time: "Efficient", template: "HRA auto-populated" },
  { type: "Chronic Care", time: "Fast", template: "Care plan management" },
  { type: "Acute Visits", time: "Quick", template: "Chief complaint focused" },
  { type: "Procedures", time: "Rapid", template: "Consent & documentation" }
];

export default function FamilyMedicineSpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial="hidden" animate="visible" variants={fadeIn}>
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                  <Users className="h-4 w-4" />
                  FAMILY MEDICINE EHR
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  Click Less, Care More
                  <span className="text-primary"> in Family Medicine</span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-8">
                  FamilyCharts helps family medicine practices document 40% faster, maximize reimbursement, and focus on patient relationships - not paperwork.
                </p>

                <div className="flex flex-wrap gap-4 mb-10">
                  <Link href="/book-demo">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90"
                    >
                      See It In Action <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/book-demo">
                    <Button 
                      size="lg" 
                      variant="outline"
                    >
                      <Phone className="mr-2 h-4 w-4" /> Talk to Sales
                    </Button>
                  </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-4 gap-4 p-4 bg-slate-50 rounded-xl">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="text-center">
                      <div className="text-xl font-bold text-primary">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="relative"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl">
                  <img src={heroImage} alt="Family medicine team" className="w-full h-[550px] object-cover" loading="lazy" width="800" height="550" />
                </div>
                
                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl border border-slate-100">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-bold text-slate-900">ONC 2015 Certified</div>
                      <div className="text-xs text-slate-500">MIPS Ready</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Built-In Integrations</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-70">
            {integrations.map((name, idx) => (
              <span key={idx} className="text-sm font-bold text-slate-700">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Type Speed */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Fast Documentation with FamilyCharts for Every Visit Type
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              FamilyCharts adapts to your workflow with templates optimized for speed
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {visitTypes.map((visit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100"
              >
                <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{visit.time}</span>
                </div>
                <div>
                  <div className="font-bold text-slate-900">{visit.type}</div>
                  <div className="text-xs text-slate-500">{visit.template}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How MD Charts Helps */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How FamilyCharts Transforms Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real solutions to the challenges family medicine practices face every day
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {softwareBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">{benefit.stat}</span>
                    </div>
                    <p className="text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={checkupImage} alt="Annual checkup" className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="800" height="350" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent rounded-2xl flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">Revenue Cycle Built-In</h3>
                  <p className="text-white/80 text-sm">TriZetto handles claims so you get paid faster</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              className="relative group"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={consultImage} alt="Health consultation" className="w-full h-[350px] object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" width="800" height="350" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent rounded-2xl flex items-end p-6">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">More Face Time</h3>
                  <p className="text-white/80 text-sm">Less documentation means more patient connection</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything Your Practice Needs
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl transition-all"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-7 w-7 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              "FamilyCharts finally gets family medicine. I see newborns, manage diabetics, and do Medicare AWVs all in the same day - and the templates adapt to each. Documentation is so fast I'm actually leaving on time. Our revenue is up 22% since switching."
            </blockquote>
            
            <div>
              <div className="font-bold text-lg">Dr. Jennifer Adams, MD</div>
              <div className="text-slate-400">Family Care Partners, Austin, TX</div>
              <div className="text-slate-500 text-sm">3 providers, 8,000+ patients</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Trusted by family medicine practices nationwide using FamilyCharts for faster documentation and better revenue
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Schedule Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
