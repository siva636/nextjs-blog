import PostCardLoadingSkeleton from '@/components/post-card-loading-skeleton';

export default function Loading() {
  return (
    <div className='flex flex-wrap justify-start gap-2'>
      {Array(5)
        .fill(<PostCardLoadingSkeleton />)
        .map((x) => x)}
    </div>
  );
}
