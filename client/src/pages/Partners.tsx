import { Link } from "wouter";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Handshake, Building2, FlaskConical, CreditCard, Cloud, ArrowRight, ExternalLink
} from "lucide-react";

import acogLogo from "@assets/acog_logo.png";
import twilioLogo from "@assets/twilio_logo.png";
import trizettoLogo from "@assets/trizetto_logo.png";
import drfirstLogo from "@assets/drfirst_logo.png";

const partners = [
  {
    name: "ACOG",
    fullName: "The American College of Obstetricians and Gynecologists",
    logo: acogLogo,
    category: "Clinical Partner",
    description: "MD Charts partners with ACOG to ensure our OB/GYN templates and clinical workflows align with the latest guidelines and best practices for women's healthcare.",
    website: "https://www.acog.org"
  },
  {
    name: "Twilio",
    fullName: "Communication Platform",
    logo: twilioLogo,
    category: "Technology Partner",
    description: "Twilio powers our secure patient communication features, including appointment reminders, two-factor authentication, and HIPAA-compliant SMS messaging.",
    website: "https://www.twilio.com"
  },
  {
    name: "TriZetto",
    fullName: "Provider Solutions",
    logo: trizettoLogo,
    category: "Clearinghouse Partner",
    description: "TriZetto Provider Solutions serves as our primary clearinghouse partner, enabling seamless electronic claims submission, real-time eligibility verification, and ERA/EOB processing.",
    website: "https://www.trizettoprovider.com"
  },
  {
    name: "DrFirst",
    fullName: "Unite the Healthiverse",
    logo: drfirstLogo,
    category: "e-Prescribing Partner",
    description: "DrFirst provides our EPCS-certified e-Prescribing engine, powering electronic prescriptions with medication history, drug interaction alerts, formulary checks, and pharmacy routing.",
    website: "https://www.drfirst.com"
  }
];

const partnerTypes = [
  {
    icon: FlaskConical,
    title: "Laboratory Partners",
    description: "We integrate with major national and regional laboratory networks to provide seamless electronic ordering and result delivery."
  },
  {
    icon: CreditCard,
    title: "Clearinghouse Partners",
    description: "Our clearinghouse integrations enable efficient claims submission, eligibility verification, and ERA processing."
  },
  {
    icon: Cloud,
    title: "Technology Partners",
    description: "We partner with leading healthcare technology providers to extend the capabilities of our platform."
  },
  {
    icon: Building2,
    title: "Health System Partners",
    description: "We work with health systems and HIEs to enable interoperability and care coordination across organizations."
  }
];

export default function Partners() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Handshake className="h-4 w-4" />
              Partners
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Our Partner <span className="text-primary">Ecosystem</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              MD Charts works with industry-leading partners to provide comprehensive solutions for medical practices.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-primary uppercase tracking-widest mb-2">Trusted Integrations & Partners</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900">
              Built on Best-in-Class Partnerships
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-slate-200 p-8 hover:shadow-xl transition-all duration-300 group"
                data-testid={`card-partner-${partner.name.toLowerCase()}`}
              >
                <div className="flex items-start gap-6">
                  <div className="w-32 h-20 flex-shrink-0 flex items-center justify-center bg-slate-50 rounded-xl p-3 group-hover:bg-white group-hover:shadow-sm transition-all">
                    <img 
                      src={partner.logo} 
                      alt={partner.name} 
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">{partner.category}</span>
                    <h3 className="text-xl font-bold text-slate-900 mt-1">{partner.name}</h3>
                    <p className="text-sm text-slate-500">{partner.fullName}</p>
                  </div>
                </div>
                <p className="text-slate-600 mt-5 leading-relaxed">{partner.description}</p>
                <a 
                  href={partner.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary mt-4 hover:underline"
                  data-testid={`link-partner-${partner.name.toLowerCase()}`}
                >
                  Visit Website <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Integration Categories</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Our platform connects with partners across key areas of healthcare operations.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partnerTypes.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-6 text-center hover:shadow-lg transition-shadow"
              >
                <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <partner.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{partner.title}</h3>
                <p className="text-slate-600 text-sm">{partner.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Become a Partner</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We're always looking to expand our partner ecosystem to better serve our customers. If your organization provides services that complement our EHR platform, we'd love to hear from you.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-12 px-8">
                Contact Our Partnership Team <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Learn More About MD Charts
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Discover how our integrated platform can benefit your practice.
          </p>
          <Link href="/book-demo">
            <Button size="lg" variant="secondary" className="h-12 px-8">
              Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
