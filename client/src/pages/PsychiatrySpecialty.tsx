import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Heart, FileText, Calendar, Shield, Pill, Users,
  Check, ArrowRight, Clock, Settings, MessageSquare, Lock,
  Quote
} from "lucide-react";
import psychiatryHeroImage from '@assets/generated_images/psychiatrist_patient_consultation.png';

const features = [
  {
    icon: Settings,
    title: "Configurable Assessments",
    description: "Work with our team to integrate screening tools including PHQ-9, GAD-7, and other validated instruments"
  },
  {
    icon: FileText,
    title: "Progress Note Templates",
    description: "Configure templates for individual therapy, group sessions, and medication management visits"
  },
  {
    icon: Pill,
    title: "Psychotropic Management",
    description: "Set up comprehensive medication tracking with side effect monitoring and drug interaction alerts"
  },
  {
    icon: Calendar,
    title: "Telehealth Integration",
    description: "Configure secure video appointments with documentation workflows for virtual care"
  },
  {
    icon: Users,
    title: "Treatment Planning",
    description: "Customize treatment plan templates with goal tracking and outcome measures"
  },
  {
    icon: Shield,
    title: "Enhanced Privacy",
    description: "Configure 42 CFR Part 2 compliant workflows with granular access controls for sensitive information"
  }
];

const narrativeCards = [
  {
    title: "First Appointment",
    description: "Comprehensive intake with customizable assessment batteries and history gathering"
  },
  {
    title: "Ongoing Care",
    description: "Progress tracking, outcome measurement, and collaborative treatment planning"
  },
  {
    title: "Crisis Support",
    description: "Safety planning, emergency documentation, and care coordination protocols"
  }
];

const privacyFeatures = [
  { title: "42 CFR Part 2", description: "Substance use disorder privacy compliance" },
  { title: "Granular Access", description: "Control who sees what information" },
  { title: "Audit Trails", description: "Complete record access logging" },
  { title: "Consent Management", description: "Track patient authorizations" }
];

const benefits = [
  "Configure substance use disorder workflows",
  "Set up crisis intervention protocols",
  "Customize outcome measurement tracking",
  "Configure prior authorization workflows",
  "Set up collaborative care documentation",
  "Build family therapy note templates"
];

export default function PsychiatrySpecialty() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      {/* Calm Teal Pastel Hero */}
      <section className="pt-28 pb-20 bg-gradient-to-br from-teal-50 via-cyan-50 to-sky-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_left,rgba(94,234,212,0.15)_0%,transparent_50%)]" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_right,rgba(103,232,249,0.15)_0%,transparent_50%)]" />
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Heart className="h-4 w-4" />
                Customizable Solution
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                <span className="text-teal-600">Behavioral Health</span> EHR Designed for Personalized Care
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Our flexible EHR platform adapts to your mental health workflow. Work with our team to configure assessments, treatment planning, and enhanced privacy features for your psychiatry or behavioral health practice.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8 bg-teal-600 hover:bg-teal-700" data-testid="button-psych-consultation">
                    Schedule a Consultation <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="h-12 px-8 border-teal-300 text-teal-700 hover:bg-teal-50">
                    Discuss Your Needs
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-6 bg-gradient-to-br from-teal-200/30 to-cyan-200/30 rounded-3xl blur-2xl" />
                <img src={psychiatryHeroImage} alt="Psychiatrist patient consultation" className="rounded-2xl shadow-xl w-full relative z-10 border-4 border-white" loading="lazy" width="1408" height="768" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Experience Narrative Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Supporting the Patient Journey
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Configure workflows for every stage of behavioral health care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {narrativeCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-3xl p-8 border border-teal-100 h-full text-center hover:shadow-xl transition-shadow">
                  <div className="h-12 w-12 rounded-2xl bg-teal-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-white font-bold text-xl">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{card.title}</h3>
                  <p className="text-slate-600">{card.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How We Customize */}
      <section className="py-20 bg-gradient-to-b from-white to-teal-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              How We Customize MD Charts for Your Practice
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              We work closely with your team to configure an EHR solution that fits your unique behavioral health workflows.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: MessageSquare, step: 1, title: "Consultation", description: "Discuss your behavioral health practice's specific workflow needs and privacy requirements" },
              { icon: Settings, step: 2, title: "Configuration", description: "Our team configures assessment tools, note templates, and privacy controls" },
              { icon: Users, step: 3, title: "Training & Go-Live", description: "Comprehensive training and support for your clinical team" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-3xl p-8 shadow-lg text-center relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-cyan-500" />
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center mx-auto mb-6 shadow-lg">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <div className="inline-block px-4 py-1 rounded-full bg-teal-100 text-teal-700 text-sm font-semibold mb-3">
                  Step {item.step}
                </div>
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
              We configure the specialized tools behavioral health providers need for effective patient care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-2xl p-6 border border-teal-100 hover:shadow-lg transition-all group"
              >
                <div className="h-12 w-12 rounded-xl bg-teal-600 flex items-center justify-center mb-4 group-hover:bg-teal-700 transition-colors">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Assurance - Layered Cards */}
      <section className="py-20 bg-slate-900">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 mb-6">
              <Lock className="h-4 w-4" />
              Enhanced Privacy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Built for Behavioral Health Privacy
            </h2>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              Configure robust privacy controls to protect sensitive patient information.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {privacyFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 hover:border-teal-500/50 transition-colors"
              >
                <Lock className="h-8 w-8 text-teal-400 mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits with Quote */}
      <section className="py-20 bg-gradient-to-br from-teal-600 to-cyan-700">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Tailored to Your Behavioral Health Practice
              </h2>
              <p className="text-teal-100 text-lg mb-8">
                From initial intake to ongoing treatment, we configure MD Charts to support the full spectrum of mental health care delivery.
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
            <div className="bg-white/10 backdrop-blur rounded-3xl p-8 border border-white/20">
              <Quote className="h-12 w-12 text-teal-300 mb-4" />
              <p className="text-xl text-white italic mb-6">
                "We configure every aspect of your EHR to support therapeutic relationships and positive patient outcomes."
              </p>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-teal-500 flex items-center justify-center">
                  <Heart className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-white font-semibold">Patient-Centered Design</div>
                  <div className="text-teal-200 text-sm">MD Charts Implementation Team</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Discuss Your Behavioral Health Practice Needs?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            Schedule a consultation to explore how we can customize MD Charts for your mental health workflows.
          </p>
          <Link href="/book-demo">
            <Button size="lg" className="h-12 px-8 bg-teal-600 hover:bg-teal-700">
              Schedule Your Consultation <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
