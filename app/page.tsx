import prisma from '@/lib/prisma';
import Post from '@/components/post';
import { cache } from 'react';
import PostCard from '@/components/post-card';

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
      <div className='prose mb-2'>
        <h1>Public Feed</h1>
      </div>
      <main className='flex flex-wrap justify-start gap-2'>
        {feed.map((post: any) => (
          <div key={post.id} className='w-60 h-60'>
            <PostCard post={post} />
          </div>
        ))}
      </main>
    </div>
  );
}
