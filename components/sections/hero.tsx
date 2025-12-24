// components/sections/hero.tsx
import Image from "next/image";
import {
  MapPin,
  Phone,
  Clock,
  Mail,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SITE } from "@/lib/site";

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export function HeroSection() {
  const fullAddress = `${SITE.addressLine1}, ${SITE.addressLine2}`;

  return (
    <section className='relative isolate overflow-hidden min-h-svh -mt-18 pt-18'>
      {/* Background image (slightly darkened, not black) */}
      <Image
        src='/hero.avif'
        alt='ESEC Dental Clinics'
        fill
        priority
        className='object-cover brightness-[0.62] contrast-[1.06] saturate-[0.95] -z-20'
      />

      {/* Overlay: calm navy + brand blue (clinic feel) */}
      <div className='absolute inset-0 -z-10 bg-linear-to-r from-foreground/85 via-foreground/45 to-primary/35' />

      {/* Optional soft wash to reduce harsh highlights */}
      <div className='absolute inset-0 -z-10 bg-white/5' />

      {/* Bottom fade into page background */}
      <div className='absolute inset-x-0 bottom-0 -z-10 h-44 bg-linear-to-t from-background via-background/70 to-transparent' />

      {/* Content above image/overlay */}
      <div className='relative z-10 mx-auto flex max-w-6xl flex-col justify-center px-4 py-10 md:py-16'>
        <div className='grid gap-8 md:grid-cols-12 md:items-center'>
          {/* Left content */}
          <div className='md:col-span-7'>
            <h1 className='mt-6 text-4xl font-semibold tracking-tight text-white sm:text-5xl'>
              Gentle dental care,
              <span className='block'>done with comfort and clarity.</span>
            </h1>

            <p className='mt-4 max-w-xl text-base leading-relaxed text-white/85'>
              We focus on patient comfort, clean procedures, and explaining your
              options clearly — so you feel confident at every visit.
            </p>

            <div className='mt-7 flex flex-col gap-3 sm:flex-row'>
              <Button asChild className='sm:w-fit'>
                <a href={SITE.phoneTel}>
                  <Phone className='mr-2 h-4 w-4' />
                  Call {SITE.phoneDisplay}
                </a>
              </Button>

              <Button asChild variant='secondary' className='sm:w-fit'>
                <a href='#contact'>Book an Appointment</a>
              </Button>
            </div>

            {/* Trust cues (navy glass, not black) */}
            <div className='mt-7 grid gap-3 sm:grid-cols-3'>
              <div className='flex items-start gap-3 rounded-xl border border-white/15 bg-foreground/40 p-4 text-white backdrop-blur-sm shadow-sm shadow-foreground/30'>
                <ShieldCheck className='mt-0.5 h-5 w-5 text-white/90' />
                <div>
                  <p className='text-sm font-semibold'>Clean & safe</p>
                  <p className='text-xs text-white/80'>Hygiene-first care</p>
                </div>
              </div>

              <div className='flex items-start gap-3 rounded-xl border border-white/15 bg-foreground/40 p-4 text-white backdrop-blur-sm shadow-sm shadow-foreground/30'>
                <HeartHandshake className='mt-0.5 h-5 w-5 text-white/90' />
                <div>
                  <p className='text-sm font-semibold'>Gentle approach</p>
                  <p className='text-xs text-white/80'>Patient-first</p>
                </div>
              </div>

              <div className='flex items-start gap-3 rounded-xl border border-white/15 bg-foreground/40 p-4 text-white backdrop-blur-sm shadow-sm shadow-foreground/30'>
                <Sparkles className='mt-0.5 h-5 w-5 text-white/90' />
                <div>
                  <p className='text-sm font-semibold'>Clear guidance</p>
                  <p className='text-xs text-white/80'>We explain options</p>
                </div>
              </div>
            </div>

            <div className='mt-10 hidden items-center gap-2 text-sm text-white/80 md:flex'>
              <span className='h-2 w-2 animate-pulse rounded-full bg-white/70' />
              <span>Scroll to view services & contact details</span>
            </div>
          </div>

          {/* Right: clinic info card */}
          <div className='md:col-span-5'>
            <Card className='border-white/20 bg-white/95 shadow-sm backdrop-blur-sm'>
              <CardContent className='space-y-4 p-6'>
                <p className='text-sm font-semibold text-foreground'>
                  Clinic Details
                </p>

                <div className='space-y-3 text-sm'>
                  <div className='flex items-start gap-3'>
                    <MapPin className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <div>
                      <p className='font-medium text-foreground'>
                        {SITE.addressLine1}
                      </p>
                      <p className='text-muted-foreground'>
                        {SITE.addressLine2}
                      </p>
                      <a
                        href={mapsLink(fullAddress)}
                        target='_blank'
                        rel='noreferrer'
                        className='mt-1 inline-block text-primary underline underline-offset-4'
                      >
                        Get directions
                      </a>
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Clock className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <div className='space-y-1'>
                      {SITE.hours.map((h) => (
                        <div
                          key={h.label}
                          className='flex items-center justify-between gap-6'
                        >
                          <span className='text-muted-foreground'>
                            {h.label}
                          </span>
                          <span className='font-medium text-foreground'>
                            {h.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className='flex items-start gap-3'>
                    <Mail className='mt-0.5 h-4 w-4 text-muted-foreground' />
                    <a
                      href={`mailto:${SITE.email}`}
                      className='font-medium text-foreground underline underline-offset-4'
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className='grid grid-cols-2 gap-2 pt-1'>
                  <Button asChild className='w-full'>
                    <a href={SITE.phoneTel}>Tap to Call</a>
                  </Button>
                  <Button asChild variant='secondary' className='w-full'>
                    <a href='#contact'>Message Us</a>
                  </Button>
                </div>

                <p className='text-xs text-muted-foreground'>
                  Prefer Ortigas or Makati? Message us and we’ll confirm your
                  preferred branch.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='h-10 md:h-14' />
      </div>
    </section>
  );
}
