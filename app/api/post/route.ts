import { auth } from '@/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  const { title, content } = await req.json();
  const session = await auth();

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
      author: { connect: { email: session?.user?.email || '' } },
    },
  });
  Response.json(result);
}
