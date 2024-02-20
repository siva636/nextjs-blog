'use client';

import { useFormStatus } from 'react-dom';
import { primaryActionClasses } from '@/app/utils/style-utils';
import CircularProgressIndicator from '@/components/circular-progress-indicator';

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <button type='submit' className={primaryActionClasses()} disabled={pending}>
      {pending ? (
        <div className='flex justify-center items-center'>
          <CircularProgressIndicator /> Publishing...
        </div>
      ) : (
        'Publish'
      )}
    </button>
  );
}
