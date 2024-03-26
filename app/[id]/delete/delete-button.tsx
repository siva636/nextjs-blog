'use client';

import { useFormStatus } from 'react-dom';
import { primaryActionClasses } from '@/app/utils/style-utils';
import CircularProgressIndicator from '@/components/circular-progress-indicator';
import { Button } from '@/components/button';

export default function DeleteButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' disabled={pending} variant='warn'>
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
