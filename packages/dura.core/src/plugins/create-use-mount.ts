import type { Api } from '../typings';
import { useEffect } from 'react';
export function createUseMount(api: Api) {
  const { has, add, refresh } = api.storeManager;
  return function useMount() {
    !has() && add();
    useEffect(() => refresh(), []);
  };
}
