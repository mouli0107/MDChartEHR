import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { jsPDF } from "jspdf";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, Download, ArrowRight, BookOpen, Loader2
} from "lucide-react";

interface WhitePaper {
  id: string;
  title: string;
  description: string;
  category: string;
  content: string[];
}

const whitePapers: WhitePaper[] = [
  {
    id: "ehr-selection",
    title: "The Modern Medical Practice Guide to EHR Selection",
    description: "A comprehensive guide to evaluating and selecting an EHR system that meets your practice's unique needs.",
    category: "EHR Selection",
    content: [
      "THE MODERN MEDICAL PRACTICE GUIDE TO EHR SELECTION",
      "A Comprehensive Resource for Healthcare Decision Makers",
      "",
      "EXECUTIVE SUMMARY",
      "Selecting the right Electronic Health Record (EHR) system is one of the most critical decisions a medical practice can make. This guide provides a structured framework for evaluating EHR solutions based on clinical workflows, integration capabilities, compliance requirements, and total cost of ownership.",
      "",
      "CHAPTER 1: UNDERSTANDING YOUR PRACTICE NEEDS",
      "Before evaluating EHR vendors, conduct a thorough assessment of your practice:",
      "• Document current clinical workflows and pain points",
      "• Identify specialty-specific requirements",
      "• Assess integration needs with existing systems",
      "• Define user roles and access requirements",
      "• Establish budget parameters and timeline",
      "",
      "CHAPTER 2: KEY EVALUATION CRITERIA",
      "When evaluating EHR systems, prioritize these factors:",
      "",
      "Clinical Functionality",
      "• Charting and documentation efficiency",
      "• Order entry and e-prescribing capabilities",
      "• Clinical decision support tools",
      "• Specialty-specific templates and workflows",
      "",
      "Interoperability",
      "• HL7 FHIR compliance",
      "• Lab and imaging integration",
      "• Health Information Exchange (HIE) connectivity",
      "• Third-party application APIs",
      "",
      "Usability",
      "• Intuitive interface design",
      "• Mobile accessibility",
      "• Customization options",
      "• Training and support resources",
      "",
      "CHAPTER 3: COMPLIANCE AND CERTIFICATION",
      "Ensure your EHR meets regulatory requirements:",
      "• ONC 2015 Edition Cures Update certification",
      "• HIPAA security and privacy standards",
      "• Meaningful Use / Promoting Interoperability compliance",
      "• Quality program and value-based care support",
      "",
      "CHAPTER 4: TOTAL COST OF OWNERSHIP",
      "Consider all cost components:",
      "• Software licensing or subscription fees",
      "• Implementation and training costs",
      "• Hardware and infrastructure requirements",
      "• Ongoing support and maintenance",
      "• Data migration expenses",
      "",
      "CHAPTER 5: VENDOR EVALUATION CHECKLIST",
      "Use this checklist when meeting with vendors:",
      "□ Request live demonstrations with your workflows",
      "□ Speak with reference customers in your specialty",
      "□ Review contract terms and SLAs carefully",
      "□ Understand the implementation timeline",
      "□ Clarify data ownership and exit provisions",
      "",
      "CONCLUSION",
      "The right EHR can transform your practice operations, improve patient care, and position you for success in value-based healthcare. Take time to thoroughly evaluate options and involve key stakeholders in the decision process.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  },
  {
    id: "rcm-optimization",
    title: "Optimizing Revenue Cycle Management in Healthcare",
    description: "Strategies and best practices for improving billing efficiency and reducing claim denials.",
    category: "Revenue Cycle",
    content: [
      "OPTIMIZING REVENUE CYCLE MANAGEMENT IN HEALTHCARE",
      "Strategies for Improving Billing Efficiency and Financial Performance",
      "",
      "EXECUTIVE SUMMARY",
      "Effective Revenue Cycle Management (RCM) is essential for maintaining financial health in medical practices. This guide outlines proven strategies for reducing claim denials, accelerating payments, and maximizing revenue capture.",
      "",
      "CHAPTER 1: THE RCM LIFECYCLE",
      "Understanding the complete revenue cycle:",
      "",
      "Pre-Service",
      "• Patient scheduling and registration",
      "• Insurance verification and eligibility",
      "• Prior authorization management",
      "• Financial counseling and estimates",
      "",
      "Point of Service",
      "• Accurate charge capture",
      "• Real-time documentation",
      "• Copay and deductible collection",
      "• Medical coding at the encounter",
      "",
      "Post-Service",
      "• Claim submission and tracking",
      "• Payment posting and reconciliation",
      "• Denial management and appeals",
      "• Patient collections",
      "",
      "CHAPTER 2: REDUCING CLAIM DENIALS",
      "Common denial reasons and prevention strategies:",
      "",
      "Eligibility Issues (30% of denials)",
      "• Verify coverage before every visit",
      "• Implement real-time eligibility checking",
      "• Update patient demographics regularly",
      "",
      "Authorization Failures (25% of denials)",
      "• Track authorization requirements by payer",
      "• Automate prior auth submissions",
      "• Monitor authorization expiration dates",
      "",
      "Coding Errors (20% of denials)",
      "• Provide ongoing coder education",
      "• Use coding edit software",
      "• Conduct regular coding audits",
      "",
      "CHAPTER 3: ACCELERATING PAYMENTS",
      "Best practices for faster reimbursement:",
      "• Submit claims within 24-48 hours",
      "• Use electronic claims submission exclusively",
      "• Implement automated payment posting",
      "• Work denials within 5 business days",
      "• Appeal all appropriate denials promptly",
      "",
      "CHAPTER 4: KEY PERFORMANCE INDICATORS",
      "Monitor these RCM metrics monthly:",
      "• Days in Accounts Receivable (target: <35 days)",
      "• Clean Claim Rate (target: >95%)",
      "• First Pass Resolution Rate (target: >90%)",
      "• Denial Rate (target: <5%)",
      "• Net Collection Rate (target: >95%)",
      "",
      "CHAPTER 5: TECHNOLOGY SOLUTIONS",
      "Leverage technology for RCM optimization:",
      "• Integrated practice management systems",
      "• Automated eligibility verification",
      "• AI-powered coding assistance",
      "• Predictive denial analytics",
      "• Patient payment portals",
      "",
      "CONCLUSION",
      "A well-optimized revenue cycle requires attention to every stage from scheduling to final payment. Invest in training, technology, and continuous process improvement to maximize your practice's financial performance.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  },
  {
    id: "patient-engagement",
    title: "Patient Engagement in the Digital Age",
    description: "How modern patient portals and communication tools improve patient satisfaction and outcomes.",
    category: "Patient Engagement",
    content: [
      "PATIENT ENGAGEMENT IN THE DIGITAL AGE",
      "Leveraging Technology to Improve Patient Experience and Outcomes",
      "",
      "EXECUTIVE SUMMARY",
      "Patient engagement has evolved from a nice-to-have to a critical component of healthcare delivery. This guide explores how digital tools can strengthen the patient-provider relationship, improve outcomes, and increase practice efficiency.",
      "",
      "CHAPTER 1: THE CASE FOR PATIENT ENGAGEMENT",
      "Benefits of engaged patients:",
      "• 30% better health outcomes",
      "• 50% higher treatment adherence",
      "• 25% reduction in no-shows",
      "• Improved patient satisfaction scores",
      "• Stronger online reputation",
      "",
      "CHAPTER 2: PATIENT PORTAL ESSENTIALS",
      "Features that drive adoption:",
      "",
      "Core Functionality",
      "• Secure messaging with care team",
      "• Online appointment scheduling",
      "• Prescription refill requests",
      "• Lab and test result viewing",
      "• Visit summary access",
      "",
      "Advanced Features",
      "• Bill pay and payment plans",
      "• Health education resources",
      "• Telehealth integration",
      "• Care plan tracking",
      "• Proxy access for caregivers",
      "",
      "CHAPTER 3: COMMUNICATION BEST PRACTICES",
      "Effective patient communication strategies:",
      "",
      "Appointment Reminders",
      "• Send reminders 48 hours and 2 hours before",
      "• Offer multiple channels (text, email, voice)",
      "• Include preparation instructions",
      "• Enable easy rescheduling",
      "",
      "Follow-Up Care",
      "• Post-visit summaries within 24 hours",
      "• Automated check-ins after procedures",
      "• Chronic disease management outreach",
      "• Preventive care reminders",
      "",
      "CHAPTER 4: DRIVING PORTAL ADOPTION",
      "Strategies to increase patient enrollment:",
      "• Promote portal at every touchpoint",
      "• Enroll patients during check-in",
      "• Demonstrate value with first-use benefits",
      "• Provide multilingual support",
      "• Offer mobile access",
      "",
      "CHAPTER 5: MEASURING ENGAGEMENT",
      "Key metrics to track:",
      "• Portal registration rate",
      "• Active user percentage",
      "• Message response time",
      "• Online scheduling adoption",
      "• Patient satisfaction scores",
      "",
      "CHAPTER 6: PRIVACY AND SECURITY",
      "Maintaining patient trust:",
      "• HIPAA-compliant communication",
      "• Multi-factor authentication",
      "• Audit trail documentation",
      "• Regular security assessments",
      "• Clear privacy policies",
      "",
      "CONCLUSION",
      "Digital patient engagement tools are essential for modern healthcare. When implemented thoughtfully, they enhance the care experience for both patients and providers while driving operational efficiency.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  },
  {
    id: "telehealth",
    title: "Telehealth Implementation Best Practices",
    description: "A guide to successfully implementing and optimizing virtual care in your practice.",
    category: "Telehealth",
    content: [
      "TELEHEALTH IMPLEMENTATION BEST PRACTICES",
      "A Guide to Successful Virtual Care Delivery",
      "",
      "EXECUTIVE SUMMARY",
      "Telehealth has become a permanent fixture in healthcare delivery. This guide provides practical guidance for implementing, optimizing, and scaling virtual care services in your practice.",
      "",
      "CHAPTER 1: TELEHEALTH READINESS ASSESSMENT",
      "Evaluate your practice's telehealth readiness:",
      "",
      "Technology Infrastructure",
      "• Reliable high-speed internet (25+ Mbps)",
      "• HD webcams and quality audio",
      "• HIPAA-compliant video platform",
      "• EHR integration capabilities",
      "",
      "Clinical Considerations",
      "• Appropriate visit types for virtual care",
      "• State licensing requirements",
      "• Informed consent procedures",
      "• Clinical protocols for virtual exams",
      "",
      "CHAPTER 2: PLATFORM SELECTION",
      "Key features to evaluate:",
      "• Ease of use for patients and providers",
      "• EHR and scheduling integration",
      "• HIPAA compliance and BAA availability",
      "• Waiting room functionality",
      "• Screen sharing and annotation tools",
      "• Mobile device compatibility",
      "• Recording capabilities (with consent)",
      "",
      "CHAPTER 3: CLINICAL WORKFLOW DESIGN",
      "Optimizing the virtual visit experience:",
      "",
      "Pre-Visit Preparation",
      "• Send appointment reminders with tech instructions",
      "• Collect intake forms electronically",
      "• Verify patient identity and location",
      "• Test technology before the visit",
      "",
      "During the Visit",
      "• Start with a technology check",
      "• Maintain eye contact (look at camera)",
      "• Use good lighting and neutral background",
      "• Document thoroughly in real-time",
      "",
      "Post-Visit Follow-Up",
      "• Provide visit summary promptly",
      "• Send prescriptions electronically",
      "• Schedule follow-up as needed",
      "• Collect patient feedback",
      "",
      "CHAPTER 4: REIMBURSEMENT STRATEGIES",
      "Maximizing telehealth revenue:",
      "• Understand payer-specific policies",
      "• Use appropriate CPT and modifier codes",
      "• Document time and complexity accurately",
      "• Track audio-only visit eligibility",
      "• Stay current on policy changes",
      "",
      "CHAPTER 5: PATIENT ADOPTION",
      "Encouraging telehealth utilization:",
      "• Educate patients on benefits",
      "• Provide simple technology guides",
      "• Offer technical support options",
      "• Start with straightforward visit types",
      "• Gather and act on feedback",
      "",
      "CHAPTER 6: QUALITY AND COMPLIANCE",
      "Maintaining standards in virtual care:",
      "• Establish clinical quality metrics",
      "• Conduct regular chart audits",
      "• Ensure HIPAA compliance",
      "• Maintain state licensure requirements",
      "• Document patient consent",
      "",
      "CONCLUSION",
      "Telehealth extends your practice's reach and provides convenient access to care. Success requires thoughtful implementation, ongoing optimization, and commitment to delivering high-quality virtual care.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  },
  {
    id: "hipaa-compliance",
    title: "HIPAA Compliance in the Cloud Era",
    description: "Understanding security requirements and best practices for cloud-based healthcare solutions.",
    category: "Compliance",
    content: [
      "HIPAA COMPLIANCE IN THE CLOUD ERA",
      "Security Requirements and Best Practices for Cloud Healthcare",
      "",
      "EXECUTIVE SUMMARY",
      "Cloud-based healthcare solutions offer significant advantages, but require careful attention to HIPAA compliance. This guide outlines key requirements and best practices for maintaining security and privacy in the cloud.",
      "",
      "CHAPTER 1: HIPAA FUNDAMENTALS",
      "Core HIPAA requirements for covered entities:",
      "",
      "Privacy Rule",
      "• Protected Health Information (PHI) safeguards",
      "• Patient access rights",
      "• Minimum necessary standard",
      "• Notice of privacy practices",
      "",
      "Security Rule",
      "• Administrative safeguards",
      "• Physical safeguards",
      "• Technical safeguards",
      "• Organizational requirements",
      "",
      "Breach Notification Rule",
      "• Notification timelines",
      "• Breach assessment procedures",
      "• Documentation requirements",
      "• Reporting obligations",
      "",
      "CHAPTER 2: CLOUD SECURITY ESSENTIALS",
      "Critical security measures for cloud deployments:",
      "",
      "Data Protection",
      "• Encryption at rest (AES-256)",
      "• Encryption in transit (TLS 1.2+)",
      "• Key management procedures",
      "• Data backup and recovery",
      "",
      "Access Controls",
      "• Role-based access management",
      "• Multi-factor authentication",
      "• Session timeout policies",
      "• Unique user identification",
      "",
      "Audit and Monitoring",
      "• Comprehensive audit logging",
      "• Real-time security monitoring",
      "• Intrusion detection systems",
      "• Regular log review",
      "",
      "CHAPTER 3: VENDOR MANAGEMENT",
      "Evaluating cloud healthcare vendors:",
      "",
      "Due Diligence Requirements",
      "• Business Associate Agreement (BAA)",
      "• SOC 2 Type II certification",
      "• HITRUST CSF certification (preferred)",
      "• Penetration testing results",
      "• Incident response procedures",
      "",
      "Contractual Protections",
      "• Data ownership clauses",
      "• Breach notification requirements",
      "• Data portability provisions",
      "• Termination and data return",
      "",
      "CHAPTER 4: RISK MANAGEMENT",
      "Ongoing compliance activities:",
      "• Annual risk assessments",
      "• Vulnerability scanning",
      "• Security awareness training",
      "• Policy and procedure reviews",
      "• Incident response testing",
      "",
      "CHAPTER 5: WORKFORCE TRAINING",
      "Essential training topics:",
      "• PHI handling procedures",
      "• Password and authentication",
      "• Phishing awareness",
      "• Mobile device security",
      "• Breach reporting",
      "",
      "CHAPTER 6: DOCUMENTATION REQUIREMENTS",
      "Maintain comprehensive records:",
      "• Policies and procedures",
      "• Risk assessments",
      "• Training records",
      "• Audit logs",
      "• Business associate agreements",
      "• Incident reports",
      "",
      "CONCLUSION",
      "Cloud-based healthcare solutions can be fully HIPAA compliant when proper safeguards are implemented. Partner with vendors who prioritize security and maintain robust internal compliance programs.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  },
  {
    id: "specialty-ehr",
    title: "Specialty EHR: Why One Size Doesn't Fit All",
    description: "The benefits of specialty-specific EHR solutions and how they improve clinical workflows.",
    category: "Specialty Care",
    content: [
      "SPECIALTY EHR: WHY ONE SIZE DOESN'T FIT ALL",
      "The Benefits of Specialty-Specific Electronic Health Records",
      "",
      "EXECUTIVE SUMMARY",
      "Generic EHR systems often fail to meet the unique needs of specialty practices. This guide explores why specialty-specific solutions deliver better clinical outcomes, improved efficiency, and higher user satisfaction.",
      "",
      "CHAPTER 1: THE PROBLEM WITH GENERIC EHRs",
      "Challenges faced by specialty practices:",
      "",
      "Workflow Misalignment",
      "• Templates designed for primary care",
      "• Missing specialty-specific data fields",
      "• Inefficient documentation processes",
      "• Excessive clicks and workarounds",
      "",
      "Integration Gaps",
      "• Limited specialty device integration",
      "• Missing procedure-specific tools",
      "• Inadequate imaging workflows",
      "• Poor specialty billing support",
      "",
      "CHAPTER 2: SPECIALTY-SPECIFIC ADVANTAGES",
      "Benefits of purpose-built solutions:",
      "",
      "Clinical Efficiency",
      "• Specialty-optimized templates",
      "• Procedure-specific workflows",
      "• Integrated diagnostic tools",
      "• Streamlined documentation",
      "",
      "Revenue Enhancement",
      "• Accurate specialty coding",
      "• Procedure-specific charge capture",
      "• Specialty billing rules",
      "• Prior authorization support",
      "",
      "CHAPTER 3: SPECIALTY CONSIDERATIONS",
      "Examples of specialty-specific needs:",
      "",
      "Dermatology",
      "• Body mapping and lesion tracking",
      "• Pathology integration",
      "• Photography management",
      "• Cosmetic procedure documentation",
      "",
      "Orthopedics",
      "• Imaging integration (X-ray, MRI)",
      "• Surgical planning tools",
      "• Physical therapy coordination",
      "• DME ordering and tracking",
      "",
      "Ophthalmology",
      "• Diagnostic device integration",
      "• Optical dispensing",
      "• Surgical outcome tracking",
      "• Contact lens management",
      "",
      "Cardiology",
      "• ECG and echo integration",
      "• Cardiac imaging workflows",
      "• Device management",
      "• Risk stratification tools",
      "",
      "CHAPTER 4: CUSTOMIZATION VS. SPECIALTY",
      "Understanding the difference:",
      "",
      "Customizable Generic EHR",
      "• Requires significant configuration",
      "• May lack deep specialty features",
      "• Higher implementation burden",
      "• Ongoing maintenance required",
      "",
      "Purpose-Built Specialty EHR",
      "• Ready-to-use specialty workflows",
      "• Deep specialty functionality",
      "• Faster implementation",
      "• Specialty-focused updates",
      "",
      "CHAPTER 5: EVALUATION FRAMEWORK",
      "Assessing specialty EHR solutions:",
      "• Specialty-specific template library",
      "• Relevant device integrations",
      "• Procedure documentation tools",
      "• Specialty billing capabilities",
      "• Reference customers in your specialty",
      "• Specialty-focused development roadmap",
      "",
      "CHAPTER 6: MAKING THE TRANSITION",
      "Planning your specialty EHR migration:",
      "• Document current workflow pain points",
      "• Define must-have specialty features",
      "• Involve specialty clinicians in selection",
      "• Plan for comprehensive training",
      "• Allow time for workflow optimization",
      "",
      "CONCLUSION",
      "Specialty practices deserve EHR solutions designed for their unique needs. Investing in a specialty-specific system pays dividends in clinical efficiency, revenue capture, and provider satisfaction.",
      "",
      "© 2026 MDcharts EHR. All rights reserved.",
      "www.mdchartsehr.com"
    ]
  }
];

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  practiceAddress: string;
  downloadReason: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  practiceAddress?: string;
  downloadReason?: string;
}

export default function WhitePapers() {
  const [selectedPaper, setSelectedPaper] = useState<WhitePaper | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    practiceAddress: "",
    downloadReason: ""
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const { toast } = useToast();

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = "First name is required";
    }
    if (!formData.lastName.trim()) {
      errors.lastName = "Last name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = "Please enter a valid email address";
    }
    if (!formData.practiceAddress.trim()) {
      errors.practiceAddress = "Practice address is required";
    } else if (formData.practiceAddress.trim().length < 10) {
      errors.practiceAddress = "Please enter a complete address";
    }
    if (!formData.downloadReason.trim()) {
      errors.downloadReason = "Please tell us why you're interested";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generatePDF = (paper: WhitePaper) => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - margin * 2;
    let yPosition = margin;
    const lineHeight = 7;
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 150, 180);
    doc.text("MDcharts EHR", margin, yPosition);
    doc.text("www.mdchartsehr.com", pageWidth - margin, yPosition, { align: "right" });
    yPosition += 15;
    
    paper.content.forEach((line) => {
      let processedLine = line
        .replace(/•/g, "-")
        .replace(/□/g, "[ ]")
        .replace(/©/g, "(c)");
      
      if (yPosition > pageHeight - margin - 20) {
        doc.addPage();
        yPosition = margin;
      }
      
      if (processedLine === "") {
        yPosition += lineHeight / 2;
        return;
      }
      
      const isBullet = line.startsWith("-") || processedLine.startsWith("-");
      const isCheckbox = line.startsWith("[ ]") || processedLine.startsWith("[ ]");
      const isCopyright = line.startsWith("(c)") || processedLine.startsWith("(c)") || line.startsWith("www.");
      
      if (processedLine === processedLine.toUpperCase() && processedLine.length > 10 && !isBullet && !isCheckbox) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(processedLine.length > 40 ? 14 : 16);
        doc.setTextColor(0, 80, 120);
      } else if (processedLine.startsWith("CHAPTER") || processedLine.startsWith("EXECUTIVE")) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0, 100, 140);
        yPosition += 5;
      } else if (isBullet || isCheckbox) {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(60, 60, 60);
      } else if (isCopyright) {
        doc.setFont("helvetica", "italic");
        doc.setFontSize(9);
        doc.setTextColor(120, 120, 120);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.setTextColor(40, 40, 40);
      }
      
      const splitLines = doc.splitTextToSize(processedLine, maxWidth);
      splitLines.forEach((splitLine: string) => {
        if (yPosition > pageHeight - margin - 10) {
          doc.addPage();
          yPosition = margin;
        }
        doc.text(splitLine, margin, yPosition);
        yPosition += lineHeight;
      });
    });
    
    doc.save(`${paper.id}-mdcharts-whitepaper.pdf`);
  };

  const handleDownloadClick = (paper: WhitePaper) => {
    setSelectedPaper(paper);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      practiceAddress: "",
      downloadReason: ""
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm() || !selectedPaper) return;

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/white-paper-download", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          whitePaperId: selectedPaper.id,
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim(),
          practiceAddress: formData.practiceAddress.trim(),
          downloadReason: formData.downloadReason.trim()
        })
      });

      if (response.ok) {
        toast({
          title: "Download starting...",
          description: "Your white paper is being downloaded."
        });
        setIsModalOpen(false);
        generatePDF(selectedPaper);
      } else {
        throw new Error("Failed to submit");
      }
    } catch {
      toast({
        title: "Error",
        description: "Failed to process your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <BookOpen className="h-4 w-4" />
              Resources
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight mb-6">
              White Papers & <span className="text-primary">Guides</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              In-depth resources to help you make informed decisions about healthcare technology and practice management.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whitePapers.map((paper, index) => (
              <motion.div
                key={paper.id}
                initial={{ opacity: 1, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-50 rounded-2xl p-6 hover:shadow-lg transition-shadow flex flex-col"
                data-testid={`card-whitepaper-${paper.id}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-semibold text-primary" data-testid={`text-category-${paper.id}`}>{paper.category}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2" data-testid={`text-title-${paper.id}`}>{paper.title}</h3>
                <p className="text-slate-600 mb-6 flex-grow">{paper.description}</p>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleDownloadClick(paper)}
                  data-testid={`button-download-${paper.id}`}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to See MDcharts in Action?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Schedule a personalized demo to see how MDcharts can transform your practice.
          </p>
          <Link href="/book-demo">
            <Button size="lg" variant="secondary" className="h-12 px-8" data-testid="button-schedule-demo">
              Schedule Your Demo <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download White Paper</DialogTitle>
            <DialogDescription>
              Please provide your information to download "{selectedPaper?.title}"
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  className={formErrors.firstName ? "border-red-500" : ""}
                  data-testid="input-first-name"
                />
                {formErrors.firstName && (
                  <p className="text-red-500 text-sm">{formErrors.firstName}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Smith"
                  className={formErrors.lastName ? "border-red-500" : ""}
                  data-testid="input-last-name"
                />
                {formErrors.lastName && (
                  <p className="text-red-500 text-sm">{formErrors.lastName}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email Address *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.smith@practice.com"
                className={formErrors.email ? "border-red-500" : ""}
                data-testid="input-email"
              />
              {formErrors.email && (
                <p className="text-red-500 text-sm">{formErrors.email}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="practiceAddress">Practice Address *</Label>
              <Input
                id="practiceAddress"
                value={formData.practiceAddress}
                onChange={(e) => setFormData({ ...formData, practiceAddress: e.target.value })}
                placeholder="123 Medical Center Dr, Suite 100, City, State 12345"
                className={formErrors.practiceAddress ? "border-red-500" : ""}
                data-testid="input-practice-address"
              />
              {formErrors.practiceAddress && (
                <p className="text-red-500 text-sm">{formErrors.practiceAddress}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="downloadReason">Why are you interested in this resource? *</Label>
              <Textarea
                id="downloadReason"
                value={formData.downloadReason}
                onChange={(e) => setFormData({ ...formData, downloadReason: e.target.value })}
                placeholder="I'm evaluating EHR systems for my practice..."
                rows={3}
                className={formErrors.downloadReason ? "border-red-500" : ""}
                data-testid="input-download-reason"
              />
              {formErrors.downloadReason && (
                <p className="text-red-500 text-sm">{formErrors.downloadReason}</p>
              )}
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsModalOpen(false)}
                className="flex-1"
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="flex-1"
                disabled={isSubmitting}
                data-testid="button-submit-download"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
