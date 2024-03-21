import React from 'react';
import { deleteDraft } from '@/app/utils/actions';
import DeleteButton from './delete-button';

export default function DeleteDraftForm(props: { id: string }) {
  return (
    <form action={deleteDraft}>
      <input type='hidden' name='id' value={props.id} />
      <DeleteButton />
    </form>
  );
}
