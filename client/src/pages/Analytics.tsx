import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/Footer";
import { 
  BarChart3, TrendingUp, FileText, Target, Clock, Shield,
  Check, ArrowRight
} from "lucide-react";
import analyticsHeroImage from '@assets/generated_images/healthcare_analytics_dashboard.png';

const features = [
  {
    icon: BarChart3,
    title: "Practice Dashboards",
    description: "Real-time visibility into key performance indicators and practice metrics"
  },
  {
    icon: TrendingUp,
    title: "Financial Analytics",
    description: "Track revenue, collections, and payer performance with detailed breakdowns"
  },
  {
    icon: Target,
    title: "Quality Measures",
    description: "Support for quality program reporting and compliance tracking"
  },
  {
    icon: Clock,
    title: "Operational Insights",
    description: "Analyze wait times, no-show rates, and appointment utilization"
  },
  {
    icon: Shield,
    title: "Compliance Tracking",
    description: "Monitor regulatory requirements and maintain compliance documentation"
  }
];

const benefits = [
  "Provider productivity tracking",
  "Payer mix analysis",
  "Denial management reports",
  "Patient demographics insights",
  "Referral pattern analysis",
  "Appointment scheduling trends"
];

export default function Analytics() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <BarChart3 className="h-4 w-4" />
                Reporting & Analytics
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
                Data-Driven <span className="text-primary">Practice Insights</span>
              </h1>
              
              <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                Comprehensive analytics and reporting tools to help you understand performance, improve operations, and grow your practice.
              </p>
              
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="h-12 px-8" data-testid="button-analytics-demo">
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
              <img src={analyticsHeroImage} alt="Healthcare analytics dashboard" className="rounded-2xl shadow-2xl w-full" loading="lazy" width="1408" height="768" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Analytics Platform
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Turn your practice data into actionable insights for better decision-making.
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
                Make Informed Decisions
              </h2>
              <p className="text-white/90 text-lg mb-8">
                Our analytics tools give you the visibility you need to identify opportunities and address challenges proactively.
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
                <TrendingUp className="h-16 w-16 text-white mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">See the Big Picture</h3>
                <p className="text-white/80">
                  Comprehensive insights for practice success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Unlock Your Practice Data
          </h2>
          <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
            See how MD Charts analytics can help you optimize your practice performance.
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
