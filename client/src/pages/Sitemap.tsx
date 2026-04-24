import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Link } from "wouter";
import { FileText } from "lucide-react";

export default function Sitemap() {
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />

      <section className="pt-28 pb-12 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <FileText className="h-4 w-4" />
              MD Charts
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Sitemap</h1>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white" style={{ paddingTop: "0px" }}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto prose prose-slate">

              <ul style={{ lineHeight: "2.2em", listStyleType: "disc" }}>
                <li><Link to="https://mdchartsehr.com/"><strong>Home</strong></Link></li>
                <li><Link to="https://mdchartsehr.com/ehr">Electronic Health Records</Link></li>
                <li><Link to="https://mdchartsehr.com/practice-management">Practice Management</Link></li>
                <li><Link to="https://mdchartsehr.com/rcm">Revenue Cycle Management</Link></li>
                <li><Link to="https://mdchartsehr.com/patient-engagement">Patient Engagement</Link></li>
                <li><Link to="https://mdchartsehr.com/features/telehealth">Telemedicine</Link></li>
                <li><Link to="https://mdchartsehr.com/support">Support</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/dermatology">DermCharts</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/obgyn">OB/GYN</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/pediatrics">KidsCharts</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/cardiology">Cardiology</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/family-medicine">Family Medicine</Link></li>
                <li><Link to="https://mdchartsehr.com/specialties/urology">Urology</Link></li>
                <li><Link to="https://mdchartsehr.com/why-mdcharts">Why MD Charts</Link></li>
                <li><Link to="https://mdchartsehr.com/about/management">Management</Link></li>
                <li><Link to="https://mdchartsehr.com/about/our-mission">Our Mission</Link></li>
                <li><Link to="https://mdchartsehr.com/about/click-less-care-more">Click Less Care More</Link></li>
                <li><Link to="https://mdchartsehr.com/blog">Blog</Link></li>
                <li><Link to="https://mdchartsehr.com/contact">Contact</Link></li>
                <li><Link to="https://mdchartsehr.com/resources/faqs">FAQs</Link></li>
              </ul>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
