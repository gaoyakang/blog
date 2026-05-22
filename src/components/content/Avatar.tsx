"use client";

import { useState } from "react";

interface AvatarProps {
  alt: string;
}

export function Avatar({ alt }: AvatarProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <svg 
        width="96" 
        height="96" 
        viewBox="0 0 96 96" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <circle cx="48" cy="48" r="48" fill="#374151"/>
        <circle cx="48" cy="40" r="18" fill="#9CA3AF"/>
        <path d="M20 75 Q48 55 76 75" stroke="#374151" strokeWidth="4" fill="none" strokeLinecap="round"/>
      </svg>
    );
  }

  return (
    <img 
      src="/avatar.png"
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setHasError(true)}
    />
  );
}
