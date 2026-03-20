import { motion } from "framer-motion";
import { Smartphone, MessageSquare, Calendar, CreditCard, ArrowRight, Heart, Video, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import patientHeroImage from "@assets/stock_images/senior_woman_patient_eb20284f.jpg";
import telehealthVideo from "@assets/generated_videos/telehealth_patient_pip.mp4";

const features = [
  {
    icon: Smartphone,
    title: "Patient Portal",
    description: "24/7 access to health records, lab results, and visit summaries from any device."
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "HIPAA-compliant communication between patients and care teams."
  },
  {
    icon: Calendar,
    title: "Online Scheduling",
    description: "Let patients book, reschedule, and manage appointments online."
  },
  {
    icon: CreditCard,
    title: "Online Bill Pay",
    description: "Convenient payment options with automated payment plans available."
  }
];

const portalFeatures = [
  "View Medical Records",
  "Access Lab Results",
  "Message Your Provider",
  "Book Appointments",
  "Pay Bills Online",
  "Complete Forms",
  "Update Demographics",
  "View Visit Summaries",
  "Download Records",
  "Receive Reminders"
];

export default function PatientEngagementPage() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Telehealth Section - Hero Position */}
      <section className="pt-28 pb-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-primary/5 via-cyan-100/20 to-transparent rounded-full blur-3xl"></div>
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-2 lg:order-1"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
                <video 
                  src={telehealthVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Video className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">Live Telehealth</p>
                    <p className="text-xs text-slate-500">Secure Video Visits</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="order-1 lg:order-2"
            >
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Video className="h-4 w-4" />
                Telehealth Integration
              </div>
              
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 leading-tight">
                Virtual Care, <span className="text-primary">Real Connection</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                Provide face-to-face consultations from anywhere. Our integrated telehealth platform 
                enables seamless video visits with full EHR integration, automated documentation, 
                and secure patient communication.
              </p>
              
              <div className="space-y-3 mb-8">
                {[
                  "HD video consultations with screen sharing",
                  "Automatic visit documentation and billing",
                  "Integrated with patient portal for easy access",
                  "HIPAA-compliant and fully encrypted",
                  "Works on desktop, tablet, and mobile"
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-slate-700">{feature}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Connect With Your Patients
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all"
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

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Patient Portal Features
            </h2>
            <p className="text-lg text-slate-600">
              Give patients the tools they need to manage their healthcare
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {portalFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 bg-white rounded-lg p-4 border border-slate-200"
              >
                <div className="h-2 w-2 rounded-full bg-purple-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { stat: "Fewer", label: "Phone Calls with Portal" },
              { stat: "Growing", label: "Patient Portal Adoption" },
              { stat: "High", label: "Patient Satisfaction" }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8"
              >
                <div className="text-5xl font-extrabold text-primary mb-2">{item.stat}</div>
                <div className="text-slate-600 font-medium">{item.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to improve patient engagement?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            See how our patient engagement tools can transform your practice.
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
