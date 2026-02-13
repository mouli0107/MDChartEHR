import { motion } from "framer-motion";
import { ShieldCheck, Lock, FileCheck, Server } from "lucide-react";
import shieldImage from "@assets/generated_images/secure_data_lock_shield_for_compliance.png";
import { Button } from "./ui/button";

export function ComplianceSection() {
  return (
    <section id="compliance" className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
             initial={{ opacity: 1, scale: 0.95 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ duration: 0.25 }}
             className="relative order-2 lg:order-1"
          >
             {/* Abstract background element */}
             <div className="absolute -inset-4 bg-blue-100/50 rounded-full blur-3xl -z-10" />
             
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-slate-100 bg-white">
              <img src={shieldImage} alt="HIPAA Compliance Security" className="w-full h-auto p-8 bg-slate-50" />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-xl border border-slate-100 flex items-center gap-3">
              <ShieldCheck className="h-8 w-8 text-emerald-500" />
              <div>
                <p className="font-bold text-slate-900">HIPAA Compliant</p>
                <p className="text-xs text-slate-500">256-bit Encryption</p>
              </div>
            </div>
          </motion.div>

          <motion.div
             initial={{ opacity: 1, x: 20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.25 }}
             className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-semibold mb-6">
              <Lock className="h-4 w-4" />
              <span>Bank-Level Security</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-6">
              Uncompromising Security & Compliance
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Your patient data is your most valuable asset. We protect it with industry-leading security protocols, ensuring you meet all regulatory requirements without the headache.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                { icon: ShieldCheck, title: "ONC Certified", desc: "2015 Edition Cures Update." },
                { icon: Server, title: "Secure Cloud", desc: "Redundant backups in protected data centers." },
                { icon: FileCheck, title: "Quality Ready", desc: "Support for CMS quality program compliance." },
                { icon: Lock, title: "Role-Based Access", desc: "Granular control over who sees what." }
              ].map((feature, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
                    <feature.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{feature.title}</h4>
                    <p className="text-sm text-slate-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="border-slate-200 text-slate-700 hover:text-primary hover:border-primary">
              View Security Whitepaper
            </Button>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
