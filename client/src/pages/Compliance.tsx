import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "wouter";
import { Shield, Award, FileCheck, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import complianceHeroImage from "@assets/compliance_us_hero.png";

const certifications = [
  {
    icon: Award,
    title: "ONC 2015 Edition Certified",
    description: "Fully certified Health IT Module meeting all ONC Health IT Certification criteria.",
    color: "bg-amber-100 text-amber-600"
  },
  {
    icon: Shield,
    title: "21st Century Cures Act",
    description: "Compliant with information blocking rules and patient access requirements.",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: Lock,
    title: "HIPAA Compliant",
    description: "Enterprise-grade security with encryption, access controls, and audit logging.",
    color: "bg-emerald-100 text-emerald-600"
  },
  {
    icon: FileCheck,
    title: "MIPS/MACRA Ready",
    description: "Built-in quality measures reporting for Medicare incentive programs.",
    color: "bg-purple-100 text-purple-600"
  }
];

const complianceFeatures = [
  "Real-time eligibility verification",
  "Automated coding assistance",
  "Built-in clinical decision support",
  "Quality measure dashboards",
  "Patient access API (FHIR)",
  "Audit trail logging",
  "Role-based access controls",
  "Secure data encryption",
  "Automated backup systems",
  "Business associate agreements",
  "EPCS certification",
  "Regulatory compliance support"
];

export default function CompliancePage() {
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
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Shield className="h-4 w-4" />
                Compliance & Certification
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
                Certified Secure <br/>
                <span className="text-primary">Compliant</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Meet all regulatory requirements with confidence. Our platform is built with 
                compliance at its core.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="h-12 px-8"
                  onClick={() => setModalOpen(true)}
                  data-testid="button-compliance-demo"
                >
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Request Compliance Guide
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
                  src={complianceHeroImage} 
                  alt="Healthcare data security" 
                  className="w-full h-[450px] object-cover"
                  loading="lazy"
                  width="800"
                  height="450"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/20 to-transparent" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-sm">100% Compliant</p>
                    <p className="text-xs text-slate-500">HIPAA & ONC Certified</p>
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
            Our Certifications
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-slate-50 rounded-xl p-6 border border-slate-100 hover:border-primary/30 hover:shadow-lg transition-all text-center"
              >
                <div className={`h-16 w-16 rounded-full ${cert.color} flex items-center justify-center mb-4 mx-auto`}>
                  <cert.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{cert.title}</h3>
                <p className="text-sm text-slate-600">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Compliance Features
            </h2>
            <p className="text-lg text-slate-600">
              Built-in tools to keep your practice compliant
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {complianceFeatures.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="flex items-center gap-3 bg-white rounded-lg p-4 border border-slate-200"
              >
                <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0" />
                <span className="text-sm font-medium text-slate-700">{feature}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Need Compliance Documentation?
            </h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
              We provide comprehensive compliance documentation including BAAs, security policies, 
              and certification details for your records.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Questions about compliance?
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Our compliance team is here to help you understand how we meet regulatory requirements.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="h-14 px-8"
            onClick={() => setModalOpen(true)}
          >
            Talk to Compliance Team
          </Button>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        requestType="contact"
        title="Contact Compliance Team"
      />
    </div>
  );
}
