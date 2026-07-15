import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { Turnstile } from "@marsidev/react-turnstile";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  requestType: "demo" | "contact" | "trial" | "rcm_audit";
  title: string;
}

export function ContactModal({ isOpen, onClose, requestType, title }: ContactModalProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, requestType, turnstileToken }),
      });
      if (!response.ok) throw new Error("Failed to submit request");
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Request Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
      onClose();
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) {
      toast({ title: "Please complete the CAPTCHA", variant: "destructive" });
      return;
    }
    contactMutation.mutate(formData);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 1, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg bg-white rounded-2xl shadow-2xl z-50 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
              <button
                onClick={onClose}
                className="h-8 w-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
                data-testid="button-close-modal"
              >
                <X className="h-4 w-4 text-slate-600" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Dr. John Smith"
                  data-testid="input-name"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="john@clinic.com"
                  data-testid="input-email"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                  data-testid="input-phone"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Practice/Company
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Smith Family Practice"
                  data-testid="input-company"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Tell us about your practice and specific needs..."
                  data-testid="input-message"
                />
              </div>

              <Turnstile
                siteKey="0x4AAAAAAD2mqLoPVJ2zPWjK"
                onSuccess={(token) => setTurnstileToken(token)}
                onExpire={() => setTurnstileToken(null)}
                options={{ theme: "light" }}
              />

              <Button
                type="submit"
                className="w-full h-12 text-base font-bold"
                disabled={contactMutation.isPending || !turnstileToken}
                data-testid="button-submit"
              >
                {contactMutation.isPending ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </>
                )}
              </Button>
            </form>

            <p className="text-xs text-slate-500 text-center mt-4">
              By submitting, you agree to our Privacy Policy and Terms of Service.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
