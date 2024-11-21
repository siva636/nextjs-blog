'use client';
import React from 'react';
import { signOut, useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import { Button, buttonVariants } from '../ui/button';
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
import { Avatar, AvatarFallback } from '../ui/avatar';

export default function HeaderClient() {
  const pathName = usePathname();
  const isActive: (pathname: string) => boolean = (currentPathname) =>
    pathName === currentPathname;

  const { data: session, status } = useSession();

  let left = (
    <>
      <div className='flex justify-start items-center gap-1'>
        <Link
          href='/'
          className={`${buttonVariants({ variant: 'link' })} ${
            pathName.includes('/feed') ? 'underline font-extrabold' : ''
          }`}
        >
          Feed
        </Link>

        {session && (
          <div className='flex justify-start items-center gap-1'>
            <Link
              href='/drafts'
              className={`${buttonVariants({ variant: 'link' })} ${
                isActive('/drafts') ? 'underline font-extrabold' : ''
              }`}
            >
              My drafts
            </Link>
            <Link
              href='/create'
              className={`${buttonVariants({ variant: 'link' })} ${
                isActive('/create') ? 'underline font-extrabold' : ''
              }`}
            >
              New post
            </Link>
          </div>
        )}
      </div>
    </>
  );

  let right = (
    <>
      {!session && (
        <div className='flex justify-start items-center gap-1'>
          <ThemeChooser />
          <Link
            href='/api/auth/signin'
            className={buttonVariants({ variant: 'link' })}
          >
            Log in
          </Link>
        </div>
      )}

      {session && (
        <div className='flex justify-start items-center gap-1'>
          <ThemeChooser />
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className='cursor-pointer dark:invert'>
                <AvatarFallback>
                  {session!.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className='m-2'>
              <Card className='border-0 drop-shadow-none'>
                <CardHeader>
                  <CardTitle>{session!.user?.name}</CardTitle>
                  <CardDescription>{session!.user?.email}</CardDescription>
                </CardHeader>
                <CardFooter>
                  <Button variant='ghost' onClick={() => signOut()}>
                    Log out
                  </Button>
                </CardFooter>
              </Card>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </>
  );

  return (
    <nav className='nav flex flex-col md:flex-row justify-between items-end gap-1 mt-1 mb-5 py-4'>
      {left}
      {right}
    </nav>
  );
}
