// components/sections/about.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";
import { HeartHandshake, ShieldCheck, Sparkles, MapPin } from "lucide-react";

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

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
            A clinic that prioritizes comfort, honesty, and quality care
          </h2>

          <p className='text-sm leading-relaxed text-muted-foreground'>
            {SITE.name} is committed to comfortable, honest, and quality dental
            care. We focus on patient education, gentle treatment, and long-term
            oral health — so you can make confident decisions for your smile.
          </p>

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
              First time visiting?
            </p>
            <p className='mt-1 text-sm leading-relaxed text-muted-foreground'>
              If you’re not sure what you need, that’s okay — we’ll guide you
              step-by-step and explain your options clearly before any
              procedure.
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
                For faster booking, send your preferred branch in the message.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
