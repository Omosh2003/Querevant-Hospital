import { createFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import {
  Activity,
  HeartPulse,
  HardHat,
  Info,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Instagram,
  Music2,
  ShieldCheck,
  Sparkles,
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
import { getHealthGuidance } from "@/lib/guidance.functions";
import heroImg from "@/assets/hero.jpg";
import preventImg from "@/assets/prevent.jpg";
import oshImg from "@/assets/osh.jpg";
import logo from "@/assets/logo.png";
import logoWhite from "@/assets/logo-white.png";

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

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#guidance", label: "Health guidance" },
  { href: "#why", label: "Why us" },
  { href: "#contact", label: "Contact" },
];

function GuidanceSection() {
  const askQurevant = useServerFn(getHealthGuidance);
  const [question, setQuestion] = useState("");
  const [error, setError] = useState<string | null>(null);

  const mutation = useMutation({
    mutationFn: async (q: string) => {
      const result = await askQurevant({ data: { question: q } });
      return result.guidance;
    },
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = question.trim();
    if (trimmed.length < 5) {
      setError("Please write at least a few words so we can help.");
      return;
    }
    if (trimmed.length > 1500) {
      setError("Please keep your question under 1500 characters.");
      return;
    }
    setError(null);
    mutation.mutate(trimmed);
  };

  return (
    <section id="guidance" className="surface-mist py-20" aria-labelledby="guidance-heading">
      <div className="mx-auto max-w-3xl px-5">
        <div className="text-center">
          <p className="eyebrow text-primary">Not sure where to start?</p>
          <h2 id="guidance-heading" className="mt-4 text-3xl sm:text-4xl">
            Ask us a health question
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-muted-foreground">
            Tell us what's on your mind and we'll point you towards the Qurevant services that fit
            your situation.
          </p>
        </div>

        <form onSubmit={submit} className="mt-10 rounded-3xl bg-card p-6 shadow-soft sm:p-8" noValidate>
          <label htmlFor="health-question" className="block text-sm font-medium">
            Your question
          </label>
          <textarea
            id="health-question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={4}
            maxLength={1500}
            placeholder="For example: my father is recovering from a stroke — what support do you offer at home?"
            aria-describedby="guidance-disclaimer guidance-error"
            className="mt-2 w-full rounded-2xl border border-input bg-background px-4 py-3 text-base leading-relaxed placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
          {error ? (
            <p id="guidance-error" role="alert" className="mt-2 text-sm text-destructive">
              {error}
            </p>
          ) : null}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">{question.length}/1500 characters</p>
            <Button type="submit" variant="hero" size="lg" disabled={mutation.isPending}>
              {mutation.isPending ? "Thinking…" : "Get guidance"}
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>

          {mutation.isError ? (
            <p role="alert" className="mt-4 rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
              Something went wrong on our side. Please try again, or send your question straight to
              us on WhatsApp 0719 271 664.
            </p>
          ) : null}

          {mutation.data ? (
            <div
              role="status"
              aria-live="polite"
              className="mt-6 rounded-2xl border border-border bg-secondary/50 p-5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wide text-primary">
                What we'd suggest
              </h3>
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-foreground">
                {mutation.data}
              </p>
            </div>
          ) : null}
        </form>

        <aside
          id="guidance-disclaimer"
          aria-label="Privacy and medical disclaimer"
          className="mt-6 rounded-2xl border border-border bg-sand/60 p-5 sm:p-6"
        >
          <div className="flex gap-3">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div className="space-y-2 text-sm leading-relaxed text-foreground/90">
              <p className="font-semibold text-foreground">Privacy &amp; medical disclaimer</p>
              <p>
                This is general health information, not a diagnosis. Answers are produced
                automatically and are not medical advice — they cannot replace a consultation with
                a qualified healthcare professional. Always seek personal advice before making
                decisions about your care.
              </p>
              <p>
                Your question is sent only to generate this response. We do not save, store or
                share it, and nothing is linked to your identity. For anything urgent, contact a
                hospital or emergency services immediately.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-primary focus:px-5 focus:py-2.5 focus:text-sm focus:font-medium focus:text-primary-foreground focus:shadow-lift"
      >
        Skip to main content
      </a>
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <a href="#top" className="flex items-center" aria-label="Qurevant Health Group — back to top">
            <img
              src={logo}
              alt=""
              width={1504}
              height={411}
              className="h-10 w-auto"
            />
          </a>
          <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="rounded-sm transition-colors hover:text-foreground"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="rounded-full">
              <a href={WHATSAPP} target="_blank" rel="noreferrer" aria-label="Talk to us on WhatsApp (opens in a new tab)">
                Talk to us
              </a>
            </Button>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="min-h-11 min-w-11 md:hidden"
                  aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                  aria-expanded={menuOpen}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72" aria-label="Site navigation">
                <SheetHeader>
                  <SheetTitle className="text-left">
                    <img
                      src={logo}
                      alt="Qurevant Health Group"
                      width={1504}
                      height={411}
                      className="h-12 w-auto"
                    />
                  </SheetTitle>
                  <SheetDescription className="sr-only">
                    Main navigation for the Qurevant Health Group website
                  </SheetDescription>
                </SheetHeader>
                <nav aria-label="Mobile" className="mt-6 flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="rounded-lg px-3 py-3 text-base text-foreground transition-colors hover:bg-secondary"
                    >
                      {link.label}
                    </a>
                  ))}
                  <a
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Talk to us on WhatsApp (opens in a new tab)"
                    className="mt-3 rounded-full bg-primary px-5 py-3 text-center text-sm font-medium text-primary-foreground"
                  >
                    Talk to us on WhatsApp
                  </a>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main id="main-content" tabIndex={-1}>
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
                <img
                  src={logoWhite}
                  alt="Qurevant Health Group — Integrated Health Solutions For Sustainable Wellbeing"
                  width={1504}
                  height={411}
                  className="h-14 w-auto"
                />
                <h2 className="mt-6 text-3xl sm:text-4xl">Let's build a healthier, safer future</h2>
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
                  <MessageCircle className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                  <a
                    className="hover:underline"
                    href={WHATSAPP}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Chat on WhatsApp: 0719 271 664 (opens in a new tab)"
                  >
                    WhatsApp: 0719271664
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                  <a className="hover:underline" href="mailto:qurevanthealthgroup@gmail.com">
                    qurevanthealthgroup@gmail.com
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                  <span>Nairobi · Mombasa · Lamu</span>
                </li>
                <li className="flex items-center gap-3">
                  <Instagram className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                  <span>Instagram: Qurevant Health Group</span>
                </li>
                <li className="flex items-center gap-3">
                  <Music2 className="h-4 w-4 shrink-0 opacity-70" aria-hidden="true" />
                  <span>TikTok: Qurevant Health Group</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Qurevant Health Group"
              width={1504}
              height={411}
              className="h-11 w-auto"
            />
          </div>
          <div className="sm:text-right">
            <p className="font-medium text-foreground">
              Integrated Solutions for Sustainable Wellbeing.
            </p>
            <p className="mt-1">Preventative Care · Rehabilitative Care · Occupational Safety & Health</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
