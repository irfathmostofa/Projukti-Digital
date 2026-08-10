"use client";

import { useState } from "react";
import { Loader2, CheckCircle2, AlertCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Service } from "@/types";

interface FormState {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
  consent: boolean;
}

const initialForm: FormState = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
  consent: false,
};

interface Errors {
  [key: string]: string | undefined;
}

const budgets = ["Under $1,000", "$1,000 – $5,000", "$5,000 – $15,000", "$15,000 – $50,000", "$50,000+"];

export function ContactForm({ services }: { services: Service[] }) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const set = (field: keyof FormState, value: string | boolean) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  };

  function validate(): boolean {
    const e: Errors = {};
    if (form.name.trim().length < 2) e.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Please enter a valid email address.";
    if (form.phone && !/^[+\d][\d\s\-()]{6,}$/.test(form.phone)) e.phone = "Please enter a valid phone number.";
    if (form.service) {
      const known = services.some((s) => s.name === form.service);
      if (!known && !["Other", "I'm not sure"].includes(form.service)) {
        e.service = "Please choose a service.";
      }
    }
    if (form.budget) {
      const known = budgets.includes(form.budget);
      if (!known) e.budget = "Please choose a budget range.";
    }
    if (form.message.trim().length < 10) e.message = "Please tell us a little more (at least 10 characters).";
    if (!form.consent) e.consent = "Please accept the privacy policy to continue.";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();
    if (!validate()) return;

    setStatus("submitting");
    setStatusMessage("");

    try {
      // 1. Save to Supabase
      const supabaseRes = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          company: form.company || null,
          service: form.service || null,
          budget: form.budget || null,
          message: form.message,
        }),
      });

      const saved = await supabaseRes.json();

      // 2. Send via EmailJS
      const emailRes = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone || null,
          company: form.company || null,
          service: form.service || null,
          budget: form.budget || null,
          message: form.message,
        }),
      });
      const emailResult = await emailRes.json();

      if (saved.ok || emailResult.ok) {
        setStatus("success");
        setStatusMessage(
          "Thank you! Your message has been sent. We'll get back to you within 24 hours."
        );
        setForm(initialForm);
      } else {
        setStatus("error");
        setStatusMessage(
          "We couldn't send your message right now. Please try again or email us directly."
        );
      }
    } catch {
      setStatus("error");
      setStatusMessage("Something went wrong. Please try again.");
    }
  }

  const errorClass = (field: keyof FormState) =>
    errors[field] ? "border-destructive" : "";

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {status === "success" && (
        <div className="flex items-start gap-3 rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}
      {status === "error" && (
        <div className="flex items-start gap-3 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="John Smith"
            aria-invalid={!!errors.name}
            className={errorClass("name")}
          />
          {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => set("email", e.target.value)}
            placeholder="john@company.com"
            aria-invalid={!!errors.email}
            className={errorClass("email")}
          />
          {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            type="tel"
            value={form.phone}
            onChange={(e) => set("phone", e.target.value)}
            placeholder="+1 (555) 000-0000"
            aria-invalid={!!errors.phone}
            className={errorClass("phone")}
          />
          {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            value={form.company}
            onChange={(e) => set("company", e.target.value)}
            placeholder="Your company"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="service">Service</Label>
          <Select value={form.service} onValueChange={(v) => set("service", v)}>
            <SelectTrigger id="service" className={errorClass("service")}>
              <SelectValue placeholder="Select a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((s) => (
                <SelectItem key={s.id} value={s.name}>{s.name}</SelectItem>
              ))}
              <SelectItem value="Other">Other</SelectItem>
              <SelectItem value="I'm not sure">I&apos;m not sure</SelectItem>
            </SelectContent>
          </Select>
          {errors.service && <p className="text-xs text-destructive">{errors.service}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">Budget</Label>
          <Select value={form.budget} onValueChange={(v) => set("budget", v)}>
            <SelectTrigger id="budget" className={errorClass("budget")}>
              <SelectValue placeholder="Select a budget range" />
            </SelectTrigger>
            <SelectContent>
              {budgets.map((b) => (
                <SelectItem key={b} value={b}>{b}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.budget && <p className="text-xs text-destructive">{errors.budget}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          rows={5}
          value={form.message}
          onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your project..."
          aria-invalid={!!errors.message}
          className={errorClass("message")}
        />
        {errors.message && <p className="text-xs text-destructive">{errors.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <Checkbox
          id="consent"
          checked={form.consent}
          onCheckedChange={(v) => set("consent", v === true)}
          aria-invalid={!!errors.consent}
        />
        <div>
          <Label htmlFor="consent" className="text-sm font-normal leading-relaxed text-muted-foreground">
            I agree to the <a href="/privacy-policy" className="text-primary underline">privacy policy</a> and consent to being contacted about my inquiry. *
          </Label>
          {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent}</p>}
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        disabled={status === "submitting"}
        className="w-full sm:w-auto"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending...
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Send Message
          </>
        )}
      </Button>
    </form>
  );
}
