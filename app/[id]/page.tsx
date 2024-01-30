import ReactMarkdown from 'react-markdown';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';
import Publish from './publish';

const page = async ({ params }: { params: { id: string } }) => {
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
    <div className='prose'>
      <h2>{title}</h2>
      <p>By {post?.author?.name || 'Unknown author'}</p>
      <ReactMarkdown children={post?.content} />
      {post?.id &&
        !post?.published &&
        userHasValidSession &&
        postBelongsToUser && <Publish id={post.id} />}
    </div>
  );
};

export default page;
