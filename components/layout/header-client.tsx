'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import CircularProgressIndicator from '../circular-progress-indicator';
import { Button, buttonVariants } from '../ui/button';
import Image from 'next/image';
import Link from 'next/link';
import ThemeChooser from './theme-chooser';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

export default function HeaderClient() {
  const pathname = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    pathname === currentPathname;

  const { data: session, status } = useSession();

  let left = (
    <div className='flex justify-start items-center gap-1'>
      <Link
        href='/'
        data-active={isActive('/')}
        className={buttonVariants({ variant: 'outline' })}
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
        <ThemeChooser />
        <Link
          href='/api/auth/signin'
          className={buttonVariants({ variant: 'outline' })}
        >
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
          className={buttonVariants({ variant: 'outline' })}
        >
          Feed
        </Link>
        <Link
          href='/drafts'
          data-active={isActive('/drafts')}
          className={buttonVariants({ variant: 'outline' })}
        >
          My drafts
        </Link>
        <Link
          href='/create'
          data-active={isActive('/create')}
          className={buttonVariants({ variant: 'outline' })}
        >
          New post
        </Link>
      </div>
    );
    right = (
      <div className='flex justify-start items-center gap-1'>
        <ThemeChooser />
        <Popover>
          <PopoverTrigger asChild>
            <Image
              src='/account.png'
              width={32}
              className='rounded-full cursor-pointer'
              height={32}
              alt='Account image'
            />
          </PopoverTrigger>

          <PopoverContent className='mx-2'>
            <Card className='border-0 drop-shadow-none'>
              <CardHeader>
                <CardTitle>{session.user?.name}</CardTitle>
                <CardDescription>{session.user?.email}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button variant='outline' onClick={() => signOut()}>
                  Log out
                </Button>
              </CardFooter>
            </Card>
          </PopoverContent>
        </Popover>
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
