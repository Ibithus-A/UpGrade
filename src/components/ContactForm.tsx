"use client";

import Script from "next/script";
import { Reveal } from "./Reveal";

export function ContactForm() {
  return (
    <section id="contact" className="section scroll-mt-24">
      <link
        href="https://assets.calendly.com/assets/external/widget.css"
        rel="stylesheet"
      />

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
      />

      <div className="container">
        <div className="mx-auto w-full max-w-5xl">
          <Reveal>
            <div className="mb-8 text-center">
              <h2 className="h2">Pick a Time to talk to us</h2>
              <p className="mt-3 mx-auto max-w-2xl lead">
                You will speak directly with Ibrahim Ahmed, founder of Excelora.
                Pick a time that suits you and we&apos;ll map out the best next
                steps for your Maths goals.
              </p>
            </div>
          </Reveal>

          <Reveal delay={90}>
            <div className="overflow-hidden rounded-3xl border hairline bg-white h-[clamp(760px,85vh,980px)]">
              <div
                className="calendly-inline-widget w-full"
                data-url="https://calendly.com/ibrahimahmed0/30min?hide_event_type_details=1&primary_color=1a1a1a"
                style={{ width: "100%", minWidth: "0", height: "100%" }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
