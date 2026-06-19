import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Activity, FileText, Calendar, Shield, Scan, Pill,
  Check, ArrowRight, Clock, Settings, MessageSquare, Users
} from "lucide-react";
import gastroHeroImage from '@assets/generated_images/gastroenterologist_reviewing_scan.png';

const features = [
  {
    icon: Settings,
    title: "Configurable Procedure Documentation",
    description: "Work with our team to build custom templates for colonoscopy, EGD, ERCP, and other endoscopic procedures"
  },
  {
    icon: Scan,
    title: "Image & Video Capture",
    description: "Configure endoscopy image capture integration with automatic attachment to patient records"
  },
  {
    icon: FileText,
    title: "Pathology Tracking",
    description: "Set up biopsy result tracking with customizable alerts for abnormal findings requiring follow-up"
  },
  {
    icon: Calendar,
    title: "Surveillance Scheduling",
    description: "Configure automated recall systems for colonoscopy and other screening intervals based on your protocols"
  },
  {
    icon: Pill,
    title: "IBD Management",
    description: "Customize workflows for inflammatory bowel disease monitoring and biologics management"
  },
  {
    icon: Shield,
    title: "Quality Metrics",
    description: "Configure tracking for adenoma detection rates and other GI quality measures specific to your practice"
  }
];

const procedureJourney = [
  { step: 1, title: "Pre-Procedure", items: ["Prep instructions", "Consent forms", "Risk assessment"] },
  { step: 2, title: "Check-In", items: ["Medication review", "IV access", "Sedation planning"] },
  { step: 3, title: "Procedure", items: ["Real-time documentation", "Image capture", "Findings recording"] },
  { step: 4, title: "Recovery", items: ["Post-procedure notes", "Discharge instructions", "Follow-up scheduling"] }
];

const benefits = [
  "Configure pre-procedure prep instruction templates",
  "Customize sedation documentation workflows",
  "Set up polyp surveillance tracking schedules",
  "Configure hepatology-specific workflows",
  "Customize motility study documentation",
  "Build GERD management protocols for your practice"
];

export default function GastroenterologySpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Green-tinted Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-emerald-100/50 to-transparent" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
              <div className="relative">
                <div className="absolute -inset-4 bg-emerald-500/10 rounded-3xl blur-xl" />
                <img src={gastroHeroImage} alt="Gastroenterologist reviewing scan" className="rounded-2xl shadow-2xl w-full relative z-10 border-4 border-white" loading="lazy" width="1408" height="768" />
              </div>
            </div>
            
            <div className="order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Activity className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                <span className="text-emerald-600">GI Care</span> EHR Customized for Your Procedural Flow
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your gastroenterology workflow. Work with our team to configure endoscopy documentation, pathology tracking, and specialized workflows for digestive health.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700" data-testid="button-gastro-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Procedure Day Journey - Vertical Stepper */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configure Your Procedure Day Workflow
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We set up seamless documentation from patient arrival through discharge.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-4 gap-6">
              {procedureJourney.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 1, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-b from-emerald-50 to-teal-50 rounded-2xl p-6 border border-emerald-200 h-full">
                    <div className="absolute -top-4 left-6">
                      <div className="h-8 w-8 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center text-sm shadow-lg">
                        {phase.step}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 mt-4 mb-4">{phase.title}</h3>
                    <ul className="space-y-2">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm text-slate-600">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < procedureJourney.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                      <ArrowRight className="h-6 w-6 text-emerald-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How We Customize */}
      <section className="py-20 bg-gradient-to-b from-white to-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique gastroenterology workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, step: 1, title: "Consultation", description: "Discuss your GI practice's specific workflow needs and endoscopy equipment requirements" },
              { icon: Settings, step: 2, title: "Configuration", description: "Our team configures procedure templates, image capture, and quality tracking" },
              { icon: Users, step: 3, title: "Training & Go-Live", description: "Comprehensive training for your clinical and ASC staff" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-xl border border-emerald-100 text-center"
              >
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold mb-3">
                  Step {item.step}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Card Stack Style */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configure Features for Your GI Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From office visits to ambulatory surgery centers, customize MD Charts to support your complete practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-l-emerald-500 hover:shadow-xl transition-all"
              >
                <div className="h-12 w-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-emerald-600" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-emerald-600 to-teal-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your GI Practice
              </h2>
              <p className="text-emerald-100 text-lg mb-8">
                We configure MD Charts to streamline every aspect of gastroenterology practice, from initial consultation to procedure and follow-up.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Clock className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Your Workflow, Your Way</h3>
                <p className="text-emerald-100">
                  Custom-configured for high-volume endoscopy practices and office-based GI care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Discuss Your GI Practice Needs?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can customize MD Charts for your gastroenterology workflows.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8 bg-emerald-600 hover:bg-emerald-700">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
