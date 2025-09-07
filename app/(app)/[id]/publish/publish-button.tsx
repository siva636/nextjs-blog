'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending}>
      {pending ? (
        <div className='flex justify-center items-center'>
          <Loader2 className='animate-spin' /> Publishing...
        </div>
      ) : (
        'Publish'
      )}
    </Button>
  );
}
