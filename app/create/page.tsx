'use client';
import React, { useState } from 'react';
import styles from './create.module.css';
import { useRouter } from 'next/navigation';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const router = useRouter();

  const submitData = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    try {
      const body = { title, content };
      await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      router.push('/drafts');
    } catch (error) {
      console.error('error...', error);
    }
  };

  return (
    <div className={styles.page}>
      <form onSubmit={submitData}>
        <h1>New Draft</h1>
        <input
          autoFocus
          onChange={(e) => setTitle(e.target.value)}
          placeholder='Title'
          type='text'
          value={title}
        />
        <textarea
          cols={50}
          onChange={(e) => setContent(e.target.value)}
          placeholder='Content'
          rows={8}
          value={content}
        />
        <input
          disabled={!content || !title}
          type='submit'
          value='Save as draft'
        ></input>
        <button className={styles.back} onClick={() => router.push('/')}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default Create;
