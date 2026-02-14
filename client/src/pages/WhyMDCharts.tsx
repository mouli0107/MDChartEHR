import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { 
  Zap, Clock, Users, Shield, TrendingUp,
  Smartphone, MessageSquare, CreditCard, FileText, 
  Stethoscope, Camera, Phone, Video, BarChart3, 
  CheckCircle2, ArrowRight, Sparkles, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import whyHeroImage from "@assets/stock_images/happy_doctor_in_whit_af55e936.jpg";

const coreValues = [
  { icon: Clock, title: "Quick Setup", desc: "Operational in 2-10 weeks with minimal staff training" },
  { icon: Users, title: "User-Friendly", desc: "Intuitive for providers, MAs, front desk, and billers" },
  { icon: Zap, title: "Customizable", desc: "Adapts to your specialty workflows seamlessly" },
  { icon: TrendingUp, title: "Scalable", desc: "Grows with your practice from solo to enterprise" },
  { icon: Shield, title: "ONC Certified", desc: "Meets all federal health IT standards" },
  { icon: Smartphone, title: "Cloud-Based", desc: "Secure access from any device, anywhere" },
];

const keyFeatures = [
  { 
    icon: FileText, 
    title: "EHR & Charting", 
    items: ["Intuitive charting interface", "Customizable templates", "Real-time patient records", "End-to-end encryption"]
  },
  { 
    icon: MessageSquare, 
    title: "Patient Portal", 
    items: ["Online scheduling", "Mobile check-in via text", "Secure messaging", "Health info access"]
  },
  { 
    icon: CreditCard, 
    title: "Billing & Payments", 
    items: ["Integrated MDCPay", "Online patient payments", "Paperless billing", "Real-time eligibility"]
  },
  { 
    icon: Stethoscope, 
    title: "Lab Integration", 
    items: ["20+ lab interfaces", "Bi-directional HL7", "Auto result syncing", "HIE compatible"]
  },
  { 
    icon: Video, 
    title: "TeleHealth", 
    items: ["Launch from patient chart", "No app download needed", "Simple text/email link", "Secure video visits"]
  },
  { 
    icon: Phone, 
    title: "AI Call Assistant", 
    items: ["24/7 automated answering", "Smart call routing", "Real-time booking", "No hold times"]
  },
  { 
    icon: Camera, 
    title: "Photo Easy Capture", 
    items: ["Instant image upload", "Mobile to EHR direct", "Treatment tracking", "Patient uploads"]
  },
  { 
    icon: BarChart3, 
    title: "Analytics", 
    items: ["Custom reporting", "KPI tracking", "Revenue analytics", "Quality measures"]
  },
];

const benefits = [
  { stat: "Less", label: "Documentation Time", desc: "More time for patients, less time charting" },
  { stat: "High", label: "Quality Standards", desc: "Meeting regulatory compliance requirements" },
  { stat: "Fast", label: "Go-Live Timeline", desc: "Quick implementation with full training" },
  { stat: "Always", label: "AI-Powered Support", desc: "Never miss a patient call again" },
];

const impactItems = [
  { title: "Enhanced Patient Care", desc: "Complete, up-to-date records accessible anywhere for better clinical decisions" },
  { title: "Increased Efficiency", desc: "Streamlined workflows mean more patients seen, less time on documentation" },
  { title: "Better Communication", desc: "Secure sharing of records among staff, providers, and HIE partners" },
  { title: "Higher Patient Engagement", desc: "Patient portal + mobile features = higher satisfaction & reviews" },
  { title: "Improved Safety", desc: "Alerts, reminders, elimination of handwriting errors" },
  { title: "Cost Savings", desc: "Paperless operations and efficient billing for faster revenue" },
  { title: "Reduced Burnout", desc: "Automated intake and AI assistant offload repetitive tasks" },
  { title: "Financial Growth", desc: "Optimized billing and revenue cycle for maximum reimbursement" },
];

export default function WhyMDChartsPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-primary/5 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wide mb-6">
                <Sparkles className="h-4 w-4" />
                Why Choose MDcharts EHR
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Click Less <span className="text-primary">Care More</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                A multi-specialty EHR and practice management system designed to streamline 
                workflows, reduce documentation burden, and boost practice efficiency.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="h-14 px-8 text-base"
                  onClick={() => setModalOpen(true)}
                  data-testid="button-why-demo"
                >
                  Schedule Free Demo <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Link href="/ehr">
                  <Button size="lg" variant="outline" className="h-14 px-8 text-base">
                    View All Features
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={whyHeroImage} 
                  alt="Happy doctor in modern clinic" 
                  className="w-full h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">9+ Years</p>
                    <p className="text-xs text-slate-500">Trusted by Providers</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-y border-slate-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {coreValues.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="text-center p-4"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Proven Results
            </h2>
            <p className="text-lg text-slate-600">
              Numbers that demonstrate real impact on your practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 border border-slate-200 text-center shadow-sm"
              >
                <div className="text-4xl md:text-5xl font-extrabold text-primary mb-2">{item.stat}</div>
                <div className="font-bold text-slate-900 mb-1">{item.label}</div>
                <p className="text-sm text-slate-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Comprehensive Feature Suite
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to run a modern medical practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-50 rounded-xl p-5 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-slate-900 mb-3">{feature.title}</h3>
                <ul className="space-y-2">
                  {feature.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Transform Your Practice
            </h2>
            <p className="text-slate-400 text-lg">
              Real benefits that impact your bottom line and patient outcomes
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {impactItems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-800/50 rounded-xl p-5 border border-slate-700"
              >
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-slate-400">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-primary to-blue-700 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wide mb-6">
              <Award className="h-4 w-4" />
              Trusted by Physicians
            </div>
            <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-3xl mx-auto">
              "I have been a very satisfied user of MD Charts for over 9 years. 
              The program is user friendly for providers, MAs, front desk and billers."
            </blockquote>
            <p className="text-blue-100">— Long-term MDcharts EHR Customer</p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to experience the difference?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of providers who have transformed their practice with MDcharts EHR.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button 
              size="lg" 
              variant="secondary" 
              className="h-14 px-8"
              onClick={() => setModalOpen(true)}
            >
              Schedule Free Demo
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="h-14 px-8 border-white text-white hover:bg-white hover:text-primary"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        requestType="demo"
        title="Schedule Your Free Demo"
      />
    </div>
  );
}
