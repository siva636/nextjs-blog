import React from 'react';
import ReactMarkdown from 'react-markdown';
import styles from './post.module.css';
import prisma from '@/lib/prisma';

const page = async ({ params }: { params: { id: string } }) => {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true },
      },
    },
  });

  let title = post?.title;
  if (!post?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <div className='layout'>
      <div className={styles.page}>
        <h2>{title}</h2>
        <p>By {post?.author?.name || 'Unknown author'}</p>
        <ReactMarkdown children={post?.content} />
      </div>
    </div>
  );
};

export default page;
