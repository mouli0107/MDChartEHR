import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Stethoscope, Heart, Brain, Baby, Eye, Bone, 
  Activity, Pill, Thermometer, Ear, Syringe, Scissors,
  ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const specialtyIcons = [
  { icon: Stethoscope, name: "Internal Medicine", color: "bg-primary/10 text-primary" },
  { icon: Heart, name: "Cardiology", color: "bg-rose-100 text-rose-600" },
  { icon: Brain, name: "Neurology", color: "bg-purple-100 text-purple-600" },
  { icon: Baby, name: "Pediatrics", color: "bg-amber-100 text-amber-600" },
  { icon: Eye, name: "Ophthalmology", color: "bg-emerald-100 text-emerald-600" },
  { icon: Bone, name: "Orthopedics", color: "bg-slate-100 text-slate-600" },
  { icon: Activity, name: "OB/GYN", color: "bg-pink-100 text-pink-600" },
  { icon: Pill, name: "Pain Management", color: "bg-blue-100 text-blue-600" },
  { icon: Thermometer, name: "Family Medicine", color: "bg-orange-100 text-orange-600" },
  { icon: Ear, name: "ENT", color: "bg-teal-100 text-teal-600" },
  { icon: Syringe, name: "Dermatology", color: "bg-rose-100 text-rose-600" },
  { icon: Scissors, name: "General Surgery", color: "bg-indigo-100 text-indigo-600" },
];

export function Specialties() {
  return (
    <section id="specialties" className="py-20 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-heading text-slate-900 mb-4">
            Popular Specialties
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Purpose-built templates and workflows for every medical specialty
          </p>
        </div>
      </div>

      {/* Scrolling Marquee */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-50 to-transparent z-10" />
        
        <motion.div 
          className="flex gap-6"
          animate={{ x: [0, -1200] }}
          transition={{ 
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...specialtyIcons, ...specialtyIcons].map((spec, i) => (
            <div 
              key={i}
              className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-slate-200 shadow-sm shrink-0 hover:shadow-md hover:border-primary/30 transition-all"
            >
              <div className={`h-10 w-10 rounded-full ${spec.color} flex items-center justify-center`}>
                <spec.icon className="h-5 w-5" />
              </div>
              <span className="font-semibold text-slate-700 whitespace-nowrap">{spec.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 mt-12 text-center">
        <Link href="/specialties">
          <Button size="lg" variant="outline" className="h-12 px-8">
            Explore All Specialties <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
