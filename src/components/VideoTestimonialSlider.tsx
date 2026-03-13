"use client";

import { useEffect, useRef, useState } from "react";

export type VideoTestimonial = {
  name: string;
  role: string;
  summary: string;
  label?: string;
  videoSrc?: string;
  embedUrl?: string;
};

export function VideoTestimonialSlider({
  items,
}: {
  items: VideoTestimonial[];
}) {
  const [index, setIndex] = useState(0);
  const [playedSlides, setPlayedSlides] = useState<Record<number, boolean>>({});
  const [fadingSlides, setFadingSlides] = useState<Record<number, boolean>>({});
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const len = items.length;
  const hasMultiple = len > 1;

  useEffect(() => {
    videoRefs.current.forEach((video, videoIndex) => {
      if (!video || videoIndex === index) return;
      video.pause();
    });
  }, [index]);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) return;
        videoRefs.current.forEach((video) => video?.pause());
      },
      { threshold: 0.2 },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  if (!len) return null;

  function prev() {
    setIndex((currentIndex) => (currentIndex - 1 + len) % len);
  }

  function next() {
    setIndex((currentIndex) => (currentIndex + 1) % len);
  }

  function playVideo(itemIndex: number) {
    const video = videoRefs.current[itemIndex];
    if (!video) return;

    setFadingSlides((current) => ({ ...current, [itemIndex]: true }));
    window.setTimeout(() => {
      setPlayedSlides((current) => ({ ...current, [itemIndex]: true }));
    }, 260);
    void video.play();
  }

  return (
    <div
      ref={rootRef}
      className="card overflow-hidden"
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label="Video testimonials"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") prev();
        if (event.key === "ArrowRight") next();
      }}
    >
      <div
        className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {items.map((item, itemIndex) => (
          <div key={`${item.name}-${itemIndex}`} className="w-full shrink-0 p-3 md:p-4">
            <div className="overflow-hidden rounded-[1.5rem] bg-black text-white">
              {item.videoSrc ? (
                <div className="relative">
                  <video
                    ref={(node) => {
                      videoRefs.current[itemIndex] = node;
                    }}
                    src={item.videoSrc}
                    className="aspect-video w-full bg-black"
                    controls={playedSlides[itemIndex]}
                    preload="metadata"
                    playsInline
                  />

                  {!playedSlides[itemIndex] ? (
                    <button
                      type="button"
                      onClick={() => playVideo(itemIndex)}
                      className={[
                        "group absolute inset-0 flex items-center justify-center bg-black px-6 text-center text-white transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
                        fadingSlides[itemIndex] ? "opacity-0" : "opacity-100 hover:opacity-96",
                      ].join(" ")}
                      aria-label={`Play ${item.name} video testimonial`}
                      onTransitionEnd={() => {
                        if (fadingSlides[itemIndex]) {
                          setFadingSlides((current) => ({
                            ...current,
                            [itemIndex]: false,
                          }));
                        }
                      }}
                    >
                      <div className="max-w-xl">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-white/8 text-2xl transition-all duration-200 ease-out group-hover:scale-105 group-hover:border-white/25 group-hover:bg-white/12">
                          ▶
                        </div>
                        <p className="mt-5 text-xs font-semibold uppercase tracking-[0.18em] text-white/55">
                          Video Testimonial
                        </p>
                        <p className="mt-2 text-balance text-xs font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/85 md:text-sm">
                          Hear what {item.name} has to say about Excelora
                        </p>
                      </div>
                    </button>
                  ) : null}
                </div>
              ) : item.embedUrl ? (
                <iframe
                  src={item.embedUrl}
                  title={`${item.name} video testimonial`}
                  className="aspect-video w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center px-6 text-center">
                  <div className="max-w-lg">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/12 text-2xl">
                      ▶
                    </div>
                    <p className="mt-5 text-sm font-semibold uppercase tracking-[0.18em] text-white/70">
                      Video Testimonial Placeholder
                    </p>
                    <p className="mt-3 text-[17px] leading-relaxed text-white/85 md:text-lg">
                      Add this student or parent video testimonial here.
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col gap-5 px-3 pb-3 pt-5 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                {item.label ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-black/55">
                    {item.label}
                  </p>
                ) : null}
                <p className="mt-1 text-lg font-semibold text-[#1d1d1f]">
                  {item.name}
                </p>
                <p className="text-sm text-black/60">{item.role}</p>
                <p className="mt-3 text-sm leading-relaxed text-black/70">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center justify-between gap-4 md:flex-col md:items-end">
                <div className="flex gap-1.5">
                  {items.map((dotItem, dotIndex) => (
                    <button
                      type="button"
                      key={`${dotItem.name}-${dotIndex}`}
                      onClick={() => setIndex(dotIndex)}
                      className={[
                        "h-2 w-2 rounded-full",
                        "transition-opacity ui-motion",
                        dotIndex === index
                          ? "bg-black opacity-100"
                          : "bg-black/20 opacity-70 hover:opacity-100",
                      ].join(" ")}
                      aria-label={`Go to video testimonial ${dotIndex + 1}`}
                      aria-current={dotIndex === index}
                    />
                  ))}
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="btn btn-ghost btn-sm"
                    aria-label="Previous video testimonial"
                    disabled={!hasMultiple}
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="btn btn-ghost btn-sm"
                    aria-label="Next video testimonial"
                    disabled={!hasMultiple}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
