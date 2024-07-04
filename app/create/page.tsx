'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createDraft, createPost } from '@/app/utils/actions';
import { useFormState, useFormStatus } from 'react-dom';
import CircularProgressIndicator from '@/components/circular-progress-indicator';
import { Button } from '@/components/ui/button';

export default function Page() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [createPostError, createPostAction] = useFormState(createPost, null);
  const [createDraftError, createDraftAction] = useFormState(createDraft, null);

  return (
    <>
      <form
        className='prose dark:prose-invert flex flex-col space-y-2'
        action={createPostAction}
      >
        <h1>New post</h1>
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
        <div className='text-sm text-red-500 pb-2'>
          {createPostError?.title || createDraftError?.title}
        </div>
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
        <div className='text-sm text-red-500 pb-2'>
          {createPostError?.content || createDraftError?.content}
        </div>
        <Submit createDraftAction={createDraftAction} />
      </form>
    </>
  );
}

function Submit({
  createDraftAction,
}: {
  createDraftAction: (formData: FormData) => void;
}) {
  const { pending, data } = useFormStatus();
  const router = useRouter();
  const [isDraft, setIsDraft] = useState(false);

  function onCreatePost(e: any) {
    setIsDraft(false);
  }

  function onCreateDraft(e: any) {
    setIsDraft(true);
  }

  return (
    <div className='flex gap-1'>
      <Button type='submit' disabled={pending} onClick={onCreatePost}>
        {pending && !isDraft ? (
          <div className='flex justify-center items-center'>
            <CircularProgressIndicator /> Posting...
          </div>
        ) : (
          'Post'
        )}
      </Button>
      <Button
        type='submit'
        disabled={pending}
        formAction={createDraftAction}
        onClick={onCreateDraft}
      >
        {pending && isDraft ? (
          <div className='flex justify-center items-center'>
            <CircularProgressIndicator /> Saving...
          </div>
        ) : (
          'Save as draft'
        )}
      </Button>
      <Button variant='secondary' onClick={() => router.push('/')}>
        Cancel
      </Button>
    </div>
  );
}
