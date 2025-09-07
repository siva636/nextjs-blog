import React from 'react';
import { deletePost } from '@/app/utils/actions';
import DeleteButton from './delete-button';

export default function DeletePostForm(props: { id: string }) {
  return (
    <form action={deletePost}>
      <input type='hidden' name='id' value={props.id} />
      <DeleteButton />
    </form>
  );
}
