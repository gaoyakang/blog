"use client";

import { useState, useEffect } from "react";

export interface TocItem {
  id: string;
  text: string;
  level: number;
  children?: TocItem[];
}

interface TableOfContentsProps {
  items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-100px 0px -50% 0px" }
    );

    document.querySelectorAll("h1, h2, h3").forEach((heading) => {
      observer.observe(heading);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const renderItems = (items: TocItem[], level: number = 1) => {
    if (items.length === 0) return null;

    const paddingLeft = level === 1 ? "pl-0" : level === 2 ? "pl-4" : "pl-8";

    return (
      <ul className={`list-none ${paddingLeft}`}>
        {items.map((item) => (
          <li key={item.id} className="mb-1">
            <button
              onClick={() => scrollToHeading(item.id)}
              className={`inline-block text-left px-3 py-1.5 rounded-lg transition-all duration-200 ${
                activeId === item.id
                  ? "bg-[var(--border)] text-[var(--text-primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:bg-[var(--border)] hover:text-[var(--text-primary)]"
              }`}
              style={{
                fontSize: level === 1 ? "0.85rem" : level === 2 ? "0.8rem" : "0.75rem",
                fontWeight: level === 1 ? 500 : level === 2 ? 400 : 400,
              }}
            >
              {item.text}
            </button>
            {item.children && item.children.length > 0 && renderItems(item.children, level + 1)}
          </li>
        ))}
      </ul>
    );
  };

  if (items.length === 0) {
    return null;
  }

  return (
    <div>
      <h2 className="text-xs font-semibold text-[var(--text-primary)] mb-4 uppercase tracking-wider">
        On This Page
      </h2>
      <div className="space-y-1">
        {renderItems(items)}
      </div>
    </div>
  );
}
