'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

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
      onClick={() => {
        publishPost();
      }}
    >
      Publish
    </button>
  );
}
