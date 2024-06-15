import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import type { NextAuthConfig } from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const authConfig = {
  debug: true,
  // adapter: PrismaAdapter(prisma),
  // session: { strategy: 'jwt' },
  providers: [Google, GitHub],
  callbacks: {
    authorized(params) {
      return !!params.auth?.user;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);
