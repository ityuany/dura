import { PropsWithChildren, memo } from 'react';
import { store, change } from '../store';
import { getUntracked } from '@dura/core';

export default memo(function Item(
  props: PropsWithChildren<{
    item: { id: number; value: string };
  }>,
) {
  console.log('render');
  return (
    <div>
      <button onClick={() => change(props.item.id)}>点击我</button>
      <span>{props.item.value}</span>
    </div>
  );
});
