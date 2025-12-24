// components/sections/services.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/lib/site";
import {
  Sparkles,
  ShieldCheck,
  Stethoscope,
  Smile,
  ScanLine,
  Baby,
  Wrench,
  Star,
  ArrowRight,
} from "lucide-react";

type ServiceKey =
  | "Dental Cleaning & Check-up"
  | "Tooth Filling"
  | "Tooth Extraction"
  | "Root Canal Treatment"
  | "Braces / Orthodontics"
  | "Teeth Whitening"
  | "Crowns / Bridges / Dentures"
  | "Pediatric Dentistry";

const ICONS: Record<ServiceKey, React.ElementType> = {
  "Dental Cleaning & Check-up": Stethoscope,
  "Tooth Filling": Wrench,
  "Tooth Extraction": ShieldCheck,
  "Root Canal Treatment": ScanLine,
  "Braces / Orthodontics": Sparkles,
  "Teeth Whitening": Star,
  "Crowns / Bridges / Dentures": Smile,
  "Pediatric Dentistry": Baby,
};

export function ServicesSection() {
  return (
    <section id='services' className='mx-auto max-w-6xl px-4 py-14'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <div className='space-y-2'>
          <p className='text-xs font-semibold tracking-[0.22em] text-primary uppercase'>
            Services
          </p>
          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Dental services you can feel good about
          </h2>
          <p className='max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            Common treatments we offer. Not sure what you need? Send us a
            message and we’ll guide you based on your concern.
          </p>
        </div>

        {/* CTA */}
        <div className='flex gap-2'>
          <Button asChild variant='secondary' className='rounded-full'>
            <a href='#contact'>
              Message us <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </Button>
        </div>
      </div>

      {/* Cards */}
      <div className='mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {SERVICES.map((s) => {
          const Icon = ICONS[s.title as ServiceKey] ?? Stethoscope;

          return (
            <Card
              key={s.title}
              className='
                group rounded-2xl border-border/80
                transition hover:-translate-y-0.5 hover:shadow-sm
              '
            >
              <CardHeader className='pb-3'>
                <div className='flex items-start gap-3'>
                  <div
                    className='
                      flex h-10 w-10 items-center justify-center
                      rounded-xl bg-secondary text-primary
                      ring-1 ring-border/70
                      transition group-hover:bg-primary group-hover:text-primary-foreground
                    '
                    aria-hidden='true'
                  >
                    <Icon className='h-5 w-5' />
                  </div>

                  <div className='space-y-1'>
                    <CardTitle className='text-base leading-snug'>
                      {s.title}
                    </CardTitle>
                    <p className='text-xs text-muted-foreground'>
                      Comfortable, patient-first care
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className='text-sm leading-relaxed text-muted-foreground'>
                {s.description}
              </CardContent>

              {/* subtle bottom accent */}
              <div className='h-1 w-full bg-linear-to-r from-transparent via-primary/35 to-transparent opacity-0 transition group-hover:opacity-100' />
            </Card>
          );
        })}
      </div>

      {/* Footer note */}
      <div className='mt-8 rounded-2xl border bg-muted/40 p-5'>
        <p className='text-sm text-muted-foreground'>
          Have a specific concern (toothache, sensitivity, swelling, braces
          inquiry)? Tell us what you’re experiencing and we’ll recommend the
          best next step.
        </p>
      </div>
    </section>
  );
}
