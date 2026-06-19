import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Bone, Activity, Stethoscope, FileText, Calendar, Shield,
  Check, ArrowRight, Clock, Users, Settings, MessageSquare,
  TrendingUp, Target, Zap
} from "lucide-react";
import orthopedicsHeroImage from '@assets/generated_images/orthopedic_specialist_examining_x-ray.png';

const features = [
  {
    icon: Settings,
    title: "Configurable Templates",
    description: "Work with our team to build custom documentation templates for joint assessments, fracture management, and post-surgical care"
  },
  {
    icon: Activity,
    title: "Physical Therapy Integration",
    description: "Set up seamless referral workflows and progress tracking for rehabilitation programs tailored to your practice"
  },
  {
    icon: Stethoscope,
    title: "Surgical Workflow Configuration",
    description: "Configure pre-op to post-op documentation workflows with procedure-specific templates designed for your protocols"
  },
  {
    icon: FileText,
    title: "Imaging Integration",
    description: "Connect X-rays, MRIs, and CT scans directly within the patient chart based on your imaging partners"
  },
  {
    icon: Calendar,
    title: "Procedure Scheduling",
    description: "Customize scheduling workflows for consultations, injections, and surgical procedures"
  },
  {
    icon: Shield,
    title: "Compliance Ready",
    description: "Configure documentation for workers' compensation and insurance requirements specific to your state"
  }
];

const stats = [
  { icon: TrendingUp, label: "Workflow Efficiency", value: "Optimized" },
  { icon: Target, label: "Documentation", value: "Streamlined" },
  { icon: Zap, label: "Implementation", value: "Rapid" },
  { icon: Users, label: "Support", value: "Dedicated" }
];

const procedures = [
  { name: "Joint Replacement", description: "Configure pre-op, intra-op, and post-op documentation workflows" },
  { name: "Fracture Care", description: "Set up imaging integration and casting/splinting documentation" },
  { name: "Sports Medicine", description: "Build injury assessment and rehabilitation tracking protocols" },
  { name: "Spine Surgery", description: "Configure specialized neurological assessment templates" }
];

const benefits = [
  "Configure musculoskeletal assessments to your protocols",
  "Customize pain scale documentation templates",
  "Set up joint injection tracking and history logs",
  "Configure surgical outcome tracking dashboards",
  "Customize DME ordering and tracking workflows",
  "Build sports medicine protocols for your practice"
];

export default function OrthopedicsSpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Dark Slate Hero with X-ray aesthetic */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.1)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.15)_0%,transparent_40%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Settings className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                Tailored EHR Platform Built for <span className="text-cyan-400">Orthopedic</span> Teams
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your orthopedic workflow. Work with our team to configure templates and integrations tailored specifically for surgeons, sports medicine physicians, and musculoskeletal specialists.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-cyan-500 hover:bg-cyan-600" data-testid="button-ortho-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-slate-600 text-white hover:bg-slate-800">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-cyan-500/20 rounded-3xl blur-xl" />
                <img src={orthopedicsHeroImage} alt="Orthopedic specialist examining X-ray" className="rounded-2xl shadow-2xl w-full relative z-10 border border-slate-700" loading="lazy" width="1408" height="768" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="py-6 bg-slate-800 border-y border-slate-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="flex items-center gap-3 justify-center">
                <div className="h-10 w-10 rounded-lg bg-cyan-500/20 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-cyan-400" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-slate-400">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Procedure Playbooks */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Procedure-Specific Configuration
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We configure workflows for your specific orthopedic procedures and protocols.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {procedures.map((procedure, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl p-6 border border-slate-200 hover:border-cyan-300 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4 group-hover:bg-cyan-600 transition-colors">
                  <Bone className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{procedure.name}</h3>
                <p className="text-slate-600 text-sm">{procedure.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Customize - Horizontal Timeline */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique orthopedic workflows.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-0">
            <div className="flex-1 max-w-xs text-center p-6">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="text-sm font-bold text-cyan-600 mb-2">Step 1</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Consultation</h3>
              <p className="text-slate-600 text-sm">Discuss your orthopedic practice's specific workflow needs</p>
            </div>
            
            <div className="hidden md:block w-24 h-0.5 bg-slate-300" />
            
            <div className="flex-1 max-w-xs text-center p-6">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Settings className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="text-sm font-bold text-cyan-600 mb-2">Step 2</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Configuration</h3>
              <p className="text-slate-600 text-sm">Our team configures templates and integrations for your practice</p>
            </div>
            
            <div className="hidden md:block w-24 h-0.5 bg-slate-300" />
            
            <div className="flex-1 max-w-xs text-center p-6">
              <div className="h-16 w-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-cyan-400" />
              </div>
              <div className="text-sm font-bold text-cyan-600 mb-2">Step 3</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Training & Go-Live</h3>
              <p className="text-slate-600 text-sm">Comprehensive training and support for your team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configure Features for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Every feature can be tailored to match the unique needs of your orthopedic medicine practice.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow border border-slate-100"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-800 flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-cyan-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits - Dark Theme */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your Orthopedic Practice
              </h2>
              <p className="text-slate-300 text-lg mb-8">
                From initial consultation to post-operative follow-up, we configure MD Charts to support every aspect of your orthopedic care delivery.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <div className="h-6 w-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0">
                      <Check className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-slate-200">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-700">
              <div className="text-center">
                <Clock className="h-16 w-16 text-cyan-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Your Workflow, Your Way</h3>
                <p className="text-slate-400">
                  Custom-configured templates and workflows help you document faster and focus on patient care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-slate-800 to-slate-900">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Discuss Your Orthopedic Practice Needs?
          </h2>
          <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can customize MD Charts for your orthopedic workflows.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8 bg-cyan-500 hover:bg-cyan-600">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
