'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  primaryActionClasses,
  secondaryActionClasses,
} from '@/app/utils/style-utils';
import { createDraft } from '@/app/utils/actions';
import { useFormState, useFormStatus } from 'react-dom';

const Create = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, createDraftAction] = useFormState(createDraft, null);

  return (
    <form className='prose flex flex-col space-y-2' action={createDraftAction}>
      <h1>New draft</h1>
      <input
        required
        name='title'
        className='rounded border border-gray-400'
        autoFocus
        onChange={(e) => setTitle(e.target.value)}
        placeholder='Title'
        type='text'
        value={title}
      />
      <div className='text-sm text-red-500 pb-2'>{error?.title}</div>
      <textarea
        required
        name='content'
        className='rounded border border-gray-400'
        cols={50}
        onChange={(e) => setContent(e.target.value)}
        placeholder='Content'
        rows={8}
        value={content}
      />
      <div className='text-sm text-red-500 pb-2'>{error?.content}</div>
      <Submit />
    </form>
  );
};

export default Create;

function Submit() {
  const { pending } = useFormStatus();
  const router = useRouter();

  return (
    <div className='flex gap-1'>
      <button
        className={primaryActionClasses()}
        type='submit'
        disabled={pending}
      >
        {pending ? 'Saving...' : 'Save as draft'}
      </button>
      <button
        className={secondaryActionClasses()}
        onClick={() => router.push('/')}
      >
        Cancel
      </button>
    </div>
  );
}
