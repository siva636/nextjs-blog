import type { Metadata } from 'next';
import LayoutClient from '@/components/layout/layout-client';

export const metadata: Metadata = {
  title: 'Blog app',
  description:
    'A Blogging App Using NextJS, Vercel Postgres, Prisma and NextAuth',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutClient>{children}</LayoutClient>;
}
