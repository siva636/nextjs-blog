'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} variant='destructive'>
      {pending ? (
        <div className='flex justify-center items-center'>
          <Loader2 className='animate-spin' /> Deleting...
        </div>
      ) : (
        'Delete'
      )}
    </Button>
  );
}
