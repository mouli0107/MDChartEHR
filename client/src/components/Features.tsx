import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  FileText, 
  Activity, 
  CreditCard, 
  Users, 
  Smartphone,
  ShieldCheck,
  Calendar,
  MessageSquare,
  BarChart3,
  Stethoscope,
  Pill,
  ClipboardCheck,
  Sparkles
} from "lucide-react";

const features = [
  { icon: FileText, title: "Smart Templates", desc: "Highly configurable engine", color: "bg-primary/10 text-primary", href: "/ehr" },
  { icon: Activity, title: "Clinical Workflows", desc: "Streamlined care delivery", color: "bg-emerald-100 text-emerald-600", href: "/ehr" },
  { icon: CreditCard, title: "RCM & Billing", desc: "High first-pass rate", color: "bg-amber-100 text-amber-600", href: "/rcm" },
  { icon: Users, title: "Patient Portal", desc: "Self-service scheduling", color: "bg-purple-100 text-purple-600", href: "/features/patient-portal" },
  { icon: Sparkles, title: "AI-Powered Insights", desc: "Smart clinical assistance", color: "bg-violet-100 text-violet-600", href: "/ehr" },
  { icon: Smartphone, title: "Mobile Access", desc: "Responsive web access", color: "bg-primary/10 text-primary", href: "/features/mobile-app" },
  { icon: ShieldCheck, title: "ONC Certified", desc: "2015 Cures Update", color: "bg-emerald-100 text-emerald-600", href: "/compliance" },
  { icon: Calendar, title: "Smart Schedule", desc: "Reduce no-shows", color: "bg-amber-100 text-amber-600", href: "/practice-management" },
  { icon: MessageSquare, title: "Secure Text", desc: "Direct patient SMS", color: "bg-purple-100 text-purple-600", href: "/patient-engagement" },
  { icon: Stethoscope, title: "Telehealth", desc: "HD Video integrated", color: "bg-emerald-100 text-emerald-600", href: "/features/telehealth" },
  { icon: Pill, title: "e-Prescribing", desc: "EPCS Certified", color: "bg-amber-100 text-amber-600", href: "/features/e-prescribing" },
  { icon: ClipboardCheck, title: "Intake Forms", desc: "Digital paperless", color: "bg-purple-100 text-purple-600", href: "/patient-engagement" }
];

export function Features() {
  return (
    <section id="solutions" className="py-20 bg-white border-y border-slate-200">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10 gap-6">
          <div className="max-w-2xl">
             <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Platform Capabilities</p>
            <h2 className="text-3xl font-extrabold font-heading text-slate-900">
              Your Complete Practice Suite
            </h2>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded">
             <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"/>
             All systems operational
          </div>
        </div>

        {/* Dense Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden shadow-sm">
          {features.map((feature, index) => (
            <Link key={index} href={feature.href}>
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.02 }}
                className="bg-white p-6 hover:bg-slate-50 transition-colors group cursor-pointer h-full"
              >
                <div className="flex items-start gap-3 mb-3">
                  <div className={`h-9 w-9 rounded-lg ${feature.color} flex items-center justify-center shrink-0`}>
                    <feature.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 leading-tight pt-1.5 group-hover:text-primary transition-colors">{feature.title}</h3>
                </div>
                <p className="text-xs text-slate-500 font-medium leading-relaxed pl-12">
                  {feature.desc}
                </p>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
