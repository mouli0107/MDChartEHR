import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Users, Calendar, FileText, MessageSquare, CreditCard, Shield,
  Check, ArrowRight
} from "lucide-react";
import patientPortalHeroImage from '@assets/generated_images/patient_portal_on_devices.png';

const features = [
  {
    icon: Calendar,
    title: "Online Scheduling",
    description: "Patients can view availability and book appointments directly through the portal"
  },
  {
    icon: FileText,
    title: "Health Records Access",
    description: "Secure access to lab results, visit summaries, and other health documents"
  },
  {
    icon: MessageSquare,
    title: "Secure Messaging",
    description: "HIPAA-compliant communication between patients and your care team"
  },
  {
    icon: CreditCard,
    title: "Online Bill Pay",
    description: "Easy payment options for copays, balances, and outstanding bills"
  },
  {
    icon: Users,
    title: "Family Access",
    description: "Proxy access for parents, caregivers, and authorized family members"
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Multi-factor authentication and enterprise-grade security for patient data"
  }
];

const benefits = [
  "Prescription refill requests",
  "Referral status tracking",
  "Pre-visit questionnaires",
  "Appointment reminders",
  "Educational resources",
  "Immunization records"
];

export default function PatientPortal() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Users className="h-4 w-4" />
                Patient Portal
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Engage Your <span className="text-primary">Patients</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                A secure, user-friendly patient portal that empowers patients to manage their health and communicate with your practice.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8" data-testid="button-portal-demo">
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
              <img src={patientPortalHeroImage} alt="Patient portal on devices" className="rounded-2xl shadow-2xl w-full" loading="lazy" width="1408" height="768" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Comprehensive Patient Engagement
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Give patients the tools they need to be active participants in their healthcare.
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
                Improve Patient Satisfaction
              </h2>
              <p className="text-white/90 text-lg mb-8">
                A well-designed patient portal improves satisfaction, reduces phone calls, and helps patients stay connected to their care.
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
                <MessageSquare className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Stay Connected</h3>
                <p className="text-white/80">
                  Secure communication that works for patients and staff.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Empower Your Patients Today
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            See how our patient portal can transform your practice's patient engagement.
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
