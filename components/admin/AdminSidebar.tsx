"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Briefcase,
  HelpCircle,
  Quote,
  Users,
  Inbox,
  Image,
  Settings,
  SearchCheck,
  Menu,
  X,
  LogOut,
  ExternalLink,
  ListOrdered,
  LayoutTemplate,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

const nav = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/services", label: "Services", icon: Briefcase },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/team", label: "Team", icon: Users },
  { href: "/admin/pages", label: "Pages", icon: LayoutTemplate },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/media", label: "Media", icon: Image },
  { href: "/admin/navigation", label: "Navigation", icon: ListOrdered },
  { href: "/admin/seo", label: "SEO", icon: SearchCheck },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setIsCollapsed(false);
        setOpen(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const toggleSidebar = () => {
    if (!isMobile) {
      setIsCollapsed(!isCollapsed);
    }
  };

  const SidebarContent = ({ collapsed = false }) => (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div
        className={cn(
          "flex items-center border-b border-border px-4 py-4 shrink-0",
          collapsed ? "justify-center" : "justify-between",
        )}
      >
        <Link
          href="/admin/dashboard"
          className={cn(
            "flex items-center gap-2",
            collapsed && "justify-center",
          )}
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            N
          </span>
          {!collapsed && (
            <span className="font-semibold whitespace-nowrap">Admin Panel</span>
          )}
        </Link>

        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden shrink-0"
            onClick={() => setOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {/* Navigation - Scrollable */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1 min-h-0">
        {nav.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200",
                "hover:bg-accent hover:text-foreground",
                active ? "bg-primary/10 text-primary" : "text-muted-foreground",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className="h-4 w-4 shrink-0" />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer Actions - Fixed at bottom */}
      <div
        className={cn(
          "space-y-1 border-t border-border p-3 shrink-0",
          collapsed && "flex flex-col items-center",
        )}
      >
        <Link
          href="/"
          target="_blank"
          className={cn(
            "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "View Site" : undefined}
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          {!collapsed && "View Site"}
        </Link>
        <button
          onClick={signOut}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground",
            collapsed && "justify-center px-2",
          )}
          title={collapsed ? "Sign Out" : undefined}
        >
          <LogOut className="h-4 w-4 shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-background px-3 py-3 lg:hidden">
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            N
          </span>
          <span className="truncate">Admin Panel</span>
        </Link>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen(true)}
            className="shrink-0"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed inset-y-0 left-0 w-[280px] max-w-[85vw] border-r border-border bg-background shadow-xl animate-in slide-in-from-left">
            <SidebarContent collapsed={false} />
          </aside>
        </div>
      )}

      {/* Desktop Sidebar - Full height */}
      <aside
        className={cn(
          "hidden lg:flex lg:flex-col lg:h-screen lg:sticky lg:top-0 shrink-0 border-r border-border bg-background transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[64px]" : "w-64",
        )}
      >
        <div className="relative h-full">
          <SidebarContent collapsed={isCollapsed} />

          {/* Toggle Button */}
          <Button
            variant="outline"
            size="icon"
            className="absolute -right-3 top-20 hidden h-6 w-6 rounded-full border shadow-md lg:flex"
            onClick={toggleSidebar}
          >
            {isCollapsed ? (
              <ChevronRight className="h-3 w-3" />
            ) : (
              <ChevronLeft className="h-3 w-3" />
            )}
          </Button>
        </div>
      </aside>
    </>
  );
}
