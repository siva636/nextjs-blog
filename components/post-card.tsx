import React from 'react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from './ui/button';
import { ChevronRightIcon } from 'lucide-react';

export type PostProps = {
  id: string;
  title: string;
  author: {
    name: string;
    email: string;
  } | null;
  content: string;
  published: boolean;
};

export default function PostCard({ post }: { post: PostProps }) {
  const authorName = post.author ? post.author.name : 'Unknown author';
  return (
    <Card>
      <CardHeader>
        <CardTitle className='block whitespace-nowrap w-[200px] overflow-hidden text-ellipsis'>
          {post.title}
        </CardTitle>
        <CardDescription className='block whitespace-nowrap w-[200px] overflow-hidden text-ellipsis'>
          By {authorName}
        </CardDescription>
      </CardHeader>
      <CardContent className='block whitespace-nowrap w-[350px] overflow-hidden text-ellipsis'>
        {post.content}
      </CardContent>
      <CardFooter>
        <Button variant='outline' asChild>
          <Link href={`/${post.id}`}>
            Read more <ChevronRightIcon className='h-4 w-4' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
