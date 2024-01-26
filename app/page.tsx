import prisma from '@/lib/prisma';
import styles from './feed.module.css';
import Post from '@/components/Post';
import { cache } from 'react';
import LoadingSkeleton from '@/components/loading-skeleton';

export const revalidate = 10;

export default async function Home() {
  const getFeed = cache(async () => {
    const feed = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
    return feed;
  });

  const feed = await getFeed();
  return (
    <div>
      <h1>Public Feed</h1>
      <main>
        {feed.map((post: any) => (
          <div key={post.id} className={styles.post}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}
