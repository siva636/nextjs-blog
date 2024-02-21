'use client';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { primaryActionClasses } from '@/app/utils/style-utils';
import CircularProgressIndicator from './circular-progress-indicator';

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
        className={primaryActionClasses()}
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
        <Link href='/api/auth/signin' className={primaryActionClasses()}>
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
          className={primaryActionClasses()}
        >
          Feed
        </Link>
        <Link
          href='/drafts'
          data-active={isActive('/drafts')}
          className={primaryActionClasses()}
        >
          My drafts
        </Link>
        <Link
          href='/create'
          data-active={isActive('/create')}
          className={primaryActionClasses()}
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

        <button className={primaryActionClasses()} onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className='nav flex flex-col md:flex-row justify-between items-end gap-1 mt-2 mb-10 py-4 border-b border-black'>
      {left}
      {right}
    </nav>
  );
}
