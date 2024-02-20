import React from 'react';
import { publishDraft } from '../utils/actions';
import Submit from './submit';

export default function Publish(props: { id: string }) {
  return (
    <form action={publishDraft}>
      <input type='hidden' name='id' value={props.id} />
      <Submit />
    </form>
  );
}
