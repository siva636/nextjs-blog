'use client';
import React from 'react';
import Link from 'next/link';
// import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
import styles from './header.module.css';

const Header: React.FC = () => {
  // const router = useRouter();
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    // router.pathname === pathname;
    pathname === currentPathname;

  let left = (
    <div className={styles.left}>
      <Link href='/' legacyBehavior>
        <a className={styles.bold} data-active={isActive('/')}>
          Feed
        </a>
      </Link>
    </div>
  );

  let right = null;

  return (
    <nav className={styles.nav}>
      {left}
      {right}
    </nav>
  );
};

export default Header;
