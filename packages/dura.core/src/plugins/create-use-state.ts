import { useDebugValue, useRef } from 'react';
import { useSyncExternalStoreWithSelector } from 'use-sync-external-store/shim/with-selector';
import type { Api, AnyFn } from '../typings';
import { createProxy, isChanged } from 'proxy-compare';

export type FactoryFn<T> = () => T;


export function useCreation<T, D>(factory: FactoryFn<T>, deps: D[]): T {
  const { current } = useRef({
    deps,
    obj: undefined as undefined | T,
    initialized: false,
  });
  if (current.initialized === false || !depsAreSame(current.deps, deps)) {
    current.deps = deps;
    current.obj = factory();
    current.initialized = true;
  }
  return current.obj!;
}

export function depsAreSame(oldDeps: any[], deps: any[]): boolean {
  if (oldDeps === deps) return true;
  for (const i in oldDeps) {
    if (oldDeps[i] !== deps[i]) {
      return false;
    }
  }
  return true;
}

export function createUseState(api: Api) {
  const {
    storeManager: { reduxStore },
  } = api;

  return function useState(selector: AnyFn = api.getState) {
    const cache = useCreation(() => {
      return new WeakMap();
    }, []);

    const slice = useSyncExternalStoreWithSelector(
      reduxStore.subscribe,
      api.getState,
      api.getState,
      selector,
      (a, b) => !isChanged(a, b, cache),
    );

    const ref = useRef(slice);
    ref.current = null;
    ref.current = createProxy(slice, cache);

    useDebugValue(slice);

    return ref.current;
  };
}
