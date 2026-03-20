import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InlineWidget } from "react-calendly";
import { 
  Calendar, Clock, Video, Check, Shield
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const benefits = [
  { icon: Clock, text: "30-minute personalized walkthrough" },
  { icon: Video, text: "Live demo of your specialty workflows" },
  { icon: Check, text: "Q&A with our EHR specialists" },
  { icon: Shield, text: "No commitment required" }
];

const DEFAULT_CALENDLY_URL = "https://calendly.com/testmouli4/30min?hide_gdpr_banner=1";

export default function BookDemo() {
  const [calendlyUrl, setCalendlyUrl] = useState(DEFAULT_CALENDLY_URL);

  useEffect(() => {
    fetch("/api/settings/calendly")
      .then(r => r.json())
      .then(data => {
        const url = data.url || DEFAULT_CALENDLY_URL;
        setCalendlyUrl(url.includes("hide_gdpr_banner") ? url : url + "?hide_gdpr_banner=1");
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              <motion.div 
                initial="hidden" 
                animate="visible" 
                variants={fadeIn}
                className="lg:sticky lg:top-32"
              >
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                  <Calendar className="h-4 w-4" />
                  SCHEDULE YOUR DEMO
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  See MD Charts
                  <span className="text-primary"> in Action</span>
                </h1>
                
                <p className="text-xl text-slate-600 mb-8">
                  Book a personalized demo and discover how MD Charts can help your practice document faster, get paid sooner, and focus on patient care.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-slate-700 font-medium">{benefit.text}</span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">What to Expect</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Overview of MD Charts EHR & Practice Management
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Specialty-specific template walkthrough
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Revenue cycle & TriZetto integration demo
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      Pricing and implementation timeline
                    </li>
                  </ul>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 1, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
              >
                <div className="p-4 bg-primary text-white text-center">
                  <h2 className="font-bold text-lg">Select a Time That Works for You</h2>
                </div>
                <InlineWidget 
                  url={calendlyUrl}
                  styles={{
                    height: '700px',
                    width: '100%'
                  }}
                  pageSettings={{
                    backgroundColor: 'ffffff',
                    hideEventTypeDetails: false,
                    hideLandingPageDetails: false,
                    primaryColor: '0891b2',
                    textColor: '1e293b'
                  }}
                  prefill={{
                    customAnswers: {}
                  }}
                  utm={{}}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
