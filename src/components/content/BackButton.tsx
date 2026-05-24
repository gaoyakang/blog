'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KangCharacterLoading } from "@/components/layout/KangCharacterLoading";

interface BackButtonProps {
  href: string;
  ariaLabel: string;
}

export function BackButton({ href, ariaLabel }: BackButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setIsLoading(true);
    router.push(href);
  };

  return (
    <>
      {isLoading && <KangCharacterLoading />}
      <button
        onClick={handleClick}
        className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        aria-label={ariaLabel}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 14 4 9l5-5M4 9h11a5 5 0 015 5v1"
          />
        </svg>
      </button>
    </>
  );
}