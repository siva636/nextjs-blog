import prisma from '@/lib/prisma';
import PostCard from '@/components/post-card';
import Pagination from '@/components/pagination';

const pageSize = 5;

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  const feed = await getFeed(searchParams.page);
  const count = await getCount();
  const pages = Math.ceil(count / pageSize);

  return (
    <div>
      <div className='prose'>
        <h1>Public Feed</h1>
        <div></div>
      </div>
      <main className='flex flex-wrap justify-start gap-2'>
        {feed.map((post: any) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </main>
      <div className='my-8'>
        <Pagination pages={pages} />
      </div>
    </div>
  );
}

const getFeed = async (page: string | undefined) => {
  const pageNumber = page === undefined ? 1 : Number(page);
  const feed = await prisma.post.findMany({
    skip: pageSize * (pageNumber - 1),
    take: pageSize,
    where: { published: true },
    include: {
      author: {
        select: { name: true },
      },
    },
  });
  return feed;
};

const getCount = async () => {
  const count = await prisma.post.count({
    where: { published: true },
  });
  return count;
};
