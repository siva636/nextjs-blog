'use client';

import { useFormStatus } from 'react-dom';
import { primaryActionClasses } from '@/app/utils/style-utils';
import CircularProgressIndicator from '@/components/circular-progress-indicator';
import { Button } from '@/components/button';

export default function PublishButton() {
  const { pending } = useFormStatus();

  return (
    <Button type='submit' className={primaryActionClasses()} disabled={pending}>
      {pending ? (
        <div className='flex justify-center items-center'>
          <CircularProgressIndicator /> Publishing...
        </div>
      ) : (
        'Publish'
      )}
    </Button>
  );
}
