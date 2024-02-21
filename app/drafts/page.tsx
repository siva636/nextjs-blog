import React from 'react';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import Post from '@/components/post';

const Drafts = async () => {
  const session = await auth();

  const drafts = await prisma.post.findMany({
    where: {
      author: { email: session?.user?.email },
      published: false,
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  return (
    <div className='prose'>
      <h1>My Drafts</h1>
      <main className='space-y-4'>
        {drafts.map((post: any) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Drafts;
