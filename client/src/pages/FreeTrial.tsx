import { useState, useRef } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Turnstile } from "@marsidev/react-turnstile";
import {
  Check, Phone, Mail, Shield, Upload, X, Loader2, Plus, Trash2, Camera,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────
interface Provider {
  firstName: string;
  lastName: string;
  npi: string;
  license: string;
  taxonomy: string;
  dea: string;
  timezone: string;
}

const EMPTY_PROVIDER: Provider = {
  firstName: "", lastName: "", npi: "", license: "", taxonomy: "", dea: "", timezone: "",
};

const SPECIALTIES = ["OB/GYN", "Dermatology", "Cardiology", "Urology", "Family Medicine",
  "Orthopedics", "Ophthalmology", "ENT", "Gastroenterology", "Neurology", "Psychiatry",
  "Pediatrics", "Internal Medicine", "Other"];

const US_STATES = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN",
  "IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
  "NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"];

const TIMEZONES = [
  "Eastern Time (ET) — UTC-5/UTC-4",
  "Central Time (CT) — UTC-6/UTC-5",
  "Mountain Time (MT) — UTC-7/UTC-6",
  "Pacific Time (PT) — UTC-8/UTC-7",
  "Alaska Time (AKT)",
  "Hawaii-Aleutian Time (HAT)",
];

const ADDON_LIST = [
  { id: "erx", name: "e-Prescribing (eRx)", desc: "Electronic prescriptions including EPCS for controlled substances" },
  { id: "billing", name: "Billing Module", desc: "Claims submission, ERA, EOB, revenue cycle management" },
  { id: "sms", name: "SMS / Bidirectional Texting", desc: "Patient texting, appointment reminders, two-way chat" },
  { id: "labs", name: "Lab Interfaces", desc: "Quest, LabCorp, Sonic, and other lab integrations" },
  { id: "telehealth", name: "TeleHealth", desc: "Integrated video visits with patient portal connectivity" },
  { id: "ai", name: "AI Clinical Assistant", desc: "AI coding suggestions and documentation assist" },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function Field({ label, required, hint, children }: {
  label: string; required?: boolean; hint?: string; children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs font-semibold text-[#1B3A5C]">
        {label}{required && <span className="text-[#C94040] ml-0.5">*</span>}
      </label>
      {children}
      {hint && <span className="text-[11px] text-[#4A6880]">{hint}</span>}
    </div>
  );
}

function Input({ className = "", ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`w-full h-9 px-3 text-sm border-[1.5px] border-[#C8E0EF] rounded-lg bg-white text-[#0D1B2E]
        focus:outline-none focus:border-[#0B9DD9] focus:ring-2 focus:ring-[#0B9DD9]/10
        placeholder:text-[#AABFBF] disabled:bg-slate-50 disabled:text-[#4A6880] disabled:cursor-not-allowed ${className}`}
      {...props}
    />
  );
}

function Select({ className = "", children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={`w-full h-9 px-3 text-sm border-[1.5px] border-[#C8E0EF] rounded-lg bg-white text-[#0D1B2E]
        focus:outline-none focus:border-[#0B9DD9] focus:ring-2 focus:ring-[#0B9DD9]/10 cursor-pointer ${className}`}
      {...props}
    >
      {children}
    </select>
  );
}

function RadioRow({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <label
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 border-[1.5px] rounded-lg cursor-pointer text-sm select-none transition-all
        ${selected ? "border-[#0B9DD9] bg-[#E5F5FC] text-[#0B9DD9] font-medium" : "border-[#C8E0EF] text-[#1B3A5C] hover:border-[#1AAFCA] hover:bg-[#E5F5FC]"}`}
    >
      <input type="radio" className="accent-[#0B9DD9] w-3.5 h-3.5 flex-shrink-0" checked={selected} onChange={() => {}} />
      {children}
    </label>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <div className="text-[10px] font-bold tracking-widest uppercase text-[#0B9DD9] mb-2.5 mt-1">{children}</div>;
}

function Divider() {
  return <div className="h-px bg-[#C8E0EF] my-3.5" />;
}

// ── OTP Modal ─────────────────────────────────────────────────────────────────
function OtpModal({ email, cell, onConfirm, onClose }: {
  email: string; cell: string; onConfirm: () => void; onClose: () => void;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const refs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleDigit = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 5) refs[i + 1].current?.focus();
  };

  const handleKey = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs[i - 1].current?.focus();
  };

  return (
    <div className="fixed inset-0 bg-[#083A5E]/55 z-50 flex items-center justify-center backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl p-8 text-center shadow-2xl max-w-sm w-[90%]"
      >
        <div className="text-4xl mb-3">📱</div>
        <h3 className="text-xl font-bold text-[#0D1B2E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
          Verify Your Contact
        </h3>
        <p className="text-sm text-[#4A6880] mb-5 leading-relaxed">
          We sent a 6-digit OTP to <strong>{cell}</strong>.<br />
          A verification link was also sent to <strong>{email}</strong>.
        </p>
        <div className="flex justify-center gap-2 mb-4">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={refs[i]}
              type="text"
              maxLength={1}
              value={d}
              onChange={e => handleDigit(i, e.target.value)}
              onKeyDown={e => handleKey(i, e)}
              className="w-10 h-12 text-center text-lg font-bold border-[1.5px] border-[#C8E0EF] rounded-lg
                focus:outline-none focus:border-[#0B9DD9] focus:ring-2 focus:ring-[#0B9DD9]/10 text-[#0D1B2E]"
            />
          ))}
        </div>
        <p className="text-sm text-[#4A6880] mb-5">
          Didn't receive it?{" "}
          <button className="text-[#0B9DD9] font-semibold hover:underline" onClick={() => alert("OTP resent!")}>
            Resend OTP
          </button>
        </p>
        <Button className="w-full bg-[#0B9DD9] hover:bg-[#1AAFCA] text-white" onClick={onConfirm}>
          Verify &amp; Continue →
        </Button>
      </motion.div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function FreeTrial() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [showOtp, setShowOtp] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Step 1
  const [s1, setS1] = useState({
    firstName: "", lastName: "", role: "",
    practiceName: "", specialty: "",
    street: "", suite: "", city: "", state: "", zip: "",
    officePhone: "", cellPhone: "", email: "",
    password: "", confirmPassword: "",
    mfaMethod: "SMS / Text message",
    captchaDone: false, tosAccepted: false,
    turnstileToken: null as string | null,
  });

  // Step 2
  const [s2, setS2] = useState({
    billingType: "", insuranceProcessing: "", encountersPerMonth: "",
    selectedAddons: [] as string[],
    labIntegration: "", labNames: [] as string[], labOther: "",
    dataMigration: "", migrationSource: "", migrationEhrName: "",
  });

  // Step 3
  const [providers, setProviders] = useState<Provider[]>([{ ...EMPTY_PROVIDER }]);
  const [idMethod, setIdMethod] = useState("upload");
  const [idFileName, setIdFileName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const step1Ready = s1.captchaDone && s1.tosAccepted && s1.firstName && s1.lastName && s1.role &&
    s1.practiceName && s1.specialty && s1.email && s1.cellPhone && s1.officePhone &&
    s1.street && s1.city && s1.state && s1.zip && s1.password && s1.confirmPassword;

  const providerUpdate = (i: number, field: keyof Provider, val: string) => {
    setProviders(prev => prev.map((p, idx) => idx === i ? { ...p, [field]: val } : p));
  };

  const addProvider = () => setProviders(prev => [...prev, { ...EMPTY_PROVIDER }]);
  const removeProvider = (i: number) => setProviders(prev => prev.filter((_, idx) => idx !== i));

  const toggleAddon = (id: string) => {
    setS2(prev => ({
      ...prev,
      selectedAddons: prev.selectedAddons.includes(id)
        ? prev.selectedAddons.filter(a => a !== id)
        : [...prev.selectedAddons, id],
    }));
  };

  const toggleLab = (lab: string) => {
    setS2(prev => ({
      ...prev,
      labNames: prev.labNames.includes(lab)
        ? prev.labNames.filter(l => l !== lab)
        : [...prev.labNames, lab],
    }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const payload = {
        firstName: s1.firstName, lastName: s1.lastName, role: s1.role,
        practiceName: s1.practiceName, specialty: s1.specialty,
        street: s1.street, suite: s1.suite, city: s1.city, state: s1.state, zip: s1.zip,
        officePhone: s1.officePhone, cellPhone: s1.cellPhone, email: s1.email,
        mfaMethod: s1.mfaMethod,
        billingType: s2.billingType, insuranceProcessing: s2.insuranceProcessing,
        encountersPerMonth: s2.encountersPerMonth,
        selectedAddons: JSON.stringify(s2.selectedAddons),
        labIntegration: s2.labIntegration,
        labNames: [...s2.labNames, ...(s2.labOther ? [s2.labOther] : [])].join(", "),
        dataMigration: s2.dataMigration, migrationSource: s2.migrationSource,
        migrationEhrName: s2.migrationEhrName,
        providers: JSON.stringify(providers),
        idVerificationMethod: idMethod,
        turnstileToken: s1.turnstileToken,
      };

      const res = await fetch("/api/trial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Submission failed");
      }

      setStep(4);
    } catch (err: any) {
      toast({ title: "Submission Failed", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const STEPS = [
    { label: "Sign In Info", desc: "Practice, address, contact & login" },
    { label: "Additional Info", desc: "Billing, labs, migration & add-ons" },
    { label: "Provider Enrollment & ID", desc: "NPI, credentials & identity verification" },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#083A5E]" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* OTP Modal */}
      <AnimatePresence>
        {showOtp && (
          <OtpModal
            email={s1.email}
            cell={s1.cellPhone}
            onConfirm={() => { setShowOtp(false); setStep(2); }}
            onClose={() => setShowOtp(false)}
          />
        )}
      </AnimatePresence>

      {/* Topbar */}
      <div className="h-13 bg-[#083A5E] border-b border-white/10 flex items-center justify-between px-7 flex-shrink-0">
        <Link href="/">
          <span className="font-bold text-xl text-white cursor-pointer" style={{ fontFamily: "'Playfair Display', serif" }}>
            MD<span className="text-[#7EC8E3]">Charts</span>
          </span>
        </Link>
        <span className="text-[11px] font-semibold tracking-widest uppercase text-white/50">Free Trial Enrollment</span>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Left Panel */}
        <div className="w-72 flex-shrink-0 flex flex-col p-7 relative overflow-hidden"
          style={{ background: "linear-gradient(175deg, #083A5E 0%, #0B9DD9 60%, #0A9EC4 100%)" }}>
          <div className="absolute w-56 h-56 rounded-full border-[30px] border-white/5 -bottom-14 -right-14 pointer-events-none" />

          <div className="text-lg font-bold text-white mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
            MDCharts Free Trial
          </div>
          <div className="text-xs text-white/50 mb-5 leading-relaxed">
            Complete all 3 steps to activate your 60-day free trial account.
          </div>

          {/* Trial summary badge */}
          <div className="bg-white/10 border border-white/20 rounded-xl p-3 mb-5">
            <div className="text-[10px] font-bold tracking-widest uppercase text-[#7EC8E3] mb-2">Trial Summary</div>
            {[
              ["Duration", "60 days"],
              ["Credit card", "Not required"],
              ["Specialty", s1.specialty || "Select below"],
              ["Cost", null],
            ].map(([k, v]) => (
              <div key={k as string} className="flex justify-between items-center py-0.5">
                <span className="text-[11px] text-white/45">{k}</span>
                {v === null ? (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#1E7B4A]/35 border border-[#1E7B4A]/50 text-[#6EE7B7]">FREE</span>
                ) : (
                  <span className="text-[11px] font-semibold text-white/85">{v}</span>
                )}
              </div>
            ))}
          </div>

          {/* Stepper */}
          <div className="flex flex-col flex-1">
            {STEPS.map((s, i) => {
              const num = i + 1;
              const done = step > num || step === 4;
              const active = step === num && step < 4;
              return (
                <div key={num} className="flex items-start gap-3 pb-5 last:pb-0">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-xs font-bold transition-all z-10
                      ${done ? "bg-white/90 border-white/90 text-[#0B9DD9]"
                        : active ? "bg-white border-white text-[#0B9DD9] shadow-[0_0_0_5px_rgba(255,255,255,0.18)]"
                        : "bg-white/7 border-white/25 text-white/45"}`}>
                      {done ? <Check className="w-3.5 h-3.5" /> : num}
                    </div>
                    {i < 2 && <div className={`w-0.5 flex-1 min-h-4 mt-1 transition-all ${done ? "bg-white/50" : "bg-white/13"}`} />}
                  </div>
                  <div className="pt-1">
                    <div className={`text-sm font-semibold transition-colors ${done ? "text-white/70" : active ? "text-white" : "text-white/40"}`}>
                      {s.label}
                    </div>
                    <div className={`text-[11px] mt-0.5 leading-snug transition-colors ${active ? "text-white/50" : "text-white/30"}`}>
                      {s.desc}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-auto pt-4 border-t border-white/10">
            <p className="text-[11px] text-white/30 leading-relaxed">
              <strong className="text-white/50">Need help?</strong><br />support@mdcharts.com
            </p>
          </div>
        </div>

        {/* Right Panel */}
        <div className="flex-1 flex flex-col bg-[#F0F7FC] overflow-hidden">

          {/* ── STEP 1 ── */}
          {step === 1 && (
            <>
              <div className="bg-white border-b border-[#C8E0EF] px-7 py-3.5 flex-shrink-0">
                <div className="text-[11px] font-bold tracking-widest uppercase text-[#0B9DD9] mb-0.5">Step 1 of 3</div>
                <h2 className="text-xl font-bold text-[#0D1B2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Sign In Information</h2>
                <p className="text-xs text-[#4A6880] mt-0.5">Create your MDCharts trial account. Fields marked <span className="text-[#C94040]">*</span> are required. No credit card needed.</p>
              </div>

              <div className="flex-1 overflow-y-auto px-7 py-4 space-y-0">
                <SectionLabel>Personal Information</SectionLabel>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="First Name" required>
                    <Input placeholder="e.g. Sarah" value={s1.firstName} onChange={e => setS1(p => ({ ...p, firstName: e.target.value }))} />
                  </Field>
                  <Field label="Last Name" required>
                    <Input placeholder="e.g. Johnson" value={s1.lastName} onChange={e => setS1(p => ({ ...p, lastName: e.target.value }))} />
                  </Field>
                </div>

                <Divider />
                <SectionLabel>Role *</SectionLabel>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {["Admin / Office Manager", "Provider", "Medical Assistant (MA)"].map(r => (
                    <RadioRow key={r} selected={s1.role === r} onClick={() => setS1(p => ({ ...p, role: r }))}>{r}</RadioRow>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Practice</SectionLabel>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Practice Name" required>
                    <Input placeholder="e.g. Bright Care Family Medicine" value={s1.practiceName} onChange={e => setS1(p => ({ ...p, practiceName: e.target.value }))} />
                  </Field>
                  <Field label="Specialty" required>
                    <Select value={s1.specialty} onChange={e => setS1(p => ({ ...p, specialty: e.target.value }))}>
                      <option value="">-- Select specialty --</option>
                      {SPECIALTIES.map(s => <option key={s}>{s}</option>)}
                    </Select>
                  </Field>
                </div>

                <Divider />
                <SectionLabel>Address</SectionLabel>
                <div className="grid grid-cols-4 gap-3 mb-3">
                  <div className="col-span-2">
                    <Field label="Street Address" required>
                      <Input placeholder="e.g. 123 Medical Drive" value={s1.street} onChange={e => setS1(p => ({ ...p, street: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="col-span-2">
                    <Field label="Suite / Unit Number">
                      <Input placeholder="e.g. Suite 100" value={s1.suite} onChange={e => setS1(p => ({ ...p, suite: e.target.value }))} />
                    </Field>
                  </div>
                  <div className="col-span-2">
                    <Field label="City" required>
                      <Input placeholder="e.g. Atlanta" value={s1.city} onChange={e => setS1(p => ({ ...p, city: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="State" required>
                    <Select value={s1.state} onChange={e => setS1(p => ({ ...p, state: e.target.value }))}>
                      <option value="">-- State --</option>
                      {US_STATES.map(s => <option key={s}>{s}</option>)}
                    </Select>
                  </Field>
                  <Field label="ZIP Code" required>
                    <Input placeholder="30301" maxLength={10} value={s1.zip} onChange={e => setS1(p => ({ ...p, zip: e.target.value }))} />
                  </Field>
                </div>

                <Divider />
                <SectionLabel>Contact Information</SectionLabel>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <Field label="Office Phone Number" required>
                    <Input type="tel" placeholder="(555) 000-0000" value={s1.officePhone} onChange={e => setS1(p => ({ ...p, officePhone: e.target.value }))} />
                  </Field>
                  <Field label="Cell Phone Number" required hint="OTP will be sent to this number for verification.">
                    <Input type="tel" placeholder="(555) 000-0000" value={s1.cellPhone} onChange={e => setS1(p => ({ ...p, cellPhone: e.target.value }))} />
                  </Field>
                  <Field label="Email Address" required hint="Verification link and trial credentials will be sent here.">
                    <Input type="email" placeholder="you@yourclinic.com" value={s1.email} onChange={e => setS1(p => ({ ...p, email: e.target.value }))} />
                  </Field>
                  <div />
                  <Field label="Password" required>
                    <Input type="password" placeholder="Minimum 8 characters" value={s1.password} onChange={e => setS1(p => ({ ...p, password: e.target.value }))} />
                  </Field>
                  <Field label="Confirm Password" required>
                    <Input type="password" placeholder="Re-enter your password" value={s1.confirmPassword} onChange={e => setS1(p => ({ ...p, confirmPassword: e.target.value }))} />
                  </Field>
                </div>

                <Divider />
                <SectionLabel>Multi-Factor Authentication (MFA) *</SectionLabel>
                <div className="bg-[#E5F5FC] border border-[#7EC8E3] rounded-lg px-3 py-2 text-xs text-[#4A6880] mb-3">
                  MFA is required for all trial accounts. Choose how you will verify your identity on each login.
                </div>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {[
                    { icon: "📱", label: "SMS / Text message" },
                    { icon: "📧", label: "Email code" },
                    { icon: "🔑", label: "Authenticator app" },
                  ].map(({ icon, label }) => (
                    <div
                      key={label}
                      onClick={() => setS1(p => ({ ...p, mfaMethod: label }))}
                      className={`border-[1.5px] rounded-lg p-3 cursor-pointer text-center transition-all select-none
                        ${s1.mfaMethod === label ? "border-[#0B9DD9] bg-[#E5F5FC]" : "border-[#C8E0EF] hover:border-[#1AAFCA] hover:bg-[#E5F5FC]"}`}
                    >
                      <div className="text-2xl mb-1">{icon}</div>
                      <div className="text-xs font-semibold text-[#1B3A5C]">{label}</div>
                    </div>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Verification</SectionLabel>
                <Turnstile
                  siteKey="0x4AAAAAAD2mqLoPVJ2zPWjK"
                  onSuccess={(token) => setS1(p => ({ ...p, captchaDone: true, turnstileToken: token }))}
                  onExpire={() => setS1(p => ({ ...p, captchaDone: false, turnstileToken: null }))}
                  options={{ theme: "light" }}
                />

                <Divider />
                <SectionLabel>Terms &amp; Privacy</SectionLabel>
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-[#0B9DD9] w-4 h-4 mt-0.5 flex-shrink-0 cursor-pointer"
                    checked={s1.tosAccepted}
                    onChange={e => setS1(p => ({ ...p, tosAccepted: e.target.checked }))}
                  />
                  <span className="text-sm text-[#1B3A5C] leading-relaxed">
                    I have read and agree to the{" "}
                    <a href="/terms-of-service" target="_blank" className="text-[#0B9DD9] font-semibold hover:underline">Terms of Service</a>{" "}
                    and{" "}
                    <a href="/privacy-policy" target="_blank" className="text-[#0B9DD9] font-semibold hover:underline">Privacy Policy</a>{" "}
                    of MDCharts. I understand that I must respond to MDCharts sales outreach within 7 days of initial contact as a condition of my trial account activation.
                  </span>
                </label>

                {!step1Ready && (
                  <div className="mt-3 bg-[#FEF3E2] border border-[#F5C542] rounded-lg px-3 py-2 text-xs text-[#B45309]">
                    Please complete the CAPTCHA and accept the Terms of Service and Privacy Policy to enable account creation.
                  </div>
                )}
                <div className="h-4" />
              </div>

              <div className="bg-white border-t border-[#C8E0EF] px-7 py-3 flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="text-xs text-[#4A6880] font-medium mb-1">Step 1 of 3 — Sign In Info</div>
                  <div className="w-36 h-0.5 bg-[#C8E0EF] rounded-full">
                    <div className="h-full bg-[#0B9DD9] rounded-full" style={{ width: "33%" }} />
                  </div>
                </div>
                <Button
                  className="bg-[#0B9DD9] hover:bg-[#1AAFCA] text-white"
                  disabled={!step1Ready}
                  onClick={() => setShowOtp(true)}
                >
                  Create Account &amp; Verify →
                </Button>
              </div>
            </>
          )}

          {/* ── STEP 2 ── */}
          {step === 2 && (
            <>
              <div className="bg-white border-b border-[#C8E0EF] px-7 py-3.5 flex-shrink-0">
                <div className="text-[11px] font-bold tracking-widest uppercase text-[#0B9DD9] mb-0.5">Step 2 of 3</div>
                <h2 className="text-xl font-bold text-[#0D1B2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Additional Info</h2>
                <p className="text-xs text-[#4A6880] mt-0.5">Tell us how your practice operates and select add-on features you plan to use.</p>
              </div>

              <div className="flex-1 overflow-y-auto px-7 py-4">
                <SectionLabel>Billing Type *</SectionLabel>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {["Insurance", "Cash Only", "Insurance & Cash"].map(b => (
                    <RadioRow key={b} selected={s2.billingType === b} onClick={() => setS2(p => ({ ...p, billingType: b }))}>{b}</RadioRow>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Insurance Processing</SectionLabel>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {["In-house Biller", "3rd Party RCM Services", "3rd Party Biller"].map(b => (
                    <RadioRow key={b} selected={s2.insuranceProcessing === b} onClick={() => setS2(p => ({ ...p, insuranceProcessing: b }))}>{b}</RadioRow>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Encounters per Month</SectionLabel>
                <div className="flex flex-wrap gap-2 mb-3">
                  {["Less than 50", "50 - 150", "150 - 300", "300 - 500", "More than 500"].map(e => (
                    <div
                      key={e}
                      onClick={() => setS2(p => ({ ...p, encountersPerMonth: e }))}
                      className={`px-4 py-1.5 border-[1.5px] rounded-full text-sm font-medium cursor-pointer transition-all select-none
                        ${s2.encountersPerMonth === e ? "border-[#0B9DD9] bg-[#0B9DD9] text-white" : "border-[#C8E0EF] text-[#4A6880] hover:border-[#1AAFCA] hover:text-[#0B9DD9]"}`}
                    >
                      {e}
                    </div>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Features Included in Your Trial</SectionLabel>
                <div className="bg-[#E5F5FC] border border-[#7EC8E3] rounded-lg px-3 py-2 text-xs text-[#4A6880] mb-3">
                  The following core features are included in your 60-day free trial at no cost. Add-on features activate when you upgrade to a paid account.
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { name: "Patient Demographics", desc: "Patient records, history, demographics management" },
                    { name: "Appointment Scheduling", desc: "Calendar, scheduling, and appointment management" },
                    { name: "Clinical Charting & SOAP Notes", desc: "Specialty-specific templates and clinical documentation" },
                    { name: "Document Upload", desc: "Patient documents, referrals, and attachments" },
                  ].map(f => (
                    <div key={f.name} className="flex items-start gap-2.5 border-[1.5px] border-[#0B9DD9] bg-[#E5F5FC] rounded-lg px-3 py-2.5">
                      <input type="checkbox" checked disabled className="accent-[#0B9DD9] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[#1B3A5C]">
                          {f.name} <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#D1FAE5] text-[#065F46]">Included</span>
                        </div>
                        <div className="text-[11px] text-[#4A6880] mt-0.5">{f.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <SectionLabel>Add-ons (Unlocks on Paid Conversion)</SectionLabel>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {ADDON_LIST.map(a => (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`flex items-start gap-2.5 border-[1.5px] rounded-lg px-3 py-2.5 cursor-pointer transition-all
                        ${s2.selectedAddons.includes(a.id) ? "border-[#0B9DD9] bg-[#E5F5FC]" : "border-[#C8E0EF] hover:border-[#1AAFCA] hover:bg-[#E5F5FC]"}`}
                    >
                      <input type="checkbox" checked={s2.selectedAddons.includes(a.id)} onChange={() => {}} className="accent-[#0B9DD9] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-xs font-semibold text-[#1B3A5C]">
                          {a.name} <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#FEE2E2] text-[#991B1B]">Paid</span>
                        </div>
                        <div className="text-[11px] text-[#4A6880] mt-0.5">{a.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Divider />
                <SectionLabel>Lab Integration (for when you upgrade)</SectionLabel>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <RadioRow selected={s2.labIntegration === "yes"} onClick={() => setS2(p => ({ ...p, labIntegration: "yes" }))}>Yes</RadioRow>
                  <RadioRow selected={s2.labIntegration === "no"} onClick={() => setS2(p => ({ ...p, labIntegration: "no" }))}>No</RadioRow>
                </div>
                {s2.labIntegration === "yes" && (
                  <div className="ml-2 mt-1.5 px-3 py-3 bg-[#E5F5FC] border-l-[3px] border-[#7EC8E3] rounded-r-lg">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[#0B9DD9] mb-2">Select the labs:</div>
                    <div className="grid grid-cols-4 gap-2 mb-2">
                      {["Quest", "LabCorp", "Sonic / Sunrise"].map(lab => (
                        <label
                          key={lab}
                          onClick={() => toggleLab(lab)}
                          className={`flex items-center gap-2 px-2.5 py-1.5 border-[1.5px] rounded-lg cursor-pointer text-xs select-none transition-all
                            ${s2.labNames.includes(lab) ? "border-[#0B9DD9] bg-[#E5F5FC] text-[#0B9DD9] font-medium" : "border-[#C8E0EF] text-[#1B3A5C] hover:border-[#1AAFCA]"}`}
                        >
                          <input type="checkbox" checked={s2.labNames.includes(lab)} onChange={() => {}} className="accent-[#0B9DD9]" />
                          {lab}
                        </label>
                      ))}
                    </div>
                    <Field label="Other lab">
                      <Input placeholder="Enter lab name..." value={s2.labOther} onChange={e => setS2(p => ({ ...p, labOther: e.target.value }))} className="max-w-xs" />
                    </Field>
                  </div>
                )}

                <Divider />
                <SectionLabel>Data Migration</SectionLabel>
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <RadioRow selected={s2.dataMigration === "yes"} onClick={() => setS2(p => ({ ...p, dataMigration: "yes" }))}>Yes, I need data migration</RadioRow>
                  <RadioRow selected={s2.dataMigration === "no"} onClick={() => setS2(p => ({ ...p, dataMigration: "no" }))}>No</RadioRow>
                </div>
                {s2.dataMigration === "yes" && (
                  <div className="ml-2 mt-1.5 px-3 py-3 bg-[#E5F5FC] border-l-[3px] border-[#7EC8E3] rounded-r-lg space-y-2">
                    <div className="text-[10px] font-bold tracking-wider uppercase text-[#0B9DD9] mb-1">Source:</div>
                    <div className="grid grid-cols-2 gap-2">
                      <RadioRow selected={s2.migrationSource === "ehr"} onClick={() => setS2(p => ({ ...p, migrationSource: "ehr" }))}>From another EHR</RadioRow>
                      <RadioRow selected={s2.migrationSource === "paper"} onClick={() => setS2(p => ({ ...p, migrationSource: "paper" }))}>From paper</RadioRow>
                    </div>
                    {s2.migrationSource === "ehr" && (
                      <Field label="Name of the EHR">
                        <Input placeholder="e.g. Epic, Athena, eClinicalWorks..." value={s2.migrationEhrName} onChange={e => setS2(p => ({ ...p, migrationEhrName: e.target.value }))} className="max-w-xs" />
                      </Field>
                    )}
                  </div>
                )}

                <Divider />
                <div className="bg-[#F0FDF4] border border-[#86EFAC] rounded-lg px-3 py-2.5 text-sm text-[#4A6880]">
                  🎁 <strong>No credit card required.</strong> Your 60-day trial is completely free. Payment details are only collected when you choose to upgrade.
                </div>
                <div className="h-4" />
              </div>

              <div className="bg-white border-t border-[#C8E0EF] px-7 py-3 flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="text-xs text-[#4A6880] font-medium mb-1">Step 2 of 3 — Additional Info</div>
                  <div className="w-36 h-0.5 bg-[#C8E0EF] rounded-full">
                    <div className="h-full bg-[#0B9DD9] rounded-full" style={{ width: "66%" }} />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-[#C8E0EF] text-[#4A6880]" onClick={() => setStep(1)}>← Back</Button>
                  <Button className="bg-[#0B9DD9] hover:bg-[#1AAFCA] text-white" onClick={() => setStep(3)}>Continue →</Button>
                </div>
              </div>
            </>
          )}

          {/* ── STEP 3 ── */}
          {step === 3 && (
            <>
              <div className="bg-white border-b border-[#C8E0EF] px-7 py-3.5 flex-shrink-0">
                <div className="text-[11px] font-bold tracking-widest uppercase text-[#0B9DD9] mb-0.5">Step 3 of 3 — Final Step</div>
                <h2 className="text-xl font-bold text-[#0D1B2E]" style={{ fontFamily: "'Playfair Display', serif" }}>Provider Enrollment &amp; Identity Verification</h2>
                <p className="text-xs text-[#4A6880] mt-0.5">Enter provider credentials and upload a valid photo ID to complete your registration.</p>
              </div>

              <div className="flex-1 overflow-y-auto px-7 py-4">
                <SectionLabel>Provider Enrollment</SectionLabel>
                {providers.map((prov, i) => (
                  <div key={i} className="border-[1.5px] border-[#C8E0EF] bg-white rounded-xl px-4 py-4 mb-3">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-bold text-[#0B9DD9]">Provider {i + 1}{i === 0 ? " (Primary)" : ""}</span>
                      {i > 0 && (
                        <button onClick={() => removeProvider(i)} className="text-xs text-[#C94040] hover:underline flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /> Remove
                        </button>
                      )}
                    </div>
                    <div className="grid grid-cols-4 gap-3">
                      <div className="col-span-2">
                        <Field label="First Name" required>
                          <Input placeholder="Provider first name" value={prov.firstName} onChange={e => providerUpdate(i, "firstName", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="Last Name" required>
                          <Input placeholder="Provider last name" value={prov.lastName} onChange={e => providerUpdate(i, "lastName", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="NPI Number" required>
                          <Input placeholder="10-digit NPI" maxLength={10} value={prov.npi} onChange={e => providerUpdate(i, "npi", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="License Number" required>
                          <Input placeholder="State license number" value={prov.license} onChange={e => providerUpdate(i, "license", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="Taxonomy Code">
                          <Input placeholder="e.g. 207Q00000X" value={prov.taxonomy} onChange={e => providerUpdate(i, "taxonomy", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-2">
                        <Field label="DEA Number (if applicable)">
                          <Input placeholder="e.g. AB1234563" value={prov.dea} onChange={e => providerUpdate(i, "dea", e.target.value)} />
                        </Field>
                      </div>
                      <div className="col-span-4">
                        <Field label="Timezone" required>
                          <Select value={prov.timezone} onChange={e => providerUpdate(i, "timezone", e.target.value)}>
                            <option value="">-- Select timezone --</option>
                            {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
                          </Select>
                        </Field>
                      </div>
                    </div>
                  </div>
                ))}
                <button
                  onClick={addProvider}
                  className="w-full py-2.5 border-[1.5px] border-dashed border-[#7EC8E3] rounded-lg text-[#0B9DD9] text-sm font-semibold
                    hover:bg-[#E5F5FC] hover:border-[#0B9DD9] transition-all mb-4 flex items-center justify-center gap-1.5"
                >
                  <Plus className="w-4 h-4" /> Add another provider
                </button>

                <Divider />
                <SectionLabel>Identity Verification</SectionLabel>
                <p className="text-xs text-[#4A6880] mb-3">Upload a valid photo ID or use your device camera to take a photo for identity verification.</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <RadioRow selected={idMethod === "upload"} onClick={() => setIdMethod("upload")}>
                    <Upload className="w-3.5 h-3.5 flex-shrink-0" /> Upload a Photo ID
                  </RadioRow>
                  <RadioRow selected={idMethod === "camera"} onClick={() => setIdMethod("camera")}>
                    <Camera className="w-3.5 h-3.5 flex-shrink-0" /> Take a Photo or Video
                  </RadioRow>
                </div>

                {idMethod === "upload" && (
                  <div
                    onClick={() => fileRef.current?.click()}
                    className="border-2 border-dashed border-[#7EC8E3] rounded-xl bg-[#E5F5FC] p-6 text-center cursor-pointer hover:border-[#0B9DD9] transition-colors"
                  >
                    <Upload className="w-8 h-8 text-[#4A6880] mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-[#0D1B2E] mb-1">Upload your Photo ID</h4>
                    <p className="text-xs text-[#4A6880] mb-3">Driver's license, passport, or state-issued photo ID<br />Formats: JPG, PNG, PDF — Max 10 MB</p>
                    <span className="inline-block px-4 py-1.5 bg-[#0B9DD9] text-white text-xs font-semibold rounded-lg">Browse File</span>
                    <input ref={fileRef} type="file" accept="image/*,.pdf" className="hidden"
                      onChange={e => { if (e.target.files?.[0]) setIdFileName(e.target.files[0].name); }} />
                  </div>
                )}
                {idMethod === "upload" && idFileName && (
                  <p className="text-xs text-[#0B9DD9] font-medium mt-2">Selected: {idFileName}</p>
                )}

                {idMethod === "camera" && (
                  <div className="border-2 border-dashed border-[#7EC8E3] rounded-xl bg-[#E5F5FC] p-6 text-center">
                    <Camera className="w-8 h-8 text-[#4A6880] mx-auto mb-2" />
                    <h4 className="text-sm font-semibold text-[#0D1B2E] mb-1">Camera Capture</h4>
                    <p className="text-xs text-[#4A6880] mb-3">Take a clear photo with your ID beside your face.<br />Your browser will request camera permission.</p>
                    <button
                      onClick={() => alert("In the live app, this opens your device camera for photo capture.")}
                      className="px-4 py-1.5 bg-[#0B9DD9] text-white text-xs font-semibold rounded-lg hover:bg-[#1AAFCA] transition-colors"
                    >
                      Allow Camera
                    </button>
                  </div>
                )}

                <div className="mt-3 bg-[#E5F5FC] border border-[#7EC8E3] rounded-lg px-3 py-2.5 text-xs text-[#4A6880]">
                  Your ID is used solely for identity verification. It is encrypted and stored securely in compliance with HIPAA privacy regulations and deleted after verification is complete.
                </div>
                <div className="h-4" />
              </div>

              <div className="bg-white border-t border-[#C8E0EF] px-7 py-3 flex items-center justify-between flex-shrink-0">
                <div>
                  <div className="text-xs text-[#4A6880] font-medium mb-1">Step 3 of 3 — Final Step</div>
                  <div className="w-36 h-0.5 bg-[#C8E0EF] rounded-full">
                    <div className="h-full bg-[#0B9DD9] rounded-full w-full" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="border-[#C8E0EF] text-[#4A6880]" onClick={() => setStep(2)}>← Back</Button>
                  <Button
                    className="bg-[#1E7B4A] hover:bg-[#238f56] text-white"
                    disabled={submitting}
                    onClick={handleSubmit}
                  >
                    {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</> : "Submit & Activate Trial ✓"}
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* ── SUCCESS ── */}
          {step === 4 && (
            <div className="flex-1 flex flex-col items-center justify-center text-center px-10 gap-4">
              <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring" }}>
                <div className="text-6xl mb-2">🎉</div>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold text-[#0B9DD9] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                  You're all set!
                </h2>
                <p className="text-[#4A6880] text-sm leading-relaxed max-w-md mx-auto mb-6">
                  Your MDCharts free trial account is being provisioned. You will receive an email with your login credentials and training course link within 30 minutes.
                  <br /><br />
                  A member of the MDCharts team will be in touch within 1–3 business days.
                </p>
                <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto text-left mb-8">
                  {[
                    ["Trial Duration", "60 days"],
                    ["Specialty", s1.specialty || "—"],
                    ["System URL", "mdchartsehr.com"],
                    ["Credit Card", "Not required"],
                  ].map(([label, val]) => (
                    <div key={label} className="bg-[#E5F5FC] border border-[#7EC8E3] rounded-xl px-4 py-3">
                      <div className="text-[10px] font-bold tracking-wider uppercase text-[#0B9DD9] mb-0.5">{label}</div>
                      <div className="text-sm font-semibold text-[#0D1B2E]">{val}</div>
                    </div>
                  ))}
                </div>
                <Link href="/">
                  <Button className="bg-[#0B9DD9] hover:bg-[#1AAFCA] text-white px-8">← Back to Home</Button>
                </Link>
              </motion.div>
            </div>
          )}

        </div>{/* end rp */}
      </div>{/* end outer */}
    </div>
  );
}
