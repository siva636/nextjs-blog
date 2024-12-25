import { Suspense } from 'react';
import Loading from './loading';
import FeedPagination from '@/components/feed-pagination';
import { getCount, getFeed } from '@/app/utils/actions';
import { pageSize } from '@/app/utils/constants';
import { Button } from '@/components/ui/button';
import { ChevronRightIcon } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return [{ page: '1' }];
}

export default function Home({ params }: { params: { page: string } }) {
  return (
    <>
      <div className='prose dark:prose-invert'></div>
      <Suspense key={params.page} fallback={<Loading />}>
        <HomeContents page={params.page} />
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
      <main
        className='grid gap-5'
        style={{
          'grid-template-columns': 'repeat(auto-fill, minmax(300px, 1fr))',
        }}
      >
        {feed.map((post: any) => (
          <article
            key={post.id}
            className='bg-gray-200 rounded-2xl prose grid'
            style={{
              'grid-template-rows':
                '300px min-content min-content 1fr min-content',
            }}
          >
            <img
              className='rounded-t-2xl w-full h-full object-cover'
              src={post.url}
              alt={`Image not available for ${post.title}`}
            />
            <section className='font-thin px-3 pt-1 pb-0 m-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
              Posted by {post.author?.name}
            </section>
            <h2 className='px-3 py-0 mt-[-8px] mb-0 mx-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
              {post.title}
            </h2>
            <section className='px-3 py-5 overflow-hidden text-ellipsis'>
              {`${post.content?.substring(0, 200).trim()}...`}
            </section>
            <Button
              className='rounded-b-2xl rounded-t-none'
              variant='default'
              asChild
            >
              <Link className='no-underline' href={`/${post.id}`}>
                Read more
                <ChevronRightIcon className='h-4 w-4' />
              </Link>
            </Button>
          </article>
        ))}
      </main>
      <nav className='my-8'>
        <FeedPagination pages={pages} />
      </nav>
    </>
  );
}
