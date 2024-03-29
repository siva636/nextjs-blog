'use client';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { secondaryActionClasses } from '@/app/utils/style-utils';
import CircularProgressIndicator from './circular-progress-indicator';
import { Button } from '@/components/button';

export default function Header() {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    pathname === currentPathname;

  const { data: session, status } = useSession();

  let left = (
    <div className='flex justify-start items-center gap-1'>
      <Link
        href='/'
        data-active={isActive('/')}
        className={secondaryActionClasses()}
      >
        Feed
      </Link>
    </div>
  );
  let right = <div></div>;

  if (status === 'loading') {
    right = (
      <div className='flex justify-start items-center gap-1'>
        <CircularProgressIndicator />
      </div>
    );
  }

  if (!session) {
    right = (
      <div className='flex justify-start items-center gap-1'>
        <Link href='/api/auth/signin' className={secondaryActionClasses()}>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className='flex justify-start items-center gap-1'>
        <Link
          href='/'
          data-active={isActive('/')}
          className={secondaryActionClasses()}
        >
          Feed
        </Link>
        <Link
          href='/drafts'
          data-active={isActive('/drafts')}
          className={secondaryActionClasses()}
        >
          My drafts
        </Link>
        <Link
          href='/create'
          data-active={isActive('/create')}
          className={secondaryActionClasses()}
        >
          New post
        </Link>
      </div>
    );
    right = (
      <div className='flex justify-start items-center gap-1'>
        <p>
          {session.user?.name} ({session.user?.email})
        </p>

        <Button variant='secondary' onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    );
  }

  return (
    <nav className='nav flex flex-col md:flex-row justify-between items-end gap-1 mt-2 mb-10 py-4'>
      {left}
      {right}
    </nav>
  );
}
