// components/layout/site-footer.tsx
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { MapPin, Phone, Mail, Facebook } from "lucide-react";

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export function SiteFooter() {
  const year = new Date().getFullYear();
  const fullAddress = `${SITE.addressLine1}, ${SITE.addressLine2}`;

  return (
    <footer className='border-t bg-background'>
      <div className='mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:py-12'>
        {/* Brand */}
        <div className='space-y-4'>
          <Link href='#top' className='flex items-center gap-4'>
            {/* Bigger logo for readability */}
            <div className='relative h-14 w-14 shrink-0 overflow-hidden rounded-full border bg-white shadow-sm'>
              <Image
                src='/logo.jpg'
                alt={`${SITE.name} logo`}
                fill
                className='object-contain p-2'
              />
            </div>

            {/* Prevent overflow on small screens */}
            <div className='min-w-0 leading-tight'>
              <p className='truncate text-base font-semibold tracking-tight text-foreground'>
                {SITE.name}
              </p>
              <p className='truncate text-sm text-muted-foreground'>
                {SITE.tagline}
              </p>
            </div>
          </Link>

          <p className='text-sm leading-relaxed text-muted-foreground'>
            Comfortable, honest dental care with a patient-first approach.
          </p>

          {/* Quick actions (mobile-friendly) */}
          <div className='flex flex-col gap-2 sm:flex-row'>
            <a
              href={SITE.phoneTel}
              className='inline-flex items-center justify-center rounded-full border bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/20'
            >
              Call the clinic
            </a>
            <a
              href='#contact'
              className='inline-flex items-center justify-center rounded-full border bg-muted/20 px-4 py-2 text-sm font-medium text-foreground hover:bg-muted/30'
            >
              Book / Message
            </a>
          </div>
        </div>

        {/* Visit */}
        <div className='space-y-3'>
          <p className='text-sm font-semibold text-foreground'>Visit</p>

          <div className='flex items-start gap-3 text-sm'>
            <MapPin className='mt-0.5 h-4 w-4 shrink-0 text-primary' />
            <div className='min-w-0 space-y-1'>
              <p className='text-muted-foreground'>{SITE.addressLine1}</p>
              <p className='text-muted-foreground'>{SITE.addressLine2}</p>

              <a
                className='inline-block text-primary underline underline-offset-4'
                href={mapsLink(fullAddress)}
                target='_blank'
                rel='noreferrer'
              >
                Get directions
              </a>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className='space-y-3'>
          <p className='text-sm font-semibold text-foreground'>Contact</p>

          <div className='grid gap-2 text-sm'>
            <a
              className='flex items-center gap-2 text-muted-foreground hover:text-foreground'
              href={SITE.phoneTel}
            >
              <Phone className='h-4 w-4 shrink-0 text-primary' />
              <span className='underline underline-offset-4'>
                {SITE.phoneDisplay}
              </span>
            </a>

            <a
              className='flex min-w-0 items-center gap-2 text-muted-foreground hover:text-foreground'
              href={`mailto:${SITE.email}`}
            >
              <Mail className='h-4 w-4 shrink-0 text-primary' />
              <span className='truncate underline underline-offset-4'>
                {SITE.email}
              </span>
            </a>

            <Link
              className='flex items-center gap-2 text-muted-foreground hover:text-foreground'
              href={SITE.social.facebook}
              target='_blank'
            >
              <Facebook className='h-4 w-4 shrink-0 text-primary' />
              <span className='underline underline-offset-4'>
                Facebook Page
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className='border-t'>
        <div className='mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between'>
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p className='hidden sm:block'>
            Unit 1105, Medical Plaza Ortigas • San Miguel Ave, Pasig
          </p>
        </div>
      </div>
    </footer>
  );
}
