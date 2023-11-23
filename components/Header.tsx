'use client';
import React from 'react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import styles from './header.module.css';
import { usePathname } from 'next/navigation';

const Header: React.FC = () => {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    pathname === currentPathname;

  const { data: session, status } = useSession();

  let left = (
    <div className={styles.left}>
      <Link href='/' data-active={isActive('/')}>
        Feed
      </Link>
    </div>
  );
  let right = <div className={styles.right}></div>;

  if (status === 'loading') {
    right = (
      <div className={styles.right}>
        <p>Validating session ...</p>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className={styles.right}>
        <Link href='/api/auth/signin' className={styles.right}>
          Log in
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className={styles.left}>
        <Link href='/' data-active={isActive('/')}>
          Feed
        </Link>
        <Link href='/drafts' data-active={isActive('/drafts')}>
          My drafts
        </Link>
        <Link
          href='/create'
          data-active={isActive('/create')}
          className={styles.button}
        >
          New post
        </Link>
      </div>
    );
    right = (
      <div className={styles.right}>
        <p>
          {session.user?.name} ({session.user?.email})
        </p>

        <button className={styles.button} onClick={() => signOut()}>
          Log out
        </button>
      </div>
    );
  }

  return (
    <nav className={styles.nav}>
      {left}
      <div className={styles.gap}></div>
      {right}
    </nav>
  );
};

export default Header;
