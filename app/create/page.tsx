'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  primaryActionClasses,
  secondaryActionClasses,
} from '../utils/style-utils';

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
    <form className='prose flex flex-col space-y-2' onSubmit={submitData}>
      <h1>New draft</h1>
      <input
        className='rounded border border-gray-400'
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        type='text'
        value={title}
      />
      <textarea
        className='rounded border border-gray-400'
        cols={50}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Content'
        rows={8}
        value={content}
      />
      <div className='flex gap-1'>
        <input
          className={primaryActionClasses()}
          disabled={!content || !title}
          type='submit'
          value='Save as draft'
        ></input>
        <button
          className={secondaryActionClasses()}
          onClick={() => router.push('/')}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default Create;
