import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getBaseUrl } from "@/lib/utils";

interface BreadcrumbProps {
  items: { name: string; url?: string }[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  const baseUrl = getBaseUrl();

  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
        <li>
          <Link href="/" className="transition-colors hover:text-primary">Home</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            {item.url && i < items.length - 1 ? (
              <Link href={item.url} className="transition-colors hover:text-primary">{item.name}</Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">{item.name}</span>
            )}
          </li>
        ))}
      </ol>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: baseUrl },
              ...items.map((item, i) => ({
                "@type": "ListItem",
                position: i + 2,
                name: item.name,
                item: item.url ? (item.url.startsWith("http") ? item.url : `${baseUrl}${item.url}`) : undefined,
              })),
            ],
          }),
        }}
      />
    </nav>
  );
}
