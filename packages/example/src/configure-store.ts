import { configure } from '@dura/core';
import { createStore } from 'redux';

const legoAkEnhancer = configure({
  onError: (e) => {
    // 发送给 埋点
    console.error(e);
  },
});

export const reduxStore = createStore((state = {}) => state, legoAkEnhancer);
