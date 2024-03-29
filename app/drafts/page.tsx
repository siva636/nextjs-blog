import React from 'react';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import Post from '@/components/post';
import PostCard from '@/components/post-card';

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
    <>
      <div className='prose'>
        <h1>My Drafts</h1>
        <div></div>
      </div>
      <main className='flex flex-wrap justify-start gap-2'>
        {drafts.map((post: any) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </main>
    </>
  );
};

export default Drafts;
