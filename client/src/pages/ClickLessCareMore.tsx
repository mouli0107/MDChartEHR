import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Sparkles, Calendar, FlaskConical, Pill, MessageSquare, 
  ArrowRight, CheckCircle, Zap, Clock, MousePointer
} from "lucide-react";
import heroImage from "@assets/generated_images/efficient_doctor_using_technology.png";
import techImage from "@assets/generated_images/healthcare_technology_abstract_concept.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const features = [
  {
    icon: Sparkles,
    title: "The Ultra-Customizable EHR",
    description: "MD Charts adapts to your practice's workflow",
    benefits: [
      "Notes designed to match your provider's requirements",
      "Customizable down to both role and user levels",
      "Less time in front of screens, more time in front of patients"
    ]
  },
  {
    icon: Calendar,
    title: "Appointment Scheduling",
    description: "All-in-one platform with built-in scheduling",
    benefits: [
      "No more clicking between screens - at-a-glance view",
      "Multiple appointment bookings supported",
      "Ideal for practices with single or multiple locations"
    ]
  },
  {
    icon: FlaskConical,
    title: "Electronic Lab Orders & Results",
    description: "Interface with virtually any local or national lab",
    benefits: [
      "Electronically transmit orders and receive results",
      "Automated flagging of abnormal results",
      "Track and trend results over time"
    ]
  },
  {
    icon: Pill,
    title: "e-Prescribing Made Simple",
    description: "Reduce screen hopping with smart prescribing",
    benefits: [
      "e-Prescribe from multiple locations on any note",
      "Create and share favorites and most used medication lists",
      "e-Prescribe/Refill from your mobile device or tablet"
    ]
  },
  {
    icon: MessageSquare,
    title: "Take Control of Messaging",
    description: "Streamlined communication for your entire practice",
    benefits: [
      "Intra-Office Messaging - no more sticky notes",
      "Patient Portal for secure communication",
      "Full conversation history with delivery receipts"
    ]
  }
];


export default function ClickLessCareMore() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero with Image */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <MousePointer className="h-4 w-4" />
                OUR PHILOSOPHY
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Click Less, <span className="text-primary">Care More</span>
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                Click less utilizing automation, customization, and workflow optimization tools to streamline your practice and care more for your patients.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    See It In Action <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={heroImage} 
                  alt="Doctor using tablet efficiently" 
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  width="800"
                  height="400"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">75%</p>
                    <p className="text-sm text-slate-500">Fewer Clicks</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>


      {/* Philosophy with Image */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                ClickLess CareMore Technology
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                MD Charts was designed with customization as a forethought and not an afterthought, resulting in an agile platform to meet your needs and adapt to your practice.
              </p>
              <ul className="space-y-4">
                {["Automation that saves hours daily", "Customization for every specialty", "Workflow optimization built-in"].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-primary flex-shrink-0" />
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <img 
                src={techImage} 
                alt="Healthcare technology interface" 
                className="w-full h-[350px] object-cover"
                loading="lazy"
                width="800"
                height="350"
              />
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
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Help You Click Less
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every feature designed to reduce clicks and increase patient care time
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 1, x: idx % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center shadow-lg">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600 mb-4">{feature.description}</p>
                    
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                          <span className="text-slate-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Click Less and Care More?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              See how our workflow optimization can transform your practice
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Contact Us
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
