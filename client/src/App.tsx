import { Switch, Route, useLocation } from "wouter";
import { lazy, Suspense, useEffect, useState } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MessageSquare } from "lucide-react";
import { ContactModal } from "@/components/ContactModal";
import { usePageTracker } from "@/hooks/use-page-tracker";
import { CookieConsent } from "@/components/CookieConsent";
import { OrganizationSchema } from "@/components/SchemaMarkup";

// ── Route-level code splitting ────────────────────────────────────────────────
// Each page is a separate JS chunk loaded on demand. The browser only downloads
// the code for the page the visitor actually views.
const NotFound                  = lazy(() => import("@/pages/not-found"));
const Home                      = lazy(() => import("@/pages/Home"));
const RCMPage                   = lazy(() => import("@/pages/RCM"));
const EHRPage                   = lazy(() => import("@/pages/EHR"));
const PracticeManagementPage    = lazy(() => import("@/pages/PracticeManagement"));
const PatientEngagementPage     = lazy(() => import("@/pages/PatientEngagement"));
const SpecialtiesPage           = lazy(() => import("@/pages/Specialties"));
const CompliancePage            = lazy(() => import("@/pages/Compliance"));
const WhyMDChartsPage           = lazy(() => import("@/pages/WhyMDCharts"));
const DermatologySpecialtyPage  = lazy(() => import("@/pages/DermatologySpecialty"));
const CardiologySpecialtyPage   = lazy(() => import("@/pages/CardiologySpecialty"));
const OBGYNSpecialtyPage        = lazy(() => import("@/pages/OBGYNSpecialty"));
const PediatricsSpecialtyPage   = lazy(() => import("@/pages/PediatricsSpecialty"));
const UrologySpecialtyPage      = lazy(() => import("@/pages/UrologySpecialty"));
const FamilyMedicineSpecialtyPage = lazy(() => import("@/pages/FamilyMedicineSpecialty"));
const OrthopedicsSpecialtyPage  = lazy(() => import("@/pages/OrthopedicsSpecialty"));
const OphthalmologySpecialtyPage = lazy(() => import("@/pages/OphthalmologySpecialty"));
const ENTSpecialtyPage          = lazy(() => import("@/pages/ENTSpecialty"));
const GastroenterologySpecialtyPage = lazy(() => import("@/pages/GastroenterologySpecialty"));
const NeurologySpecialtyPage    = lazy(() => import("@/pages/NeurologySpecialty"));
const PsychiatrySpecialtyPage   = lazy(() => import("@/pages/PsychiatrySpecialty"));
const BookDemoPage              = lazy(() => import("@/pages/BookDemo"));
const OurMissionPage            = lazy(() => import("@/pages/OurMission"));
const ManagementPage            = lazy(() => import("@/pages/Management"));
const ClickLessCareMorePage     = lazy(() => import("@/pages/ClickLessCareMore"));
const ContactPage               = lazy(() => import("@/pages/Contact"));
const SupportPage               = lazy(() => import("@/pages/Support"));
const BlogPage                  = lazy(() => import("@/pages/Blog"));
const BlogPostPage              = lazy(() => import("@/pages/BlogPost"));
const PricingPage               = lazy(() => import("@/pages/Pricing"));
const AIFeaturesPage            = lazy(() => import("@/pages/AIFeatures"));
const EPrescribingPage          = lazy(() => import("@/pages/EPrescribing"));
const LabIntegrationPage        = lazy(() => import("@/pages/LabIntegration"));
const TelehealthPage            = lazy(() => import("@/pages/Telehealth"));
const PatientPortalPage         = lazy(() => import("@/pages/PatientPortal"));
const AnalyticsPage             = lazy(() => import("@/pages/Analytics"));
const CaseStudiesPage           = lazy(() => import("@/pages/CaseStudies"));
const TestimonialsPage          = lazy(() => import("@/pages/Testimonials"));
const FAQsPage                  = lazy(() => import("@/pages/FAQs"));
const WebinarsPage              = lazy(() => import("@/pages/Webinars"));
const WhitePapersPage           = lazy(() => import("@/pages/WhitePapers"));
const AboutUsPage               = lazy(() => import("@/pages/AboutUs"));
const LeadershipPage            = lazy(() => import("@/pages/Leadership"));
const CareersPage               = lazy(() => import("@/pages/Careers"));
const PartnersPage              = lazy(() => import("@/pages/Partners"));
const PressPage                 = lazy(() => import("@/pages/Press"));
const PrivacyPolicyPage         = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfServicePage        = lazy(() => import("@/pages/TermsOfService"));
const SitemapPage               = lazy(() => import("@/pages/Sitemap"));
const HIPAACompliancePage       = lazy(() => import("@/pages/HIPAACompliance"));
const SecurityPage              = lazy(() => import("@/pages/Security"));
const AdminLeadsPage            = lazy(() => import("@/pages/AdminLeads"));
const AdminLoginPage            = lazy(() => import("@/pages/AdminLogin"));
const AdminAnalyticsPage        = lazy(() => import("@/pages/AdminAnalytics"));

// Minimal loading state shown while a page chunk is being fetched.
// Matches the site background so there's no jarring flash.
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// ── Fix 4: Global floating Contact Us button ─────────────────────────────────
function GlobalContactButton() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const hideOn = ["/admin", "/contact", "/book-demo"];
  if (hideOn.some((p) => location.startsWith(p))) return null;

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-[110px] right-4 z-[99999] flex items-center gap-2 px-4 py-3 rounded-full text-white text-sm font-semibold shadow-lg hover:opacity-90 transition-opacity"
        style={{ background: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)" }}
        aria-label="Contact Us"
        data-testid="button-floating-contact"
      >
        <MessageSquare className="h-4 w-4 shrink-0" />
        <span className="hidden sm:inline">Contact Us</span>
      </button>
      <ContactModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        requestType="contact"
        title="Contact Us"
      />
    </>
  );
}

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
      <GlobalContactButton />
      <Suspense fallback={<PageLoader />}>
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
          <Route path="/ai-features" component={AIFeaturesPage} />
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
          <Route path="/sitemap" component={SitemapPage} />
          <Route path="/hipaa-compliance" component={HIPAACompliancePage} />
          <Route path="/security" component={SecurityPage} />
          <Route path="/admin" component={() => { window.location.href = "/admin/leads"; return null; }} />
          <Route path="/admin/login" component={AdminLoginPage} />
          <Route path="/admin/leads" component={AdminLeadsPage} />
          <Route path="/admin/analytics" component={AdminAnalyticsPage} />
          <Route component={NotFound} />
        </Switch>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <OrganizationSchema />
        <Toaster />
        <Router />
        <CookieConsent />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
