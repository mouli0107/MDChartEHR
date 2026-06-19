import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { 
  Headphones, Phone, Mail, Clock, MessageSquare, 
  BookOpen, Video, Users, ArrowRight, CheckCircle 
} from "lucide-react";
import heroImage from "@assets/generated_images/medical_support_team_helping.png";
import heroImageWebp from "@assets/generated_images/medical_support_team_helping.webp";
import heroImageWebp480 from "@assets/generated_images/medical_support_team_helping_480w.webp";
import heroImageWebp960 from "@assets/generated_images/medical_support_team_helping_960w.webp";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const supportOptions = [
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support team for immediate assistance",
    action: "(516) 684-9521",
    actionType: "phone"
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "Send us a detailed message and we'll respond within 24 hours",
    action: "info@mdchartsehr.com",
    actionType: "email"
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our team in real-time during business hours",
    action: "Start Chat",
    actionType: "chat"
  }
];

const supportFeatures = [
  "Dedicated account manager for your practice",
  "24/7 emergency support available",
  "Free training sessions for new staff",
  "Regular system updates and maintenance",
  "Custom workflow optimization assistance",
  "HIPAA-compliant data protection"
];

export default function Support() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <Headphones className="h-4 w-4" />
              WORLD-CLASS SUPPORT
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Support
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              MD Charts prides itself on providing world-class support to each and every client. Our team is here to help you succeed.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <picture>
                <source srcSet={`${heroImageWebp480} 480w, ${heroImageWebp960} 960w, ${heroImageWebp} 1408w`} sizes="(max-width: 1024px) 100vw, 50vw" type="image/webp" />
                <img 
                src={heroImage} 
                alt="Professional support team helping customers" 
                className="w-full h-[350px] object-cover"
                loading="lazy"
                width="800"
                height="350"
              />
              </picture>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Support Options */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {supportOptions.map((option, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <option.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{option.title}</h3>
                <p className="text-slate-600 mb-6">{option.description}</p>
                
                {option.actionType === "phone" && (
                  <a 
                    href={`tel:${option.action.replace(/[^0-9]/g, '')}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    <Phone className="h-4 w-4" />
                    {option.action}
                  </a>
                )}
                {option.actionType === "email" && (
                  <a 
                    href={`mailto:${option.action}`}
                    className="inline-flex items-center gap-2 text-primary font-bold hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {option.action}
                  </a>
                )}
                {option.actionType === "chat" && (
                  <Button variant="outline" className="gap-2">
                    <MessageSquare className="h-4 w-4" />
                    {option.action}
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Support Hours */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
              className="grid md:grid-cols-2 gap-12 items-center"
            >
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">
                  Support Hours
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <Clock className="h-6 w-6 text-primary" />
                    <div>
                      <p className="font-bold text-slate-900">Monday - Friday</p>
                      <p className="text-slate-600">9:00 AM - 6:00 PM EST</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-white rounded-xl border border-slate-100">
                    <Headphones className="h-6 w-6 text-emerald-500" />
                    <div>
                      <p className="font-bold text-slate-900">Emergency Support</p>
                      <p className="text-slate-600">Available 24/7 for critical issues</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
                <h3 className="text-xl font-bold text-slate-900 mb-6">What We Offer</h3>
                <ul className="space-y-4">
                  {supportFeatures.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-slate-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Additional Resources
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Get the most out of your MD Charts EHR system with our training resources
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <BookOpen className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Documentation</h3>
              <p className="text-slate-600 text-sm">Comprehensive guides and tutorials for all features</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.15 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <Video className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Video Training</h3>
              <p className="text-slate-600 text-sm">Step-by-step video tutorials for your team</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.9, y: 5 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2 }}
              className="bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:shadow-lg transition-shadow"
            >
              <Users className="h-8 w-8 text-primary mb-4" />
              <h3 className="font-bold text-slate-900 mb-2">Live Training</h3>
              <p className="text-slate-600 text-sm">Schedule personalized training sessions</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Need Help Getting Started?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a demo and see how MD Charts EHR can transform your practice
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
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
