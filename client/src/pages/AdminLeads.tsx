import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Users, FileText, ArrowLeft, Search, Download, Mail, MapPin, Calendar, LogIn, Loader2,
  BarChart3, Eye, Monitor, Globe, Clock, Smartphone, Laptop, Tablet, RefreshCw, Settings, Plus, Trash2,
  BookOpen, Tag, Link2, Save, X, Edit2, ChevronDown, ChevronUp, SearchCheck, Upload, ImageIcon
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useAuth } from "@/hooks/use-auth";

interface WhitePaperDownload {
  id: number;
  whitePaperId: string;
  firstName: string;
  lastName: string;
  email: string;
  practiceAddress: string;
  downloadReason: string;
  createdAt: string;
}

interface ContactRequest {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  requestType: string;
  message: string | null;
  createdAt: string;
}

interface PageViewStats {
  totalViews: number;
  todayViews: number;
  topPages: { path: string; views: number }[];
  deviceBreakdown: { deviceType: string; views: number }[];
  browserBreakdown: { browser: string; views: number }[];
  locationBreakdown: { country: string; views: number }[];
  hourlyViews: { hour: string; views: number }[];
}

interface RecentPageView {
  id: number;
  path: string;
  ipAddress: string | null;
  country: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  createdAt: string;
}

interface AdminBlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  categoryLabel: string;
  author: string;
  publishedAt: string;
  readTime: string;
  image?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PageSeoEntry {
  path: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  updatedAt?: string;
}

const SITE_PAGES = [
  { path: "/", label: "Home" },
  { path: "/about", label: "About Us" },
  { path: "/why-mdcharts", label: "Why MDCharts" },
  { path: "/ehr", label: "EHR" },
  { path: "/rcm", label: "RCM" },
  { path: "/practice-management", label: "Practice Management" },
  { path: "/patient-engagement", label: "Patient Engagement" },
  { path: "/telehealth", label: "Telehealth" },
  { path: "/mobile-app", label: "Mobile App" },
  { path: "/lab-integration", label: "Lab Integration" },
  { path: "/e-prescribing", label: "E-Prescribing" },
  { path: "/patient-portal", label: "Patient Portal" },
  { path: "/specialties/dermatology", label: "Specialty: Dermatology" },
  { path: "/specialties/cardiology", label: "Specialty: Cardiology" },
  { path: "/specialties/obgyn", label: "Specialty: OB/GYN" },
  { path: "/specialties/pediatrics", label: "Specialty: Pediatrics" },
  { path: "/specialties/urology", label: "Specialty: Urology" },
  { path: "/specialties/family-medicine", label: "Specialty: Family Medicine" },
  { path: "/specialties/orthopedics", label: "Specialty: Orthopedics" },
  { path: "/specialties/ophthalmology", label: "Specialty: Ophthalmology" },
  { path: "/specialties/ent", label: "Specialty: ENT" },
  { path: "/specialties/gastroenterology", label: "Specialty: Gastroenterology" },
  { path: "/specialties/neurology", label: "Specialty: Neurology" },
  { path: "/specialties/psychiatry", label: "Specialty: Psychiatry" },
  { path: "/pricing", label: "Pricing" },
  { path: "/book-demo", label: "Book a Demo" },
  { path: "/contact", label: "Contact" },
  { path: "/blog", label: "Blog" },
  { path: "/case-studies", label: "Case Studies" },
  { path: "/testimonials", label: "Testimonials" },
  { path: "/faqs", label: "FAQs" },
  { path: "/webinars", label: "Webinars" },
  { path: "/white-papers", label: "White Papers" },
  { path: "/careers", label: "Careers" },
  { path: "/partners", label: "Partners" },
  { path: "/hipaa-compliance", label: "HIPAA Compliance" },
  { path: "/security", label: "Security" },
];

const BLOG_CATEGORIES = [
  { id: "ehr", label: "EHR" },
  { id: "derm", label: "Dermatology" },
  { id: "obgyn", label: "OB/GYN" },
  { id: "pediatrics", label: "Pediatrics" },
  { id: "practice-management", label: "Practice Management" },
];

const whitePaperTitles: Record<string, string> = {
  "ehr-selection": "EHR Selection Guide",
  "rcm-optimization": "RCM Optimization",
  "patient-engagement": "Patient Engagement",
  "telehealth": "Telehealth Best Practices",
  "hipaa-compliance": "HIPAA Compliance",
  "specialty-ehr": "Specialty EHR Benefits"
};

export default function AdminLeads() {
  const { user, isLoading: authLoading, isAuthenticated } = useAuth();
  const [downloads, setDownloads] = useState<WhitePaperDownload[]>([]);
  const [contacts, setContacts] = useState<ContactRequest[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"downloads" | "contacts" | "analytics" | "settings" | "blog" | "seo" | "redirects">("downloads");
  const [isLoading, setIsLoading] = useState(true);
  const [pageStats, setPageStats] = useState<PageViewStats | null>(null);
  const [recentViews, setRecentViews] = useState<RecentPageView[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [recordLimit, setRecordLimit] = useState<number>(50);
  const [exportLoading, setExportLoading] = useState(false);
  const [notifEmails, setNotifEmails] = useState<{id: number; email: string; name: string | null; createdAt: string}[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [calendlyInput, setCalendlyInput] = useState("");
  const [calendlySaving, setCalendlySaving] = useState(false);
  const [calendlySaved, setCalendlySaved] = useState(false);

  // Blog state
  const [blogPosts, setBlogPosts] = useState<AdminBlogPost[]>([]);
  const [blogLoading, setBlogLoading] = useState(false);
  const [blogEditing, setBlogEditing] = useState<AdminBlogPost | null>(null);
  const [blogIsNew, setBlogIsNew] = useState(false);
  const [blogPreview, setBlogPreview] = useState(false);
  const [blogSaving, setBlogSaving] = useState(false);
  const [imageUploading, setImageUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState<string | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: "", slug: "", excerpt: "", content: "", category: "ehr", categoryLabel: "EHR",
    author: "MD Charts Team", publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    readTime: "5 min read", image: "", metaTitle: "", metaDescription: "", focusKeyword: "", published: true,
  });

  // SEO state
  const [seoData, setSeoData] = useState<Record<string, PageSeoEntry>>({});
  const [seoLoading, setSeoLoading] = useState(false);
  const [seoEditing, setSeoEditing] = useState<string | null>(null);
  const [seoForm, setSeoForm] = useState({ metaTitle: "", metaDescription: "", focusKeyword: "", canonicalUrl: "", ogTitle: "", ogDescription: "", ogImage: "" });
  const [seoSaving, setSeoSaving] = useState(false);
  const [seoSaved, setSeoSaved] = useState<string | null>(null);

  // Redirects state
  interface RedirectEntry { id: number; fromPath: string; toPath: string; statusCode: number; createdAt: string; }
  const [redirectsList, setRedirectsList] = useState<RedirectEntry[]>([]);
  const [redirectsLoading, setRedirectsLoading] = useState(false);
  const [redirectFrom, setRedirectFrom] = useState("");
  const [redirectTo, setRedirectTo] = useState("");
  const [redirectCode, setRedirectCode] = useState<301 | 302>(301);
  const [redirectSaving, setRedirectSaving] = useState(false);
  const [redirectError, setRedirectError] = useState("");

  const fetchCalendlyUrl = async () => {
    try {
      const res = await fetch("/api/settings/calendly");
      if (res.ok) {
        const data = await res.json();
        setCalendlyUrl(data.url);
        setCalendlyInput(data.url);
      }
    } catch (err) {
      console.error("Error fetching Calendly URL:", err);
    }
  };

  const saveCalendlyUrl = async () => {
    if (!calendlyInput.trim()) return;
    setCalendlySaving(true);
    try {
      const res = await fetch("/api/settings/calendly", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: calendlyInput.trim() }),
      });
      if (res.ok) {
        setCalendlyUrl(calendlyInput.trim());
        setCalendlySaved(true);
        setTimeout(() => setCalendlySaved(false), 3000);
      }
    } catch (err) {
      console.error("Error saving Calendly URL:", err);
    } finally {
      setCalendlySaving(false);
    }
  };

  const fetchNotifEmails = async () => {
    try {
      const res = await fetch("/api/notification-emails");
      if (res.ok) setNotifEmails(await res.json());
    } catch (err) {
      console.error("Error fetching notification emails:", err);
    }
  };

  const addNotifEmail = async () => {
    if (!newEmail.trim()) return;
    setSettingsLoading(true);
    try {
      const res = await fetch("/api/notification-emails", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: newEmail.trim(), name: newName.trim() || null }),
      });
      if (res.ok) {
        setNewEmail("");
        setNewName("");
        await fetchNotifEmails();
      }
    } catch (err) {
      console.error("Error adding notification email:", err);
    } finally {
      setSettingsLoading(false);
    }
  };

  const removeNotifEmail = async (id: number) => {
    try {
      await fetch(`/api/notification-emails/${id}`, { method: "DELETE" });
      await fetchNotifEmails();
    } catch (err) {
      console.error("Error removing notification email:", err);
    }
  };

  const fetchAnalytics = async (
    limit = recordLimit,
    country = filterCountry,
    startDate = filterStartDate,
    endDate = filterEndDate
  ) => {
    setAnalyticsLoading(true);
    try {
      const params = new URLSearchParams({ limit: String(limit) });
      if (country) params.set("country", country);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      const [statsRes, recentRes, countriesRes] = await Promise.all([
        fetch("/api/page-views/stats"),
        fetch(`/api/page-views/recent?${params.toString()}`),
        fetch("/api/visitors/countries"),
      ]);
      if (statsRes.ok) setPageStats(await statsRes.json());
      if (recentRes.ok) setRecentViews(await recentRes.json());
      if (countriesRes.ok) setCountries(await countriesRes.json());
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  // filteredViews is now server-filtered; recentViews already matches the selected filters
  const filteredViews = recentViews;

  const exportVisitors = async () => {
    setExportLoading(true);
    try {
      const params = new URLSearchParams();
      if (filterCountry) params.set("country", filterCountry);
      if (filterStartDate) params.set("startDate", filterStartDate);
      if (filterEndDate) params.set("endDate", filterEndDate);
      const res = await fetch(`/api/visitors/export?${params.toString()}`);
      if (res.ok) {
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = res.headers.get("Content-Disposition")?.split('filename="')[1]?.replace('"', '') || "visitors.csv";
        a.click();
        URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error("Error exporting visitors:", error);
    } finally {
      setExportLoading(false);
    }
  };

  // Blog handlers
  const fetchBlogPosts = async () => {
    setBlogLoading(true);
    try {
      const res = await fetch("/api/admin/blog/posts");
      if (res.ok) setBlogPosts(await res.json());
    } catch (err) {
      console.error("Error fetching blog posts:", err);
    } finally {
      setBlogLoading(false);
    }
  };

  const openNewBlog = () => {
    setBlogForm({
      title: "", slug: "", excerpt: "", content: "", category: "ehr", categoryLabel: "EHR",
      author: "MD Charts Team", publishedAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      readTime: "5 min read", image: "", metaTitle: "", metaDescription: "", focusKeyword: "", published: true,
    });
    setBlogEditing(null);
    setBlogIsNew(true);
    setBlogPreview(false);
  };

  const openEditBlog = (post: AdminBlogPost) => {
    setBlogForm({
      title: post.title, slug: post.slug, excerpt: post.excerpt, content: post.content,
      category: post.category, categoryLabel: post.categoryLabel, author: post.author,
      publishedAt: post.publishedAt, readTime: post.readTime, image: post.image || "",
      metaTitle: post.metaTitle || "", metaDescription: post.metaDescription || "",
      focusKeyword: post.focusKeyword || "", published: post.published,
    });
    setBlogEditing(post);
    setBlogIsNew(false);
    setBlogPreview(false);
  };

  const saveBlogPost = async () => {
    if (!blogForm.title || !blogForm.slug || !blogForm.content) return;
    setBlogSaving(true);
    try {
      const payload = {
        ...blogForm,
        categoryLabel: BLOG_CATEGORIES.find(c => c.id === blogForm.category)?.label || blogForm.category,
      };
      const url = blogIsNew ? "/api/admin/blog/posts" : `/api/admin/blog/posts/${blogEditing!.id}`;
      const method = blogIsNew ? "POST" : "PUT";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        await fetchBlogPosts();
        setBlogIsNew(false);
        setBlogEditing(null);
      }
    } catch (err) {
      console.error("Error saving blog post:", err);
    } finally {
      setBlogSaving(false);
    }
  };

  const uploadBlogImage = async (file: File) => {
    setImageUploading(true);
    setImageUploadError(null);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setBlogForm(f => ({ ...f, image: url }));
    } catch {
      setImageUploadError("Upload failed. Please try again or use a URL.");
    } finally {
      setImageUploading(false);
    }
  };

  const deleteBlogPost = async (id: number) => {
    if (!confirm("Delete this blog post? This cannot be undone.")) return;
    try {
      await fetch(`/api/admin/blog/posts/${id}`, { method: "DELETE" });
      await fetchBlogPosts();
    } catch (err) {
      console.error("Error deleting blog post:", err);
    }
  };

  const insertMarkdown = (before: string, after = "") => {
    const ta = document.getElementById("blog-content-editor") as HTMLTextAreaElement;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = blogForm.content.substring(start, end);
    const newVal = blogForm.content.substring(0, start) + before + selected + after + blogForm.content.substring(end);
    setBlogForm(f => ({ ...f, content: newVal }));
    setTimeout(() => { ta.focus(); ta.setSelectionRange(start + before.length, end + before.length); }, 0);
  };

  // SEO handlers
  const fetchSeoData = async () => {
    setSeoLoading(true);
    try {
      const res = await fetch("/api/admin/seo");
      if (res.ok) {
        const all: PageSeoEntry[] = await res.json();
        const map: Record<string, PageSeoEntry> = {};
        all.forEach(e => { map[e.path] = e; });
        setSeoData(map);
      }
    } catch (err) {
      console.error("Error fetching SEO data:", err);
    } finally {
      setSeoLoading(false);
    }
  };

  const openSeoEdit = (path: string) => {
    const existing = seoData[path];
    setSeoForm({
      metaTitle: existing?.metaTitle || "",
      metaDescription: existing?.metaDescription || "",
      focusKeyword: existing?.focusKeyword || "",
      canonicalUrl: existing?.canonicalUrl || "",
      ogTitle: (existing as any)?.ogTitle || "",
      ogDescription: (existing as any)?.ogDescription || "",
      ogImage: (existing as any)?.ogImage || "",
    });
    setSeoEditing(path);
  };

  const saveSeoEntry = async (path: string) => {
    setSeoSaving(true);
    try {
      const res = await fetch("/api/admin/seo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path, ...seoForm }),
      });
      if (res.ok) {
        const saved = await res.json();
        setSeoData(prev => ({ ...prev, [path]: saved }));
        setSeoEditing(null);
        setSeoSaved(path);
        setTimeout(() => setSeoSaved(null), 3000);
      }
    } catch (err) {
      console.error("Error saving SEO:", err);
    } finally {
      setSeoSaving(false);
    }
  };

  const fetchRedirects = async () => {
    setRedirectsLoading(true);
    try {
      const res = await fetch("/api/admin/redirects");
      if (res.ok) setRedirectsList(await res.json());
    } catch (err) {
      console.error("Error fetching redirects:", err);
    } finally {
      setRedirectsLoading(false);
    }
  };

  const addRedirect = async () => {
    if (!redirectFrom.trim() || !redirectTo.trim()) return;
    setRedirectError("");
    setRedirectSaving(true);
    try {
      const res = await fetch("/api/admin/redirects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fromPath: redirectFrom.trim(), toPath: redirectTo.trim(), statusCode: redirectCode }),
      });
      if (res.status === 409) { setRedirectError("A redirect from that path already exists."); return; }
      if (res.ok) {
        setRedirectFrom("");
        setRedirectTo("");
        await fetchRedirects();
      }
    } catch (err) {
      console.error("Error creating redirect:", err);
    } finally {
      setRedirectSaving(false);
    }
  };

  const deleteRedirect = async (id: number) => {
    if (!confirm("Delete this redirect?")) return;
    try {
      await fetch(`/api/admin/redirects/${id}`, { method: "DELETE" });
      await fetchRedirects();
    } catch (err) {
      console.error("Error deleting redirect:", err);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [downloadsRes, contactsRes] = await Promise.all([
          fetch("/api/white-paper-downloads"),
          fetch("/api/contact-requests")
        ]);
        
        if (downloadsRes.ok) {
          const downloadsData = await downloadsRes.json();
          setDownloads(downloadsData);
        }
        
        if (contactsRes.ok) {
          const contactsData = await contactsRes.json();
          setContacts(contactsData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    fetchAnalytics();
    fetchNotifEmails();
    fetchCalendlyUrl();
  }, [isAuthenticated]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background font-sans overflow-x-hidden">
        <Navbar />
        <section className="pt-28 pb-20 bg-gradient-to-b from-slate-50 to-white min-h-[60vh] flex items-center">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-md mx-auto text-center">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-primary" />
              </div>
              <h1 className="text-3xl font-bold text-slate-900 mb-4">Admin Access Required</h1>
              <p className="text-slate-600 mb-8">
                Please log in to access the lead management dashboard.
              </p>
              <a href="/api/login">
                <Button size="lg" className="h-12 px-8" data-testid="button-login">
                  <LogIn className="h-5 w-5 mr-2" />
                  Log In to Continue
                </Button>
              </a>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  const filteredDownloads = downloads.filter(d => 
    d.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.practiceAddress.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (c.company && c.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const exportToCSV = () => {
    if (activeTab === "downloads") {
      const headers = ["First Name", "Last Name", "Email", "Practice Address", "White Paper", "Reason", "Date"];
      const rows = downloads.map(d => [
        d.firstName,
        d.lastName,
        d.email,
        d.practiceAddress.replace(/,/g, ";"),
        whitePaperTitles[d.whitePaperId] || d.whitePaperId,
        d.downloadReason.replace(/,/g, ";"),
        formatDate(d.createdAt)
      ]);
      const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "white-paper-leads.csv";
      a.click();
    } else {
      const headers = ["Name", "Email", "Phone", "Company", "Request Type", "Message", "Date"];
      const rows = contacts.map(c => [
        c.name,
        c.email,
        c.phone || "",
        c.company || "",
        c.requestType,
        (c.message || "").replace(/,/g, ";"),
        formatDate(c.createdAt)
      ]);
      const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "contact-requests.csv";
      a.click();
    }
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      <Navbar />
      
      <section className="pt-28 pb-8 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-back-home">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="h-14 w-14 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="h-7 w-7 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-slate-900">Lead Management</h1>
              <p className="text-slate-600">View and export your leads from white paper downloads and contact requests</p>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 items-center justify-between">
            <div className="flex gap-2">
              <Button 
                variant={activeTab === "downloads" ? "default" : "outline"}
                onClick={() => setActiveTab("downloads")}
                data-testid="tab-downloads"
              >
                <FileText className="h-4 w-4 mr-2" />
                White Paper Downloads ({downloads.length})
              </Button>
              <Button 
                variant={activeTab === "contacts" ? "default" : "outline"}
                onClick={() => setActiveTab("contacts")}
                data-testid="tab-contacts"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contact Requests ({contacts.length})
              </Button>
              <Button 
                variant={activeTab === "analytics" ? "default" : "outline"}
                onClick={() => { setActiveTab("analytics"); fetchAnalytics(); }}
                data-testid="tab-analytics"
              >
                <BarChart3 className="h-4 w-4 mr-2" />
                Site Analytics
              </Button>
              <Button
                variant={activeTab === "settings" ? "default" : "outline"}
                onClick={() => { setActiveTab("settings"); fetchNotifEmails(); }}
                data-testid="tab-settings"
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button
                variant={activeTab === "blog" ? "default" : "outline"}
                onClick={() => { setActiveTab("blog"); fetchBlogPosts(); }}
                data-testid="tab-blog"
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Blog Manager
              </Button>
              <Button
                variant={activeTab === "seo" ? "default" : "outline"}
                onClick={() => { setActiveTab("seo"); fetchSeoData(); }}
                data-testid="tab-seo"
              >
                <SearchCheck className="h-4 w-4 mr-2" />
                SEO Manager
              </Button>
              <Button
                variant={activeTab === "redirects" ? "default" : "outline"}
                onClick={() => { setActiveTab("redirects"); fetchRedirects(); }}
                data-testid="tab-redirects"
              >
                <Link2 className="h-4 w-4 mr-2" />
                Redirects
              </Button>
              <Link href="/admin/analytics">
                <Button
                  variant="outline"
                  data-testid="tab-analytics-report"
                  className="border-blue-600 text-blue-400 hover:bg-blue-900/30"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Analytics Report
                </Button>
              </Link>
            </div>
            
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search leads..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                  data-testid="input-search"
                />
              </div>
              <Button variant="outline" onClick={exportToCSV} data-testid="button-export">
                <Download className="h-4 w-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-white min-h-[400px]">
        <div className="container mx-auto px-4 md:px-6">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : activeTab === "blog" ? (
            <div>
              {/* Blog post editor */}
              {(blogIsNew || blogEditing) ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-slate-900">{blogIsNew ? "New Blog Post" : "Edit Blog Post"}</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => setBlogPreview(!blogPreview)}>
                        <Eye className="h-4 w-4 mr-1" />{blogPreview ? "Editor" : "Preview"}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => { setBlogIsNew(false); setBlogEditing(null); }}>
                        <X className="h-4 w-4 mr-1" />Cancel
                      </Button>
                      <Button size="sm" onClick={saveBlogPost} disabled={blogSaving || !blogForm.title || !blogForm.slug || !blogForm.content}>
                        {blogSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
                        {blogSaving ? "Saving..." : "Save Post"}
                      </Button>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Main content */}
                    <div className="md:col-span-2 space-y-4">
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Post Title *</label>
                        <Input
                          placeholder="Enter post title..."
                          value={blogForm.title}
                          onChange={e => {
                            const title = e.target.value;
                            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
                            setBlogForm(f => ({ ...f, title, slug: blogIsNew ? slug : f.slug }));
                          }}
                          className="text-base font-medium"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">URL Slug *</label>
                        <div className="flex items-center gap-2 bg-slate-50 border rounded-md px-3 py-2 text-sm">
                          <span className="text-slate-400">/blog/</span>
                          <Input
                            value={blogForm.slug}
                            onChange={e => setBlogForm(f => ({ ...f, slug: e.target.value }))}
                            className="border-0 bg-transparent p-0 h-auto font-mono text-slate-700 focus-visible:ring-0"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-slate-700 mb-1 block">Excerpt / Summary *</label>
                        <textarea
                          value={blogForm.excerpt}
                          onChange={e => setBlogForm(f => ({ ...f, excerpt: e.target.value }))}
                          placeholder="A short summary shown in the blog list..."
                          rows={3}
                          className="w-full border rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-sm font-medium text-slate-700">Content *</label>
                          <span className="text-xs text-slate-400">Supports **bold**, *italic*, ## Heading, - lists</span>
                        </div>
                        {/* Formatting toolbar */}
                        <div className="flex gap-1 mb-1 border rounded-t-md bg-slate-50 px-2 py-1">
                          {[
                            { label: "B", action: () => insertMarkdown("**", "**"), title: "Bold" },
                            { label: "I", action: () => insertMarkdown("*", "*"), title: "Italic" },
                            { label: "H2", action: () => insertMarkdown("\n## ", ""), title: "Heading 2" },
                            { label: "H3", action: () => insertMarkdown("\n### ", ""), title: "Heading 3" },
                            { label: "•", action: () => insertMarkdown("\n- ", ""), title: "Bullet list" },
                            { label: "Link", action: () => insertMarkdown("[", "](url)"), title: "Link" },
                          ].map(btn => (
                            <button
                              key={btn.label}
                              type="button"
                              title={btn.title}
                              onClick={btn.action}
                              className="px-2 py-1 text-xs font-medium rounded hover:bg-white border border-transparent hover:border-slate-200 text-slate-600"
                            >
                              {btn.label}
                            </button>
                          ))}
                        </div>
                        {blogPreview ? (
                          <div className="border border-t-0 rounded-b-md p-4 min-h-64 prose prose-sm max-w-none">
                            <ReactMarkdown>{blogForm.content}</ReactMarkdown>
                          </div>
                        ) : (
                          <textarea
                            id="blog-content-editor"
                            value={blogForm.content}
                            onChange={e => setBlogForm(f => ({ ...f, content: e.target.value }))}
                            placeholder="Write your blog post content here..."
                            rows={20}
                            className="w-full border border-t-0 rounded-b-md px-3 py-2 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
                          />
                        )}
                      </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                      <div className="bg-white border rounded-xl p-4 space-y-3">
                        <h3 className="font-semibold text-slate-800 text-sm">Post Settings</h3>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Status</label>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              onClick={() => setBlogForm(f => ({ ...f, published: true }))}
                              className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${blogForm.published ? "bg-emerald-50 border-emerald-300 text-emerald-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                            >Published</button>
                            <button
                              type="button"
                              onClick={() => setBlogForm(f => ({ ...f, published: false }))}
                              className={`flex-1 py-1.5 text-xs font-medium rounded-md border transition-colors ${!blogForm.published ? "bg-amber-50 border-amber-300 text-amber-700" : "border-slate-200 text-slate-500 hover:bg-slate-50"}`}
                            >Draft</button>
                          </div>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Category</label>
                          <select
                            value={blogForm.category}
                            onChange={e => setBlogForm(f => ({ ...f, category: e.target.value, categoryLabel: BLOG_CATEGORIES.find(c => c.id === e.target.value)?.label || e.target.value }))}
                            className="w-full text-sm border rounded-md px-2 py-1.5 focus:outline-none focus:ring-1 focus:ring-primary"
                          >
                            {BLOG_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
                          </select>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Author</label>
                          <Input value={blogForm.author} onChange={e => setBlogForm(f => ({ ...f, author: e.target.value }))} className="text-sm" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Publish Date</label>
                          <Input value={blogForm.publishedAt} onChange={e => setBlogForm(f => ({ ...f, publishedAt: e.target.value }))} className="text-sm" placeholder="July 2, 2025" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Read Time</label>
                          <Input value={blogForm.readTime} onChange={e => setBlogForm(f => ({ ...f, readTime: e.target.value }))} className="text-sm" placeholder="5 min read" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block flex items-center gap-1">
                            <ImageIcon className="h-3.5 w-3.5" /> Thumbnail Image
                          </label>
                          {/* Image preview */}
                          {blogForm.image && (
                            <div className="relative mb-2 rounded-lg overflow-hidden border border-slate-200 bg-slate-50">
                              <img
                                src={blogForm.image}
                                alt="Thumbnail preview"
                                className="w-full h-36 object-cover"
                                onError={e => (e.currentTarget.style.display = "none")}
                              />
                              <button
                                type="button"
                                onClick={() => setBlogForm(f => ({ ...f, image: "" }))}
                                className="absolute top-1.5 right-1.5 bg-black/60 hover:bg-black/80 text-white rounded-full p-0.5"
                                title="Remove image"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          )}
                          {/* Upload button */}
                          <label className={`flex items-center justify-center gap-2 w-full border-2 border-dashed rounded-lg py-3 cursor-pointer transition-colors text-sm
                            ${imageUploading ? "border-slate-200 text-slate-400 cursor-not-allowed" : "border-slate-300 hover:border-primary hover:text-primary text-slate-500"}`}>
                            {imageUploading
                              ? <><Loader2 className="h-4 w-4 animate-spin" /> Uploading...</>
                              : <><Upload className="h-4 w-4" /> {blogForm.image ? "Change image" : "Upload thumbnail"}</>
                            }
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              disabled={imageUploading}
                              onChange={e => { const f = e.target.files?.[0]; if (f) uploadBlogImage(f); e.target.value = ""; }}
                            />
                          </label>
                          {imageUploadError && <p className="text-xs text-red-500 mt-1">{imageUploadError}</p>}
                          {/* Manual URL fallback */}
                          <p className="text-xs text-slate-400 mt-1.5 mb-1">Or paste an image URL:</p>
                          <Input value={blogForm.image} onChange={e => setBlogForm(f => ({ ...f, image: e.target.value }))} className="text-xs font-mono" placeholder="https://... or /assets/image.png" />
                        </div>
                      </div>

                      <div className="bg-white border rounded-xl p-4 space-y-3">
                        <h3 className="font-semibold text-slate-800 text-sm flex items-center gap-1.5">
                          <SearchCheck className="h-4 w-4 text-primary" /> SEO Settings
                        </h3>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">Focus Keyword</label>
                          <Input value={blogForm.focusKeyword} onChange={e => setBlogForm(f => ({ ...f, focusKeyword: e.target.value }))} className="text-sm" placeholder="e.g. dermatology ehr" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">
                            SEO Title
                            <span className={`ml-2 text-xs ${blogForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>
                              {blogForm.metaTitle.length}/60
                            </span>
                          </label>
                          <Input value={blogForm.metaTitle} onChange={e => setBlogForm(f => ({ ...f, metaTitle: e.target.value }))} className="text-sm" placeholder="Same as title if empty" />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-600 mb-1 block">
                            Meta Description
                            <span className={`ml-2 text-xs ${blogForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>
                              {blogForm.metaDescription.length}/160
                            </span>
                          </label>
                          <textarea
                            value={blogForm.metaDescription}
                            onChange={e => setBlogForm(f => ({ ...f, metaDescription: e.target.value }))}
                            rows={3}
                            className="w-full border rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                            placeholder="Google snippet description..."
                          />
                        </div>
                        {/* Google preview */}
                        {(blogForm.title || blogForm.metaDescription) && (
                          <div className="bg-slate-50 rounded-lg p-3 border">
                            <p className="text-xs text-slate-400 mb-1">Google Preview</p>
                            <p className="text-sm text-blue-700 font-medium truncate">{blogForm.metaTitle || blogForm.title || "Post Title"}</p>
                            <p className="text-xs text-emerald-700">mdcharts.com/blog/{blogForm.slug || "post-slug"}</p>
                            <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{blogForm.metaDescription || blogForm.excerpt || "Post description..."}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Blog post list */
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-slate-900">Blog Posts ({blogPosts.length})</h2>
                    <Button onClick={openNewBlog}>
                      <Plus className="h-4 w-4 mr-2" />New Post
                    </Button>
                  </div>
                  {blogLoading ? (
                    <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
                  ) : blogPosts.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed rounded-xl">
                      <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-slate-600 mb-2">No blog posts yet</h3>
                      <p className="text-slate-500 mb-4">Create your first post to get started</p>
                      <Button onClick={openNewBlog}><Plus className="h-4 w-4 mr-2" />New Post</Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {blogPosts.map(post => (
                        <div key={post.id} className="flex items-center gap-4 bg-white border rounded-xl p-4 hover:border-primary/30 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${post.published ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                                {post.published ? "Published" : "Draft"}
                              </span>
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
                                {post.categoryLabel}
                              </span>
                            </div>
                            <h3 className="font-semibold text-slate-900 truncate">{post.title}</h3>
                            <p className="text-sm text-slate-500 truncate">{post.excerpt}</p>
                            <p className="text-xs text-slate-400 mt-1">{post.author} · {post.publishedAt} · {post.readTime}</p>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer">
                              <Button variant="outline" size="sm"><Eye className="h-4 w-4" /></Button>
                            </a>
                            <Button variant="outline" size="sm" onClick={() => openEditBlog(post)}>
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => deleteBlogPost(post.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : activeTab === "seo" ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">SEO Manager</h2>
                  <p className="text-sm text-slate-500 mt-1">Edit meta titles, descriptions, and keywords for each page</p>
                </div>
                <Button variant="outline" size="sm" onClick={fetchSeoData}>
                  <RefreshCw className="h-4 w-4 mr-2" />Refresh
                </Button>
              </div>
              {seoLoading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : (
                <div className="space-y-2">
                  {SITE_PAGES.map(page => {
                    const existing = seoData[page.path];
                    const isEditing = seoEditing === page.path;
                    const isSaved = seoSaved === page.path;
                    return (
                      <div key={page.path} className={`bg-white border rounded-xl overflow-hidden transition-all ${isEditing ? "border-primary/50 shadow-sm" : ""}`}>
                        <div
                          className="flex items-center gap-4 p-4 cursor-pointer hover:bg-slate-50"
                          onClick={() => isEditing ? setSeoEditing(null) : openSeoEdit(page.path)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-800">{page.label}</span>
                              <span className="text-xs font-mono text-slate-400">{page.path}</span>
                              {isSaved && <span className="text-xs text-emerald-600 font-medium">Saved!</span>}
                            </div>
                            {existing?.metaTitle && (
                              <p className="text-sm text-slate-500 truncate mt-0.5">
                                <span className="text-slate-400">Title: </span>{existing.metaTitle}
                              </p>
                            )}
                            {!existing?.metaTitle && <p className="text-xs text-slate-400 mt-0.5">No SEO data set yet</p>}
                          </div>
                          <div className="shrink-0">
                            {isEditing ? <ChevronUp className="h-4 w-4 text-slate-400" /> : <ChevronDown className="h-4 w-4 text-slate-400" />}
                          </div>
                        </div>

                        {isEditing && (
                          <div className="border-t px-4 pb-4 pt-3 bg-slate-50/50">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">
                                  Focus Keyword
                                </label>
                                <Input
                                  value={seoForm.focusKeyword}
                                  onChange={e => setSeoForm(f => ({ ...f, focusKeyword: e.target.value }))}
                                  placeholder="e.g. dermatology ehr software"
                                  className="text-sm"
                                />
                              </div>
                              <div>
                                <label className="text-xs font-medium text-slate-600 mb-1 block">
                                  Canonical URL
                                </label>
                                <Input
                                  value={seoForm.canonicalUrl}
                                  onChange={e => setSeoForm(f => ({ ...f, canonicalUrl: e.target.value }))}
                                  placeholder={`https://mdcharts.com${page.path}`}
                                  className="text-sm font-mono"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-xs font-medium text-slate-600 mb-1 block">
                                  SEO Title
                                  <span className={`ml-2 text-xs ${seoForm.metaTitle.length > 60 ? "text-red-500" : "text-slate-400"}`}>
                                    {seoForm.metaTitle.length}/60 chars
                                  </span>
                                </label>
                                <Input
                                  value={seoForm.metaTitle}
                                  onChange={e => setSeoForm(f => ({ ...f, metaTitle: e.target.value }))}
                                  placeholder={`${page.label} | MDCharts EHR`}
                                  className="text-sm"
                                />
                              </div>
                              <div className="md:col-span-2">
                                <label className="text-xs font-medium text-slate-600 mb-1 block">
                                  Meta Description
                                  <span className={`ml-2 text-xs ${seoForm.metaDescription.length > 160 ? "text-red-500" : "text-slate-400"}`}>
                                    {seoForm.metaDescription.length}/160 chars
                                  </span>
                                </label>
                                <textarea
                                  value={seoForm.metaDescription}
                                  onChange={e => setSeoForm(f => ({ ...f, metaDescription: e.target.value }))}
                                  rows={2}
                                  placeholder="Description shown in Google search results..."
                                  className="w-full border rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none bg-white"
                                />
                              </div>
                            </div>
                            {/* Social sharing (OG) fields */}
                            <div className="md:col-span-2 border-t pt-3 mt-1">
                              <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">Social Sharing (Open Graph)</p>
                              <div className="grid md:grid-cols-2 gap-3">
                                <div className="md:col-span-2">
                                  <label className="text-xs font-medium text-slate-600 mb-1 block">OG Title <span className="text-slate-400">(LinkedIn, Facebook, Slack previews)</span></label>
                                  <Input value={seoForm.ogTitle} onChange={e => setSeoForm(f => ({ ...f, ogTitle: e.target.value }))} placeholder="Same as SEO title if empty" className="text-sm" />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="text-xs font-medium text-slate-600 mb-1 block">OG Description</label>
                                  <textarea value={seoForm.ogDescription} onChange={e => setSeoForm(f => ({ ...f, ogDescription: e.target.value }))} rows={2} placeholder="Same as meta description if empty" className="w-full border rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none bg-white" />
                                </div>
                                <div className="md:col-span-2">
                                  <label className="text-xs font-medium text-slate-600 mb-1 block">OG Image URL <span className="text-slate-400">(shown when page is shared on social media)</span></label>
                                  <Input value={seoForm.ogImage} onChange={e => setSeoForm(f => ({ ...f, ogImage: e.target.value }))} placeholder="https://mdcharts.com/assets/image.png" className="text-sm font-mono" />
                                </div>
                              </div>
                            </div>
                            {/* Google preview */}
                            {(seoForm.metaTitle || seoForm.metaDescription) && (
                              <div className="bg-white rounded-lg p-3 border mt-3">
                                <p className="text-xs text-slate-400 mb-1">Google Preview</p>
                                <p className="text-sm text-blue-700 font-medium truncate">{seoForm.metaTitle || `${page.label} | MDCharts`}</p>
                                <p className="text-xs text-emerald-700">mdcharts.com{page.path}</p>
                                <p className="text-xs text-slate-600 mt-0.5 line-clamp-2">{seoForm.metaDescription}</p>
                              </div>
                            )}
                            <div className="flex justify-end gap-2 mt-3">
                              <Button variant="outline" size="sm" onClick={() => setSeoEditing(null)}>Cancel</Button>
                              <Button size="sm" onClick={() => saveSeoEntry(page.path)} disabled={seoSaving}>
                                {seoSaving ? <Loader2 className="h-4 w-4 mr-1 animate-spin" /> : <Save className="h-4 w-4 mr-1" />}
                                Save
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : activeTab === "redirects" ? (
            <div>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Redirect Manager</h2>
                  <p className="text-sm text-slate-500 mt-1">301/302 redirects take effect immediately — no deployment needed</p>
                </div>
              </div>

              {/* Add new redirect */}
              <div className="bg-white border rounded-xl p-5 mb-6">
                <h3 className="font-semibold text-slate-800 mb-4">Add New Redirect</h3>
                <div className="grid md:grid-cols-4 gap-3 items-end">
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">From Path</label>
                    <Input
                      value={redirectFrom}
                      onChange={e => { setRedirectFrom(e.target.value); setRedirectError(""); }}
                      placeholder="/old-page-url"
                      className="font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">To Path / URL</label>
                    <Input
                      value={redirectTo}
                      onChange={e => setRedirectTo(e.target.value)}
                      placeholder="/new-page or https://..."
                      className="font-mono text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 mb-1 block">Type</label>
                    <select
                      value={redirectCode}
                      onChange={e => setRedirectCode(Number(e.target.value) as 301 | 302)}
                      className="w-full text-sm border rounded-md px-2 py-2 focus:outline-none focus:ring-1 focus:ring-primary"
                    >
                      <option value={301}>301 — Permanent</option>
                      <option value={302}>302 — Temporary</option>
                    </select>
                  </div>
                  <Button onClick={addRedirect} disabled={redirectSaving || !redirectFrom.trim() || !redirectTo.trim()}>
                    {redirectSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Plus className="h-4 w-4 mr-2" />}
                    Add Redirect
                  </Button>
                </div>
                {redirectError && <p className="text-sm text-red-500 mt-2">{redirectError}</p>}
                <div className="mt-3 p-3 bg-blue-50 rounded-lg text-xs text-blue-700">
                  <strong>301 Permanent</strong> — use when a page has moved forever (Google transfers SEO value). &nbsp;
                  <strong>302 Temporary</strong> — use for short-term redirects (Google keeps the original URL indexed).
                </div>
              </div>

              {/* Redirects list */}
              {redirectsLoading ? (
                <div className="flex items-center justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : redirectsList.length === 0 ? (
                <div className="text-center py-20 border-2 border-dashed rounded-xl">
                  <Link2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No redirects yet</h3>
                  <p className="text-slate-500">Add your first redirect above</p>
                </div>
              ) : (
                <div className="bg-white border rounded-xl overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>From</TableHead>
                        <TableHead>To</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Added</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {redirectsList.map(r => (
                        <TableRow key={r.id}>
                          <TableCell className="font-mono text-sm text-slate-700">{r.fromPath}</TableCell>
                          <TableCell className="font-mono text-sm text-primary">{r.toPath}</TableCell>
                          <TableCell>
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${r.statusCode === 301 ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"}`}>
                              {r.statusCode} {r.statusCode === 301 ? "Permanent" : "Temporary"}
                            </span>
                          </TableCell>
                          <TableCell className="text-sm text-slate-400">{formatDate(r.createdAt)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm" onClick={() => deleteRedirect(r.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          ) : activeTab === "analytics" ? (
            <div>
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : pageStats ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={() => fetchAnalytics()} data-testid="button-refresh-analytics">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white rounded-xl border p-5" data-testid="stat-total-views">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                          <Eye className="h-5 w-5 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Total Views</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{pageStats.totalViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl border p-5" data-testid="stat-today-views">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                          <Clock className="h-5 w-5 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Today</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{pageStats.todayViews.toLocaleString()}</p>
                    </div>
                    <div className="bg-white rounded-xl border p-5" data-testid="stat-top-page">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-purple-50 flex items-center justify-center">
                          <FileText className="h-5 w-5 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Top Page</span>
                      </div>
                      <p className="text-lg font-bold text-slate-900 truncate">{pageStats.topPages[0]?.path || "—"}</p>
                    </div>
                    <div className="bg-white rounded-xl border p-5" data-testid="stat-unique-pages">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                          <Globe className="h-5 w-5 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-slate-500">Countries</span>
                      </div>
                      <p className="text-3xl font-bold text-slate-900">{pageStats.locationBreakdown.length}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border p-5">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <FileText className="h-4 w-4 text-primary" /> Top Pages
                      </h3>
                      <div className="space-y-3">
                        {pageStats.topPages.map((page, i) => {
                          const maxViews = pageStats.topPages[0]?.views || 1;
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <span className="text-xs font-mono text-slate-500 w-6 text-right">{i + 1}</span>
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium text-slate-700 truncate">{page.path}</span>
                                  <span className="text-slate-500 ml-2 shrink-0">{page.views}</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full">
                                  <div className="h-1.5 bg-primary rounded-full" style={{ width: `${(page.views / maxViews) * 100}%` }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {pageStats.topPages.length === 0 && <p className="text-sm text-slate-400">No page views yet</p>}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Globe className="h-4 w-4 text-primary" /> Visitor Locations
                      </h3>
                      <div className="space-y-3">
                        {pageStats.locationBreakdown.map((loc, i) => {
                          const maxViews = pageStats.locationBreakdown[0]?.views || 1;
                          return (
                            <div key={i} className="flex items-center gap-3">
                              <div className="flex-1">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="font-medium text-slate-700">{loc.country}</span>
                                  <span className="text-slate-500">{loc.views}</span>
                                </div>
                                <div className="h-1.5 bg-slate-100 rounded-full">
                                  <div className="h-1.5 bg-emerald-500 rounded-full" style={{ width: `${(loc.views / maxViews) * 100}%` }} />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                        {pageStats.locationBreakdown.length === 0 && <p className="text-sm text-slate-400">No location data yet</p>}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-xl border p-5">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-primary" /> Devices
                      </h3>
                      <div className="space-y-3">
                        {pageStats.deviceBreakdown.map((device, i) => {
                          const DeviceIcon = device.deviceType === "Mobile" ? Smartphone : device.deviceType === "Tablet" ? Tablet : Laptop;
                          return (
                            <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                              <DeviceIcon className="h-5 w-5 text-slate-400" />
                              <span className="text-sm font-medium text-slate-700 flex-1">{device.deviceType}</span>
                              <span className="text-sm font-bold text-slate-900">{device.views}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl border p-5">
                      <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                        <Monitor className="h-4 w-4 text-primary" /> Browsers
                      </h3>
                      <div className="space-y-3">
                        {pageStats.browserBreakdown.map((b, i) => (
                          <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50">
                            <span className="text-sm font-medium text-slate-700 flex-1">{b.browser}</span>
                            <span className="text-sm font-bold text-slate-900">{b.views}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl border p-5">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
                      <h3 className="font-bold text-slate-900 flex items-center gap-2 flex-1">
                        <Clock className="h-4 w-4 text-primary" /> Recent Visitors
                      </h3>
                      {/* Filters */}
                      <div className="flex flex-wrap gap-2 items-center">
                        {/* Location filter */}
                        <select
                          value={filterCountry}
                          onChange={e => setFilterCountry(e.target.value)}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value="">All Countries</option>
                          {countries.map(c => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                        {/* Date range */}
                        <input
                          type="date"
                          value={filterStartDate}
                          onChange={e => setFilterStartDate(e.target.value)}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <input
                          type="date"
                          value={filterEndDate}
                          onChange={e => setFilterEndDate(e.target.value)}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        {/* Apply filters button */}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => fetchAnalytics(recordLimit, filterCountry, filterStartDate, filterEndDate)}
                        >
                          Apply
                        </Button>
                        {/* Records per page */}
                        <select
                          value={recordLimit}
                          onChange={e => {
                            const val = Number(e.target.value);
                            setRecordLimit(val);
                            fetchAnalytics(val, filterCountry, filterStartDate, filterEndDate);
                          }}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                        >
                          <option value={10}>Show 10</option>
                          <option value={50}>Show 50</option>
                          <option value={200}>Show 200</option>
                          <option value={500}>Show 500</option>
                        </select>
                        {/* Export */}
                        <Button
                          size="sm"
                          onClick={exportVisitors}
                          disabled={exportLoading}
                          className="flex items-center gap-1.5"
                        >
                          {exportLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                          Export CSV
                        </Button>
                        {/* Clear filters */}
                        {(filterCountry || filterStartDate || filterEndDate) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setFilterCountry("");
                              setFilterStartDate("");
                              setFilterEndDate("");
                              fetchAnalytics(recordLimit, "", "", "");
                            }}
                          >
                            Clear Filters
                          </Button>
                        )}
                      </div>
                    </div>
                    {/* Record count summary */}
                    <p className="text-xs text-slate-500 mb-2">
                      Showing <span className="font-semibold text-slate-700">{filteredViews.length}</span> records
                      {filterCountry && <span> · Country: <span className="font-semibold">{filterCountry}</span></span>}
                      {filterStartDate && <span> · From <span className="font-semibold">{filterStartDate}</span></span>}
                      {filterEndDate && <span> · To <span className="font-semibold">{filterEndDate}</span></span>}
                      {!filterCountry && !filterStartDate && !filterEndDate && <span className="text-slate-400"> (most recent {recordLimit})</span>}
                    </p>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Browser</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredViews.map((view) => (
                            <TableRow key={view.id} data-testid={`row-pageview-${view.id}`}>
                              <TableCell className="font-medium text-sm">{view.path}</TableCell>
                              <TableCell className="text-sm text-slate-500 font-mono">{view.ipAddress || "—"}</TableCell>
                              <TableCell className="text-sm text-slate-600">
                                {[view.city, view.country].filter(Boolean).join(", ") || "—"}
                              </TableCell>
                              <TableCell className="text-sm text-slate-600">{view.deviceType || "—"}</TableCell>
                              <TableCell className="text-sm text-slate-600">{view.browser || "—"}</TableCell>
                              <TableCell className="text-sm text-slate-500">
                                <div className="flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {formatDate(view.createdAt)}
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                          {filteredViews.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={6} className="text-center py-8 text-slate-400">
                                {recentViews.length === 0 ? "No page views recorded yet" : "No records match the selected filters"}
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-20">
                  <BarChart3 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-slate-600 mb-2">No analytics data</h3>
                  <p className="text-slate-500">Page view data will appear here as visitors browse your site</p>
                </div>
              )}
            </div>
          ) : activeTab === "settings" ? (
            <div className="max-w-2xl space-y-6">
              {/* Calendly Configuration */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Calendly Booking URL</h3>
                    <p className="text-sm text-slate-500">The Calendly link shown on the Book a Demo page</p>
                  </div>
                </div>
                <div className="flex gap-2 mb-2">
                  <Input
                    placeholder="https://calendly.com/your-account/30min"
                    value={calendlyInput}
                    onChange={(e) => setCalendlyInput(e.target.value)}
                    className="flex-1 font-mono text-sm"
                    data-testid="input-calendly-url"
                  />
                  <Button onClick={saveCalendlyUrl} disabled={calendlySaving || !calendlyInput.trim()} data-testid="button-save-calendly">
                    {calendlySaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                    {calendlySaved ? "Saved!" : "Save"}
                  </Button>
                </div>
                {calendlyUrl && (
                  <p className="text-xs text-slate-400 mt-1">Current: <span className="font-mono text-slate-600">{calendlyUrl}</span></p>
                )}
              </div>

              {/* Notification Emails */}
              <div className="bg-white rounded-xl border p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Notification Email Recipients</h3>
                    <p className="text-sm text-slate-500">All form submissions and leads will be emailed to these addresses</p>
                  </div>
                </div>

                <div className="flex gap-2 mb-6">
                  <Input
                    placeholder="Name (optional)"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-40"
                    data-testid="input-notif-name"
                  />
                  <Input
                    placeholder="Email address"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    className="flex-1"
                    data-testid="input-notif-email"
                    onKeyDown={(e) => e.key === "Enter" && addNotifEmail()}
                  />
                  <Button onClick={addNotifEmail} disabled={settingsLoading || !newEmail.trim()} data-testid="button-add-email">
                    <Plus className="h-4 w-4 mr-2" />
                    Add
                  </Button>
                </div>

                {notifEmails.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 border border-dashed rounded-lg">
                    <Mail className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p className="text-sm">No notification emails configured yet.</p>
                    <p className="text-xs mt-1">Emails will fall back to the default recipient (awachspress@mdcharts.net).</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {notifEmails.map((entry) => (
                      <div key={entry.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border" data-testid={`notif-email-${entry.id}`}>
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Mail className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-900">{entry.email}</p>
                            {entry.name && <p className="text-xs text-slate-500">{entry.name}</p>}
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" onClick={() => removeNotifEmail(entry.id)} className="text-red-500 hover:text-red-700 hover:bg-red-50" data-testid={`button-remove-email-${entry.id}`}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : activeTab === "downloads" ? (
            filteredDownloads.length === 0 ? (
              <div className="text-center py-20">
                <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No downloads yet</h3>
                <p className="text-slate-500">White paper download leads will appear here</p>
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Practice Address</TableHead>
                      <TableHead>White Paper</TableHead>
                      <TableHead>Interest Reason</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDownloads.map((download) => (
                      <TableRow key={download.id} data-testid={`row-download-${download.id}`}>
                        <TableCell className="font-medium">
                          {download.firstName} {download.lastName}
                        </TableCell>
                        <TableCell>
                          <a 
                            href={`mailto:${download.email}`} 
                            className="text-primary hover:underline flex items-center gap-1"
                            data-testid={`link-email-${download.id}`}
                          >
                            <Mail className="h-3 w-3" />
                            {download.email}
                          </a>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <div className="flex items-start gap-1">
                            <MapPin className="h-3 w-3 mt-1 text-slate-400 flex-shrink-0" />
                            <span className="text-sm text-slate-600 truncate">{download.practiceAddress}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                            {whitePaperTitles[download.whitePaperId] || download.whitePaperId}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span className="text-sm text-slate-600 line-clamp-2">{download.downloadReason}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(download.createdAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          ) : (
            filteredContacts.length === 0 ? (
              <div className="text-center py-20">
                <Mail className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">No contact requests yet</h3>
                <p className="text-slate-500">Contact form submissions will appear here</p>
              </div>
            ) : (
              <div className="rounded-lg border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Request Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredContacts.map((contact) => (
                      <TableRow key={contact.id} data-testid={`row-contact-${contact.id}`}>
                        <TableCell className="font-medium">{contact.name}</TableCell>
                        <TableCell>
                          <a 
                            href={`mailto:${contact.email}`} 
                            className="text-primary hover:underline flex items-center gap-1"
                            data-testid={`link-contact-email-${contact.id}`}
                          >
                            <Mail className="h-3 w-3" />
                            {contact.email}
                          </a>
                        </TableCell>
                        <TableCell>{contact.phone || "-"}</TableCell>
                        <TableCell>{contact.company || "-"}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center px-2 py-1 rounded-full bg-slate-100 text-slate-600 text-xs font-medium">
                            {contact.requestType}
                          </span>
                        </TableCell>
                        <TableCell className="max-w-xs">
                          <span className="text-sm text-slate-600 line-clamp-2">{contact.message || "-"}</span>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-sm text-slate-500">
                            <Calendar className="h-3 w-3" />
                            {formatDate(contact.createdAt)}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
