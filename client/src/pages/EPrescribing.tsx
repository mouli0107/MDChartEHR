import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Pill, Shield, Zap, FileText, AlertTriangle, Clock,
  Check, ArrowRight
} from "lucide-react";
import eprescribingHeroImage from '@assets/generated_images/e-prescribing_on_tablet_device.png';

const features = [
  {
    icon: Pill,
    title: "EPCS Certified",
    description: "Fully certified for Electronic Prescribing of Controlled Substances with DEA-compliant workflows"
  },
  {
    icon: Zap,
    title: "Fast Prescribing",
    description: "Favorites and templates for commonly prescribed medications to speed up your workflow"
  },
  {
    icon: AlertTriangle,
    title: "Drug Interaction Alerts",
    description: "Real-time alerts for drug-drug interactions, allergies, and contraindications"
  },
  {
    icon: FileText,
    title: "Formulary Checking",
    description: "Instant verification of insurance formulary coverage and therapeutic alternatives"
  },
  {
    icon: Shield,
    title: "Safety & Compliance",
    description: "Built-in safeguards for regulatory compliance and prescribing best practices"
  },
  {
    icon: Clock,
    title: "Refill Management",
    description: "Streamlined refill request processing with pharmacy communication"
  }
];

const benefits = [
  "Medication history access",
  "Pharmacy network connectivity",
  "Automatic generic substitution suggestions",
  "Dosage calculator tools"
];

export default function EPrescribing() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
                <Pill className="h-4 w-4" />
                E-Prescribing
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Safe, Fast <span className="text-primary">E-Prescribing</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                EPCS-certified electronic prescribing with comprehensive drug safety checks, formulary integration, and seamless pharmacy connectivity.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8" data-testid="button-erx-demo">
                    Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <img src={eprescribingHeroImage} alt="E-prescribing on tablet device" className="rounded-2xl shadow-2xl w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete E-Prescribing Solution
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need for safe, efficient, and compliant medication prescribing.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Prescribe with Confidence
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Our e-prescribing module provides comprehensive safety features and regulatory compliance built into every prescription.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <Check className="h-5 w-5 text-white" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">EPCS Certified</h3>
                <p className="text-white/80">
                  DEA-compliant electronic prescribing for controlled substances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Streamline Your Prescribing Workflow
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            See how MDcharts e-prescribing can improve medication safety and efficiency.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8">
              Schedule Your Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
