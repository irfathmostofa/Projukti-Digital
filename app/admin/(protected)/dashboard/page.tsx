import Link from "next/link";
import {
  Package,
  Briefcase,
  HelpCircle,
  Quote,
  Users,
  Inbox,
  Image,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { getCounts } from "@/lib/admin/data";
import { requireAdmin } from "@/lib/admin/session";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  await requireAdmin();
  const data = await getCounts();

  const stats = data
    ? [
        {
          label: "Products",
          value: data.counts.products ?? 0,
          href: "/admin/products",
          icon: Package,
          color: "from-blue-500 to-blue-600",
          bgColor: "bg-blue-50 dark:bg-blue-950/30",
          iconColor: "text-blue-600 dark:text-blue-400",
        },
        {
          label: "Services",
          value: data.counts.services ?? 0,
          href: "/admin/services",
          icon: Briefcase,
          color: "from-purple-500 to-purple-600",
          bgColor: "bg-purple-50 dark:bg-purple-950/30",
          iconColor: "text-purple-600 dark:text-purple-400",
        },
        {
          label: "FAQs",
          value: data.counts.faqs ?? 0,
          href: "/admin/faqs",
          icon: HelpCircle,
          color: "from-emerald-500 to-emerald-600",
          bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
          iconColor: "text-emerald-600 dark:text-emerald-400",
        },
        {
          label: "Testimonials",
          value: data.counts.testimonials ?? 0,
          href: "/admin/testimonials",
          icon: Quote,
          color: "from-amber-500 to-amber-600",
          bgColor: "bg-amber-50 dark:bg-amber-950/30",
          iconColor: "text-amber-600 dark:text-amber-400",
        },
        {
          label: "Team",
          value: data.counts.team_members ?? 0,
          href: "/admin/team",
          icon: Users,
          color: "from-rose-500 to-rose-600",
          bgColor: "bg-rose-50 dark:bg-rose-950/30",
          iconColor: "text-rose-600 dark:text-rose-400",
        },
        {
          label: "Leads",
          value: data.counts.contact_submissions ?? 0,
          href: "/admin/leads",
          icon: Inbox,
          color: "from-orange-500 to-orange-600",
          bgColor: "bg-orange-50 dark:bg-orange-950/30",
          iconColor: "text-orange-600 dark:text-orange-400",
        },
        {
          label: "Media",
          value: data.counts.media_assets ?? 0,
          href: "/admin/media",
          icon: Image,
          color: "from-indigo-500 to-indigo-600",
          bgColor: "bg-indigo-50 dark:bg-indigo-950/30",
          iconColor: "text-indigo-600 dark:text-indigo-400",
        },
      ]
    : [];

  const totalItems = stats.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Overview of your site's content
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-primary/5 px-4 py-1.5 text-sm">
            <span className="font-semibold text-primary">{totalItems}</span>
            <span className="text-muted-foreground ml-1">total items</span>
          </div>
        </div>
      </div>

      {!data ? (
        <div className="rounded-xl border border-dashed p-12 text-center">
          <div className="mx-auto max-w-sm">
            <div className="mb-4 rounded-full bg-muted/30 p-4 w-16 h-16 mx-auto flex items-center justify-center">
              <Package className="h-8 w-8 text-muted-foreground/50" />
            </div>
            <h3 className="font-semibold">Supabase not configured</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your Supabase environment variables to start managing content.
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {stats.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className="group relative overflow-hidden rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5"
              >
                {/* Gradient accent line */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r ${s.color} opacity-0 transition-opacity group-hover:opacity-100`}
                />

                <div className="flex flex-col items-center text-center">
                  <div
                    className={`mb-3 rounded-xl ${s.bgColor} p-2.5 transition-transform group-hover:scale-105`}
                  >
                    <s.icon className={`h-5 w-5 ${s.iconColor}`} />
                  </div>
                  <p className="text-2xl font-bold tracking-tight">{s.value}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {s.label}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Latest Leads - Takes 2/3 on large screens */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card overflow-hidden">
              <div className="flex items-center justify-between border-b border-border px-6 py-4">
                <div>
                  <h2 className="font-semibold">Latest Leads</h2>
                  <p className="text-xs text-muted-foreground">
                    Recent contact form submissions
                  </p>
                </div>
                <Link
                  href="/admin/leads"
                  className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  View all
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>

              {data.latestLeads.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <div className="mx-auto mb-4 rounded-full bg-muted/30 p-4 w-14 h-14 flex items-center justify-center">
                    <Inbox className="h-6 w-6 text-muted-foreground/40" />
                  </div>
                  <p className="font-medium text-sm">No leads yet</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    They'll appear when someone submits the contact form.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-border">
                  {data.latestLeads.slice(0, 6).map((lead) => (
                    <li
                      key={lead.id}
                      className="flex items-center justify-between px-6 py-3.5 hover:bg-muted/20 transition-colors"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm truncate">
                          {lead.name}
                        </p>
                        <p className="text-xs text-muted-foreground truncate">
                          {lead.email}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-4 ml-4">
                        <span className="hidden sm:block text-xs text-muted-foreground whitespace-nowrap">
                          {formatDate(lead.created_at)}
                        </span>
                        <span
                          className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium capitalize ${
                            lead.status === "new"
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                              : lead.status === "contacted"
                                ? "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300"
                                : "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300"
                          }`}
                        >
                          <span
                            className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${
                              lead.status === "new"
                                ? "bg-blue-500"
                                : lead.status === "contacted"
                                  ? "bg-amber-500"
                                  : "bg-emerald-500"
                            }`}
                          />
                          {lead.status}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick Actions - Takes 1/3 on large screens */}
            <div className="rounded-xl border border-border bg-card overflow-hidden">
              <div className="border-b border-border px-6 py-4">
                <h2 className="font-semibold">Quick Actions</h2>
                <p className="text-xs text-muted-foreground">
                  Common admin tasks
                </p>
              </div>
              <div className="divide-y divide-border">
                <Link
                  href="/admin/products/new"
                  className="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/20 group"
                >
                  <div className="rounded-lg bg-blue-50 p-2 dark:bg-blue-950/30 group-hover:scale-105 transition-transform">
                    <Package className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">Add Product</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/admin/services/new"
                  className="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/20 group"
                >
                  <div className="rounded-lg bg-purple-50 p-2 dark:bg-purple-950/30 group-hover:scale-105 transition-transform">
                    <Briefcase className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                  </div>
                  <span className="text-sm font-medium">Add Service</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/admin/team/new"
                  className="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/20 group"
                >
                  <div className="rounded-lg bg-rose-50 p-2 dark:bg-rose-950/30 group-hover:scale-105 transition-transform">
                    <Users className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                  </div>
                  <span className="text-sm font-medium">Add Team Member</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
                <Link
                  href="/admin/faqs/new"
                  className="flex items-center gap-3 px-6 py-3.5 transition-colors hover:bg-muted/20 group"
                >
                  <div className="rounded-lg bg-emerald-50 p-2 dark:bg-emerald-950/30 group-hover:scale-105 transition-transform">
                    <HelpCircle className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <span className="text-sm font-medium">Add FAQ</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-auto text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
