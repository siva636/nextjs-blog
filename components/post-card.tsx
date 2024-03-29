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

const PostCard: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title.substring(0, 20)}</CardTitle>
        <CardDescription>By {authorName}</CardDescription>
      </CardHeader>
      <CardContent>{`${post.content.substring(0, 50)}...`}</CardContent>
      <CardFooter>
        <Button variant='outline' asChild>
          <Link href={post.id}>
            Read more <ChevronRightIcon className='h-4 w-4' />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
