import { FadeUp } from "@/components/animations/Reveal";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string | null;
  title: string | null;
  subtitle?: string | null;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <FadeUp className={cn(
      "max-w-2xl",
      align === "center" ? "mx-auto text-center" : "text-left",
      className
    )}>
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
      )}
      {title && (
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      )}
      {subtitle && (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground">{subtitle}</p>
      )}
    </FadeUp>
  );
}
