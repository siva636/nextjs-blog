'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const blogSchema = z.object({
  title: z
    .string({ invalid_type_error: 'Enter a valid title' })
    .min(3, { message: 'Must be 3 or more characters long' }),
  content: z
    .string({ invalid_type_error: 'Enter valid content' })
    .min(10, { message: 'Must be 10 or more characters long' }),
});

export async function createDraft(previousState: any, formData: FormData) {
  const session = await auth();

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const passedData = blogSchema.safeParse(data);
  if (!passedData.success) {
    return passedData.error.flatten().fieldErrors;
  }

  const result = await prisma.post.create({
    data: {
      ...data,
      author: { connect: { email: session?.user?.email || '' } },
    },
  });

  redirect('/drafts');
}

export async function createPost(previousState: any, formData: FormData) {
  const session = await auth();

  const data = {
    title: formData.get('title') as string,
    content: formData.get('content') as string,
  };

  const passedData = blogSchema.safeParse(data);
  if (!passedData.success) {
    return passedData.error.flatten().fieldErrors;
  }

  const result = await prisma.post.create({
    data: {
      ...data,
      author: { connect: { email: session?.user?.email || '' } },
      published: true,
    },
  });

  redirect('/');
}

export async function publishDraft(formData: FormData) {
  const session = await auth();

  const post = await prisma.post.update({
    where: { id: formData.get('id') as string },
    data: { published: true },
  });

  redirect('/');
}
