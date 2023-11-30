'use client';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    pathname === currentPathname;

  const { data: session, status } = useSession();

  let left = (
    <div className='flex justify-start items-center gap-1'>
      <Link href='/' data-active={isActive('/')} className='button'>
        Feed
      </Link>
    </div>
  );
  let right = <div></div>;

  if (status === 'loading') {
    right = (
      <div className='flex justify-start items-center gap-1'>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className='flex justify-start items-center gap-1'>
        <Link href='/api/auth/signin' className='button'>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className='flex justify-start items-center gap-1'>
        <Link href='/' data-active={isActive('/')} className='button'>
          Feed
        </Link>
        <Link
          href='/drafts'
          data-active={isActive('/drafts')}
          className='button'
        >
          My drafts
        </Link>
        <Link
          href='/create'
          data-active={isActive('/create')}
          className='button'
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

        <button className='button' onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className='nav flex justify-start items-center gap-1 my-4'>
      {left}
      <div className='flex-auto'></div>
      {right}
    </nav>
  );
};

export default Header;
