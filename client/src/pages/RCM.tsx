import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, TrendingUp, DollarSign, FileText, ShieldCheck, Phone, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import rcmImage from "@assets/generated_images/abstract_medical_financial_growth_chart.png";
import trizettoBadge from "@assets/generated_images/trizetto_provider_solutions_integration_badge.png";

export default function RCMPage() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "demo" | "contact" | "trial" | "rcm_audit";
    title: string;
  }>({ isOpen: false, type: "rcm_audit", title: "" });
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-background font-sans selection:bg-primary/20">
      <Navbar />
      
      {/* Hero Section - Packed & Dense */}
      <section className="pt-28 pb-12 bg-slate-50 overflow-hidden relative border-b border-slate-200">
        {/* Dense Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <motion.div 
              initial={{ opacity: 1, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:col-span-7"
            >
              {/* Highlighted TriZetto Integration */}
              <div className="flex items-center gap-3 mb-6 bg-white border border-slate-200 rounded-full p-1 pr-4 shadow-sm w-fit">
                 <div className="h-8 w-8 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center">
                   <img src={trizettoBadge} alt="TriZetto" className="w-full h-full object-cover" />
                 </div>
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                   Premier Clearinghouse Integration: <span className="text-blue-600">TriZetto Provider Solutions</span>
                 </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-slate-900 leading-[1.1] mb-4 tracking-tight">
                Maximize Clean Claims. <br/>
                <span className="text-primary">Accelerate Revenue.</span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-6 leading-snug font-medium max-w-2xl">
                End-to-end RCM that handles the entire billing workflow from eligibility through payment posting. Reduce denials and offload your billing burden today.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-8">
                <Button 
                  size="lg" 
                  className="h-12 px-8 text-sm font-bold uppercase tracking-wide shadow-xl bg-primary hover:bg-blue-700 rounded-sm"
                  onClick={() => setModalState({ isOpen: true, type: "demo", title: "Schedule RCM Consultation" })}
                  data-testid="button-rcm-consultation"
                >
                  Schedule RCM Consultation
                </Button>
                <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-bold uppercase tracking-wide bg-white border-slate-300 text-slate-700 rounded-sm">
                  Download Case Study
                </Button>
              </div>

              {/* Stat Banner - Tighter */}
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm flex items-center gap-4 max-w-2xl">
                <div className="bg-emerald-100 p-3 rounded-md shrink-0">
                   <TrendingUp className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Success Metric</p>
                  <p className="text-slate-900 font-medium text-sm leading-tight">
                    "Our clients consistently see <span className="font-bold text-emerald-600 bg-emerald-50 px-1 rounded">significant growth</span> in their annual collections with our RCM services."
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 1, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-5 relative h-full flex items-center"
            >
               <div className="relative rounded-lg overflow-hidden shadow-2xl border border-slate-200 bg-white w-full">
                 <div className="absolute top-0 left-0 right-0 bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-2">
                   <div className="flex gap-1.5">
                     <div className="w-2.5 h-2.5 rounded-full bg-red-400"/>
                     <div className="w-2.5 h-2.5 rounded-full bg-amber-400"/>
                     <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"/>
                   </div>
                   <div className="text-[10px] font-mono text-slate-400 ml-2">rcm_dashboard_v4.2.exe</div>
                 </div>
                 <img 
                  src={rcmImage} 
                  alt="RCM Dashboard Analytics" 
                  className="w-full h-auto object-cover"
                />
                
                {/* Overlay Metrics */}
                <div className="absolute bottom-4 left-4 right-4 grid grid-cols-3 gap-2">
                   {[
                     { l: "Net Collection", v: "High", c: "text-emerald-600" },
                     { l: "Days in A/R", v: "Low", c: "text-blue-600" },
                     { l: "Denial Rate", v: "Minimal", c: "text-purple-600" }
                   ].map((m, i) => (
                     <div key={i} className="bg-white/95 backdrop-blur shadow-sm p-2 rounded border border-slate-100 text-center">
                       <div className="text-[9px] font-bold text-slate-400 uppercase">{m.l}</div>
                       <div className={`text-lg font-extrabold ${m.c}`}>{m.v}</div>
                     </div>
                   ))}
                </div>
               </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Services Grid - High Density */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-bold font-heading text-slate-900">
                RCM Workflow Modules
              </h2>
              <p className="text-sm text-slate-500 font-medium">End-to-end financial management suite</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <ServiceCard 
              icon={FileText}
              title="Front-End & Charge Capture"
              items={[
                "Superbill scrubbing",
                "Insurance enrollment",
                "Eligibility verification",
                "Charge entry support"
              ]}
              delay={0}
            />
            <ServiceCard 
              icon={CheckCircle2}
              title="Claims Processing"
              items={[
                "Claim submission",
                "Rejection resolution",
                "Denial management",
                "Medical record submissions",
                "Appeal submissions"
              ]}
              delay={0.1}
            />
            <ServiceCard 
              icon={DollarSign}
              title="Payments & Accounts"
              items={[
                "ERA posting",
                "Payment reconciliation",
                "Refund processing",
                "Credit resolution"
              ]}
              delay={0.2}
            />
             <ServiceCard 
              icon={ShieldCheck}
              title="Patient & Practice Support"
              items={[
                "Electronic statements",
                "Paper statements",
                "Performance reporting",
                "Financial insights"
              ]}
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Add-On Services - Grid Layout */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-xl font-bold font-heading text-slate-900 mb-6 flex items-center gap-2">
            <span className="w-1 h-6 bg-primary rounded-full"/>
            Extended Capabilities
          </h2>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
            <AddOnCard 
              title="Patient Support"
              icon={Phone}
              features={["Billing Help", "Payment Plans"]}
            />
            <AddOnCard 
              title="Credentialing"
              icon={ShieldCheck}
              features={["Enrollments", "CAQH Maint."]}
            />
            <AddOnCard 
              title="Consulting"
              icon={TrendingUp}
              features={["Workflow Audit", "KPI Reports"]}
            />
            <AddOnCard 
              title="A/R Recovery"
              icon={RefreshCw}
              features={["Claims (1-2 Years)", "Appeals"]}
              className="bg-blue-900 text-white border-blue-800"
              dark={true}
            />
          </div>
        </div>
      </section>

      {/* RCM KPI Dashboard Metrics Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold font-heading text-slate-900">RCM Performance Metrics</h2>
            <div className="flex gap-2">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Industry Benchmarks</span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-slate-200 border border-slate-200 rounded-lg overflow-hidden">
             {[
               { label: "Net Collection Rate", value: "Industry Leading", sub: "Above industry standard", color: "text-emerald-600" },
               { label: "Days in A/R", value: "Low", sub: "Faster than average", color: "text-blue-600" },
               { label: "First Pass Resolution", value: "High", sub: "Clean claims rate", color: "text-purple-600" },
               { label: "Denial Rate", value: "Minimal", sub: "Below industry average", color: "text-indigo-600" },
             ].map((metric, i) => (
               <div key={i} className="bg-white p-6 hover:bg-slate-50 transition-colors">
                 <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{metric.label}</p>
                 <p className={`text-3xl font-extrabold ${metric.color} mb-1`}>{metric.value}</p>
                 <p className="text-[10px] font-medium text-slate-500">{metric.sub}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to maximize your revenue?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Let us handle the billing so you can focus on what matters most—your patients.
          </p>
          <Button size="lg" variant="secondary" className="h-14 px-8 text-primary font-bold shadow-xl">
            Schedule Your RCM Consultation
          </Button>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        requestType={modalState.type}
        title={modalState.title}
      />
    </div>
  );
}

function ServiceCard({ icon: Icon, title, items, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0.9, y: 3 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md hover:border-primary/50 transition-all duration-200"
    >
      <div className="flex items-center gap-3 mb-4 border-b border-slate-50 pb-3">
        <div className="h-8 w-8 rounded bg-blue-50 flex items-center justify-center shrink-0">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <h3 className="font-bold text-slate-900 text-sm leading-tight">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item: string, i: number) => (
          <li key={i} className="flex items-start gap-2 text-slate-600 text-xs font-medium">
            <div className="h-1 w-1 rounded-full bg-slate-300 mt-1.5 shrink-0" />
            {item}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

function AddOnCard({ title, icon: Icon, features, className, dark }: any) {
  return (
    <motion.div 
      initial={{ opacity: 1, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className={`p-4 rounded-lg border transition-colors ${
        dark 
          ? 'bg-slate-900 border-slate-800 text-white' 
          : 'bg-white border-slate-200 hover:border-primary/50 text-slate-900'
      } ${className}`}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${dark ? 'text-blue-400' : 'text-primary'}`} />
        <h3 className="font-bold text-sm">{title}</h3>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {features.map((feature: string, i: number) => (
          <span key={i} className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
             dark 
               ? 'bg-slate-800 text-slate-300 border border-slate-700' 
               : 'bg-slate-50 text-slate-600 border border-slate-100'
          }`}>
            {feature}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
