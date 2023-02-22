export interface ConfigureOptions {
  onError?: (error: Error) => void;
}

export type SetStateFnArgs<S> = (state: S) => void;

export type SetStateFn<S> = (fn: SetStateFnArgs<S>) => void;

export type GetStateFn<S> = () => S;

export type AnyFn = (...args: any[]) => any;

export type FireFnArgs<S, F extends AnyFn> = (
  setState: SetStateFn<S>,
  getState: GetStateFn<S>,
) => F;

export type CreateFn = <S extends Record<string, unknown>>(
  options: CreateOptions<S>,
) => {
  useMount: (automatic?: boolean) => void;
  useState: () => S;
  restore: () => void;
  define: <F extends AnyFn>(fire: FireFnArgs<S, F>) => F;
};

export interface StoreEnhancerExt {
  create: CreateFn;
}

export interface CreateOptions<S extends Record<string, unknown>> {
  namespace: string;
  initialState: S;
}

export interface StoreManager<S> {
  has: () => boolean;
  del: () => void;
  add: () => void;
  refresh: () => void;
  reduxStore: import('redux').Store;
}

export interface Api<
  S extends Record<string, unknown> = Record<string, unknown>,
> {
  configureOptions: ConfigureOptions;
  setState: (fn: Function) => void;
  getState: GetStateFn<S>;
  createOptions: CreateOptions<S>;
  storeManager: StoreManager<S>;
}
