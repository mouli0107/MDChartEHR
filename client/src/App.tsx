import { Switch, Route, useLocation } from "wouter";
import { useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import RCMPage from "@/pages/RCM";
import EHRPage from "@/pages/EHR";
import PracticeManagementPage from "@/pages/PracticeManagement";
import PatientEngagementPage from "@/pages/PatientEngagement";
import SpecialtiesPage from "@/pages/Specialties";
import CompliancePage from "@/pages/Compliance";
import WhyMDChartsPage from "@/pages/WhyMDCharts";
import DermatologySpecialtyPage from "@/pages/DermatologySpecialty";
import CardiologySpecialtyPage from "@/pages/CardiologySpecialty";
import OBGYNSpecialtyPage from "@/pages/OBGYNSpecialty";
import PediatricsSpecialtyPage from "@/pages/PediatricsSpecialty";
import UrologySpecialtyPage from "@/pages/UrologySpecialty";
import FamilyMedicineSpecialtyPage from "@/pages/FamilyMedicineSpecialty";
import BookDemoPage from "@/pages/BookDemo";
import OurMissionPage from "@/pages/OurMission";
import ManagementPage from "@/pages/Management";
import ClickLessCareMorePage from "@/pages/ClickLessCareMore";
import ContactPage from "@/pages/Contact";
import SupportPage from "@/pages/Support";
import BlogPage from "@/pages/Blog";
import BlogPostPage from "@/pages/BlogPost";
import PricingPage from "@/pages/Pricing";

import OrthopedicsSpecialtyPage from "@/pages/OrthopedicsSpecialty";
import OphthalmologySpecialtyPage from "@/pages/OphthalmologySpecialty";
import ENTSpecialtyPage from "@/pages/ENTSpecialty";
import GastroenterologySpecialtyPage from "@/pages/GastroenterologySpecialty";
import NeurologySpecialtyPage from "@/pages/NeurologySpecialty";
import PsychiatrySpecialtyPage from "@/pages/PsychiatrySpecialty";

import EPrescribingPage from "@/pages/EPrescribing";
import LabIntegrationPage from "@/pages/LabIntegration";
import TelehealthPage from "@/pages/Telehealth";
import PatientPortalPage from "@/pages/PatientPortal";
import AnalyticsPage from "@/pages/Analytics";

import CaseStudiesPage from "@/pages/CaseStudies";
import TestimonialsPage from "@/pages/Testimonials";
import FAQsPage from "@/pages/FAQs";
import WebinarsPage from "@/pages/Webinars";
import WhitePapersPage from "@/pages/WhitePapers";

import AboutUsPage from "@/pages/AboutUs";
import LeadershipPage from "@/pages/Leadership";
import CareersPage from "@/pages/Careers";
import PartnersPage from "@/pages/Partners";
import PressPage from "@/pages/Press";

import PrivacyPolicyPage from "@/pages/PrivacyPolicy";
import TermsOfServicePage from "@/pages/TermsOfService";
import HIPAACompliancePage from "@/pages/HIPAACompliance";
import SecurityPage from "@/pages/Security";
import AdminLeadsPage from "@/pages/AdminLeads";
import AdminLoginPage from "@/pages/AdminLogin";

import { usePageTracker } from "@/hooks/use-page-tracker";
import { CookieConsent } from "@/components/CookieConsent";

function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  
  return null;
}

function PageTracker() {
  usePageTracker();
  return null;
}

function Router() {
  return (
    <>
      <ScrollToTop />
      <PageTracker />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/rcm" component={RCMPage} />
        <Route path="/ehr" component={EHRPage} />
        <Route path="/practice-management" component={PracticeManagementPage} />
        <Route path="/patient-engagement" component={PatientEngagementPage} />
        <Route path="/specialties" component={SpecialtiesPage} />
        <Route path="/specialties/dermatology" component={DermatologySpecialtyPage} />
        <Route path="/specialties/cardiology" component={CardiologySpecialtyPage} />
        <Route path="/specialties/obgyn" component={OBGYNSpecialtyPage} />
        <Route path="/specialties/pediatrics" component={PediatricsSpecialtyPage} />
        <Route path="/specialties/urology" component={UrologySpecialtyPage} />
        <Route path="/specialties/family-medicine" component={FamilyMedicineSpecialtyPage} />
        <Route path="/specialties/orthopedics" component={OrthopedicsSpecialtyPage} />
        <Route path="/specialties/ophthalmology" component={OphthalmologySpecialtyPage} />
        <Route path="/specialties/ent" component={ENTSpecialtyPage} />
        <Route path="/specialties/gastroenterology" component={GastroenterologySpecialtyPage} />
        <Route path="/specialties/neurology" component={NeurologySpecialtyPage} />
        <Route path="/specialties/psychiatry" component={PsychiatrySpecialtyPage} />
        <Route path="/compliance" component={CompliancePage} />
        <Route path="/why-mdcharts" component={WhyMDChartsPage} />
        <Route path="/book-demo" component={BookDemoPage} />
        <Route path="/about/our-mission" component={OurMissionPage} />
        <Route path="/about/management" component={ManagementPage} />
        <Route path="/about/click-less-care-more" component={ClickLessCareMorePage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/support" component={SupportPage} />
        <Route path="/blog" component={BlogPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/pricing" component={PricingPage} />
        
        <Route path="/features/e-prescribing" component={EPrescribingPage} />
        <Route path="/features/lab-integration" component={LabIntegrationPage} />
        <Route path="/features/telehealth" component={TelehealthPage} />
        <Route path="/features/patient-portal" component={PatientPortalPage} />
        <Route path="/features/analytics" component={AnalyticsPage} />
        
        <Route path="/resources/case-studies" component={CaseStudiesPage} />
        <Route path="/resources/testimonials" component={TestimonialsPage} />
        <Route path="/resources/faqs" component={FAQsPage} />
        <Route path="/resources/webinars" component={WebinarsPage} />
        <Route path="/resources/white-papers" component={WhitePapersPage} />
        
        <Route path="/about" component={AboutUsPage} />
        <Route path="/about/leadership" component={LeadershipPage} />
        <Route path="/careers" component={CareersPage} />
        <Route path="/partners" component={PartnersPage} />
        <Route path="/press" component={PressPage} />
        
        <Route path="/privacy-policy" component={PrivacyPolicyPage} />
        <Route path="/terms-of-service" component={TermsOfServicePage} />
        <Route path="/hipaa-compliance" component={HIPAACompliancePage} />
        <Route path="/security" component={SecurityPage} />
        
        <Route path="/admin" component={() => { window.location.href = "/admin/leads"; return null; }} />
        <Route path="/admin/login" component={AdminLoginPage} />
        <Route path="/admin/leads" component={AdminLeadsPage} />
        
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
