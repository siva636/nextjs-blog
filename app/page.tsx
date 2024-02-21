import prisma from '@/lib/prisma';
import Post from '@/components/post';
import { cache } from 'react';

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
    <div className='prose'>
      <h1>Public Feed</h1>
      <main className='space-y-4'>
        {feed.map((post: any) => (
          <div key={post.id}>
            <Post post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}
