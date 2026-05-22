'use client';

import { useEffect, useState } from 'react';

interface PostViewsProps {
  slug: string;
}

const VIEWED_KEY = 'viewed_posts';
const VIEW_TIMEOUT = 24 * 60 * 60 * 1000; // 24小时

export function PostViews({ slug }: PostViewsProps) {
  const [views, setViews] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadViews = async () => {
      try {
        // 检查是否已经看过这篇文章
        const viewed = localStorage.getItem(VIEWED_KEY);
        let viewedPosts: Record<string, number> = viewed ? JSON.parse(viewed) : {};
        
        // 清理过期的记录
        const now = Date.now();
        Object.keys(viewedPosts).forEach(key => {
          if (now - viewedPosts[key] > VIEW_TIMEOUT) {
            delete viewedPosts[key];
          }
        });

        if (!viewedPosts[slug]) {
          // 需要增加阅读量，用 POST，同时返回更新后的值
          const res = await fetch('/api/view', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ slug }),
          });
          const data = await res.json();
          setViews(data.views || 0);
          
          // 记录这次访问
          viewedPosts[slug] = now;
          localStorage.setItem(VIEWED_KEY, JSON.stringify(viewedPosts));
        } else {
          // 不需要增加，直接 GET
          const res = await fetch(`/api/view?slug=${encodeURIComponent(slug)}`);
          const data = await res.json();
          setViews(data.views || 0);
        }
      } catch (error) {
        console.error('Error loading views:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadViews();
  }, [slug]);

  if (isLoading) {
    return null;
  }

  return (
    <span className="text-[var(--text-secondary)] text-[13px]">
      {views} 阅读
    </span>
  );
}
