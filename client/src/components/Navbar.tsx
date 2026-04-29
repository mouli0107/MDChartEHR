import { Link, useLocation } from "wouter";
import { AADBanner } from "@/components/AADBanner";
import { Button } from "@/components/ui/button";
import { 
  Stethoscope, Menu, X, Phone, Mail, Clock, ChevronRight, 
  FileText, Calendar, DollarSign, Users, Shield, Award, 
  BookOpen, ExternalLink, ArrowRight, Building2, Heart,
  ClipboardList, Zap, TrendingUp, MessageSquare, Video,
  Smartphone, BarChart3, FlaskConical, Briefcase, Newspaper,
  HelpCircle, Star, Handshake
} from "lucide-react";
import mdchartsLogo from "@assets/mdcharts_live_logo.png";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const solutionsLeft = [
  { 
    title: "Electronic Health Records", 
    href: "/ehr", 
    description: "Intuitive charting with specialty templates",
    icon: FileText
  },
  { 
    title: "Practice Management", 
    href: "/practice-management", 
    description: "Scheduling, registration & workflows",
    icon: Calendar
  },
  { 
    title: "Revenue Cycle Management", 
    href: "/rcm", 
    description: "Maximize reimbursements & reduce denials",
    icon: DollarSign
  },
  { 
    title: "Patient Engagement", 
    href: "/patient-engagement", 
    description: "Portal for messaging & appointments",
    icon: Users
  },
];

const solutionsRight = [
  { title: "e-Prescribing", href: "/features/e-prescribing", icon: ClipboardList },
  { title: "Lab Integration", href: "/features/lab-integration", icon: FlaskConical },
  { title: "Telehealth", href: "/features/telehealth", icon: Video },
  { title: "Patient Portal", href: "/features/patient-portal", icon: Users },
  { title: "Analytics & Reports", href: "/features/analytics", icon: BarChart3 },
  { title: "AI-Powered Insights", href: "/ehr", icon: Zap },
];

const specialtiesCol1 = [
  { title: "Dermatology", href: "/specialties/dermatology" },
  { title: "OB/GYN", href: "/specialties/obgyn" },
  { title: "Pediatrics", href: "/specialties/pediatrics" },
  { title: "Urology", href: "/specialties/urology" },
  { title: "Cardiology", href: "/specialties/cardiology" },
  { title: "Family Medicine", href: "/specialties/family-medicine" },
];


const resourcesLeft = [
  { title: "Blog", href: "/blog", description: "Healthcare insights & EHR tips", icon: BookOpen },
  { title: "Case Studies", href: "/resources/case-studies", description: "Real results from real practices", icon: Award },
  { title: "Testimonials", href: "/resources/testimonials", description: "What our customers say", icon: Star },
];

const resourcesRight = [
  { title: "FAQs", href: "/resources/faqs", icon: HelpCircle },
  { title: "Webinars", href: "/resources/webinars", icon: Video },
  { title: "White Papers", href: "/resources/white-papers", icon: FileText },
  { title: "Compliance", href: "/compliance", icon: Shield },
  { title: "Support Center", href: "/support", icon: MessageSquare },
];

const companyItems = [
  { title: "Why MD Charts", href: "/why-mdcharts", description: "What sets us apart", icon: Award },
  { title: "About Us", href: "/about", description: "Our mission and values", icon: Heart },
  { title: "Management", href: "/about/management", description: "Meet our team", icon: Users },
];

const companyLinks = [
  { title: "Our Mission", href: "/about/our-mission", icon: Building2 },
  { title: "Click Less Care More", href: "/about/click-less-care-more", icon: Zap },
  { title: "Careers", href: "/careers", icon: Briefcase },
  { title: "Partners", href: "/partners", icon: Handshake },
  { title: "Press & News", href: "/press", icon: Newspaper },
  { title: "Security", href: "/security", icon: Shield },
];

function NavLink({ href, className, children }: { href: string; className?: string; children: React.ReactNode }) {
  const [, setLocation] = useLocation();
  
  return (
    <NavigationMenuLink asChild>
      <a
        href={href}
        className={className}
        onClick={(e) => {
          e.preventDefault();
          setLocation(href);
        }}
      >
        {children}
      </a>
    </NavigationMenuLink>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] flex flex-col">
      {/* Top Utility Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] font-medium py-1.5 border-b border-slate-800 hidden md:block">
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-white transition-colors"><Phone className="h-3 w-3 text-primary" /> (516) 684-9521</Link>
            <Link href="/contact" className="flex items-center gap-1.5 hover:text-white transition-colors"><Mail className="h-3 w-3 text-primary" /> info@mdchartsehr.com</Link>
            <span className="flex items-center gap-1.5"><Clock className="h-3 w-3 text-emerald-500" /> Support Status: Online</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/support" className="hover:text-white transition-colors">Support</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>


          </div>
        </div>
      </div>

      <nav
        className={cn(
          "w-full transition-all duration-300 bg-white border-b border-slate-200 shadow-sm",
          isScrolled ? "py-1" : "py-2"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center shrink-0 group relative z-50">
            <img 
              src={mdchartsLogo} 
              alt="MD Charts – EMR Software " 
              className="h-10 md:h-[48px] w-auto object-contain"
            />
          </Link>

          {/* Desktop Mega Menu */}
          <div className="hidden lg:flex items-center justify-center flex-1 ml-8">
            <NavigationMenu>
              <NavigationMenuList className="gap-0">
                {/* Solutions Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-slate-700 hover:text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Solutions
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[850px] p-0 bg-white shadow-xl rounded-lg border border-slate-100">
                      <div className="grid grid-cols-12 divide-x divide-slate-100">
                        {/* Left Column - Main Solutions */}
                        <div className="col-span-5 p-6">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Core Platform</h3>
                          <div className="space-y-1">
                            {solutionsLeft.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{item.title}</div>
                                  <div className="text-sm text-slate-500">{item.description}</div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        {/* Middle Column - Features */}
                        <div className="col-span-4 p-6 bg-slate-50/50">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Features</h3>
                          <div className="space-y-1">
                            {solutionsRight.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-2 px-3 py-2 rounded-md text-sm text-slate-600 hover:text-primary hover:bg-white transition-all group"
                              >
                                <item.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span>{item.title}</span>
                                <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        {/* Right Column - Featured */}
                        <div className="col-span-3 p-6 bg-gradient-to-br from-primary/5 to-cyan-50/50">
                          <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100">
                            <div className="h-24 bg-gradient-to-br from-primary to-cyan-500 flex items-center justify-center">
                              <Shield className="h-10 w-10 text-white opacity-90" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-slate-800 mb-1">Complete EHR Solution</h4>
                              <p className="text-sm text-slate-500 mb-3">
                                Fully certified platform for modern practices.
                              </p>
                              <NavLink href="/book-demo" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                                Schedule Demo <ArrowRight className="h-3 w-3" />
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                {/* Specialties Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-slate-700 hover:text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Specialties
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[700px] p-0 bg-white shadow-xl rounded-lg border border-slate-100">
                      <div className="grid grid-cols-12 divide-x divide-slate-100">
                        {/* Specialties Column 1 */}
                        <div className="col-span-4 p-6">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Popular</h3>
                          <div className="space-y-1">
                            {specialtiesCol1.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 hover:bg-primary/5 hover:text-primary transition-all group"
                              >
                                <span className="font-medium">{item.title}</span>
                                <ChevronRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        {/* More Specialties Info */}
                        <div className="col-span-4 p-6 bg-slate-50/50 flex flex-col justify-center">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">More Specialties</h3>
                          <div className="bg-white rounded-xl border border-slate-200 p-5">
                            <p className="text-slate-700 font-medium mb-2">More Specialties Available</p>
                            <p className="text-sm text-slate-500 leading-relaxed">
                              Our software can be configured for any medical specialty. Contact us to discuss your specific practice needs.
                            </p>
                            <NavLink href="/specialties" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline mt-3">
                              View All Specialties <ArrowRight className="h-3 w-3" />
                            </NavLink>
                          </div>
                        </div>

                        {/* Featured Specialty */}
                        <div className="col-span-4 p-6 bg-gradient-to-br from-cyan-50/50 to-primary/5">
                          <div className="rounded-xl overflow-hidden bg-white shadow-sm border border-slate-100">
                            <div className="h-24 bg-gradient-to-r from-primary to-cyan-500 flex items-center justify-center">
                              <Stethoscope className="h-10 w-10 text-white opacity-80" />
                            </div>
                            <div className="p-4">
                              <h4 className="font-bold text-slate-800 mb-1">All Specialties</h4>
                              <p className="text-sm text-slate-500 mb-3">
                                Pre-built templates for every practice type.
                              </p>
                              <NavLink href="/specialties" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                                Explore All <ArrowRight className="h-3 w-3" />
                              </NavLink>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-slate-700 hover:text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[600px] p-0 bg-white shadow-xl rounded-lg border border-slate-100">
                      <div className="grid grid-cols-12 divide-x divide-slate-100">
                        {/* Left Column */}
                        <div className="col-span-6 p-6">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Learn</h3>
                          <div className="space-y-1">
                            {resourcesLeft.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{item.title}</div>
                                  <div className="text-sm text-slate-500">{item.description}</div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-span-6 p-6 bg-slate-50/50">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">More Resources</h3>
                          <div className="space-y-1">
                            {resourcesRight.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-slate-600 hover:text-primary hover:bg-white transition-all group"
                              >
                                <item.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="font-medium">{item.title}</span>
                                <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Company Menu */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="h-10 px-4 text-sm font-semibold text-slate-700 hover:text-primary data-[state=open]:text-primary bg-transparent hover:bg-transparent data-[state=open]:bg-transparent">
                    Company
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-[500px] p-0 bg-white shadow-xl rounded-lg border border-slate-100">
                      <div className="grid grid-cols-12 divide-x divide-slate-100">
                        {/* Left Column */}
                        <div className="col-span-6 p-6">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">About MD Charts</h3>
                          <div className="space-y-1">
                            {companyItems.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-start gap-3 p-3 rounded-lg hover:bg-primary/5 group transition-all"
                              >
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                  <item.icon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <div className="font-semibold text-slate-800 group-hover:text-primary transition-colors">{item.title}</div>
                                  <div className="text-sm text-slate-500">{item.description}</div>
                                </div>
                              </NavLink>
                            ))}
                          </div>
                        </div>

                        {/* Right Column */}
                        <div className="col-span-6 p-6 bg-slate-50/50">
                          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">More</h3>
                          <div className="space-y-1">
                            {companyLinks.map((item) => (
                              <NavLink
                                key={item.title}
                                href={item.href}
                                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-slate-600 hover:text-primary hover:bg-white transition-all group"
                              >
                                <item.icon className="h-4 w-4 text-slate-400 group-hover:text-primary transition-colors" />
                                <span className="font-medium">{item.title}</span>
                                <ChevronRight className="h-3 w-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                              </NavLink>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing - Direct Link */}
                <NavigationMenuItem>
                  <NavLink 
                    className="h-10 px-4 text-sm font-semibold text-slate-700 hover:text-primary inline-flex items-center justify-center" 
                    href="/pricing"
                  >
                    Pricing
                  </NavLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/book-demo">
              <Button variant="outline" size="sm" className="h-9 px-4 text-sm font-semibold border-slate-300 text-slate-700 hover:bg-slate-50">
                Take Product Tour
              </Button>
            </Link>
            <Link href="/book-demo">
              <Button 
                size="sm" 
                className="h-9 px-5 text-sm font-semibold shadow-md shadow-primary/20 rounded-md bg-primary hover:bg-blue-700"
                data-testid="button-book-demo-navbar"
              >
                Book a Demo
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600 z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 top-[100px] bg-white z-[99] flex flex-col p-6 overflow-y-auto animate-in slide-in-from-right-10 border-t border-slate-200">
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 border-b pb-2">Solutions</h3>
                {solutionsLeft.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
                {solutionsRight.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 border-b pb-2">Specialties</h3>
                {specialtiesCol1.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
                <Link href="/specialties" className="block py-2 text-primary font-medium hover:underline" onClick={() => setMobileMenuOpen(false)}>View All Specialties →</Link>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 border-b pb-2">Resources</h3>
                {resourcesLeft.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
                {resourcesRight.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
              </div>
              
              <div className="space-y-2">
                <h3 className="font-heading font-bold text-sm uppercase tracking-wider text-slate-900 border-b pb-2">Company</h3>
                {companyItems.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
                {companyLinks.map(c => (
                  <Link key={c.title} href={c.href} className="block py-2 text-slate-600 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>{c.title}</Link>
                ))}
              </div>
              
              <div className="space-y-2">
                <Link href="/pricing" className="block py-2 font-semibold text-slate-900 hover:text-primary" onClick={() => setMobileMenuOpen(false)}>Pricing</Link>
              </div>
              
              <div className="pt-4 space-y-3">
                <Link href="/book-demo" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-12" data-testid="button-mobile-demo">Book a Demo</Button>
                </Link>
                <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full h-12">Contact Us</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
      <AADBanner />
    </div>
  );
}
