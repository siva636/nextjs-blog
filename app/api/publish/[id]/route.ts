import prisma from '@/lib/prisma';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const postId = params.id;

  const post = await prisma.post.update({
    where: { id: postId },
    data: { published: true },
  });
  return Response.json(post);
}
