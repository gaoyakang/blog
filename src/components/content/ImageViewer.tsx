"use client";

import { useState, useCallback, useEffect } from "react";

interface ImageViewerProps {
  src: string;
  alt?: string;
  caption?: string;
}

interface ImageItem {
  src: string;
  alt: string;
}

export function ImageViewer({ src, alt = "", caption }: ImageViewerProps) {
  const label = caption || alt;
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback(() => {
    const imgElements = Array.from(document.querySelectorAll(".image-viewer"));
    const imgData = imgElements.map((img) => ({
      src: img.getAttribute("src") || "",
      alt: img.getAttribute("alt") || "",
    }));
    
    const currentIdx = imgElements.findIndex((img) => img.getAttribute("src") === src);
    
    setImages(imgData);
    setCurrentIndex(currentIdx >= 0 ? currentIdx : 0);
    setIsLightboxOpen(true);
  }, [src]);

  const closeLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  }, [images.length]);

  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, closeLightbox, goToPrev, goToNext]);

  return (
    <>
      <div className="my-8">
        <img
          src={src}
          alt={alt}
          className="image-viewer w-full cursor-pointer rounded-lg border border-[var(--border)] transition-all hover:opacity-80"
          loading="lazy"
          onClick={openLightbox}
        />
        {label ? (
          <p className="mt-2 text-center text-sm text-[var(--text-secondary)]">
            {label}
          </p>
        ) : null}
      </div>

      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => { e.stopPropagation(); goToPrev(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="relative max-w-[90vw] max-h-[85vh]" onClick={(e) => e.stopPropagation()}>
            <img
              src={images[currentIndex]?.src}
              alt={images[currentIndex]?.alt}
              className="max-w-full max-h-[85vh] object-contain"
            />
          </div>

          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
