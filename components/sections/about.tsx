// components/sections/about.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import {
  HeartHandshake,
  ShieldCheck,
  Sparkles,
  MapPin,
  Stethoscope,
  Smile,
  Sparkle,
} from "lucide-react";

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

const SPECIALTIES = [
  { title: "Orthodontics (Braces)", icon: Smile },
  { title: "Prosthodontics", icon: Stethoscope },
  { title: "Endodontics", icon: ShieldCheck },
  { title: "Cosmetic Dentistry", icon: Sparkle },
  { title: "Tooth Whitening", icon: Sparkles },
] as const;

export function AboutSection() {
  const locations =
    SITE.locations && SITE.locations.length > 0
      ? SITE.locations
      : [
          {
            label: "Clinic",
            addressLine1: SITE.addressLine1,
            addressLine2: SITE.addressLine2,
          },
        ];

  return (
    <section id='about' className='mx-auto max-w-6xl px-4 py-14'>
      <div className='grid gap-8 md:grid-cols-2 md:items-start'>
        {/* Left */}
        <div className='space-y-3'>
          <p className='text-xs font-semibold tracking-[0.22em] text-primary uppercase'>
            About
          </p>

          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Professional dentists, specialized care
          </h2>

          <p className='text-sm leading-relaxed text-muted-foreground'>
            We are a team of highly-trained professional dentists specialized in{" "}
            <span className='font-medium text-foreground'>
              Orthodontics (Dental Braces), Prosthodontics, Endodontics,
              Cosmetic Dentistry, and Tooth Whitening
            </span>
            . Our goal is to give you clear guidance and comfortable treatment—
            so you feel confident in every step of your dental journey.
          </p>

          {/* Specialties pills */}
          <div className='mt-5 grid gap-3 sm:grid-cols-2'>
            {SPECIALTIES.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.title}
                  className='flex items-center gap-3 rounded-2xl border bg-background p-4'
                >
                  <div className='flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10'>
                    <Icon className='h-4.5 w-4.5 text-primary' />
                  </div>
                  <p className='text-sm font-semibold text-foreground'>
                    {s.title}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Values */}
          <div className='mt-5 grid gap-3 sm:grid-cols-3'>
            <div className='flex items-start gap-3 rounded-2xl border bg-background p-4'>
              <HeartHandshake className='mt-0.5 h-5 w-5 text-primary' />
              <div>
                <p className='text-sm font-semibold'>Patient-first</p>
                <p className='text-xs text-muted-foreground'>
                  Calm, caring approach
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3 rounded-2xl border bg-background p-4'>
              <ShieldCheck className='mt-0.5 h-5 w-5 text-primary' />
              <div>
                <p className='text-sm font-semibold'>Clean & safe</p>
                <p className='text-xs text-muted-foreground'>
                  Hygiene-focused care
                </p>
              </div>
            </div>

            <div className='flex items-start gap-3 rounded-2xl border bg-background p-4'>
              <Sparkles className='mt-0.5 h-5 w-5 text-primary' />
              <div>
                <p className='text-sm font-semibold'>Clear guidance</p>
                <p className='text-xs text-muted-foreground'>
                  We explain your options
                </p>
              </div>
            </div>
          </div>

          {/* Reassurance */}
          <div className='mt-5 rounded-2xl border bg-muted/30 p-5'>
            <p className='text-sm font-semibold text-foreground'>
              Not sure what treatment you need?
            </p>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
              Tell us your concern (pain, cleaning, braces, whitening, etc.).
              We’ll recommend the next best step and confirm the right schedule
              for your preferred branch.
            </p>
          </div>
        </div>

        {/* Right */}
        <div className='space-y-4'>
          <Card className='rounded-2xl'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base'>Clinic Hours</CardTitle>
            </CardHeader>

            <CardContent className='space-y-2 text-sm'>
              {SITE.hours.map((h) => (
                <div
                  key={h.label}
                  className='flex items-center justify-between'
                >
                  <span className='text-muted-foreground'>{h.label}</span>
                  <span className='font-medium text-foreground'>{h.value}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Both Locations */}
          <Card className='rounded-2xl'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base'>Locations</CardTitle>
            </CardHeader>

            <CardContent className='space-y-4'>
              <div className='grid gap-3 sm:grid-cols-2'>
                {locations.map((loc) => {
                  const fullAddress = `${loc.addressLine1}, ${loc.addressLine2}`;
                  const href = mapsLink(fullAddress);

                  return (
                    <div
                      key={loc.label}
                      className='rounded-2xl border bg-background p-4'
                    >
                      <p className='text-sm font-semibold text-foreground'>
                        {loc.label}
                      </p>

                      <p className='mt-2 text-sm font-medium text-foreground'>
                        {loc.addressLine1}
                      </p>
                      <p className='text-sm text-muted-foreground'>
                        {loc.addressLine2}
                      </p>

                      <div className='pt-3'>
                        <Button asChild className='w-full rounded-full'>
                          <a href={href} target='_blank' rel='noreferrer'>
                            <MapPin className='mr-2 h-4 w-4' />
                            Get directions
                          </a>
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className='text-xs text-muted-foreground'>
                For faster booking, include your preferred branch (Ortigas or
                Makati) in your message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
