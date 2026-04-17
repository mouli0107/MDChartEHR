import { useState } from "react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Download, FileText, Loader2, BarChart3 } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

// Country options — add more as needed
const COUNTRIES = [
  { value: "", label: "All Countries" },
  { value: "US", label: "United States" },
  { value: "IN", label: "India" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
  { value: "MX", label: "Mexico" },
  { value: "BR", label: "Brazil" },
  { value: "SG", label: "Singapore" },
  { value: "AE", label: "United Arab Emirates" },
  { value: "PK", label: "Pakistan" },
  { value: "PH", label: "Philippines" },
  { value: "NG", label: "Nigeria" },
  { value: "ZA", label: "South Africa" },
];

// Quick-select presets
function getPresetDates(preset: string): { from: string; to: string } {
  const today = new Date();
  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  switch (preset) {
    case "last7": {
      const from = new Date(today);
      from.setDate(today.getDate() - 6);
      return { from: fmt(from), to: fmt(today) };
    }
    case "last30": {
      const from = new Date(today);
      from.setDate(today.getDate() - 29);
      return { from: fmt(from), to: fmt(today) };
    }
    case "last90": {
      const from = new Date(today);
      from.setDate(today.getDate() - 89);
      return { from: fmt(from), to: fmt(today) };
    }
    case "thisMonth": {
      const from = new Date(today.getFullYear(), today.getMonth(), 1);
      return { from: fmt(from), to: fmt(today) };
    }
    case "lastMonth": {
      const from = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const to = new Date(today.getFullYear(), today.getMonth(), 0);
      return { from: fmt(from), to: fmt(to) };
    }
    case "ytd": {
      const from = new Date(today.getFullYear(), 0, 1);
      return { from: fmt(from), to: fmt(today) };
    }
    default:
      return { from: "", to: "" };
  }
}

export default function AdminAnalyticsPage() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const [from, setFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 29);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState(() => new Date().toISOString().slice(0, 10));
  const [country, setCountry] = useState("__all");
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = "/admin/login";
    return null;
  }

  const applyPreset = (preset: string) => {
    const { from: f, to: t } = getPresetDates(preset);
    if (f) setFrom(f);
    if (t) setTo(t);
  };

  const handleGenerate = async () => {
    if (!from || !to) {
      setError("Please select both a start and end date.");
      return;
    }
    if (from > to) {
      setError("Start date must be before end date.");
      return;
    }
    setError(null);
    setGenerating(true);
    try {
      const params = new URLSearchParams({ from, to });
      if (country && country !== "__all") params.set("country", country);

      const res = await fetch(`/api/admin/analytics/report?${params.toString()}`);
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? `Server error ${res.status}`);
      }

      // Trigger browser download
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      const safeCountry = (country && country !== "__all") ? `_${country.toLowerCase()}` : "";
      a.download = `mdcharts_analytics_${from}_to_${to}${safeCountry}.html`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setLastGenerated(new Date().toLocaleTimeString());
    } catch (err: any) {
      setError(err.message ?? "Failed to generate report. Please try again.");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/leads">
            <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Admin
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-3">
              <BarChart3 className="h-8 w-8 text-blue-400" />
              Analytics Report Generator
            </h1>
            <p className="text-slate-400 mt-1">
              Generate a downloadable HTML analytics report for any date range
            </p>
          </div>
        </div>

        {/* Main card */}
        <div className="max-w-2xl bg-slate-900 border border-slate-700 rounded-xl p-8 shadow-xl">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-blue-400" />
            Report Parameters
          </h2>

          {/* Quick presets */}
          <div className="mb-6">
            <Label className="text-slate-300 text-sm mb-2 block">Quick Select</Label>
            <div className="flex flex-wrap gap-2">
              {[
                { key: "last7", label: "Last 7 days" },
                { key: "last30", label: "Last 30 days" },
                { key: "last90", label: "Last 90 days" },
                { key: "thisMonth", label: "This month" },
                { key: "lastMonth", label: "Last month" },
                { key: "ytd", label: "Year to date" },
              ].map(({ key, label }) => (
                <Button
                  key={key}
                  variant="outline"
                  size="sm"
                  onClick={() => applyPreset(key)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white text-xs"
                >
                  {label}
                </Button>
              ))}
            </div>
          </div>

          {/* Date range */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <Label htmlFor="from-date" className="text-slate-300 text-sm mb-1 block">
                Start Date
              </Label>
              <Input
                id="from-date"
                type="date"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white [color-scheme:dark]"
              />
            </div>
            <div>
              <Label htmlFor="to-date" className="text-slate-300 text-sm mb-1 block">
                End Date
              </Label>
              <Input
                id="to-date"
                type="date"
                value={to}
                onChange={(e) => setTo(e.target.value)}
                className="bg-slate-800 border-slate-600 text-white [color-scheme:dark]"
              />
            </div>
          </div>

          {/* Country filter */}
          <div className="mb-8">
            <Label className="text-slate-300 text-sm mb-1 block">Country Filter (optional)</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                <SelectValue placeholder="All Countries" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-600">
                {COUNTRIES.map(({ value, label }) => (
                  <SelectItem
                    key={value || "__all"}
                    value={value || "__all"}
                    className="text-white hover:bg-slate-700 focus:bg-slate-700"
                  >
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-slate-500 text-xs mt-1">
              Leave blank to include all countries in the report
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-900/40 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Success */}
          {lastGenerated && !error && (
            <div className="mb-4 p-3 bg-green-900/40 border border-green-700 rounded-lg text-green-300 text-sm">
              Report downloaded successfully at {lastGenerated}
            </div>
          )}

          {/* Generate button */}
          <Button
            onClick={handleGenerate}
            disabled={generating}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 text-base"
          >
            {generating ? (
              <>
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                Generating Report…
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Generate &amp; Download HTML Report
              </>
            )}
          </Button>

          {/* Info note */}
          <p className="text-slate-500 text-xs mt-4 text-center">
            The report is a self-contained HTML file — open it in any browser, no internet required.
            It includes traffic charts, top pages, device breakdown, city heatmap, and more.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
