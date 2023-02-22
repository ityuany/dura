import { PropsWithChildren, memo } from 'react';
import { store, change, ch } from '../store';
import { getUntracked } from '@dura/core';

export default memo(function ItemX(props: PropsWithChildren<{}>) {
  const state = store.useState();
  console.log('renderx');
  return (
    <div>
      <button onClick={() => ch()}>hello</button>
      <span>{state.user.name}</span>
    </div>
  );
});
