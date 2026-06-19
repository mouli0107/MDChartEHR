import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import rcmImage from "@assets/generated_images/abstract_medical_financial_growth_chart.png";
import rcmImageWebp from "@assets/generated_images/abstract_medical_financial_growth_chart.webp";
import rcmImageWebp480 from "@assets/generated_images/abstract_medical_financial_growth_chart_480w.webp";
import rcmImageWebp960 from "@assets/generated_images/abstract_medical_financial_growth_chart_960w.webp";
import { Button } from "./ui/button";
import { Link } from "wouter";

export function RCMSection() {
  return (
    <section id="rcm" className="py-24 bg-slate-900 text-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-500/10 blur-3xl rounded-full translate-x-1/2 translate-y-1/2" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 1, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.25 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading mb-6">
              RCM Services Built to Maximize Clean Claims
            </h2>
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Reduce denials, speed reimbursements, and offload billing burden. We handle the entire billing workflow from eligibility through payment posting so your team can stay focused on patient care.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/10 mb-8">
               <div className="flex gap-4">
                 <div className="bg-emerald-500/20 p-3 rounded-full h-fit">
                   <TrendingUp className="h-6 w-6 text-emerald-400" />
                 </div>
                 <div>
                   <p className="font-medium text-emerald-100 italic">
                     "One clinic grew from <span className="text-white font-bold">$300k</span> to over <span className="text-white font-bold">$1 million</span> in annual collections after switching to MD Charts RCM."
                   </p>
                   <p className="text-[10px] text-slate-400 mt-2">*Individual results vary based on organizational size, specialty, payer mix, and implementation factors.</p>
                 </div>
               </div>
            </div>

            <ul className="space-y-4 mb-10">
              {[
                "Front-End & Charge Capture",
                "Comprehensive Claims Processing",
                "Payments & Account Management",
                "Patient & Practice Support"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                  </div>
                  <span className="text-slate-200">{item}</span>
                </li>
              ))}
            </ul>

            <Link href="/rcm">
              <Button size="lg" className="bg-white text-slate-900 hover:bg-slate-100 border-none">
                Explore Full RCM Services <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
             initial={{ opacity: 1, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.25 }}
             className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-700">
              <picture>
                <source srcSet={`${rcmImageWebp480} 480w, ${rcmImageWebp960} 960w, ${rcmImageWebp} 1408w`} sizes="(max-width: 1024px) 100vw, 50vw" type="image/webp" />
                <img src={rcmImage} alt="Financial Analytics" className="w-full h-auto" loading="lazy" width="1408" height="768" />
              </picture>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
