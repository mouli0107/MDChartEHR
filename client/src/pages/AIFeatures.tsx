import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Mic2, Brain, Zap, Shield, Smartphone, FileText,
  CheckCircle2, ArrowRight, Sparkles, ChevronRight
} from "lucide-react";
import aiHeroImage from "@assets/generated_images/ai_hero_futuristic_medical.png";
import aiTemplatesImage from "@assets/generated_images/ai_templates_autofill_ui.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const BANNER_FEATURES = [
  { Icon: Mic2,       label: "AI Scribe" },
  { Icon: Brain,      label: "Smart Billing Codes" },
  { Icon: FileText,   label: "AI Templates" },
  { Icon: Smartphone, label: "Any Device" },
  { Icon: Zap,        label: "One-Click Workflow" },
  { Icon: Shield,     label: "HIPAA Compliant AI" },
];

const TEXT_FEATURES = [
  {
    icon: Mic2,
    badge: "AI Scribe",
    title: "Voice-to-Note in Seconds",
    description:
      "Speak naturally with your patient. MDCharts AI listens, transcribes, and auto-fills your clinical note — structured, accurate, and ready to sign. No typing, no delays.",
    bullets: [
      "Works during live patient encounters",
      "Auto-fills note fields by specialty template",
      "Review and edit before finalizing",
    ],
  },
  {
    icon: Brain,
    badge: "Smart Billing",
    title: "AI-Suggested ICD & CPT Codes",
    description:
      "After every encounter, MDCharts AI reviews your note and recommends the most accurate diagnosis and procedure codes — reducing denials and maximizing reimbursement.",
    bullets: [
      "ICD-10 and CPT code recommendations",
      "Codes ranked by clinical relevance",
      "One click to add to the superbill",
    ],
  },
  {
    icon: Smartphone,
    badge: "Any Device",
    title: "Scribe from Any Device",
    description:
      "No dedicated hardware required. Use your smartphone, tablet, laptop, or desktop as your scribing device. Scan a QR code or tap a button — MDCharts meets you where you are.",
    bullets: [
      "iOS, Android, macOS, Windows — all supported",
      "QR-code pairing or same-device recording",
      "Switch devices mid-workflow seamlessly",
    ],
  },
  {
    icon: Zap,
    badge: "One-Click Workflow",
    title: "From Encounter to Billed in One Tap",
    description:
      "Stop re-entering data across systems. A single action completes the full clinical workflow — stops the recording, transcribes the encounter, fills the note, and populates billing codes.",
    bullets: [
      "End-to-end workflow in one interaction",
      "Note and superbill populated simultaneously",
      "Reduces per-encounter admin time significantly",
    ],
  },
  {
    icon: Shield,
    badge: "HIPAA Compliant",
    title: "AI You Can Trust with Patient Data",
    description:
      "Every AI interaction in MDCharts is built with HIPAA compliance at the core. Patient identifiers are protected at every step, with full audit logging for every AI-assisted action.",
    bullets: [
      "PHI protection built into every AI call",
      "Full audit trail for every AI interaction",
      "Business Associate Agreement (BAA) backed",
    ],
  },
];

export default function AIFeaturesPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* ── Hero: fills full viewport ── */}
      <section className="flex flex-col" style={{ minHeight: "100vh" }}>

        {/* Top: text left + image right — flex-1 so it fills remaining space above banner */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">

          {/* LEFT — text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-24 pb-6 bg-gradient-to-b from-slate-50 to-white relative lg:w-1/2 shrink-0"
          >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-5 w-fit">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Special AI Features</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-5">
              AI-Powered EHR.<br />
              <span className="text-primary">Trusted by Physicians.</span>
            </h1>

            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-lg">
              MDCharts brings AI directly into your clinical workflow — from the moment a patient walks in to the moment the claim goes out. Less documentation. More care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="h-12 px-8 text-sm font-bold uppercase tracking-wide shadow-lg shadow-blue-900/20">
                  Book a Demo <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/ehr">
                <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-bold uppercase tracking-wide">
                  Explore the EHR
                </Button>
              </Link>
            </div>
          </motion.div>

          {/* RIGHT — image: medium, centered, full image visible */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:w-1/2 shrink-0 flex items-center justify-center px-6 pb-6 pt-24 lg:pt-6"
          >
            <img
              src={aiHeroImage}
              alt="AI-powered clinical workflow"
              className="w-full h-[470px] object-cover rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>

        {/* BOTTOM — cyan banner with 6 features */}
        <div className="bg-[#2da0c7] shrink-0">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-3 md:grid-cols-6 divide-x divide-white/20">
              {BANNER_FEATURES.map(({ Icon, label }, i) => (
                <div key={i} className="flex flex-col items-center justify-center gap-1.5 py-4 px-2">
                  <Icon className="h-5 w-5 text-white" />
                  <span className="text-xs font-bold text-white text-center leading-tight">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </section>

      {/* ── AI Templates — with image ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Text */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-xs font-bold text-primary uppercase tracking-wider">AI Templates</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                Intelligent Auto-Fill for Any Note
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                MDCharts AI works inside every specialty template — automatically surfacing patient history, medication context, and relevant clinical data right where you need it, when you need it.
              </p>
              <ul className="space-y-3">
                {["Compatible with all specialty templates", "Auto-generates summaries and history overviews", "On-demand or automatic on note open"].map((b, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 font-medium">{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Image */}
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-slate-200/60">
                <img
                  src={aiTemplatesImage}
                  alt="AI intelligent auto-fill for any note template"
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -z-10 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl -right-10 top-10" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Other 5 features — text cards, no images ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3">More AI Built Into Every Step</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Every feature works together seamlessly — from the first word spoken to the final claim submitted.</p>
          </motion.div>

          <div className="flex flex-wrap justify-center gap-6">
            {TEXT_FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                transition={{ delay: i * 0.08 }}
                className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 hover:shadow-md hover:border-primary/20 transition-all w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{feature.badge}</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">{feature.description}</p>
                <ul className="space-y-2">
                  {feature.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-600 text-sm">{b}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ── */}
      <section className="py-20 bg-gradient-to-br from-[#0f2744] to-[#1a4a72] relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff06_1px,transparent_1px),linear-gradient(to_bottom,#ffffff06_1px,transparent_1px)] bg-[size:32px_32px]" />
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6">
              <Sparkles className="h-4 w-4 text-blue-300" />
              <span className="text-sm font-bold text-blue-200 uppercase tracking-wider">Ready to See It Live?</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Experience AI-Powered Care Delivery
            </h2>
            <p className="text-lg text-white/70 max-w-xl mx-auto mb-10">
              See how MDCharts AI transforms every encounter — from the first word spoken to the final claim submitted.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/book-demo">
                <Button size="lg" className="h-12 px-8 text-sm font-bold uppercase tracking-wide bg-white text-slate-900 hover:bg-slate-100">
                  Book a Demo <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </Link>
              <Link href="/ehr">
                <Button size="lg" variant="outline" className="h-12 px-8 text-sm font-bold uppercase tracking-wide border-white/30 text-white hover:bg-white/10">
                  Explore the Full EHR <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
