import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import mobileAppHeroImage from '@assets/generated_images/mobile_ehr_app_usage.png';
import { 
  Smartphone, Bell, FileText, Shield, Zap, Cloud,
  Check, ArrowRight
} from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Full EHR on Mobile",
    description: "Access patient charts, documentation, and clinical tools from your phone or tablet"
  },
  {
    icon: Bell,
    title: "Real-Time Alerts",
    description: "Push notifications for critical lab results, messages, and schedule changes"
  },
  {
    icon: FileText,
    title: "Mobile Documentation",
    description: "Document visits, sign charts, and complete tasks from anywhere"
  },
  {
    icon: Zap,
    title: "Quick Actions",
    description: "Common tasks optimized for mobile with touch-friendly interface"
  },
  {
    icon: Cloud,
    title: "Offline Access",
    description: "View critical patient information even without internet connection"
  },
  {
    icon: Shield,
    title: "Secure Access",
    description: "Biometric login, remote wipe, and enterprise-grade security"
  }
];

const benefits = [
  "iOS and Android compatible",
  "View and sign orders",
  "Check schedules on-the-go",
  "Prescription management",
  "Secure messaging",
  "Voice dictation support"
];

export default function MobileApp() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Smartphone className="h-4 w-4" />
                Mobile App
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Your Practice <span className="text-primary">In Your Pocket</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Access your full EHR from anywhere with our powerful mobile application for iOS and Android devices.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8" data-testid="button-mobile-demo">
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
              <img src={mobileAppHeroImage} alt="Mobile EHR app usage" className="rounded-2xl shadow-2xl w-full" loading="lazy" width="1408" height="768" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Mobile Experience
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Everything you need to manage your practice from your mobile device.
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
                Work From Anywhere
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Whether you're rounding at the hospital, on call, or away from the office, stay connected to your practice.
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
                <Smartphone className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Always Available</h3>
                <p className="text-white/80">
                  Your EHR is just a tap away.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Take MD Charts On The Go
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            See how our mobile app can keep you connected to your practice.
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
