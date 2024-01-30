'use client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { primaryActionClasses } from '../utils/style-utils';

export default function Publish(props: { id: string }) {
  const router = useRouter();

  async function publishPost(): Promise<void> {
    await fetch(`/api/publish/${props.id}`, {
      method: 'PUT',
    });
    router.push('/');
  }

  return (
    <button
      className={primaryActionClasses()}
      onClick={() => {
        publishPost();
      }}
    >
      Publish
    </button>
  );
}
