"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { NavigationItem, Product, Service, SiteSettings } from "@/types";

interface NavbarProps {
  settings: SiteSettings | null;
  navigation: NavigationItem[];
  products: Product[];
  services: Service[];
}

export function Navbar({ settings, navigation, products, services }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [mega, setMega] = useState<string | null>(null);
  const pathname = usePathname();
  const reduce = useReducedMotion();

  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
    setMega(null);
  }

  const company = settings?.company_name ?? "Nexus Digital";
  const nav = navigation.length ? navigation : [
    { id: "1", label: "Home", url: "/", parent_id: null, sort_order: 1, is_active: true, created_at: "", updated_at: "" },
    { id: "2", label: "Products", url: "/products", parent_id: null, sort_order: 2, is_active: true, created_at: "", updated_at: "" },
    { id: "3", label: "Services", url: "/services", parent_id: null, sort_order: 3, is_active: true, created_at: "", updated_at: "" },
    { id: "4", label: "About", url: "/about", parent_id: null, sort_order: 4, is_active: true, created_at: "", updated_at: "" },
    { id: "5", label: "Testimonials", url: "/testimonials", parent_id: null, sort_order: 5, is_active: true, created_at: "", updated_at: "" },
    { id: "6", label: "Contact", url: "/contact", parent_id: null, sort_order: 6, is_active: true, created_at: "", updated_at: "" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hasProducts = products.length > 0;
  const hasServices = services.length > 0;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border/60 shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        aria-label="Main navigation"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
      >
        <Link href="/" className="flex items-center gap-2" aria-label={`${company} home`}>
          {settings?.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={settings.logo} alt={company} className="h-8 w-auto" />
          ) : (
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
              {company.charAt(0)}
            </span>
          )}
          <span className="text-lg font-semibold tracking-tight">{company}</span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => {
            const isProducts = item.url === "/products" && hasProducts;
            const isServices = item.url === "/services" && hasServices;
            const isActive = pathname === item.url || (item.url !== "/" && pathname.startsWith(item.url));

            return (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onMouseEnter={() => setMega(isProducts || isServices ? item.url : null)}
                  onMouseLeave={() => setMega(null)}
                  className={cn(
                    "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-primary",
                    isActive ? "text-primary" : "text-foreground/80"
                  )}
                >
                  {item.label}
                  {(isProducts || isServices) && <ChevronDown className="h-3.5 w-3.5 opacity-60" />}
                </Link>

                {/* Mega menu */}
                <AnimatePresence>
                  {mega === item.url && (isProducts || isServices) && (
                    <motion.div
                      initial={reduce ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: 8 }}
                      transition={{ duration: 0.2 }}
                      onMouseEnter={() => setMega(item.url)}
                      onMouseLeave={() => setMega(null)}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-72 rounded-xl border border-border bg-card p-2 shadow-xl">
                        <p className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                          {isProducts ? "Products" : "Services"}
                        </p>
                        {(isProducts ? products : services)
                          .slice(0, 6)
                          .map((item) => (
                            <Link
                              key={item.id}
                              href={`${isProducts ? "/products" : "/services"}/${item.slug}`}
                              onClick={() => setMega(null)}
                              className="flex items-start gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-accent"
                            >
                              <span className="mt-0.5 text-primary">
                                {"icon" in item && item.icon ? null : <ArrowRight className="h-3.5 w-3.5" />}
                              </span>
                              <span>
                                <span className="font-medium">{item.name}</span>
                              </span>
                            </Link>
                          ))}
                        <Link
                          href={item.url}
                          onClick={() => setMega(null)}
                          className="mt-1 flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-primary hover:bg-accent"
                        >
                          View all <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>

        <div className="hidden lg:block">
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-all hover:bg-primary/90"
          >
            Let&apos;s Talk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduce ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b border-border/60 bg-background lg:hidden"
          >
            <ul className="space-y-1 px-4 py-4">
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.url}
                    className="block rounded-lg px-3 py-2.5 text-base font-medium text-foreground/90 hover:bg-accent hover:text-primary"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="mt-2 flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                >
                  Let&apos;s Talk <ArrowRight className="h-4 w-4" />
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
