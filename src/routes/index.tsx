import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity,
  HeartPulse,
  HardHat,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Instagram,
  Music2,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import heroImg from "@/assets/hero.jpg";
import preventImg from "@/assets/prevent.jpg";
import oshImg from "@/assets/osh.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Qurevant Health Group | Integrated Solutions for Sustainable Wellbeing" },
      {
        name: "description",
        content:
          "Preventative care, rehabilitative care and occupational safety & health services for individuals, families and organisations in Nairobi, Mombasa and Lamu.",
      },
      {
        property: "og:title",
        content: "Qurevant Health Group | Integrated Solutions for Sustainable Wellbeing",
      },
      {
        property: "og:description",
        content:
          "Prevention, recovery and workplace safety from one expert-led health partner in Kenya.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const WHATSAPP = "https://wa.me/254719271664";

const services = [
  {
    id: "preventative",
    icon: Stethoscope,
    label: "A. Preventative Care",
    title: "Stay ahead of illness",
    blurb:
      "Prevention is better than cure. Our preventative services detect risk early and build healthier everyday habits.",
    image: preventImg,
    items: [
      "Comprehensive health risk assessments & screenings",
      "Wellness & lifestyle management programmes",
      "Chronic disease prevention and health education",
      "Corporate wellness programmes",
      "Health check packages",
    ],
  },
  {
    id: "rehabilitative",
    icon: Activity,
    label: "B. Rehabilitative Care",
    title: "Reclaim life",
    blurb:
      "Our rehabilitation team helps you recover strength, mobility and independence after illness, injury or surgery.",
    image: heroImg,
    items: [
      "Physiotherapy & physical rehabilitation",
      "Occupational therapy",
      "Post-surgical & post-stroke rehabilitation",
      "Sports injury rehabilitation",
      "Pain management and functional restoration",
    ],
  },
  {
    id: "osh",
    icon: HardHat,
    label: "C. Occupational Safety & Health",
    title: "Safe people, safe workplaces",
    blurb:
      "We help organisations create compliant, safe and productive environments that protect their most valuable asset — their people.",
    image: oshImg,
    items: [
      "Workplace risk assessments & safety audits",
      "OSH training & compliance (first aid, fire safety, OSHA)",
      "Employee medicals & fitness-to-work assessments",
      "Workplace health & safety policy development",
      "Incident investigation and safety culture programmes",
    ],
  },
];

const values = [
  {
    icon: HeartPulse,
    title: "Truly integrated",
    body: "One partner for prevention, recovery and workplace safety — no fragmented care.",
  },
  {
    icon: ShieldCheck,
    title: "Expert-led",
    body: "Qualified medical professionals, therapists and certified OSHA practitioners.",
  },
  {
    icon: Users,
    title: "Client-centered",
    body: "Solutions tailored for individuals, families and corporate organisations in Kenya and beyond.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <HeartPulse className="h-4 w-4" />
            </span>
            <span className="font-display text-lg tracking-tight">Qurevant</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a className="transition-colors hover:text-foreground" href="#about">
              About
            </a>
            <a className="transition-colors hover:text-foreground" href="#services">
              Services
            </a>
            <a className="transition-colors hover:text-foreground" href="#why">
              Why us
            </a>
            <a className="transition-colors hover:text-foreground" href="#contact">
              Contact
            </a>
          </nav>
          <Button asChild size="sm" className="rounded-full">
            <a href={WHATSAPP} target="_blank" rel="noreferrer">
              Talk to us
            </a>
          </Button>
        </div>
      </header>

      <main id="top">
        {/* Hero */}
        <section className="surface-mist">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:py-24 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div>
              <p className="eyebrow text-primary">Preventative · Rehabilitative · OSH</p>
              <h1 className="mt-5 text-4xl leading-[1.05] sm:text-5xl lg:text-6xl">
                Integrated solutions for sustainable wellbeing
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
                At Qurevant Health Group we go beyond treatment. We keep you healthy, restore you
                when you need it, and keep your workplace safe.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="hero" size="xl">
                  <a href={WHATSAPP} target="_blank" rel="noreferrer">
                    Book a consultation
                  </a>
                </Button>
                <Button asChild variant="outline" size="xl">
                  <a href="#services">Explore our services</a>
                </Button>
              </div>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
                {[
                  ["3", "Care pillars"],
                  ["3", "Locations in Kenya"],
                  ["All", "Ages & workplaces"],
                ].map(([k, v]) => (
                  <div key={v}>
                    <dt className="font-display text-2xl text-primary">{k}</dt>
                    <dd className="mt-1 text-xs text-muted-foreground">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="relative">
              <img
                src={heroImg}
                alt="Physiotherapist supporting a patient walking during rehabilitation"
                width={1600}
                height={1104}
                className="aspect-[4/3] w-full rounded-3xl object-cover shadow-lift"
              />
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="mx-auto max-w-6xl px-5 py-20">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="eyebrow text-primary">About us</p>
              <h2 className="mt-4 text-3xl sm:text-4xl">
                Care across the full span of a person's health
              </h2>
            </div>
            <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">
              <p>
                Qurevant Health Group is a healthcare organisation built around the full span of a
                person's health — from staying well to recovering, living with illness, and working
                safely.
              </p>
              <p>
                We deliver preventative care that catches problems early, rehabilitative care that
                helps people regain function and independence, and occupational safety and health
                services that protect people where they work. Across all three, our approach is the
                same: care that is proactive, compassionate, and centred on the person.
              </p>
            </div>
          </div>
        </section>

        {/* Services */}
        <section id="services" className="surface-mist py-20">
          <div className="mx-auto max-w-6xl px-5">
            <p className="eyebrow text-primary">Our core services</p>
            <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">Our integrated solutions</h2>

            <div className="mt-14 space-y-14">
              {services.map((s, i) => (
                <article
                  key={s.id}
                  className="grid items-center gap-8 rounded-3xl bg-card p-6 shadow-soft md:grid-cols-2 md:p-8"
                >
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className={`aspect-[5/4] w-full rounded-2xl object-cover ${
                      i % 2 === 1 ? "md:order-2" : ""
                    }`}
                  />
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                        <s.icon className="h-5 w-5" />
                      </span>
                      <span className="eyebrow text-muted-foreground">{s.label}</span>
                    </div>
                    <h3 className="mt-4 text-2xl sm:text-3xl">{s.title}</h3>
                    <p className="mt-3 leading-relaxed text-muted-foreground">{s.blurb}</p>
                    <ul className="mt-6 space-y-3">
                      {s.items.map((item) => (
                        <li key={item} className="flex gap-3 text-sm">
                          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Why us */}
        <section id="why" className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow text-primary">Why choose us</p>
          <h2 className="mt-4 max-w-2xl text-3xl sm:text-4xl">
            One partner for prevention, recovery and workplace safety
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border border-border bg-card p-7">
                <v.icon className="h-6 w-6 text-primary" />
                <h3 className="mt-5 text-xl">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="mx-auto max-w-6xl px-5 pb-20">
          <div className="surface-deep rounded-3xl px-6 py-14 sm:px-12">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="text-3xl sm:text-4xl">Let's build a healthier, safer future</h2>
                <p className="mt-4 max-w-md leading-relaxed opacity-80">
                  Whether you are an individual, a family or an organisation, our team is ready to
                  design the right programme with you.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button asChild variant="hero" size="xl">
                    <a href={WHATSAPP} target="_blank" rel="noreferrer">
                      WhatsApp 0719 271 664
                    </a>
                  </Button>
                  <Button asChild variant="onDeep" size="xl">
                    <a href="mailto:qurevanthealthgroup@gmail.com">Email us</a>
                  </Button>
                </div>
              </div>
              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <MessageCircle className="h-4 w-4 shrink-0 opacity-70" />
                  <a className="hover:underline" href={WHATSAPP} target="_blank" rel="noreferrer">
                    WhatsApp: 0719271664
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 opacity-70" />
                  <a className="hover:underline" href="mailto:qurevanthealthgroup@gmail.com">
                    qurevanthealthgroup@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 opacity-70" />
                  <span>Nairobi · Mombasa · Lamu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 shrink-0 opacity-70" />
                  <span>Instagram: Qurevant Health Group</span>
                </li>
                <li className="flex items-center gap-3">
                  <Music2 className="h-4 w-4 shrink-0 opacity-70" />
                  <span>TikTok: Qurevant Health Group</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>
            <span className="font-display text-foreground">Qurevant Health Group</span> — Integrated
            Solutions for Sustainable Wellbeing.
          </p>
          <p>Preventative Care · Rehabilitative Care · Occupational Safety & Health</p>
        </div>
      </footer>
    </div>
  );
}
