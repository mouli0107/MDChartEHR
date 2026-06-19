import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Eye, Scan, FileText, Calendar, Shield, Zap,
  Check, ArrowRight, Clock, Settings, MessageSquare, Users,
  Monitor, Glasses
} from "lucide-react";
import ophthalmologyHeroImage from '@assets/generated_images/ophthalmologist_eye_examination.png';

const features = [
  {
    icon: Settings,
    title: "Configurable Eye Exam Templates",
    description: "Work with our team to build custom documentation templates for routine exams, medical visits, and surgical consultations"
  },
  {
    icon: Scan,
    title: "Diagnostic Integration",
    description: "Configure connections with your OCT, visual field testing, and fundus imaging devices"
  },
  {
    icon: FileText,
    title: "Surgical Documentation",
    description: "Customize templates for cataract, LASIK, retinal, and glaucoma procedures specific to your protocols"
  },
  {
    icon: Calendar,
    title: "Optical Shop Integration",
    description: "Set up workflows for prescriptions, frame selection, and lens orders tailored to your dispensary"
  },
  {
    icon: Shield,
    title: "Compliance Configuration",
    description: "Configure medical necessity documentation and prior authorization workflows for your payers"
  },
  {
    icon: Zap,
    title: "Customizable Data Entry",
    description: "Design efficient data entry screens for visual acuity, refraction, and prescription details"
  }
];

const diagnosticTimeline = [
  { step: 1, title: "Visual Acuity", description: "Configure auto-population from your phoropter" },
  { step: 2, title: "OCT Imaging", description: "Integrate with your specific OCT device" },
  { step: 3, title: "Visual Fields", description: "Import results directly into charts" },
  { step: 4, title: "Fundus Photos", description: "Attach imaging to patient records" }
];

const benefits = [
  "Configure IOP trending and alert thresholds",
  "Customize visual field progression analysis views",
  "Set up contact lens fitting record templates",
  "Configure pre-operative measurement tracking",
  "Customize post-surgical outcome documentation",
  "Configure referral workflows for sub-specialists"
];

export default function OphthalmologySpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Warm Coral/Rose Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-rose-50 via-white to-coral-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-1/4 w-96 h-96 bg-rose-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Eye className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                <span className="bg-gradient-to-r from-rose-500 to-orange-500 bg-clip-text text-transparent">Eye Care</span> EHR Configured Around Your Practice
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your ophthalmology workflow. Work with our team to configure diagnostic integrations, surgical documentation, and optical dispensary management for your practice.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600" data-testid="button-ophtho-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-rose-300 text-rose-700 hover:bg-rose-50">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-rose-400/20 to-orange-400/20 rounded-3xl blur-xl" />
                <img
                  src={ophthalmologyHeroImage}
                  alt="Ophthalmologist eye examination"
                  className="rounded-2xl shadow-2xl w-full max-w-lg relative z-10 ring-1 ring-rose-100"
                  data-testid="img-ophthalmology-hero"
                  loading="lazy"
                  width="1408"
                  height="768"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Diagnostic Equipment Timeline */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Seamless Diagnostic Integration
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We configure your EHR to integrate with your specific diagnostic equipment.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-rose-400 to-orange-400 hidden md:block" />
              
              <div className="space-y-8">
                {diagnosticTimeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 1, x: index % 2 === 0 ? -20 : 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className={`flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                  >
                    <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-6 border border-rose-100">
                        <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                        <p className="text-slate-600">{item.description}</p>
                      </div>
                    </div>
                    <div className="relative z-10 hidden md:flex">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center text-white font-bold shadow-lg">
                        {item.step}
                      </div>
                    </div>
                    <div className="flex-1 hidden md:block" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Customize */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-rose-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique ophthalmology workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, step: 1, title: "Consultation", description: "Discuss your ophthalmology practice's specific workflow needs and diagnostic integration requirements" },
              { icon: Settings, step: 2, title: "Configuration", description: "Our team configures exam templates, device integrations, and optical workflows for your practice" },
              { icon: Users, step: 3, title: "Training & Go-Live", description: "Comprehensive training and support for your clinical and optical staff" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg border border-rose-100 text-center"
              >
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-sm font-bold text-rose-600 mb-2">Step {item.step}</div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Configure Features for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From comprehensive eye exams to complex surgical procedures, customize MD Charts to match your workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-white to-rose-50 rounded-2xl p-6 hover:shadow-xl transition-all border border-rose-100 group"
              >
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-rose-500 to-orange-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
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
      <section className="py-20 bg-gradient-to-br from-rose-500 to-orange-600">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your Eye Care Practice
              </h2>
              <p className="text-rose-100 text-lg mb-8">
                We configure MD Charts to integrate clinical documentation, diagnostic imaging, and practice management into one seamless platform for your practice.
              </p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <Check className="h-5 w-5 text-rose-200" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <Clock className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Your Workflow, Your Way</h3>
                <p className="text-rose-100">
                  Custom-configured for the unique needs of your ophthalmology practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Discuss Your Eye Care Practice Needs?
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Whether you run a clinical practice or a full-service optical center, we can help.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-rose-50 to-orange-50 rounded-2xl p-8 border border-rose-200 text-center">
              <Monitor className="h-12 w-12 text-rose-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Clinical Practice</h3>
              <p className="text-slate-600 mb-6">Configure exam templates, surgical workflows, and diagnostic integrations</p>
              <Link href="/book-demo">
                <Button className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600">
                  Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            
            <div className="bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl p-8 border border-orange-200 text-center">
              <Glasses className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900 mb-2">Optical Shop</h3>
              <p className="text-slate-600 mb-6">Set up dispensary workflows, prescription management, and inventory</p>
              <Link href="/book-demo">
                <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600">
                  Schedule Consultation <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
