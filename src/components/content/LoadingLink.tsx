'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { KangCharacterLoading } from "@/components/layout/KangCharacterLoading";

interface LoadingLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function LoadingLink({ href, children, className = "" }: LoadingLinkProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsLoading(true);
    router.push(href);
  };

  return (
    <>
      {isLoading && <KangCharacterLoading />}
      <a
        href={href}
        onClick={handleClick}
        className={className}
      >
        {children}
      </a>
    </>
  );
}