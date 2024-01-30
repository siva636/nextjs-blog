import React from 'react';
import ReactMarkdown from 'react-markdown';
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

const Post: React.FC<{ post: PostProps }> = ({ post }) => {
  const authorName = post.author ? post.author.name : 'Unknown author';
  return (
    <div className='border border-gray-400 hover:bg-sky-50 bg-white rounded p-8 prose prose-a:no-underline'>
      <Link href={post.id}>
        <h2>{post.title}</h2>
        <small>By {authorName}</small>
        <ReactMarkdown children={post.content} />
      </Link>
    </div>
  );
};

export default Post;
