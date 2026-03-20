import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Baby, Clock, DollarSign, Zap, Shield, TrendingUp,
  Check, Star, ArrowRight, Phone, MousePointer,
  Facebook, Twitter, Linkedin, FileCheck, Users, Layers, HelpCircle
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

import heroImage from "@assets/generated_images/diverse_pediatricians_examining_child.png";
import vaccinationImage from "@assets/generated_images/pediatric_vaccination_procedure.png";
import growthImage from "@assets/generated_images/pediatric_growth_assessment.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const softwareBenefits = [
  { 
    icon: Clock, 
    title: "Quick Well-Child Notes", 
    desc: "KidsCharts℠ auto-populates growth percentiles, immunization status, and developmental milestones. Complete a full well-child note before the patient leaves the room.",
    highlight: "Fast"
  },
  { 
    icon: DollarSign, 
    title: "Maximize Reimbursement", 
    desc: "Built-in AAP coding guidance ensures you capture the right E&M level. TriZetto integration gets your claims paid faster with high clean claim rates.",
    highlight: "Optimized"
  },
  { 
    icon: FileCheck, 
    title: "Automatic Vaccine Tracking", 
    desc: "ACIP-aligned schedules with automatic catch-up calculations. One-click submission to state immunization registries saves hours every week.",
    highlight: "Time Saver"
  },
  { 
    icon: Shield, 
    title: "HIPAA & MIPS Ready", 
    desc: "Fully certified with built-in quality measure tracking. Automatic audit trails and secure parent portal messaging included.",
    highlight: "Compliant"
  }
];

const features = [
  { icon: Layers, title: "Comprehensive Templates", desc: "Age-specific templates from newborn to adolescent - well-child, sick visits, sports physicals, ADHD, and more" },
  { icon: TrendingUp, title: "Auto Growth Charts", desc: "CDC/WHO charts auto-plot with each visit. Get instant percentile calculations and growth velocity alerts" },
  { icon: Zap, title: "One-Click Vaccine Orders", desc: "VFC-compliant ordering with automatic lot tracking, consent forms, and VIS documentation" },
  { icon: MousePointer, title: "Click Less, Care More", desc: "Intuitive interface means less screen time and more face time with kids and parents" },
  { icon: Users, title: "Parent Portal Included", desc: "Secure messaging, appointment scheduling, and immunization records access for busy parents" },
  { icon: DollarSign, title: "Revenue Cycle Built-In", desc: "TriZetto clearinghouse handles claims, eligibility, and ERA posting - all in one system" }
];

const stats = [
  { value: "Fast", label: "Charting Speed", icon: "⚡" },
  { value: "High", label: "Clean Claims", icon: "💰" },
  { value: "Significant", label: "Cost Savings", icon: "📈" },
  { value: "Growing", label: "Practices", icon: "🏥" }
];

const integrations = [
  "TriZetto Clearinghouse", "DrFirst e-Prescribing", "State Immunization Registries", 
  "Quest Diagnostics", "LabCorp", "Surescripts"
];

const faqs = [
  {
    question: "Why should I choose KidsCharts℠ for my pediatric practice?",
    answer: "KidsCharts℠ was built specifically for pediatrics with features like automatic growth chart plotting, immunization tracking with state registry submission, and AAP Bright Futures-aligned workflows."
  },
  {
    question: "How long does it take to implement KidsCharts℠?",
    answer: "Most pediatric practices are fully operational quickly, including data migration, staff training, and workflow customization tailored to your practice."
  },
  {
    question: "Does KidsCharts℠ integrate with state immunization registries?",
    answer: "Yes! KidsCharts℠ offers one-click submission to state immunization registries, saving significant time on manual data entry and ensuring compliance with state requirements."
  },
  {
    question: "Is my patient data secure and HIPAA compliant?",
    answer: "Absolutely. KidsCharts℠ uses end-to-end encryption, secure cloud storage with daily encrypted backups, and is fully compliant with all HIPAA and privacy regulations."
  },
  {
    question: "Can KidsCharts℠ handle VFC (Vaccines for Children) program requirements?",
    answer: "Yes, KidsCharts℠ includes VFC-compliant vaccine ordering with automatic lot tracking, consent forms, and Vaccine Information Statement (VIS) documentation."
  },
  {
    question: "What type of support can I expect after signing up?",
    answer: "Upon signup, you'll be assigned a dedicated Success Coach who guides you through setup, provides training webinars, and offers ongoing support for your practice."
  },
  {
    question: "When is support available?",
    answer: "KidsCharts℠ support is available during regular business hours on weekdays, excluding national holidays. Emergency support is available outside standard hours."
  },
  {
    question: "Can I submit electronic claims to insurance companies?",
    answer: "Yes, KidsCharts℠ integrates with TriZetto clearinghouse to submit claims to thousands of insurers including Medicare, Medicaid, Blue Cross Blue Shield, and major national insurers."
  },
  {
    question: "Can I import my existing patient data?",
    answer: "Yes, our Data Services team can help import patient demographics, immunization records, and visit history from your current system into KidsCharts℠."
  },
  {
    question: "Does KidsCharts℠ include a parent portal?",
    answer: "Yes! The secure parent portal allows parents to view immunization records, schedule appointments, complete intake forms, and communicate securely with your practice."
  }
];

export default function PediatricsSpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-cyan-50 via-white to-blue-50 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial="hidden" animate="visible" variants={fadeIn}>
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Baby className="h-4 w-4" />
                PEDIATRIC EHR SOFTWARE
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                KidsCharts℠
                <span className="block text-primary">Click Less, Care More</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8">
                KidsCharts℠ helps pediatric practices document faster, get paid sooner, and spend more time with patients - not paperwork.
              </p>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {stats.map((stat, idx) => (
                  <div key={idx} className="bg-white rounded-xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
                    <span className="text-2xl">{stat.icon}</span>
                    <div>
                      <div className="text-xl font-bold text-slate-900">{stat.value}</div>
                      <div className="text-xs text-slate-500">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4">
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
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                <img src={heroImage} alt="Pediatricians with child" className="w-full h-[500px] object-cover" loading="lazy" width="800" height="500" />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">ONC 2015 Certified</div>
                    <div className="text-xs text-slate-500">AAP Bright Futures Aligned</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integrations Bar */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Built-In Integrations</p>
          <div className="flex flex-wrap justify-center items-center gap-6 opacity-70">
            {integrations.map((name, idx) => (
              <span key={idx} className="text-sm font-bold text-slate-700">{name}</span>
            ))}
          </div>
        </div>
      </section>

      {/* How MD Charts Helps */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How KidsCharts℠ Transforms Your Pediatric Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real solutions to the daily challenges pediatricians face
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
                className="bg-slate-50 rounded-2xl p-8 border border-slate-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">{benefit.title}</h3>
                      <span className="px-2 py-1 bg-primary text-white text-xs font-bold rounded-full">{benefit.highlight}</span>
                    </div>
                    <p className="text-slate-600">{benefit.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Showcase */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 1, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={vaccinationImage} alt="Pediatric vaccination" className="w-full h-[300px] object-cover" loading="lazy" width="800" height="300" />
              </div>
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Vaccine Management Made Easy</h3>
                <p className="text-slate-600">One-click ordering, automatic lot tracking, and instant registry submission. KidsCharts℠ handles the paperwork so you can focus on patients.</p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 1, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              className="space-y-6"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-2">Revenue Cycle Built Right In</h3>
                <p className="text-slate-600">TriZetto clearinghouse integration means faster payments, fewer denials, and no separate billing software needed.</p>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <img src={growthImage} alt="Growth assessment" className="w-full h-[300px] object-cover" loading="lazy" width="800" height="300" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything Your Practice Needs in One System
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
      <section className="py-20 bg-gradient-to-br from-primary to-cyan-600 text-white">
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
                <Star key={i} className="h-7 w-7 fill-cyan-300 text-cyan-300" />
              ))}
            </div>
            
            <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8">
              "KidsCharts℠ has been a game-changer. Our well-child visits take significantly less time to document, the vaccine tracking is flawless, and our revenue has increased since switching. Parents love the portal too!"
            </blockquote>
            
            <div>
              <div className="font-bold text-lg">Dr. Maria Santos, MD, FAAP</div>
              <div className="text-white/80">Sunny Days Pediatrics, Phoenix, AZ</div>
              <div className="text-white/60 text-sm">4 providers, 12,000+ patients</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to know about KidsCharts℠
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem 
                  key={index} 
                  value={`faq-${index}`}
                  className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Pediatric Practice?
            </h2>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Join pediatric practices nationwide using KidsCharts℠ for faster documentation and better revenue
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
