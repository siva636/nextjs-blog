import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import PublishForm from './publish/publish-form';
import DeleteDraftForm from './delete/delete-draft-form';
import DeletePostForm from './delete/delete-post-form';

export default async function Page({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({
    where: {
      id: String(params?.id),
    },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  const session = await auth();
  const userHasValidSession = Boolean(session);
  const postBelongsToUser = session?.user?.email === post?.author?.email;

  let title = post?.title;
  if (!post?.published) {
    title = `${title} (Draft)`;
  }

  return (
    <article className='flex flex-col md:flex-row bg-gray-200 rounded-2xl'>
      <section
        className='rounded-t-2xl md:rounded-bl-2xl md:rounded-tr-none'
        style={{ flex: '1 1 40%' }}
      >
        <img
          className='h-full w-full rounded-t-2xl md:rounded-bl-2xl md:rounded-tr-none object-cover'
          src={post?.url ? post.url : ''}
          alt={'Image not available'}
        />
      </section>
      <section className='flex flex-col min-h-full' style={{ flex: '1 1 60%' }}>
        <div className='font-thin px-3 pt-1 pb-0 m-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
          By {post?.author?.name || 'Unknown author'}
        </div>
        <div className='prose px-3 py-0 mt-[-8px] mb-0 mx-0 whitespace-nowrap w-[250px] overflow-hidden text-ellipsis'>
          <h2>{title}</h2>
        </div>

        <div className='prose mb-auto px-3 py-5 overflow-hidden text-ellipsis'>
          {post?.content}
        </div>
        {post?.id &&
          post?.published &&
          userHasValidSession &&
          postBelongsToUser && (
            <div className='flex gap-1 justify-end'>
              <div className='ml-auto m-2'>
                <DeletePostForm id={post.id} />
              </div>
            </div>
          )}
        {post?.id &&
          !post?.published &&
          userHasValidSession &&
          postBelongsToUser && (
            <div className='flex gap-1 justify-end'>
              <div className='ml-auto m-2'>
                <PublishForm id={post.id} />
              </div>
              <div className='m-2'>
                <DeleteDraftForm id={post.id} />
              </div>
            </div>
          )}
      </section>
    </article>
  );
}
