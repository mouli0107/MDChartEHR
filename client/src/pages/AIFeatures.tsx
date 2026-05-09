import { motion } from "framer-motion";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Mic2, Brain, Zap, Shield, Smartphone, FileText,
  CheckCircle2, ArrowRight, Sparkles, ChevronRight
} from "lucide-react";
import aiScribeIcon from "@assets/generated_images/ai_ambient_scribe_icon.png";
import aiCodingIcon from "@assets/generated_images/ai_medical_charting_icon.png";
import dashboardImage from "@assets/generated_images/medical_software_dashboard_mockup.png";
import tabletImage from "@assets/generated_images/doctor_using_tablet.png";
import efficientDoctorImage from "@assets/generated_images/efficient_doctor_using_technology.png";
import securityImage from "@assets/generated_images/ehr_data_security_concept.png";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const AI_FEATURES = [
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
    image: aiScribeIcon,
    imageAlt: "AI Scribe recording a patient encounter",
    flip: false,
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
    image: aiCodingIcon,
    imageAlt: "AI billing code recommendation panel",
    flip: true,
  },
  {
    icon: FileText,
    badge: "AI Templates",
    title: "Intelligent Auto-Fill for Any Note",
    description:
      "MDCharts AI works inside every specialty template — automatically surfacing patient history, medication context, and relevant clinical data right where you need it, when you need it.",
    bullets: [
      "Compatible with all specialty templates",
      "Auto-generates summaries and history overviews",
      "On-demand or automatic on note open",
    ],
    image: dashboardImage,
    imageAlt: "AI template auto-fill in EMR dashboard",
    flip: false,
  },
  {
    icon: Smartphone,
    badge: "Any Device",
    title: "Scribe from Any Device — Your Choice",
    description:
      "No dedicated hardware required. Use your smartphone, tablet, laptop, or desktop as your scribing device. Scan a QR code or tap a button — MDCharts meets you where you are.",
    bullets: [
      "iOS, Android, macOS, Windows — all supported",
      "QR-code pairing or same-device recording",
      "Switch devices mid-workflow seamlessly",
    ],
    image: tabletImage,
    imageAlt: "Doctor using tablet for AI scribing",
    flip: true,
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
    image: efficientDoctorImage,
    imageAlt: "Efficient doctor completing workflow on device",
    flip: false,
  },
  {
    icon: Shield,
    badge: "HIPAA Compliant",
    title: "AI You Can Trust with Patient Data",
    description:
      "Every AI interaction in MDCharts is designed with HIPAA compliance at the core. Patient identifiers are protected at every step, with full audit logging for every AI-assisted action.",
    bullets: [
      "PHI protection built into every AI call",
      "Full audit trail for every AI interaction",
      "Business Associate Agreement (BAA) backed",
    ],
    image: securityImage,
    imageAlt: "Data security concept for HIPAA-compliant AI",
    flip: true,
  },
];

const STATS = [
  { value: "6+", label: "AI-Powered Features" },
  { value: "0", label: "Extra Clicks to Scribe" },
  { value: "100%", label: "HIPAA Compliant" },
  { value: "Any", label: "Device Supported" },
];

export default function AIFeaturesPage() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-blue-200/20 rounded-full blur-[100px] -translate-y-1/3 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-emerald-100/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wider">Special AI Features</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] mb-6">
              The AI That Works<br />
              <span className="text-primary">While You Care</span>
            </h1>

            <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
              MDCharts brings AI directly into your clinical workflow — from the moment a patient walks in to the moment the claim goes out. Less documentation. More care.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#2da0c7] py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {STATS.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl font-extrabold text-white">{s.value}</p>
                <p className="text-sm text-white/80 font-medium mt-1">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Zig-Zag Features */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6 space-y-28">
          {AI_FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-80px" }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${feature.flip ? "lg:grid-flow-dense" : ""}`}
            >
              {/* Text */}
              <div className={feature.flip ? "lg:col-start-2" : ""}>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-4">
                  <feature.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold text-primary uppercase tracking-wider">{feature.badge}</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">
                  {feature.title}
                </h2>

                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                <ul className="space-y-3">
                  {feature.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                      <span className="text-slate-700 font-medium">{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className={`${feature.flip ? "lg:col-start-1 lg:row-start-1" : ""} relative`}>
                <div className="relative rounded-2xl overflow-hidden border border-slate-100 shadow-2xl shadow-slate-200/60 bg-gradient-to-br from-slate-50 to-blue-50/30">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none z-10" />
                  <img
                    src={feature.image}
                    alt={feature.imageAlt}
                    className="w-full h-72 md:h-96 object-cover"
                  />
                </div>
                {/* Decorative glow */}
                <div className={`absolute -z-10 w-64 h-64 rounded-full blur-3xl opacity-30 ${feature.flip ? "-left-10 top-10 bg-emerald-300" : "-right-10 top-10 bg-blue-300"}`} />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Strip */}
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
