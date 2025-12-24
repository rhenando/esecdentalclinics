// components/layout/sticky-cta.tsx
import { Phone, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export function StickyCTA() {
  return (
    <div className='fixed inset-x-0 bottom-0 z-50 border-t bg-background/95 shadow-sm backdrop-blur md:hidden'>
      <div className='mx-auto grid max-w-6xl grid-cols-2 gap-2 px-4 py-3 pb-[calc(env(safe-area-inset-bottom)+0.75rem)]'>
        <Button asChild className='w-full rounded-full'>
          <a href={SITE.phoneTel} aria-label='Call the clinic'>
            <Phone className='mr-2 h-4 w-4' />
            Tap to Call
          </a>
        </Button>

        <Button asChild variant='secondary' className='w-full rounded-full'>
          <a href='#contact' aria-label='Go to booking or message form'>
            <MessageSquareText className='mr-2 h-4 w-4' />
            Book / Message
          </a>
        </Button>
      </div>
    </div>
  );
}
