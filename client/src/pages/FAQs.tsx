import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { 
  HelpCircle, ArrowRight
} from "lucide-react";

const faqs = [
  {
    question: "What specialties does MD Charts support?",
    answer: "MD Charts supports popular medical specialties including Cardiology, Dermatology, Family Medicine, OB/GYN, Pediatrics, and Urology. Each specialty has tailored templates and workflows designed for specific clinical needs."
  },
  {
    question: "Does MD Charts meet regulatory requirements?",
    answer: "Yes, MD Charts is designed to meet federal EHR requirements. Our system is built to support Meaningful Use, MIPS, and current regulatory standards, helping your practice stay compliant."
  },
  {
    question: "How long does implementation take?",
    answer: "Implementation timelines vary based on practice size and complexity. Our team works closely with each practice to develop a customized implementation plan that minimizes disruption to your operations while ensuring a successful transition."
  },
  {
    question: "Do you provide training?",
    answer: "Yes, we provide comprehensive training for all users. This includes initial onboarding training, role-based training sessions, and ongoing education resources. Our support team is also available to answer questions as they arise."
  },
  {
    question: "Can MD Charts integrate with our existing systems?",
    answer: "MD Charts offers integration capabilities with many healthcare systems including laboratory networks, imaging centers, health information exchanges, and clearinghouses. Our team can discuss your specific integration needs during a consultation."
  },
  {
    question: "Is there a patient portal?",
    answer: "Yes, MD Charts includes a full-featured patient portal that allows patients to schedule appointments, view health records, communicate with your practice, pay bills, and complete pre-visit paperwork online."
  },
  {
    question: "How is my data protected?",
    answer: "MD Charts employs enterprise-grade security measures including encryption, access controls, audit logging, and regular security assessments. We are fully HIPAA compliant and take data protection seriously."
  },
  {
    question: "Do you offer telehealth capabilities?",
    answer: "Yes, MD Charts includes integrated HIPAA-compliant telehealth functionality. Providers can conduct video visits directly within the EHR, and patients can join without downloading any apps."
  }
];

export default function FAQs() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
  
  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
              <HelpCircle className="h-4 w-4" />
              FAQs
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              Frequently Asked <span className="text-primary">Questions</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              Find answers to common questions about MD Charts EHR and our services.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`} className="bg-slate-50 rounded-xl px-6 border-none">
                  <AccordionTrigger className="text-left font-semibold text-slate-900 hover:no-underline py-6">
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

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Still Have Questions?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Our team is here to help. Contact us or schedule a demo to learn more.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/book-demo">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Schedule a Demo <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 border-white text-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
