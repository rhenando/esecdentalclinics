#!/usr/bin/env bash
# tools/scaffold-esec.sh
# Run from project root (where package.json is)
#
# chmod +x tools/scaffold-esec.sh
# FORCE=1 ./tools/scaffold-esec.sh

set -euo pipefail

FORCE="${FORCE:-0}"
TS="$(date +%Y%m%d-%H%M%S)"

say()  { printf "\n\033[1;36m%s\033[0m\n" "$*"; }
warn() { printf "\033[1;33m%s\033[0m\n" "$*"; }
ok()   { printf "\033[1;32m%s\033[0m\n" "$*"; }

ensure_dir() { mkdir -p "$1"; }

backup_if_exists() {
  local path="$1"
  if [[ -f "$path" ]]; then
    cp "$path" "$path.bak-$TS"
  fi
}

write_file() {
  local path="$1"
  ensure_dir "$(dirname "$path")"

  if [[ -f "$path" && "$FORCE" != "1" ]]; then
    warn "SKIP (exists): $path  (set FORCE=1 to overwrite)"
    # still consume stdin so the heredoc doesn't spill into the terminal
    cat >/dev/null
    return 0
  fi

  if [[ -f "$path" ]]; then
    backup_if_exists "$path"
  fi

  cat > "$path"
  ok "WROTE: $path"
}

say "Scaffolding ESEC Dental starter (Next.js + Tailwind + shadcn/ui)..."

# Avoid route conflict: app/page.tsx and app/(marketing)/page.tsx both map to "/"
if [[ -f "app/page.tsx" ]]; then
  warn "Route conflict detected: app/page.tsx exists."
  warn "Backing up + moving app/page.tsx -> app/page.default.bak-$TS.tsx"
  cp "app/page.tsx" "app/page.tsx.bak-$TS"
  mv "app/page.tsx" "app/page.default.bak-$TS.tsx"
fi

# Folders
ensure_dir "app/(marketing)"
ensure_dir "app/api/contact"
ensure_dir "components/layout"
ensure_dir "components/sections"
ensure_dir "components/providers"
ensure_dir "lib"
ensure_dir "public/images"

# lib/site.ts
write_file "lib/site.ts" <<'EOF'
export const SITE = {
  name: "ESEC Dental Clinics",
  tagline: "Gentle, modern dental care you can trust.",
  phoneDisplay: "09XX XXX XXXX",
  phoneTel: "tel:+639XXXXXXXXX",
  email: "hello@esecdentalclinics.com",
  addressLine1: "Your Clinic Address Line 1",
  addressLine2: "City, Province, Philippines",
  hours: [
    { label: "Mon–Sat", value: "9:00 AM – 6:00 PM" },
    { label: "Sunday", value: "Closed" },
  ],
  social: {
    facebook: "https://facebook.com/",
  },
  mapEmbedUrl: "", // Optional: paste Google Maps embed URL here
} as const;

export const SERVICES: Array<{ title: string; description: string }> = [
  {
    title: "Dental Cleaning & Check-up",
    description: "Keep your smile healthy with routine care and early detection.",
  },
  {
    title: "Tooth Filling",
    description: "Restore damaged teeth with safe, natural-looking fillings.",
  },
  {
    title: "Tooth Extraction",
    description: "Gentle tooth removal with aftercare guidance for fast recovery.",
  },
  {
    title: "Root Canal Treatment",
    description: "Save infected teeth and relieve pain with proper endodontic care.",
  },
  {
    title: "Braces / Orthodontics",
    description: "Straighten teeth and improve bite with a guided treatment plan.",
  },
  {
    title: "Teeth Whitening",
    description: "Brighten your smile safely with professional whitening options.",
  },
  {
    title: "Crowns / Bridges / Dentures",
    description: "Replace or restore teeth for comfort, function, and confidence.",
  },
  {
    title: "Pediatric Dentistry",
    description: "Friendly dental care for kids with a gentle, patient-first approach.",
  },
];
EOF

# components/providers/toaster.tsx (uses existing components/ui/sonner.tsx in your project)
write_file "components/providers/toaster.tsx" <<'EOF'
"use client";

import { Toaster } from "@/components/ui/sonner";

export function AppToaster() {
  return <Toaster richColors closeButton position="top-right" />;
}
EOF

# components/layout/site-header.tsx
write_file "components/layout/site-header.tsx" <<'EOF'
import Link from "next/link";
import { Phone, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="#" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl border bg-card text-sm font-semibold">
            ED
          </div>
          <div className="leading-tight">
            <p className="text-sm font-semibold">{SITE.name}</p>
            <p className="text-xs text-muted-foreground">{SITE.tagline}</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <a href={SITE.phoneTel}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>

          <Button asChild variant="secondary">
            <a href="#contact">
              <CalendarCheck className="mr-2 h-4 w-4" />
              Book
            </a>
          </Button>
        </div>
      </div>
    </header>
  );
}
EOF

# components/layout/site-footer.tsx
write_file "components/layout/site-footer.tsx" <<'EOF'
import Link from "next/link";
import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-10 md:grid-cols-3">
        <div className="space-y-2">
          <p className="text-sm font-semibold">{SITE.name}</p>
          <p className="text-sm text-muted-foreground">{SITE.tagline}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Visit</p>
          <p className="text-sm text-muted-foreground">{SITE.addressLine1}</p>
          <p className="text-sm text-muted-foreground">{SITE.addressLine2}</p>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold">Contact</p>
          <p className="text-sm text-muted-foreground">
            Phone:{" "}
            <a className="underline underline-offset-4" href={SITE.phoneTel}>
              {SITE.phoneDisplay}
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Email:{" "}
            <a className="underline underline-offset-4" href={`mailto:${SITE.email}`}>
              {SITE.email}
            </a>
          </p>
          <p className="text-sm text-muted-foreground">
            Facebook:{" "}
            <Link className="underline underline-offset-4" href={SITE.social.facebook} target="_blank">
              Page
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t py-5">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Built with Next.js + Tailwind + shadcn/ui</p>
        </div>
      </div>
    </footer>
  );
}
EOF

# components/layout/sticky-cta.tsx
write_file "components/layout/sticky-cta.tsx" <<'EOF'
import { Phone, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function StickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 backdrop-blur md:hidden">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-3">
        <Button asChild className="w-full">
          <a href={SITE.phoneTel}>
            <Phone className="mr-2 h-4 w-4" />
            Tap to Call
          </a>
        </Button>

        <Button asChild variant="secondary" className="w-full">
          <a href="#contact">
            <MessageSquareText className="mr-2 h-4 w-4" />
            Book / Message
          </a>
        </Button>
      </div>
    </div>
  );
}
EOF

# components/sections/hero.tsx
write_file "components/sections/hero.tsx" <<'EOF'
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Phone, CalendarCheck, ShieldCheck, Sparkles, Stethoscope } from "lucide-react";
import { SITE } from "@/lib/site";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-muted/40 via-background to-background" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2 md:py-20">
        <div className="space-y-6">
          <Badge className="w-fit" variant="secondary">
            Now accepting appointments
          </Badge>

          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            {SITE.tagline}
          </h1>

          <p className="text-base leading-relaxed text-muted-foreground">
            Friendly dentists, a clean clinic, and care explained clearly — so you feel comfortable every step.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="sm:w-fit">
              <a href={SITE.phoneTel}>
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>

            <Button asChild variant="secondary" className="sm:w-fit">
              <a href="#contact">
                <CalendarCheck className="mr-2 h-4 w-4" />
                Book an Appointment
              </a>
            </Button>
          </div>

          <div className="grid gap-3 pt-2 sm:grid-cols-3">
            <div className="flex items-start gap-2 rounded-xl border bg-card p-3">
              <ShieldCheck className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Licensed care</span><br />
                <span className="text-muted-foreground">Patient-first approach</span>
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border bg-card p-3">
              <Sparkles className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Clean & safe</span><br />
                <span className="text-muted-foreground">Comfortable experience</span>
              </p>
            </div>
            <div className="flex items-start gap-2 rounded-xl border bg-card p-3">
              <Stethoscope className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <p className="text-sm">
                <span className="font-medium">Clear guidance</span><br />
                <span className="text-muted-foreground">We explain options</span>
              </p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="aspect-[4/3] w-full rounded-3xl border bg-card p-2 shadow-sm">
            <div className="h-full w-full rounded-[22px] bg-gradient-to-br from-muted via-background to-muted" />
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Replace this placeholder with your clinic photo (optional).
          </p>
        </div>
      </div>
    </section>
  );
}
EOF

# components/sections/services.tsx
write_file "components/sections/services.tsx" <<'EOF'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SERVICES } from "@/lib/site";

export function ServicesSection() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-4 py-14">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold tracking-tight">Services</h2>
        <p className="text-sm text-muted-foreground">
          Common treatments we offer. Not sure what you need? Message us — we’ll guide you.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s) => (
          <Card key={s.title} className="rounded-2xl">
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{s.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground">
              {s.description}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
EOF

# components/sections/about.tsx
write_file "components/sections/about.tsx" <<'EOF'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/site";

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-6 md:grid-cols-2 md:items-start">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">About the Clinic</h2>
          <p className="text-sm text-muted-foreground">
            {SITE.name} is committed to comfortable, honest, and quality dental care.
            We focus on patient education, gentle treatment, and long-term oral health.
          </p>
        </div>

        <Card className="rounded-2xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Clinic Hours</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            {SITE.hours.map((h) => (
              <div key={h.label} className="flex items-center justify-between">
                <span className="text-muted-foreground">{h.label}</span>
                <span className="font-medium">{h.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
EOF

# components/sections/contact.tsx
write_file "components/sections/contact.tsx" <<'EOF'
"use client";

import * as React from "react";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload: ContactPayload = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim() || undefined,
      message: String(fd.get("message") || "").trim(),
    };

    if (!payload.name || !payload.phone || !payload.message) {
      toast.error("Please fill in your name, phone, and message.");
      return;
    }

    try {
      setIsSubmitting(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to send message.");
      }

      toast.success("Message sent! We’ll get back to you soon.");
      form.reset();
    } catch (err: any) {
      toast.error(err?.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">Contact</h2>
          <p className="text-sm text-muted-foreground">
            Tap to call or send us a message. We typically respond within business hours.
          </p>

          <div className="mt-5 space-y-2 rounded-2xl border bg-card p-5 text-sm">
            <p>
              <span className="text-muted-foreground">Phone:</span>{" "}
              <a className="font-medium underline underline-offset-4" href={SITE.phoneTel}>
                {SITE.phoneDisplay}
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">Email:</span>{" "}
              <a className="font-medium underline underline-offset-4" href={`mailto:${SITE.email}`}>
                {SITE.email}
              </a>
            </p>
            <p>
              <span className="text-muted-foreground">Address:</span>{" "}
              <span className="font-medium">{SITE.addressLine1}, {SITE.addressLine2}</span>
            </p>

            {SITE.mapEmbedUrl ? (
              <div className="pt-3">
                <iframe
                  title="Map"
                  src={SITE.mapEmbedUrl}
                  className="h-64 w-full rounded-xl border"
                  loading="lazy"
                />
              </div>
            ) : (
              <p className="pt-3 text-xs text-muted-foreground">
                Optional: Add your Google Maps embed URL in <span className="font-medium">lib/site.ts</span>
              </p>
            )}
          </div>
        </div>

        <Card className="rounded-2xl">
          <CardHeader>
            <CardTitle className="text-base">Send a Message</CardTitle>
            <CardDescription>We’ll reply as soon as we can.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Your name" autoComplete="name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Mobile Number</Label>
                <Input id="phone" name="phone" placeholder="09XX XXX XXXX" autoComplete="tel" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email (optional)</Label>
                <Input id="email" name="email" placeholder="you@email.com" autoComplete="email" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message / Concern</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell us what you need (cleaning, braces, pain, etc.)"
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <p className="text-xs text-muted-foreground">
                By sending this form, you agree to be contacted by the clinic regarding your inquiry.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
EOF

# app/(marketing)/page.tsx (includes header/footer so it works even if you don't change app/layout.tsx)
write_file "app/(marketing)/page.tsx" <<'EOF'
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { StickyCTA } from "@/components/layout/sticky-cta";
import { AppToaster } from "@/components/providers/toaster";

import { HeroSection } from "@/components/sections/hero";
import { ServicesSection } from "@/components/sections/services";
import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";

export default function MarketingHomePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* pb-24 prevents the StickyCTA from covering content on mobile */}
      <main className="pb-24 md:pb-0">
        <HeroSection />
        <ServicesSection />
        <AboutSection />
        <ContactSection />
      </main>

      <SiteFooter />
      <StickyCTA />
      <AppToaster />
    </div>
  );
}
EOF

# app/api/contact/route.ts
write_file "app/api/contact/route.ts" <<'EOF'
import { NextResponse } from "next/server";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

function validate(payload: ContactPayload) {
  if (!payload.name || payload.name.length < 2) return "Name is required.";
  if (!payload.phone || payload.phone.length < 7) return "Phone is required.";
  if (!payload.message || payload.message.length < 5) return "Message is required.";
  return null;
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Partial<ContactPayload>;

    const payload: ContactPayload = {
      name: String(body.name || "").trim(),
      phone: String(body.phone || "").trim(),
      email: body.email ? String(body.email).trim() : undefined,
      message: String(body.message || "").trim(),
    };

    const err = validate(payload);
    if (err) {
      return NextResponse.json({ ok: false, error: err }, { status: 400 });
    }

    // Starter behavior: logs to server console
    // Later: integrate Resend/Nodemailer/SMTP here.
    console.log("[CONTACT_FORM]", payload);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}
EOF

# app/robots.ts
write_file "app/robots.ts" <<'EOF'
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "", // Add sitemap URL when deployed (optional)
  };
}
EOF

say "Done ✅"
ok "Next steps:"
echo "1) Update clinic details in lib/site.ts"
echo "2) npm run dev"
