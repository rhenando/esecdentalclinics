// components/sections/contact.tsx
"use client";

import * as React from "react";
import { toast } from "sonner";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";

type ContactPayload = {
  name: string;
  phone: string;
  email?: string;
  message: string;
};

function mapsLink(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;
}

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  // ✅ Option B: multi-branch selector
  const locations = SITE.locations ?? [];
  const defaultKey = locations?.[0]?.key ?? "ortigas";
  const [selectedKey, setSelectedKey] = React.useState<string>(defaultKey);

  const selected = locations.find((l) => l.key === selectedKey) ?? locations[0];

  const fullAddress = selected
    ? `${selected.addressLine1}, ${selected.addressLine2}`
    : `${SITE.addressLine1}, ${SITE.addressLine2}`;

  const mapsHref = mapsLink(fullAddress);

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

    if (payload.phone.replace(/\D/g, "").length < 9) {
      toast.error("Please enter a valid mobile number.");
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
    <section id='contact' className='mx-auto max-w-6xl px-4 py-14'>
      {/* Header */}
      <div className='flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
        <div className='space-y-2'>
          <p className='text-xs font-semibold tracking-[0.22em] text-primary uppercase'>
            Contact
          </p>
          <h2 className='text-2xl font-semibold tracking-tight sm:text-3xl'>
            Get in touch with the clinic
          </h2>
          <p className='max-w-2xl text-sm leading-relaxed text-muted-foreground'>
            Tap to call or send us a message. We typically respond within
            business hours.
          </p>
        </div>

        <div className='flex flex-col gap-2 sm:flex-row'>
          <Button asChild className='rounded-full'>
            <a href={SITE.phoneTel}>
              <Phone className='mr-2 h-4 w-4' />
              Call now
            </a>
          </Button>
          <Button asChild variant='secondary' className='rounded-full'>
            <a href='#contact-form'>
              Send a message <ArrowRight className='ml-2 h-4 w-4' />
            </a>
          </Button>
        </div>
      </div>

      <div className='mt-8 grid gap-6 lg:grid-cols-2'>
        {/* Left: contact details + map */}
        <div className='space-y-4'>
          <Card className='rounded-2xl'>
            <CardHeader className='pb-3'>
              <CardTitle className='text-base'>Clinic Info</CardTitle>
              <CardDescription>
                Select a branch to view the map and directions.
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-4 text-sm'>
              {/* Branch selector (mobile-friendly pills) */}
              {locations.length > 1 ? (
                <div className='flex flex-wrap gap-2'>
                  {locations.map((l) => {
                    const active = l.key === selectedKey;
                    return (
                      <button
                        key={l.key}
                        type='button'
                        onClick={() => setSelectedKey(l.key)}
                        className={[
                          "rounded-full border px-4 py-2 text-xs font-semibold transition",
                          active
                            ? "bg-primary text-primary-foreground"
                            : "bg-background hover:bg-muted/30",
                        ].join(" ")}
                        aria-pressed={active}
                      >
                        {l.label}
                      </button>
                    );
                  })}
                </div>
              ) : null}

              <div className='grid gap-3'>
                <div className='flex items-start gap-3'>
                  <Phone className='mt-0.5 h-4 w-4 text-primary' />
                  <div>
                    <p className='text-muted-foreground'>Phone</p>
                    <a
                      className='font-medium text-foreground underline underline-offset-4'
                      href={SITE.phoneTel}
                    >
                      {SITE.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Mail className='mt-0.5 h-4 w-4 text-primary' />
                  <div>
                    <p className='text-muted-foreground'>Email</p>
                    <a
                      className='font-medium text-foreground underline underline-offset-4'
                      href={`mailto:${SITE.email}`}
                    >
                      {SITE.email}
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <MapPin className='mt-0.5 h-4 w-4 text-primary' />
                  <div className='min-w-0'>
                    <p className='text-muted-foreground'>Address</p>
                    <p className='font-medium text-foreground'>
                      {selected?.addressLine1 ?? SITE.addressLine1},{" "}
                      {selected?.addressLine2 ?? SITE.addressLine2}
                    </p>
                    <a
                      href={mapsHref}
                      target='_blank'
                      rel='noreferrer'
                      className='mt-1 inline-block text-primary underline underline-offset-4'
                    >
                      Open in Google Maps
                    </a>
                  </div>
                </div>

                <div className='flex items-start gap-3'>
                  <Clock className='mt-0.5 h-4 w-4 text-primary' />
                  <div className='w-full'>
                    <p className='text-muted-foreground'>Hours</p>
                    <div className='mt-2 space-y-1'>
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
                </div>
              </div>

              {/* ✅ Embedded map for selected branch */}
              {selected?.mapEmbedUrl ? (
                <div className='pt-2'>
                  <iframe
                    title={`Map - ${selected.label}`}
                    src={selected.mapEmbedUrl}
                    className='h-64 w-full rounded-xl border'
                    loading='lazy'
                    referrerPolicy='no-referrer-when-downgrade'
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className='rounded-xl border bg-muted/30 p-4'>
                  <p className='text-xs text-muted-foreground'>
                    Add the map embed URL for this branch in{" "}
                    <span className='font-medium text-foreground'>
                      lib/site.ts
                    </span>
                    .
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className='rounded-2xl border bg-muted/30 p-5 text-sm'>
            <p className='font-medium text-foreground'>
              Quick tip before you send:
            </p>
            <p className='mt-1 text-muted-foreground'>
              If you’re experiencing pain or swelling, include when it started
              and which tooth/side — it helps us respond faster.
            </p>
          </div>
        </div>

        {/* Right: form */}
        <Card id='contact-form' className='rounded-2xl'>
          <CardHeader>
            <CardTitle className='text-base'>Send a Message</CardTitle>
            <CardDescription>We’ll reply as soon as we can.</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={onSubmit} className='space-y-4'>
              <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='name'>Full Name</Label>
                  <Input
                    id='name'
                    name='name'
                    placeholder='Your name'
                    autoComplete='name'
                  />
                </div>

                <div className='space-y-2'>
                  <Label htmlFor='phone'>Mobile Number</Label>
                  <Input
                    id='phone'
                    name='phone'
                    placeholder='09XX XXX XXXX'
                    autoComplete='tel'
                    inputMode='tel'
                  />
                </div>
              </div>

              <div className='space-y-2'>
                <Label htmlFor='email'>Email (optional)</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='you@email.com'
                  autoComplete='email'
                />
              </div>

              <div className='space-y-2'>
                <Label htmlFor='message'>Message / Concern</Label>
                <Textarea
                  id='message'
                  name='message'
                  placeholder='Tell us what you need (cleaning, braces, pain, etc.)'
                  rows={6}
                />
              </div>

              <Button type='submit' className='w-full' disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              <p className='text-xs leading-relaxed text-muted-foreground'>
                By sending this form, you agree to be contacted by the clinic
                regarding your inquiry.
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
