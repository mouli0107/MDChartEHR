import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { 
  Heart, Target, Users, Award, ArrowRight, Building2
} from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Patient-Centered Innovation",
    description: "Everything we build starts with improving patient care and clinical outcomes."
  },
  {
    icon: Target,
    title: "Specialty Focus",
    description: "We understand that each medical specialty has unique needs requiring tailored solutions."
  },
  {
    icon: Users,
    title: "Partnership Approach",
    description: "We work alongside our customers as partners, not just vendors."
  },
  {
    icon: Award,
    title: "Excellence in Support",
    description: "We're committed to providing exceptional service and support at every step."
  }
];

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <Building2 className="h-4 w-4" />
              About Us
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Practice the way <span className="text-primary">you want.</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              MD Charts is dedicated to transforming healthcare technology with specialty-specific EHR and practice management solutions that let providers focus on what matters most - patient care.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Our Mission</h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                We believe that healthcare technology should enhance the provider-patient relationship, not hinder it. Our mission is to create intuitive, specialty-specific tools that reduce administrative burden and improve clinical workflows.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                MD Charts was founded on the principle that every medical specialty deserves technology designed for its unique clinical and operational needs. We work closely with physicians and practice administrators to build solutions that truly work.
              </p>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-3xl p-12">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Our Vision</h3>
              <p className="text-lg text-slate-700 leading-relaxed">
                To be the leading provider of specialty-focused EHR solutions, empowering medical practices to deliver exceptional patient care while running efficient, profitable operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Values</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we do.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Join the MD Charts Family
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Learn how MD Charts can transform your practice.
          </p>
          <Link href="/book-demo">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
