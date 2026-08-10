"use client";

import { motion, useReducedMotion } from "motion/react";
import { MessageCircle, Phone, Mail, Send } from "lucide-react";
import type { SiteSettings } from "@/types";

export function FloatingContact({ settings }: { settings: SiteSettings | null }) {
  const reduce = useReducedMotion();
  const s = settings;
  if (!s) return null;

  const buttons = [
    { href: s.whatsapp ? `https://wa.me/${s.whatsapp.replace(/[^0-9]/g, "")}` : null, icon: MessageCircle, label: "Chat on WhatsApp", color: "bg-[#25D366]" },
    { href: s.phone ? `tel:${s.phone}` : null, icon: Phone, label: `Call ${s.phone}`, color: "bg-primary" },
    { href: s.email ? `mailto:${s.email}` : null, icon: Mail, label: `Email ${s.email}`, color: "bg-foreground" },
    { href: s.messenger || null, icon: Send, label: "Message on Messenger", color: "bg-[#0084FF]" },
  ].filter((b) => b.href);

  if (!buttons.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
      {buttons.map(({ href, icon: Icon, label, color }, i) => (
        <motion.a
          key={label}
          href={href!}
          aria-label={label}
          title={label}
          initial={reduce ? undefined : { opacity: 0, scale: 0.5, x: 20 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ delay: 0.4 + i * 0.1, type: "spring", stiffness: 260, damping: 20 }}
          whileHover={{ scale: 1.08 }}
          className="group relative flex items-center"
        >
          <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md border border-border bg-card px-2.5 py-1.5 text-xs font-medium opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
            {label}
          </span>
          <span className={`relative flex h-11 w-11 items-center justify-center rounded-full text-white shadow-lg ${color}`}>
            <span className="absolute inset-0 rounded-full opacity-60 animate-ping" style={{ backgroundColor: "inherit", animationDuration: "3s" }} aria-hidden="true" />
            <Icon className="relative h-5 w-5" />
          </span>
        </motion.a>
      ))}
    </div>
  );
}
