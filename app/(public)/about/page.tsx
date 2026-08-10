import type { Metadata } from "next";
import Image from "next/image";
import { Link2, GitBranch, Target, Eye, Heart } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { CTASection } from "@/components/shared/CTASection";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Stagger, StaggerItem, Reveal } from "@/components/animations/Reveal";
import { AnimatedCounter } from "@/components/animations/AnimatedCounter";
import {
  getTeamMembers,
  getSiteSettings,
  getStatistics,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return buildMetadata({
    title: "About Us",
    description: "Learn about our story, mission, values and the senior team behind our work.",
    siteSettings: settings,
    path: "/about",
  });
}

export default async function AboutPage() {
  const [team, settings, statistics] = await Promise.all([
    getTeamMembers(),
    getSiteSettings(),
    getStatistics(),
  ]);

  const values = [
    { icon: Heart, title: "Client-first", text: "Your goals drive every decision we make." },
    { icon: Target, title: "Outcome-focused", text: "We measure success by your results, not our output." },
    { icon: Eye, title: "Radical transparency", text: "Clear communication, honest timelines, real numbers." },
  ];

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="A technology partner built for ambitious businesses"
        description={settings?.description ?? "We design, build, and scale software products and growth systems for modern businesses."}
        breadcrumbs={[{ name: "About" }]}
      />

      {/* Company introduction */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <Reveal direction="right">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
                  alt="Nexus Digital team collaborating in the office"
                  width={1200}
                  height={800}
                  className="h-auto w-full object-cover"
                />
              </div>
            </Reveal>
            <div>
              <SectionHeading eyebrow="Our Story" title="Who we are" align="left" />
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                <p>
                  {settings?.company_name ?? "Nexus Digital"} started with a simple belief: businesses deserve software that actually works — software built by senior people, on modern technology, with real focus on outcomes.
                </p>
                <p>
                  Today we are a full-service agency of engineers, designers, and growth marketers. We ship ready-made products and custom solutions, and we stay with our clients long after launch to make sure the software performs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section className="border-y border-border/60 bg-card/40 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Stagger className="grid gap-6 lg:grid-cols-3">
            {values.map((v) => (
              <StaggerItem key={v.title}>
                <div className="h-full rounded-xl border border-border bg-card p-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <v.icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 font-semibold">{v.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Statistics */}
      {statistics.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Stagger className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
              {statistics.map((stat) => (
                <StaggerItem key={stat.label}>
                  <div className="text-4xl font-bold tracking-tight sm:text-5xl">
                    <AnimatedCounter value={stat.number} suffix={stat.suffix ?? "+"} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      {/* Team */}
      {team.length > 0 && (
        <section className="border-t border-border/60 bg-card/40 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <SectionHeading eyebrow="Team" title="The people behind the work" />
            <Stagger className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {team.map((member) => (
                <StaggerItem key={member.id}>
                  <div className="group overflow-hidden rounded-xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="relative aspect-square overflow-hidden bg-muted">
                      {member.photo ? (
                        <Image
                          src={member.photo}
                          alt={`${member.name} — ${member.designation}`}
                          fill
                          sizes="(max-width: 768px) 100vw, 25vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/15 to-transparent">
                          <span className="text-5xl font-bold text-primary/30">{member.name.charAt(0)}</span>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <h3 className="font-semibold">{member.name}</h3>
                      {member.designation && <p className="text-sm text-primary">{member.designation}</p>}
                      {member.bio && <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>}
                      {(member.linkedin || member.github) && (
                        <div className="mt-4 flex gap-2">
                          {member.linkedin && (
                            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                              <Link2 className="h-3.5 w-3.5" />
                            </a>
                          )}
                          {member.github && (
                            <a href={member.github} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on GitHub`} className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                              <GitBranch className="h-3.5 w-3.5" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </section>
      )}

      <CTASection
        title="Want to work with us?"
        subtitle="Tell us about your project and we'll get back to you within 24 hours."
        content={{
          primaryCta: { label: "Get in Touch", url: "/contact" },
          secondaryCta: { label: "View Our Services", url: "/services" },
        }}
      />
    </>
  );
}
