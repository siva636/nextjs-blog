import React from 'react';
import { primaryActionClasses } from '../utils/style-utils';
import { publishDraft } from '../utils/actions';

export default function Publish(props: { id: string }) {
  return (
    <form action={publishDraft}>
      <input type='hidden' name='id' value={props.id} />
      <button type='submit' className={primaryActionClasses()}>
        Publish
      </button>
    </form>
  );
}
