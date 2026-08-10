import { Breadcrumb } from "@/components/shared/Breadcrumb";

interface PageHeroProps {
  eyebrow?: string | null;
  title: string;
  description?: string | null;
  breadcrumbs?: { name: string; url?: string }[];
  children?: React.ReactNode;
}

export function PageHero({ eyebrow, title, description, breadcrumbs, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20">
      <div className="absolute inset-0 bg-grid opacity-50" aria-hidden="true" />
      <div className="absolute -top-32 right-0 h-80 w-80 rounded-full bg-primary/15 blur-[120px]" aria-hidden="true" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} />
          </div>
        )}
        {eyebrow && (
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
        )}
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
        {description && (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </section>
  );
}
