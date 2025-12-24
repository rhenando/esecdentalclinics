// components/layout/site-header.tsx
"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, Clock, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

const nav = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export function SiteHeader() {
  const [open, setOpen] = React.useState(false);

  const fullAddress = `${SITE.addressLine1}, ${SITE.addressLine2}`;
  const mapsHref = mapsLink(fullAddress);

  function close() {
    setOpen(false);
  }

  React.useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <header className='sticky top-0 z-50 w-full border-b bg-background/92 backdrop-blur'>
      {/* Desktop info strip */}
      <div className='hidden border-b bg-muted/30 md:block'>
        <div className='mx-auto flex max-w-6xl items-center justify-between gap-6 px-4 py-2 text-xs text-foreground/80'>
          <a
            href={mapsHref}
            target='_blank'
            rel='noreferrer'
            className='inline-flex min-w-0 items-center gap-2 hover:underline'
            aria-label='Open address in Google Maps'
          >
            <MapPin className='h-3.5 w-3.5 shrink-0 text-primary' />
            <span className='truncate'>
              {SITE.addressLine1}, {SITE.addressLine2}
            </span>
          </a>

          <div className='flex items-center gap-5'>
            <a
              className='inline-flex items-center gap-2 hover:underline'
              href={SITE.phoneTel}
            >
              <Phone className='h-3.5 w-3.5 text-primary' />
              {SITE.phoneDisplay}
            </a>

            <a
              className='inline-flex items-center gap-2 hover:underline'
              href={`mailto:${SITE.email}`}
            >
              <Mail className='h-3.5 w-3.5 text-primary' />
              {SITE.email}
            </a>

            {SITE.hours?.[0] ? (
              <span className='hidden lg:inline-flex items-center gap-2 text-muted-foreground'>
                <Clock className='h-3.5 w-3.5 text-primary' />
                {SITE.hours[0].label}: {SITE.hours[0].value}
              </span>
            ) : null}
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className='mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3'>
        {/* Brand (mobile-safe truncation) */}
        <a href='#top' className='flex min-w-0 items-center gap-3'>
          <div className='relative h-12 w-12 shrink-0 overflow-hidden rounded-full border bg-white shadow-sm sm:h-14 sm:w-14'>
            <Image
              src='/logo.jpg'
              alt='ESEC Dental Clinics logo'
              fill
              priority
              className='object-contain p-2'
            />
          </div>

          <div className='min-w-0 leading-tight'>
            <p className='truncate text-base font-semibold tracking-tight text-foreground sm:text-lg'>
              {SITE.name}
            </p>
            <p className='truncate text-xs text-muted-foreground sm:text-sm'>
              General Dentist • Ortigas | Makati
            </p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className='hidden items-center gap-6 md:flex'>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className='text-sm text-muted-foreground hover:text-foreground'
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right actions (mobile + desktop) */}
        <div className='flex items-center gap-2'>
          {/* Desktop call */}
          <Button asChild className='hidden sm:inline-flex rounded-full'>
            <a href={SITE.phoneTel}>Call</a>
          </Button>

          {/* Desktop book */}
          <Button
            asChild
            variant='secondary'
            className='hidden md:inline-flex rounded-full'
          >
            <a href='#contact'>Book Appointment</a>
          </Button>

          {/* Mobile menu button */}
          <Button
            type='button'
            variant='secondary'
            className='inline-flex rounded-full md:hidden'
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className='h-4 w-4' /> : <Menu className='h-4 w-4' />}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {open ? (
        <div className='md:hidden'>
          <div className='border-t bg-background'>
            <div className='mx-auto max-w-6xl px-4 py-4'>
              {/* Mobile quick info */}
              <div className='space-y-3 rounded-2xl border bg-muted/20 p-4 text-sm'>
                <a
                  href={SITE.phoneTel}
                  className='flex items-center gap-3 text-foreground'
                  onClick={close}
                >
                  <Phone className='h-4 w-4 text-primary' />
                  <span className='font-medium'>{SITE.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  className='flex items-center gap-3 text-foreground'
                  onClick={close}
                >
                  <Mail className='h-4 w-4 text-primary' />
                  <span className='truncate font-medium'>{SITE.email}</span>
                </a>

                <a
                  href={mapsHref}
                  target='_blank'
                  rel='noreferrer'
                  className='flex items-start gap-3 text-foreground'
                  onClick={close}
                >
                  <MapPin className='mt-0.5 h-4 w-4 text-primary' />
                  <span className='text-sm text-muted-foreground'>
                    {SITE.addressLine1}, {SITE.addressLine2}
                  </span>
                </a>

                {SITE.hours?.[0] ? (
                  <div className='flex items-center gap-3 text-muted-foreground'>
                    <Clock className='h-4 w-4 text-primary' />
                    <span>
                      {SITE.hours[0].label}: {SITE.hours[0].value}
                    </span>
                  </div>
                ) : null}
              </div>

              {/* Mobile nav links */}
              <nav className='mt-4 grid gap-2'>
                {nav.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={close}
                    className='rounded-xl border bg-background px-4 py-3 text-sm font-medium text-foreground hover:bg-muted/20'
                  >
                    {item.label}
                  </a>
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className='mt-4 grid grid-cols-2 gap-2'>
                <Button asChild className='w-full rounded-full'>
                  <a href={SITE.phoneTel} onClick={close}>
                    Call
                  </a>
                </Button>
                <Button
                  asChild
                  variant='secondary'
                  className='w-full rounded-full'
                >
                  <a href='#contact' onClick={close}>
                    Book
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Backdrop */}
          <button
            type='button'
            className='fixed inset-0 -z-10 bg-black/10'
            aria-label='Close menu backdrop'
            onClick={close}
          />
        </div>
      ) : null}
    </header>
  );
}
