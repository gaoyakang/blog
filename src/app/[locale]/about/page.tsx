import { Metadata } from 'next';
import { AboutContent } from '@/components/content/AboutContent';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about me and this blog',
};

export default function AboutPage() {
  return <AboutContent />;
}
