import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { InlineWidget } from "react-calendly";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import {
  Calendar, Clock, Video, Check, Shield,
  Phone, Loader2, Send,
} from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const benefits = [
  { icon: Clock,  text: "30-minute personalized walkthrough" },
  { icon: Video,  text: "Live demo of your specialty workflows" },
  { icon: Check,  text: "Q&A with our EHR specialists" },
  { icon: Shield, text: "No commitment required" },
];

const DEFAULT_CALENDLY_URL =
  "https://calendly.com/testmouli4/30min?hide_gdpr_banner=1";

type Tab = "schedule" | "callback";

export default function BookDemo() {
  const { toast } = useToast();

  // ── Fix 1: don't render Calendly until URL is resolved ──────────────────────
  const [tab, setTab] = useState<Tab>("schedule");
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [calLoading, setCalLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings/calendly")
      .then((r) => r.json())
      .then((data) => {
        const url = data?.url || DEFAULT_CALENDLY_URL;
        setCalendlyUrl(
          url.includes("hide_gdpr_banner") ? url : url + "?hide_gdpr_banner=1",
        );
      })
      .catch(() => setCalendlyUrl(DEFAULT_CALENDLY_URL))
      .finally(() => setCalLoading(false));
  }, []);

  // ── Fix 3: Request Callback form ─────────────────────────────────────────────
  const [cbForm, setCbForm] = useState({
    name: "",
    email: "",
    phone: "",
    preferredTime: "",
  });

  const callbackMutation = useMutation({
    mutationFn: async (data: typeof cbForm) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          message: `Preferred callback time: ${data.preferredTime || "Anytime"}`,
          requestType: "Callback Request",
        }),
      });
      if (!response.ok) throw new Error("Failed to submit callback request");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Callback Requested!",
        description: "We'll call you back at your preferred time.",
      });
      setCbForm({ name: "", email: "", phone: "", preferredTime: "" });
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or call us at (516) 684-9521.",
        variant: "destructive",
      });
    },
  });

  const handleCallbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    callbackMutation.mutate(cbForm);
  };

  return (
    <div className="min-h-screen bg-background font-sans">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-b from-cyan-50 via-white to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-start">

              {/* ── Left: benefits panel ──────────────────────────────────── */}
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                className="lg:sticky lg:top-32"
              >
                <div className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-6">
                  <Calendar className="h-4 w-4" />
                  SCHEDULE YOUR DEMO
                </div>

                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                  See MD Charts
                  <span className="text-primary"> in Action</span>
                </h1>

                <p className="text-xl text-slate-600 mb-8">
                  Book a personalized demo and discover how MD Charts can help
                  your practice document faster, get paid sooner, and focus on
                  patient care.
                </p>

                <div className="space-y-4 mb-8">
                  {benefits.map((benefit, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm border border-slate-100"
                    >
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <benefit.icon className="h-5 w-5 text-primary" />
                      </div>
                      <span className="text-slate-700 font-medium">
                        {benefit.text}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-2">
                    What to Expect
                  </h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    {[
                      "Overview of MD Charts EHR & Practice Management",
                      "Specialty-specific template walkthrough",
                      "Revenue cycle & TriZetto integration demo",
                      "Pricing and implementation timeline",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2">
                        <Check className="h-4 w-4 text-primary mt-0.5 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>

              {/* ── Right: tab panel ─────────────────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden"
              >
                {/* Tab switcher */}
                <div className="flex border-b border-slate-200">
                  <button
                    onClick={() => setTab("schedule")}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                      tab === "schedule"
                        ? "bg-primary text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                    data-testid="tab-schedule"
                  >
                    <Calendar className="h-4 w-4" />
                    Schedule a Meeting
                  </button>
                  <button
                    onClick={() => setTab("callback")}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 text-sm font-semibold transition-colors ${
                      tab === "callback"
                        ? "bg-primary text-white"
                        : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                    }`}
                    data-testid="tab-callback"
                  >
                    <Phone className="h-4 w-4" />
                    Request a Callback
                  </button>
                </div>

                {/* ── Schedule tab ─────────────────────────────────────── */}
                {tab === "schedule" && (
                  calLoading ? (
                    <div className="flex flex-col items-center justify-center h-[700px] gap-3 text-slate-500">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                      <span className="text-sm">Loading calendar…</span>
                    </div>
                  ) : (
                    <InlineWidget
                      url={calendlyUrl}
                      styles={{ height: "700px", width: "100%" }}
                      pageSettings={{
                        backgroundColor: "ffffff",
                        hideEventTypeDetails: false,
                        hideLandingPageDetails: false,
                        primaryColor: "0891b2",
                        textColor: "1e293b",
                      }}
                      prefill={{ customAnswers: {} }}
                      utm={{}}
                    />
                  )
                )}

                {/* ── Callback tab ─────────────────────────────────────── */}
                {tab === "callback" && (
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-3">
                        <Phone className="h-7 w-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900">
                        We'll Call You
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">
                        Leave your details and we'll reach out at your preferred
                        time — no scheduling required.
                      </p>
                    </div>

                    <form
                      onSubmit={handleCallbackSubmit}
                      className="space-y-5"
                    >
                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={cbForm.name}
                          onChange={(e) =>
                            setCbForm({ ...cbForm, name: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          placeholder="Dr. John Smith"
                          data-testid="input-callback-name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={cbForm.phone}
                          onChange={(e) =>
                            setCbForm({ ...cbForm, phone: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          placeholder="(516) 684-9521"
                          data-testid="input-callback-phone"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={cbForm.email}
                          onChange={(e) =>
                            setCbForm({ ...cbForm, email: e.target.value })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                          placeholder="john@clinic.com"
                          data-testid="input-callback-email"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1.5">
                          Preferred Time to Call
                        </label>
                        <select
                          value={cbForm.preferredTime}
                          onChange={(e) =>
                            setCbForm({
                              ...cbForm,
                              preferredTime: e.target.value,
                            })
                          }
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-sm bg-white"
                          data-testid="select-callback-time"
                        >
                          <option value="">Anytime</option>
                          <option value="Morning (9am–12pm EST)">
                            Morning (9am–12pm EST)
                          </option>
                          <option value="Afternoon (12pm–3pm EST)">
                            Afternoon (12pm–3pm EST)
                          </option>
                          <option value="Late Afternoon (3pm–6pm EST)">
                            Late Afternoon (3pm–6pm EST)
                          </option>
                        </select>
                      </div>

                      <Button
                        type="submit"
                        className="w-full h-12 text-base font-bold"
                        disabled={callbackMutation.isPending}
                        data-testid="button-request-callback"
                      >
                        {callbackMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Submitting…
                          </>
                        ) : (
                          <>
                            <Phone className="mr-2 h-4 w-4" />
                            Request Callback
                          </>
                        )}
                      </Button>
                    </form>

                    <p className="text-xs text-slate-400 text-center mt-5">
                      We call back within 1 business day · Mon–Fri 9am–6pm EST
                    </p>
                  </div>
                )}
              </motion.div>

            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
