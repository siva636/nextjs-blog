import PostCard from '@/components/post-card';
import { Suspense } from 'react';
import Loading from './loading';
import FeedPagination from '@/components/feed-pagination';
import { pageSize } from './utils/constants';
import { getCount, getFeed } from './utils/actions';

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string | undefined };
}) {
  return (
    <>
      <div className='prose dark:prose-invert'>
        <h1 className='mb-4'>Public Feed</h1>
      </div>
      <Suspense key={searchParams.page} fallback={<Loading />}>
        <HomeContents page={searchParams.page} />
      </Suspense>
    </>
  );
}

async function HomeContents({ page }: { page: string | undefined }) {
  const feed = await getFeed(page);
  const count = await getCount();
  const pages = Math.ceil(count / pageSize);

  return (
    <>
      <main className='flex flex-wrap justify-start gap-2'>
        {feed.map((post: any) => (
          <div key={post.id}>
            <PostCard post={post} />
          </div>
        ))}
      </main>
      <div className='my-8'>
        <FeedPagination pages={pages} />
      </div>
    </>
  );
}
