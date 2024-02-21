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
    <html lang='en' className='px-16'>
      <body className={`${inter.className} bg-gray-100`}>
        <HeaderWrap />
        {children}
        <Footer />
      </body>
    </html>
  );
}

function Footer() {
  return (
    <div className='my-10 border-t border-black'>
      <div className='text-center'>
        Next.js Blogging Application by @siva636
      </div>
      <div className='text-center'>&copy; 2024</div>
    </div>
  );
}
