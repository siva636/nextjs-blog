import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import HeaderClient from './header-client';

export default async function Header() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <HeaderClient />
    </SessionProvider>
  );
}
