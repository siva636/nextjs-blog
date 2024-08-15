'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prisma';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { pageSize } from './constants';

export async function getFeed(page: string | undefined) {
  const pageNumber =
    Number(page) === 0 || isNaN(Number(page)) ? 1 : Number(page);
  try {
    return await prisma.post.findMany({
      skip: pageSize * (pageNumber - 1),
      take: pageSize,
      where: { published: true },
      include: {
        author: {
          select: { name: true },
        },
      },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
}

export async function getCount() {
  try {
    return await prisma.post.count({
      where: { published: true },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
}

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

  try {
    await prisma.post.create({
      data: {
        ...data,
        author: { connect: { email: session?.user?.email || '' } },
      },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
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

  try {
    await prisma.post.create({
      data: {
        ...data,
        author: { connect: { email: session?.user?.email || '' } },
        published: true,
      },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
  redirect('/drafts');
}

export async function publishDraft(formData: FormData) {
  const session = await auth();

  try {
    await prisma.post.update({
      where: { id: formData.get('id') as string },
      data: { published: true },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
  redirect('/');
}

export async function deleteDraft(formData: FormData) {
  const session = await auth();

  try {
    await prisma.post.delete({
      where: { id: formData.get('id') as string },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
  redirect('/drafts');
}

export async function deletePost(formData: FormData) {
  const session = await auth();

  try {
    await prisma.post.delete({
      where: { id: formData.get('id') as string },
    });
  } catch (e) {
    console.log(e);
    throw Error('Database error');
  }
  redirect('/');
}
