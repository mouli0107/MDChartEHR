import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Video, Shield, Calendar, FileText, Smartphone, Users,
  Check, ArrowRight
} from "lucide-react";
import telehealthHeroImage from '@assets/generated_images/telehealth_video_consultation.png';

const features = [
  {
    icon: Video,
    title: "HD Video Visits",
    description: "High-quality video conferencing built directly into your EHR workflow"
  },
  {
    icon: Calendar,
    title: "Integrated Scheduling",
    description: "Patients can book virtual or in-person visits through the same scheduling system"
  },
  {
    icon: FileText,
    title: "In-Visit Documentation",
    description: "Document directly during the telehealth visit with templates designed for virtual care"
  },
  {
    icon: Smartphone,
    title: "No App Required",
    description: "Patients join from any browser on phone, tablet, or computer without downloads"
  },
  {
    icon: Shield,
    title: "HIPAA Compliant",
    description: "End-to-end encryption and full HIPAA compliance for secure patient communications"
  },
  {
    icon: Users,
    title: "Multi-Participant Visits",
    description: "Include family members, interpreters, or other care team members in virtual visits"
  }
];

const benefits = [
  "Virtual waiting room",
  "Screen sharing capability",
  "E-visit and asynchronous messaging",
  "Patient consent management",
  "Visit recording options",
  "Integrated e-Prescribing"
];

export default function Telehealth() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Video className="h-4 w-4" />
                Telehealth
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Virtual Care <span className="text-primary">Made Simple</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                HIPAA-compliant telehealth integrated directly into your EHR for seamless virtual visits without switching between applications.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8" data-testid="button-telehealth-demo">
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
            
            <div className="order-first lg:order-last">
              <img src={telehealthHeroImage} alt="Telehealth video consultation" className="rounded-2xl shadow-2xl w-full" loading="lazy" width="1408" height="768" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Telehealth Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to deliver exceptional virtual care experiences.
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
                Expand Your Reach
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Telehealth allows you to see patients from anywhere while maintaining the same quality of care and documentation.
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
                <Video className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">See Patients Anywhere</h3>
                <p className="text-white/80">
                  Deliver care beyond the walls of your practice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ready to Offer Virtual Visits?
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            See how MD Charts telehealth can help you reach more patients.
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
