import HeaderWrap from '@/components/header-wrap';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

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
  return (
    <html lang='en' className='px-4'>
      <body className={`${inter.className} bg-gray-100`}>
        <HeaderWrap />
        <div className='p-16 bg-white rounded-lg'> {children}</div>
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <div className='my-10 text-center text-gray-500 text-sm'>
      <div>Next.js Blogging Application by @siva636</div>
      <div>&copy; 2024</div>
    </div>
  );
}
