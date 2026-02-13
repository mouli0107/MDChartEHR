import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar, Users, CreditCard, ClipboardList, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { ContactModal } from "@/components/ContactModal";
import { Footer } from "@/components/Footer";
import pmHeroImage from "@assets/stock_images/medical_receptionist_ec5e8f75.jpg";

const features = [
  {
    icon: Calendar,
    title: "Smart Scheduling",
    description: "Appointment booking with automated reminders and waitlist management."
  },
  {
    icon: Users,
    title: "Patient Registration",
    description: "Streamlined intake with digital forms, insurance verification, and eligibility checks."
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept payments, manage copays, and automate patient billing with ease."
  },
  {
    icon: BarChart3,
    title: "Practice Analytics",
    description: "Real-time dashboards for appointments, revenue, and operational efficiency."
  }
];

const capabilities = [
  { title: "Appointment Scheduling", desc: "Drag-and-drop calendar with multi-provider views" },
  { title: "Patient Check-In", desc: "Self-service kiosks and mobile check-in options" },
  { title: "Insurance Verification", desc: "Real-time eligibility and benefits verification" },
  { title: "Document Management", desc: "Secure storage and retrieval of patient documents" },
  { title: "Task Management", desc: "Assign and track staff tasks and workflows" },
  { title: "Reporting Suite", desc: "Customizable reports for practice operations" },
  { title: "Billing & Superbills", desc: "Superbill management, EOB/EFT posting, and claims overview" },
  { title: "Multi-Location Support", desc: "Manage multiple practice locations seamlessly" }
];

export default function PracticeManagementPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wide mb-6">
                <ClipboardList className="h-4 w-4" />
                Practice Management
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Run Your Practice. <br/>
                <span className="text-primary">Not Around It.</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Streamline every aspect of your practice operations from scheduling to billing 
                with our comprehensive management platform.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8"
                  onClick={() => setModalOpen(true)}
                  data-testid="button-pm-demo"
                >
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
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
                  src={pmHeroImage} 
                  alt="Medical receptionist helping patient" 
                  className="w-full h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Fewer</p>
                    <p className="text-xs text-slate-500">No-Shows</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Streamline Your Operations
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
                <div className="h-12 w-12 rounded-lg bg-emerald-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Complete Practice Capabilities
            </h2>
            <p className="text-lg text-slate-600">
              Everything you need to manage a modern healthcare practice
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {capabilities.map((cap, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 3 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg p-5 border border-slate-200 hover:border-emerald-300 transition-colors"
              >
                <h3 className="font-bold text-slate-900 mb-1">{cap.title}</h3>
                <p className="text-sm text-slate-500">{cap.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to streamline your practice?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            See how our practice management tools can save you hours every week.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="h-14 px-8"
            onClick={() => setModalOpen(true)}
          >
            Schedule Your Demo
          </Button>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        requestType="demo"
        title="Book Practice Management Demo"
      />
    </div>
  );
}
