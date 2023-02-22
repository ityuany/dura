import { reduxStore } from '@/configure-store';
import { times } from 'lodash-es';

export const store = reduxStore.create({
  namespace: 'xxx',
  initialState: {
    user: {
      name: 'zs',
    },
    list: times(10000).map((x) => ({ id: x, value: `name${x}` })),
  },
});

export const change = store.define((setState) => (id: number) => {
  setState((state) => {
    const value = state.list.find((x) => x.id === id)!;
    value.value = `name${Math.random()}`;
  });
});

export const ch = store.define((setState) => () => {
  setState((state) => {
    state.user.name = 'lx' + Math.random();
  });
});

export const ch2 = store.define((setState) => () => {
  setState((state) => {
    state.user.name = 'lx';
  });
});
