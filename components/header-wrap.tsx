import { auth } from '@/auth';
import { SessionProvider } from 'next-auth/react';
import Header from '@/components/header';

export default async function HeaderWrap() {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <Header />
    </SessionProvider>
  );
}
