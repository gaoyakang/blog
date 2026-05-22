"use client";

import { createContext, useContext, useState, useCallback, type ReactNode, useEffect } from "react";
import { ImageLightbox } from "./ImageLightbox";

export interface ImageItem {
  src: string;
  alt: string;
}

interface ImageLightboxContextType {
  openLightbox: (images: ImageItem[], index: number) => void;
}

const ImageLightboxContext = createContext<ImageLightboxContextType | undefined>(undefined);

export function ImageLightboxProvider({ children }: { children: ReactNode }) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [images, setImages] = useState<ImageItem[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = useCallback((imagesToShow: ImageItem[], index: number) => {
    console.log("openLightbox called with", imagesToShow.length, "images, starting at index", index);
    setImages(imagesToShow);
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  }, []);

  const handleCloseLightbox = useCallback(() => {
    setIsLightboxOpen(false);
  }, []);

  const handleNav = useCallback((newIndex: number) => {
    setCurrentIndex(newIndex);
  }, []);

  return (
    <ImageLightboxContext.Provider value={{ openLightbox }}>
      {children}
      {isLightboxOpen && (
        <ImageLightbox
          images={images}
          currentIndex={currentIndex}
          onClose={handleCloseLightbox}
          onNav={handleNav}
        />
      )}
    </ImageLightboxContext.Provider>
  );
}

export function useImageLightbox() {
  const context = useContext(ImageLightboxContext);
  if (!context) {
    throw new Error("useImageLightbox must be used within an ImageLightboxProvider");
  }
  return context;
}
