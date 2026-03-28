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
  BarChart3, Eye, Monitor, Globe, Clock, Smartphone, Laptop, Tablet, RefreshCw, Settings, Plus, Trash2
} from "lucide-react";
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
  country: string | null;
  city: string | null;
  deviceType: string | null;
  browser: string | null;
  os: string | null;
  createdAt: string;
}

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
  const [activeTab, setActiveTab] = useState<"downloads" | "contacts" | "analytics" | "settings">("downloads");
  const [isLoading, setIsLoading] = useState(true);
  const [pageStats, setPageStats] = useState<PageViewStats | null>(null);
  const [recentViews, setRecentViews] = useState<RecentPageView[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);
  const [countries, setCountries] = useState<string[]>([]);
  const [filterCountry, setFilterCountry] = useState("");
  const [filterStartDate, setFilterStartDate] = useState("");
  const [filterEndDate, setFilterEndDate] = useState("");
  const [exportLoading, setExportLoading] = useState(false);
  const [notifEmails, setNotifEmails] = useState<{id: number; email: string; name: string | null; createdAt: string}[]>([]);
  const [newEmail, setNewEmail] = useState("");
  const [newName, setNewName] = useState("");
  const [settingsLoading, setSettingsLoading] = useState(false);
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [calendlyInput, setCalendlyInput] = useState("");
  const [calendlySaving, setCalendlySaving] = useState(false);
  const [calendlySaved, setCalendlySaved] = useState(false);

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

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const [statsRes, recentRes, countriesRes] = await Promise.all([
        fetch("/api/page-views/stats"),
        fetch("/api/page-views/recent?limit=50"),
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
          ) : activeTab === "analytics" ? (
            <div>
              {analyticsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : pageStats ? (
                <div className="space-y-6">
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm" onClick={fetchAnalytics} data-testid="button-refresh-analytics">
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
                        <input
                          type="date"
                          value={filterStartDate}
                          onChange={e => setFilterStartDate(e.target.value)}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="Start date"
                        />
                        <input
                          type="date"
                          value={filterEndDate}
                          onChange={e => setFilterEndDate(e.target.value)}
                          className="text-sm border rounded-md px-2 py-1.5 text-slate-700 focus:outline-none focus:ring-1 focus:ring-primary"
                          placeholder="End date"
                        />
                        <Button
                          size="sm"
                          onClick={exportVisitors}
                          disabled={exportLoading}
                          className="flex items-center gap-1.5"
                        >
                          {exportLoading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
                          Export CSV
                        </Button>
                        {(filterCountry || filterStartDate || filterEndDate) && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => { setFilterCountry(""); setFilterStartDate(""); setFilterEndDate(""); }}
                          >
                            Clear
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="rounded-lg border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Page</TableHead>
                            <TableHead>Location</TableHead>
                            <TableHead>Device</TableHead>
                            <TableHead>Browser</TableHead>
                            <TableHead>Time</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {recentViews.slice(0, 20).map((view) => (
                            <TableRow key={view.id} data-testid={`row-pageview-${view.id}`}>
                              <TableCell className="font-medium text-sm">{view.path}</TableCell>
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
                          {recentViews.length === 0 && (
                            <TableRow>
                              <TableCell colSpan={5} className="text-center py-8 text-slate-400">
                                No page views recorded yet
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
