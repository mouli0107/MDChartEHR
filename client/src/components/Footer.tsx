import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import mdchartsLogo from "@assets/MDCharts_LKogo_1771059106411.png";

export function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-400 py-16 border-t border-slate-900">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center mb-6">
              <img 
                src={mdchartsLogo} 
                alt="MDcharts EHR" 
                className="h-8 w-auto object-contain"
              />
            </Link>
            <p className="mb-6 max-w-sm text-slate-500 leading-relaxed">
              The all-in-one EHR, RCM, and Practice Management solution designed to help independent practices thrive in a complex healthcare environment.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-primary transition-colors">
              Contact Us <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Solutions</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/ehr" className="hover:text-primary transition-colors">Electronic Health Records</Link></li>
              <li><Link href="/practice-management" className="hover:text-primary transition-colors">Practice Management</Link></li>
              <li><Link href="/rcm" className="hover:text-primary transition-colors">Revenue Cycle Management</Link></li>
              <li><Link href="/patient-engagement" className="hover:text-primary transition-colors">Patient Engagement</Link></li>
              <li><Link href="/features/telehealth" className="hover:text-primary transition-colors">Telemedicine</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Specialties</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/specialties/dermatology" className="hover:text-primary transition-colors">Dermatology</Link></li>
              <li><Link href="/specialties/family-medicine" className="hover:text-primary transition-colors">Family Medicine</Link></li>
              <li><Link href="/specialties/pediatrics" className="hover:text-primary transition-colors">Pediatrics</Link></li>
              <li><Link href="/specialties/obgyn" className="hover:text-primary transition-colors">OB/GYN</Link></li>
              <li><Link href="/specialties/cardiology" className="hover:text-primary transition-colors">Cardiology</Link></li>
              <li><Link href="/specialties/orthopedics" className="hover:text-primary transition-colors">Orthopedics</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6">Company</h4>
            <ul className="space-y-4 text-sm">
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-primary transition-colors">Blog</Link></li>
              <li><Link href="/compliance" className="hover:text-primary transition-colors">Compliance</Link></li>
              <li><Link href="/support" className="hover:text-primary transition-colors">Contact Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>© 2026 MDcharts EHR. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link>
            <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/hipaa-compliance" className="hover:text-white">HIPAA Notice</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
