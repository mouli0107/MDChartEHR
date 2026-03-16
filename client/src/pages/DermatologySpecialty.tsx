import { Link } from "wouter";
import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ContactModal } from "@/components/ContactModal";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  Camera, Target, Syringe, Microscope, Calendar, Pill, 
  Check, X, AlertTriangle, Star, ChevronRight,
  Shield, Award, Clock, Users, FileCheck, Stethoscope,
  Facebook, Twitter, Linkedin, Instagram, ArrowRight
} from "lucide-react";

import dermExamImage from "@assets/generated_images/dermatologist_examining_patient_skin.png";
import happyPatientImage from "@assets/generated_images/happy_patient_cosmetic_consultation.png";
import laserTreatmentImage from "@assets/generated_images/laser_skin_treatment_procedure.png";
import consultationImage from "@assets/generated_images/doctor_patient_treatment_discussion.png";
import backExamImage from "@assets/generated_images/back_skin_examination_check.png";
import skincareImage from "@assets/generated_images/skincare_treatment_application.png";
import resultsImage from "@assets/generated_images/treatment_results_comparison_screen.png";
import acneImage from "@assets/generated_images/acne_treatment_procedure.png";
import drFoxStyleImage from "@assets/generated_images/smiling_male_dermatologist_with_patient.png";
import heroTeamImage from "@assets/generated_images/laughing_lady_doctors_treating_patient.png";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

const features = [
  {
    icon: Camera,
    title: "BiopsyMapping™ Technology",
    description: "Visualize multiple biopsy results on one page with our proprietary body mapping and lesion tracking system",
    color: "bg-primary"
  },
  {
    icon: Target,
    title: "Peak Charge Capture™",
    description: "Built-in charge capture with accurate ICD-10 coding and auto-suggested CPT codes for biopsies, excisions, and Mohs surgery",
    color: "bg-emerald-500"
  },
  {
    icon: Syringe,
    title: "Medical vs. Aesthetic Workflows",
    description: "Separate billing and documentation for cosmetic treatments - Botox, fillers, laser procedures with Smart Super Bill℠",
    color: "bg-purple-500"
  },
  {
    icon: Microscope,
    title: "InstaPath℠ Biopsy Tracking",
    description: "Track biopsies with time-stamped entries including body-part location and diagnosis safely and accurately",
    color: "bg-amber-500"
  },
  {
    icon: Calendar,
    title: "TimeGuard℠ Scheduling",
    description: "Pre-configured time blocks for screenings, Mohs surgery, cosmetic consultations with optimized financial management",
    color: "bg-rose-500"
  },
  {
    icon: Pill,
    title: "Quick e-Prescribing",
    description: "e-Prescribe from virtually any screen with favorites, smart-searching, and complete RX history access",
    color: "bg-indigo-500"
  }
];

const medicalFeatures = [
  "Skin cancer screening templates",
  "Chronic condition management (psoriasis, eczema, rosacea)",
  "Acne treatment protocols",
  "Pediatric dermatology workflows",
  "Patch testing documentation",
  "Total body skin examination (TBSE)",
  "Automated recall for annual screenings"
];

const surgicalFeatures = [
  "Mohs micrographic surgery workflows",
  "Excision and closure documentation",
  "InstaPath℠ biopsy tracking with pathology integration",
  "Pre-operative consent forms with e-signature",
  "Post-operative care instructions",
  "Peak Charge Capture™ for surgical coding",
  "BiopsyMapping™ photo documentation"
];

const cosmeticFeatures = [
  "Injectable tracking (Botox, Dysport, Juvederm, Restylane)",
  "Laser and light-based procedure records",
  "Chemical peel protocols",
  "Body contouring treatment plans",
  "Cosmetic consultation templates",
  "Inventory management for injectables",
  "Before/after photo galleries for patient marketing"
];

const testimonials = [
  {
    quote: "MD Charts has transformed our practice. The dermatology-specific templates save us hours every day, and the visual documentation tools are exactly what we need for accurate patient care and medical-legal protection.",
    name: "Joshua Fox, M.D., F.A.A.D.",
    practice: "Founder & Director, Advanced Dermatology, P.C. and the Center for Laser and Cosmetic Surgery",
    rating: 5
  },
  {
    quote: "The cosmetic billing separation is brilliant. We can seamlessly manage both medical and aesthetic services without confusion. Our revenue has increased significantly since implementing DermCharts.",
    name: "Dr. Michael Chen, DO",
    practice: "Medical & Cosmetic Dermatology, SkinHealth Medical Group, CA",
    rating: 5
  },
  {
    quote: "As a Mohs surgeon, I need precise documentation. The surgical templates and pathology integration are outstanding. Our team cut documentation time in half.",
    name: "Dr. Emily Rodriguez, MD",
    practice: "Mohs Micrographic Surgery, Precision Dermatology, FL",
    rating: 5
  }
];

const faqs = [
  {
    question: "Why should I choose DermCharts over other EHR systems?",
    answer: "DermCharts was designed by dermatologists, specifically for the practice of dermatology. Our development team optimized every feature to meet the requirements of even the most demanding dermatology workflows."
  },
  {
    question: "How long does it take to implement DermCharts?",
    answer: "Our typical onboarding process is designed for rapid implementation with moderate customizations. Out-of-the-box implementations can be up and running quickly for practices ready to go."
  },
  {
    question: "Can DermCharts handle both medical and cosmetic dermatology billing?",
    answer: "Yes! DermCharts has built-in separation for medical vs. cosmetic charges, making it easy to manage insurance claims and cash-pay cosmetic services with our Smart Super Bill℠ technology."
  },
  {
    question: "Does DermCharts integrate with pathology labs?",
    answer: "Yes, DermCharts allows providers to directly send orders and receive lab results with bi-directional interfaces to regional and major national labs including Quest, LabCorp, BioReference, and many more."
  },
  {
    question: "Is every local pharmacy integrated into DermCharts?",
    answer: "With DermCharts' scripting partners, you can electronically prescribe to pharmacies across the United States. You can still print prescriptions for pharmacies that don't yet accept electronic prescriptions."
  },
  {
    question: "Is all my data secure?",
    answer: "Your data is fully secure with end-to-end encryption and stored in the cloud with multiple secure, encrypted daily backups. DermCharts is compliant with all HIPAA and privacy regulations."
  },
  {
    question: "What happens to my existing patient data?",
    answer: "DermCharts has support options to assist in importing data into the platform. As long as you can export fields from your current system into Excel or CSV format, our Data Services team takes it from there."
  },
  {
    question: "Can I export my data if I discontinue my subscription?",
    answer: "Yes, you can export your data at any time in standard file formats like CSV or Microsoft Excel. This provides flexibility to store backup copies or take your data with you."
  },
  {
    question: "What type of support can I expect after signing up?",
    answer: "We offer comprehensive onboarding and training with your subscription. Upon signing up, you'll be assigned a Success Coach who guides you through setup, training webinars, and ongoing support."
  },
  {
    question: "What days and hours is support available?",
    answer: "DermCharts support is available during regular business hours on weekdays, excluding national holidays. Emergency support is available outside standard hours."
  },
  {
    question: "Can I submit electronic claims to all insurance companies?",
    answer: "You can submit electronic claims to thousands of insurers through DermCharts including Medicare, Medicaid, Blue Cross, Blue Shield, Tricare, and major national insurers like Aetna, Cigna, Humana, and United Healthcare."
  },
  {
    question: "Do you support Mohs surgery documentation?",
    answer: "Absolutely! We have specialized Mohs surgery templates with stage-by-stage documentation, BiopsyMapping™ visualization, margin mapping, and defect measurement tools."
  }
];

const comparisonFeatures = [
  { name: "Total body skin exam templates", basic: false, generic: "limited", mdcharts: true },
  { name: "BiopsyMapping™ lesion tracking", basic: false, generic: false, mdcharts: true },
  { name: "InstaPath℠ biopsy tracking", basic: false, generic: false, mdcharts: true },
  { name: "Customizable body diagrams", basic: false, generic: false, mdcharts: true },
  { name: "Peak Charge Capture™ coding", basic: false, generic: "limited", mdcharts: true },
  { name: "Medical vs. cosmetic separation", basic: false, generic: false, mdcharts: true },
  { name: "Integrated clearinghouse (TriZetto)", basic: false, generic: false, mdcharts: true },
  { name: "MIPs Made Easy℠ reporting", basic: false, generic: false, mdcharts: true },
  { name: "Smart Super Bill℠", basic: false, generic: false, mdcharts: true },
  { name: "e-Prescribing with RX history", basic: "limited", generic: true, mdcharts: true },
];

const showcaseImages = [
  { src: dermExamImage, title: "Skin Examination" },
  { src: laserTreatmentImage, title: "Laser Treatment" },
  { src: happyPatientImage, title: "Patient Care" },
  { src: consultationImage, title: "Consultation" },
  { src: backExamImage, title: "Body Mapping" },
  { src: skincareImage, title: "Skincare" },
  { src: resultsImage, title: "Results Review" },
  { src: acneImage, title: "Acne Treatment" },
];

export default function DermatologySpecialty() {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    type: "demo" | "contact";
    title: string;
  }>({ isOpen: false, type: "demo", title: "" });

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #0EA5E9 0.5px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                <Stethoscope className="h-4 w-4" />
                DERMATOLOGY SPECIALTY
              </motion.div>
              
              <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                DermCharts™ - EHR Built Specifically for{" "}
                <span className="text-primary">Dermatology Practices</span>
              </motion.h1>
              
              <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 leading-relaxed">
                Streamline your dermatology practice with specialty-specific templates, visual documentation tools, and integrated cosmetic billing - all designed to match your workflow.
              </motion.p>
              
              <motion.div variants={fadeInUp} className="grid grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-xs text-slate-500 font-medium">Dermatology Templates</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                  <div className="text-2xl font-bold text-emerald-600">Integrated</div>
                  <div className="text-xs text-slate-500 font-medium">Pathology Tracking</div>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-lg border border-slate-100">
                  <div className="text-2xl font-bold text-amber-600">Real-Time</div>
                  <div className="text-xs text-slate-500 font-medium">Insurance Eligibility</div>
                </div>
              </motion.div>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Link href="/book-demo">
                  <Button 
                    size="lg" 
                    className="h-14 px-8 bg-primary hover:bg-blue-700 text-white font-bold shadow-xl"
                    data-testid="button-hero-demo"
                  >
                    Book a Demo <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-14 px-8 border-2 border-slate-300 hover:border-primary hover:text-primary font-semibold"
                  >
                    Request Documentation
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 1, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={heroTeamImage} 
                  alt="Three dermatologists treating patient" 
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                  width="800"
                  height="500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 bg-emerald-100 rounded-full flex items-center justify-center">
                    <Check className="h-6 w-6 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">ONC 2015 Certified</div>
                    <div className="text-sm text-slate-500">HIPAA Compliant</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trusted By Section */}
      <section className="py-8 bg-slate-50 border-y border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            <p className="text-slate-600 font-medium">Trusted by dermatology practices nationwide</p>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 text-sm">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-semibold text-slate-700">ONC 2015 Certified</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="h-5 w-5 text-emerald-600" />
                <span className="font-semibold text-slate-700">HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <FileCheck className="h-5 w-5 text-amber-600" />
                <span className="font-semibold text-slate-700">TriZetto Integrated</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Dermatologists Choose MD Charts */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Why Dermatologists Choose MD Charts
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 max-w-2xl mx-auto">
              Purpose-built features that understand dermatology workflows
            </motion.p>
          </motion.div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-white rounded-xl p-8 border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className={`h-14 w-14 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Dermatology Workflows Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything Your Dermatology Practice Needs
            </h2>
            <p className="text-lg text-slate-600">
              From medical dermatology to cosmetic procedures - we've got you covered
            </p>
          </div>
          
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-3 mb-12 h-14">
              <TabsTrigger value="medical" className="text-sm md:text-base font-semibold">Medical Dermatology</TabsTrigger>
              <TabsTrigger value="surgical" className="text-sm md:text-base font-semibold">Surgical Dermatology</TabsTrigger>
              <TabsTrigger value="cosmetic" className="text-sm md:text-base font-semibold">Cosmetic Dermatology</TabsTrigger>
            </TabsList>
            
            <TabsContent value="medical">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  {medicalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img src={drFoxStyleImage} alt="Medical dermatology workflow" className="w-full h-auto" loading="lazy" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="surgical">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  {surgicalFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img src={laserTreatmentImage} alt="Surgical dermatology workflow" className="w-full h-auto" loading="lazy" />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="cosmetic">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-4">
                  {cosmeticFeatures.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                      <div className="h-6 w-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Check className="h-4 w-4 text-emerald-600" />
                      </div>
                      <span className="text-slate-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
                <div className="rounded-2xl overflow-hidden shadow-xl">
                  <img src={happyPatientImage} alt="Cosmetic dermatology workflow" className="w-full h-auto" loading="lazy" />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Visual Showcase Section - 8 Images Zig-Zag */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
              See DermCharts in Action
            </h2>
            <p className="text-slate-600">
              Real dermatology workflows, real results
            </p>
          </div>
          
          <div className="max-w-6xl mx-auto space-y-3">
            {/* Row 1 - 4 images */}
            <motion.div 
              initial={{ opacity: 1, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-3"
            >
              {showcaseImages.slice(0, 4).map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl shadow-lg aspect-square"
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-white font-semibold text-sm text-center">{image.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Row 2 - 4 images offset (zig-zag) */}
            <motion.div 
              initial={{ opacity: 1, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-4 gap-3 ml-12"
            >
              {showcaseImages.slice(4, 8).map((image, index) => (
                <div
                  key={index}
                  className="relative group overflow-hidden rounded-xl shadow-lg aspect-square"
                >
                  <img 
                    src={image.src} 
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h4 className="text-white font-semibold text-sm text-center">{image.title}</h4>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Complete Dermatology Solution
            </h2>
            <p className="text-lg text-slate-600">
              See what's included compared to other options
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">Basic EHR</th>
                  <th className="text-center py-4 px-4 font-bold text-slate-500">Generic Derm EMR</th>
                  <th className="text-center py-4 px-4 font-bold text-primary bg-primary/5 rounded-t-lg">MD Charts DermCharts</th>
                </tr>
              </thead>
              <tbody>
                {comparisonFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-slate-100">
                    <td className="py-4 px-4 text-slate-700">{feature.name}</td>
                    <td className="text-center py-4 px-4">
                      {feature.basic === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : feature.basic === "limited" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" />
                      ) : (
                        <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4">
                      {feature.generic === false ? (
                        <X className="h-5 w-5 text-red-500 mx-auto" />
                      ) : feature.generic === "limited" ? (
                        <AlertTriangle className="h-5 w-5 text-amber-500 mx-auto" />
                      ) : (
                        <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                      )}
                    </td>
                    <td className="text-center py-4 px-4 bg-primary/5">
                      <Check className="h-5 w-5 text-emerald-500 mx-auto" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing CTA Section */}
      <section className="py-20 bg-[#2da0c7] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Saving Time and Increasing Revenue Today
          </h2>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Trusted by dermatology practices nationwide using DermCharts
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-demo">
              <Button 
                size="lg" 
                variant="secondary"
                className="h-14 px-8 text-primary font-bold text-lg shadow-xl"
                data-testid="button-pricing-demo"
              >
                Schedule Your DermCharts Demo
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg"
                className="h-14 px-8 bg-transparent border-2 border-white/30 text-white hover:bg-white/10 font-semibold"
              >
                Request Feature Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions About DermCharts
            </h2>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-xl px-6 border border-slate-200 shadow-sm">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:text-primary py-6">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-slate-600 pb-6">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Footer />

      <ContactModal
        isOpen={modalState.isOpen}
        onClose={() => setModalState({ ...modalState, isOpen: false })}
        title={modalState.title}
        requestType={modalState.type}
      />
    </div>
  );
}
