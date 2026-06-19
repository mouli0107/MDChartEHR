import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Target, Users, Heart, TrendingUp, Star, ArrowRight, CheckCircle, FileText, DollarSign, CalendarDays, UserCircle } from "lucide-react";
import heroImage from "@assets/generated_images/healthcare_team_mission_image.png";
import heroImageWebp from "@assets/generated_images/healthcare_team_mission_image.webp";
import heroImageWebp480 from "@assets/generated_images/healthcare_team_mission_image_480w.webp";
import heroImageWebp960 from "@assets/generated_images/healthcare_team_mission_image_960w.webp";
import patientCareImage from "@assets/generated_images/caring_doctor_patient_consultation.png";
import patientCareImageWebp from "@assets/generated_images/caring_doctor_patient_consultation.webp";
import patientCareImageWebp480 from "@assets/generated_images/caring_doctor_patient_consultation_480w.webp";
import patientCareImageWebp960 from "@assets/generated_images/caring_doctor_patient_consultation_960w.webp";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const coreValues = [
  {
    icon: Users,
    title: "Physician-Focused Team",
    description: "Friendly and professional support that understands your practice"
  },
  {
    icon: Heart,
    title: "Click Less, Care More",
    description: "Help physicians see more patients by reducing documentation time"
  },
  {
    icon: Target,
    title: "Specialty-Specific Solutions",
    description: "EHR and Practice Management tailored to your medical specialty"
  },
  {
    icon: TrendingUp,
    title: "Maximize Practice Performance",
    description: "Lower costs, increase efficiency, and gain valuable business insights"
  }
];

export default function OurMission() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero with Image */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            <motion.div 
              initial="hidden" 
              animate="visible" 
              variants={fadeIn}
            >
              <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
                <Target className="h-4 w-4" />
                ABOUT MD Charts EHR
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                Our Mission
              </h1>
              
              <p className="text-xl text-slate-600 leading-relaxed mb-8">
                MD Charts, designed by physicians and top-level software system architects, is dedicated to improving your practice. We offer a bold new approach to EHR, Revenue Cycle Management, Practice Management, and Patient Engagement.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link href="/book-demo">
                  <Button size="lg" className="bg-primary hover:bg-primary/90">
                    Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 1, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <picture>
                  <source srcSet={`${heroImageWebp480} 480w, ${heroImageWebp960} 960w, ${heroImageWebp} 1408w`} sizes="(max-width: 1024px) 100vw, 50vw" type="image/webp" />
                  <img 
                  src={heroImage} 
                  alt="Healthcare team working together" 
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                  width="800"
                  height="400"
                />
                </picture>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-900">35+</p>
                    <p className="text-sm text-slate-500">Years Experience</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4 Products Section */}
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-12"
          >
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Our Platform</p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-3">
              A Complete Suite for Modern Practices
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              From clinical documentation to revenue cycle, every tool your practice needs — integrated in one platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                icon: FileText,
                title: "EHR & Charting",
                href: "/ehr",
                color: "bg-cyan-50 border-cyan-200",
                iconBg: "bg-cyan-100",
                iconColor: "text-primary",
                desc: "Specialty-specific templates, AI-powered Ambient Scribe, e-Prescribing, and intuitive clinical documentation built to help physicians click less and care more.",
                features: ["Ambient AI Scribe", "e-Prescribing", "Custom templates", "AI Medical Coding"]
              },
              {
                icon: DollarSign,
                title: "Revenue Cycle Management",
                href: "/rcm",
                color: "bg-emerald-50 border-emerald-200",
                iconBg: "bg-emerald-100",
                iconColor: "text-emerald-600",
                desc: "End-to-end billing support from charge capture to payment posting. Our RCM experts handle claims, denials, ERA, and EOB reconciliation on your behalf.",
                features: ["Electronic ERA & EOB", "Denial management", "Superbill scrubbing", "Eligibility verification"]
              },
              {
                icon: CalendarDays,
                title: "Practice Management",
                href: "/practice-management",
                color: "bg-violet-50 border-violet-200",
                iconBg: "bg-violet-100",
                iconColor: "text-violet-600",
                desc: "Streamline scheduling, front-desk workflows, and operational reporting so your team runs efficiently and your patients experience a seamless visit.",
                features: ["Appointment scheduling", "Online check-in", "Reporting & analytics", "Multi-provider support"]
              },
              {
                icon: UserCircle,
                title: "Patient Engagement",
                href: "/patient-engagement",
                color: "bg-amber-50 border-amber-200",
                iconBg: "bg-amber-100",
                iconColor: "text-amber-600",
                desc: "Keep patients connected with a secure portal, telehealth video visits, automated reminders, and two-way messaging — all without a separate app.",
                features: ["Secure patient portal", "Telehealth video visits", "Automated reminders", "Two-way messaging"]
              }
            ].map((product, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-2xl border p-6 ${product.color} hover:shadow-lg transition-all flex flex-col`}
              >
                <div className={`h-12 w-12 rounded-xl ${product.iconBg} flex items-center justify-center mb-4`}>
                  <product.icon className={`h-6 w-6 ${product.iconColor}`} />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{product.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4 flex-1">{product.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {product.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href={product.href}>
                  <Button variant="outline" size="sm" className="w-full text-xs font-semibold">
                    Learn More <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Statement with Image */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 1, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden shadow-xl"
            >
              <picture>
                <source srcSet={`${patientCareImageWebp480} 480w, ${patientCareImageWebp960} 960w, ${patientCareImageWebp} 1280w`} sizes="(max-width: 1024px) 100vw, 50vw" type="image/webp" />
                <img 
                src={patientCareImage} 
                alt="Doctor caring for patient" 
                className="w-full h-[350px] object-cover"
                loading="lazy"
                width="800"
                height="350"
              />
              </picture>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className="text-3xl font-bold text-slate-900 mb-6">
                Designed for Your Success
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                The result is a system that can be fully customized to fit the needs of the basic user to even the most astute user.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Engineered to maximize care to patients and improve profitability for practices, MD Charts' unique approach to reducing the time required to take notes or e-prescribe medication as well as superior Practice Management tools can help your practice no matter its size or specialty.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              The principles that guide everything we build
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 hover:shadow-xl hover:border-primary/20 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{value.title}</h3>
                <p className="text-slate-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center gap-1 mb-8">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-8 w-8 fill-cyan-300 text-cyan-300" />
              ))}
            </div>
            
            <blockquote className="text-2xl md:text-3xl font-medium leading-relaxed mb-10">
              "MD Charts transformed our practice. Documentation that used to take 15 minutes now takes 5. Our staff loves it and our patients notice the difference."
            </blockquote>
            
            <div>
              <div className="font-bold text-xl">Practice Manager</div>
              <div className="text-white/80">Multi-Specialty Clinic</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              See how MD Charts EHR can help you click less and care more
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-demo">
                <Button size="lg" variant="outline">
                  Contact Us
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
