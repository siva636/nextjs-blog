import React from 'react';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import styles from './post.module.css';

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
    <div className={styles.post}>
      <Link href={post.id}>
        <h2>{post.title}</h2>
        <small>By {authorName}</small>
        <ReactMarkdown children={post.content} />
      </Link>
    </div>
  );
};

export default Post;
