import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Users, ArrowRight } from "lucide-react";
import heroImage from "@assets/pm_doctors_wall_schedule.png";
import aaronImage from "@assets/Gemini_Generated_Image_7ejgbg7ejgbg7ejg_1770827867393.png";
import maitryImage from "@assets/Gemini_Generated_Image_4s1te44s1te44s1t_1770827529031.png";
import danielImage from "@assets/Gemini_Generated_Image_60hu5060hu5060hu_1770827363357.png";
import magoImage from "@assets/Gemini_Generated_Image_o9bedjo9bedjo9be_1770828177671.png";
import jackieImage from "@assets/Gemini_Generated_Image_5virbn5virbn5vir_1770828376474.png";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

const teamMembers = [
  {
    name: "Aaron Wachspress",
    title: "CTO",
    image: aaronImage,
    bio: "Harnessing his experience as Founder and CTO at Universal EHR Solutions, Aaron brings his expertise of electronic health records technologies to MD Charts. Under his leadership, MD Charts has developed partnerships with numerous industry-leading healthcare systems, with the vision to simplify the complex and often poorly integrated healthcare systems used in most medical practices today."
  },
  {
    name: "Maitry Shah",
    title: "IT Project Manager",
    image: maitryImage,
    bio: "As the IT Project Manager, Maitry is focused on MD Charts' product and technology strategy in support of the company's goals and vision. She brings extensive experience in developing and leading technology integration teams, defining strategic product vision and roadmaps, and developing a customer-focused culture."
  },
  {
    name: "Daniel Sticca",
    title: "Sales Director",
    image: danielImage,
    bio: "Daniel brings extensive experience in healthcare sales and business development. His strategic approach to client relationships and deep understanding of EHR solutions has enabled him to drive growth and build lasting partnerships with medical practices across the USA."
  },
  {
    name: "Mago Saldana",
    title: "Senior Business Analyst",
    image: magoImage,
    bio: "Mago has been instrumental in numerous EHR implementations across a wide range of medical specialties. As a business analyst, her expertise extends to Ambulatory practices, Urgent care facilities, OB/GYN, Gastroenterology, Internal Medicine, Cardiology, Podiatry, FQHC, Pediatrics, and Dermatology."
  },
  {
    name: "Jacqueline Lally",
    title: "Senior Revenue Cycle Manager",
    image: jackieImage,
    bio: "Jackie brings extensive experience in Medical Billing, specializing in laboratory and genetic testing, cardiology, vascular procedures, sleep studies, internal medicine, OB/GYN, and endometriosis surgery. Her expertise spans the entire billing cycle with a strong focus on accuracy, compliance, and process efficiency."
  }
];

export default function Management() {
  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />
      
      {/* Hero with Image */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px]" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={fadeIn}
            className="max-w-4xl mx-auto text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <Users className="h-4 w-4" />
              OUR TEAM
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              MD Charts Key Management
            </h1>
            
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              What happens when you combine the best technology, accounting, business management and medical skills – putting them together to create a practice management system?
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 1, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={heroImage} 
                alt="Leadership team in meeting" 
                className="w-full h-[400px] object-cover"
                loading="lazy"
                width="800"
                height="400"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Experienced professionals dedicated to transforming healthcare technology
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto space-y-8">
            {teamMembers.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 1, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-gradient-to-br from-slate-50 to-white rounded-3xl p-8 md:p-10 border border-slate-100 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-lg">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-slate-900">{member.name}</h3>
                      <p className="text-primary font-semibold text-lg">{member.title}</p>
                    </div>
                    
                    <p className="text-slate-600 leading-relaxed">
                      {member.bio}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "Extensive", label: "Years Experience" },
              { value: "Many", label: "EHR Implementations" },
              { value: "Numerous", label: "Specialties Served" },
              { value: "Growing", label: "Happy Practices" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.9, y: 5 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-sm text-slate-600 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet Our Team in Person
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Schedule a demo and see how our experienced team can help transform your practice
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/book-demo">
                <Button size="lg" className="bg-white text-primary hover:bg-slate-100">
                  Book a Demo <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/book-demo">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
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
