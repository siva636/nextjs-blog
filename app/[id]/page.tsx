import ReactMarkdown from 'react-markdown';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import PublishForm from './publish/publish-form';
import DeleteDraftForm from './delete/delete-draft-form';
import DeletePostForm from './delete/delete-post-form';
import Loading from './loading';

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
    <div className='prose dark:prose-invert'>
      <h2>{title}</h2>
      <p>By {post?.author?.name || 'Unknown author'}</p>
      <ReactMarkdown children={post?.content} />
      {post?.id &&
        post?.published &&
        userHasValidSession &&
        postBelongsToUser && (
          <div className='flex gap-1'>
            <DeletePostForm id={post.id} />
          </div>
        )}
      {post?.id &&
        !post?.published &&
        userHasValidSession &&
        postBelongsToUser && (
          <div className='flex gap-1'>
            <PublishForm id={post.id} />
            <DeleteDraftForm id={post.id} />
          </div>
        )}
    </div>
  );
}
