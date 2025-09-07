import React from 'react';
import { publishDraft } from '@/app/utils/actions';
import PublishButton from './publish-button';

export default function PublishForm(props: { id: string }) {
  return (
    <form action={publishDraft}>
      <input type='hidden' name='id' value={props.id} />
      <PublishButton />
    </form>
  );
}
