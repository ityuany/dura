export { default } from "./macro";

export type SetStateFnArgs<S> = (state: S) => void;

export type SetStateFn<S> = (fn: SetStateFnArgs<S>) => void;

export type GetStateFn<S> = () => S;

export declare const namespace: string;

export type CompileStoreFn = <S>(store: S) => {
  getState: GetStateFn<S>;
  setState: SetStateFn<S>;
};

export declare const compileStore: CompileStoreFn;
