'use client';

import { useEffect, useState, useRef } from 'react';

export function KangCharacterLoading() {
  const [isVisible, setIsVisible] = useState(true);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    hasAnimatedRef.current = false;
    
    const timer = setTimeout(() => {
      hasAnimatedRef.current = true;
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  if (!isVisible && hasAnimatedRef.current) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[var(--bg-primary)]">
      <svg
        viewBox="-20 -20 140 140"
        className="w-24 h-24"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
      <path d="M 40 8 L 37 2" style={{strokeDasharray: "8", strokeDashoffset: "8", animation: "draw 0.04s ease 0s forwards"}} />
      <path d="M 15 20 H 65" style={{strokeDasharray: "50", strokeDashoffset: "50", animation: "draw 0.1s ease 0.04s forwards"}} />
      <path d="M 15 20 L -5 90" style={{strokeDasharray: "75", strokeDashoffset: "75", animation: "draw 0.17s ease 0.16s forwards"}} />
      <path d="M 20 35 H 60" style={{strokeDasharray: "40", strokeDashoffset: "40", animation: "draw 0.1s ease 0.32s forwards"}} />
      <path d="M 60 35 V 55" style={{strokeDasharray: "20", strokeDashoffset: "20", animation: "draw 0.06s ease 0.42s forwards"}} />
      <path d="M 25 45 H 65" style={{strokeDasharray: "40", strokeDashoffset: "40", animation: "draw 0.1s ease 0.48s forwards"}} />
      <path d="M 20 55 H 60" style={{strokeDasharray: "40", strokeDashoffset: "40", animation: "draw 0.1s ease 0.58s forwards"}} />
      <path d="M 40 25 V 98" style={{strokeDasharray: "73", strokeDashoffset: "73", animation: "draw 0.17s ease 0.68s forwards"}} />
      <path d="M 40 98 L 30 88" style={{strokeDasharray: "14", strokeDashoffset: "14", animation: "draw 0.05s ease 0.85s forwards", opacity: 0, animationFillMode: "forwards"}} />
      <path d="M 20 75 H 40" style={{strokeDasharray: "20", strokeDashoffset: "20", animation: "draw 0.06s ease 0.9s forwards", opacity: 0, animationFillMode: "forwards"}} />
      <path d="M 40 75 L 17 98" style={{strokeDasharray: "32", strokeDashoffset: "32", animation: "draw 0.08s ease 0.96s forwards", opacity: 0, animationFillMode: "forwards"}} />
      <path d="M 40 75 L 55 71" style={{strokeDasharray: "16", strokeDashoffset: "16", animation: "draw 0.05s ease 1.04s forwards", opacity: 0, animationFillMode: "forwards"}} />
      <path d="M 40 75 L 68 98" style={{strokeDasharray: "34", strokeDashoffset: "34", animation: "draw 0.08s ease 1.09s forwards", opacity: 0, animationFillMode: "forwards"}} />
      <circle cx="40" cy="55" r="55" style={{strokeDasharray: "346", strokeDashoffset: "346", animation: "draw 0.3s ease 1.17s forwards", opacity: 0, animationFillMode: "forwards"}} />
    </svg>
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
