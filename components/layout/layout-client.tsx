import Header from '@/components/layout/header';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import { ThemeProvider } from 'next-themes';
import Footer from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen font-sans antialiased px-4',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='dark'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          <div className='p-16 bg-gray-100 dark:bg-gray-800 rounded-lg'>
            {children}
          </div>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
