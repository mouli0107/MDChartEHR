import { Link } from "wouter";
import { motion } from "framer-motion";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Brain, Activity, FileText, Calendar, Shield, Pill,
  Check, ArrowRight, Clock, Settings, MessageSquare, Users
} from "lucide-react";
import neurologyHeroImage from '@assets/generated_images/neurologist_analyzing_brain_scan.png';

const features = [
  {
    icon: Settings,
    title: "Configurable Exam Templates",
    description: "Work with our team to build custom templates for cranial nerve, motor, sensory, and cognitive assessments"
  },
  {
    icon: Activity,
    title: "EEG & EMG Integration",
    description: "Configure integration with your neurodiagnostic equipment and study results"
  },
  {
    icon: FileText,
    title: "Symptom Tracking",
    description: "Set up patient-reported headache and seizure logs integrated directly into clinical workflows"
  },
  {
    icon: Pill,
    title: "Medication Management",
    description: "Configure tracking for anti-epileptics, disease-modifying therapies, and titration schedules"
  },
  {
    icon: Calendar,
    title: "Movement Disorder Tracking",
    description: "Customize standardized scales and progression monitoring for Parkinson's and other conditions"
  },
  {
    icon: Shield,
    title: "Stroke Documentation",
    description: "Configure acute stroke protocols with time-stamped documentation and NIHSS scoring"
  }
];

const carePathways = [
  { 
    id: "headache", 
    label: "Headache & Migraine",
    items: ["Migraine tracking diaries", "Trigger identification", "Treatment response monitoring", "Preventive therapy tracking"]
  },
  { 
    id: "epilepsy", 
    label: "Epilepsy",
    items: ["Seizure frequency logging", "AED level monitoring", "VNS programming records", "Surgical evaluation workflows"]
  },
  { 
    id: "ms", 
    label: "Multiple Sclerosis",
    items: ["Relapse documentation", "EDSS scoring", "DMT administration", "MRI comparison tracking"]
  },
  { 
    id: "movement", 
    label: "Movement Disorders",
    items: ["UPDRS scoring", "DBS programming", "Botox injection tracking", "Functional assessments"]
  }
];

const benefits = [
  "Configure multiple sclerosis management workflows",
  "Set up epilepsy monitoring and documentation",
  "Customize dementia assessment tools",
  "Configure sleep disorder documentation templates",
  "Set up neuromuscular disease tracking",
  "Build headache center protocols for your practice"
];

export default function NeurologySpecialty() {
  const [activePathway, setActivePathway] = useState("headache");
  const activePathwayData = carePathways.find(p => p.id === activePathway);

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Cool Gray/Slate Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-gray-800 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(148,163,184,0.2)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_70%,rgba(100,116,139,0.15)_0%,transparent_40%)]" />
          {/* Neural network dots */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-slate-400 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Brain className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <span className="text-cyan-400">Neurology</span>-Focused EHR Engineered to Fit Your Clinic
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your neurology workflow. Work with our team to configure exam templates, neurodiagnostic integrations, and specialized workflows for complex neurological conditions.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-cyan-500 hover:bg-cyan-600" data-testid="button-neuro-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-slate-500 text-slate-200 hover:bg-slate-700">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-slate-500/20 rounded-3xl blur-xl" />
                <img src={neurologyHeroImage} alt="Neurologist analyzing brain scan" className="rounded-2xl shadow-2xl w-full relative z-10 ring-2 ring-slate-600/30" loading="lazy" width="1408" height="768" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Care Pathways - Tabbed Interface */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configurable Care Pathways
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We configure specialized workflows for your neurological subspecialty focus.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {carePathways.map((pathway) => (
                <button
                  key={pathway.id}
                  onClick={() => setActivePathway(pathway.id)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all ${
                    activePathway === pathway.id
                      ? 'bg-slate-700 text-white shadow-lg'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                  data-testid={`button-neuro-pathway-${pathway.id}`}
                >
                  {pathway.label}
                </button>
              ))}
            </div>
            
            <motion.div
              key={activePathway}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-slate-50 to-gray-100 rounded-2xl p-8 border border-slate-200"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6">{activePathwayData?.label} Configuration</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {activePathwayData?.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-200">
                    <div className="h-8 w-8 rounded-lg bg-slate-700 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-white" />
                    </div>
                    <span className="text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How We Customize */}
      <section className="py-20 bg-gradient-to-b from-white to-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique neurology workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, step: 1, title: "Consultation", description: "Discuss your neurology practice's specific workflow needs and diagnostic integration requirements" },
              { icon: Settings, step: 2, title: "Configuration", description: "Our team configures exam templates, device integrations, and disease management workflows" },
              { icon: Users, step: 3, title: "Training & Go-Live", description: "Comprehensive training and support for your clinical team" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="relative inline-block mb-6">
                  <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center mx-auto shadow-xl rotate-3 hover:rotate-0 transition-transform">
                    <item.icon className="h-10 w-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-cyan-500 text-white font-bold flex items-center justify-center text-sm border-2 border-white">
                    {item.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configure Features for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We understand the complexity of neurological conditions and configure tools to help you manage them effectively.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200 hover:border-slate-400 transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-slate-700 to-gray-800 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-gradient-to-br from-slate-800 to-gray-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your Neurology Practice
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                From initial consultation to long-term disease management, we configure MD Charts with the tools you need for exceptional neurological care.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="h-6 w-6 rounded-full bg-cyan-500/30 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-slate-600/30">
              <div className="text-center">
                <Clock className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Complex Care Made Simple</h3>
                <p className="text-slate-300">
                  Custom-configured workflows for managing chronic neurological conditions.
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
            Ready to Discuss Your Neurology Practice Needs?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can customize MD Charts for your neurological care delivery.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8 bg-slate-700 hover:bg-slate-800">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
