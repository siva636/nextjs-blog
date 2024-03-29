'use client';

import { useFormStatus } from 'react-dom';
import CircularProgressIndicator from '@/components/circular-progress-indicator';
import { Button } from '@/components/ui/button';

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} variant='destructive'>
      {pending ? (
        <div className='flex justify-center items-center'>
          <CircularProgressIndicator /> Deleting...
        </div>
      ) : (
        'Delete'
      )}
    </Button>
  );
}
