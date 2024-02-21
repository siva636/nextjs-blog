import React from 'react';
import Link from 'next/link';

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
    <div className='overflow-scroll w-60 h-60 border border-gray-400 hover:bg-sky-50 bg-white rounded p-8 prose prose-a:no-underline'>
      <Link href={post.id}>
        <h2>{post.title.substring(0, 20)}</h2>
        <small>By {authorName}</small>
        <div>{`${post.content.substring(0, 30)}...`}</div>
      </Link>
    </div>
  );
};

export default PostCard;
