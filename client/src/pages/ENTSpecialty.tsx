import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Ear, Mic, FileText, Calendar, Shield, Scan,
  Check, ArrowRight, Clock, Settings, MessageSquare, Users,
  ChevronDown, ChevronUp
} from "lucide-react";
import entHeroImage from '@assets/generated_images/ent_doctor_ear_examination.png';

const subspecialties = [
  { name: "Otology", description: "Ear conditions, hearing loss, and cochlear implants" },
  { name: "Rhinology", description: "Sinus disorders, nasal obstruction, and allergy" },
  { name: "Laryngology", description: "Voice disorders, swallowing issues, and airway" },
  { name: "Head & Neck", description: "Oncology, thyroid, and reconstructive surgery" }
];

const features = [
  {
    icon: Settings,
    title: "Configurable Exam Templates",
    description: "Work with our team to build custom templates for head and neck examinations, hearing evaluations, and sinus assessments",
    details: "Configure specific fields for ear microscopy findings, nasal endoscopy reports, and laryngoscopy documentation."
  },
  {
    icon: Mic,
    title: "Voice & Swallowing Documentation",
    description: "Configure specialized workflows for laryngology, voice disorders, and dysphagia evaluation",
    details: "Set up stroboscopy reporting, voice handicap index tracking, and swallow study integration."
  },
  {
    icon: Scan,
    title: "Audiometry Integration",
    description: "Set up direct import of audiograms and tympanometry results from your specific equipment",
    details: "Configure connections with NOAH-compatible devices and hearing aid fitting software."
  },
  {
    icon: FileText,
    title: "Surgical Procedure Notes",
    description: "Customize templates for tonsillectomy, septoplasty, sinus surgery, and other procedures you perform",
    details: "Build procedure-specific templates with your preferred formatting and required elements."
  },
  {
    icon: Calendar,
    title: "Allergy Testing Workflows",
    description: "Configure allergy testing documentation and immunotherapy tracking for your practice",
    details: "Set up skin testing grids, venom protocols, and sublingual immunotherapy tracking."
  },
  {
    icon: Shield,
    title: "Sleep Medicine Support",
    description: "Set up sleep study documentation and CPAP compliance tracking based on your protocols",
    details: "Configure polysomnography result integration and PAP therapy adherence monitoring."
  }
];

const benefits = [
  "Configure nasal endoscopy documentation templates",
  "Set up hearing aid dispensing record workflows",
  "Customize vertigo and balance testing protocols",
  "Configure pediatric ENT documentation",
  "Set up head and neck cancer screening workflows",
  "Build in-office procedure templates for your practice"
];

export default function ENTSpecialty() {
  const [expandedFeature, setExpandedFeature] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Warm-toned Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-amber-200/40 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Ear className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Specialty-Tuned EHR Workflows for <span className="text-amber-600">Otolaryngology</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your otolaryngology workflow. Work with our team to configure templates and integrations for ear, nose, throat, and head & neck care.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-amber-600 hover:bg-amber-700" data-testid="button-ent-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-amber-300 text-amber-700 hover:bg-amber-50">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <img src={entHeroImage} alt="ENT doctor ear examination" className="rounded-2xl shadow-2xl w-full ring-4 ring-white" loading="lazy" width="1408" height="768" />
            </div>
          </div>
        </div>
      </section>

      {/* Subspecialty Tabs */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900">Configure for Your ENT Subspecialty</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {subspecialties.map((sub, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border border-amber-200 text-center cursor-pointer hover:shadow-lg transition-all"
                data-testid={`card-ent-subspecialty-${index}`}
              >
                <h3 className="font-semibold text-amber-800 mb-1">{sub.name}</h3>
                <p className="text-sm text-slate-600">{sub.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Customize */}
      <section className="py-20 bg-gradient-to-b from-white to-amber-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique ENT workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, step: 1, title: "Consultation", description: "Discuss your ENT practice's specific workflow needs and equipment integration requirements" },
              { icon: Settings, step: 2, title: "Configuration", description: "Our team configures exam templates, audiometry integrations, and surgical workflows" },
              { icon: Users, step: 3, title: "Training & Go-Live", description: "Comprehensive training and support for your entire team" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg border-2 border-amber-200 text-center h-full">
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="h-8 w-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-sm">
                      {item.step}
                    </div>
                  </div>
                  <div className="h-14 w-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-4 mt-4">
                    <item.icon className="h-7 w-7 text-amber-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accordion Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configurable Modules for ENT Practices
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Click to explore how each feature can be customized for your practice.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1 }}
                className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 overflow-hidden"
              >
                <button
                  onClick={() => setExpandedFeature(expandedFeature === index ? null : index)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-amber-100/50 transition-colors"
                  data-testid={`button-ent-feature-${index}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="h-12 w-12 rounded-xl bg-amber-600 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
                      <p className="text-slate-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                  {expandedFeature === index ? (
                    <ChevronUp className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-amber-600 flex-shrink-0" />
                  )}
                </button>
                {expandedFeature === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <div className="bg-white rounded-xl p-4 border border-amber-100">
                      <p className="text-slate-700">{feature.details}</p>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-amber-600 to-orange-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your ENT Practice
              </h2>
              <p className="text-amber-100 text-lg mb-8">
                We configure MD Charts with specialized tools for every aspect of otolaryngology care, from pediatric ear tubes to complex oncology cases.
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
                <p className="text-amber-100">
                  Custom-configured templates designed for your ENT practice needs.
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
            Ready to Discuss Your ENT Practice Needs?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can customize MD Charts for your otolaryngology workflows.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8 bg-amber-600 hover:bg-amber-700">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
