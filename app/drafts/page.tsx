import React from 'react';
import styles from './drafts.module.css';
import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import Post, { PostProps } from '@/components/Post';

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
    <div className={styles.page}>
      <h1>My Drafts</h1>
      <main>
        {drafts.map((post: any) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
};

export default Drafts;
