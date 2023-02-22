import yayJpg from '../assets/yay.jpg';
import Item from './components/item';
import ItemX from './components/item-x';

import { store, ch, ch2 } from './store';
import { getUntracked } from '@dura/core';

export default function HomePage() {
  store.useMount();
  const state = store.useState();

  return (
    <div>
      <ItemX />
      {state.list.map((x) => (
        <Item item={x} key={x.id} />
      ))}
      {/* <button onClick={() => ch()}>hello</button>
      <button onClick={() => ch2()}>hello2</button>
      {state.name}
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p> */}
    </div>
  );
}
