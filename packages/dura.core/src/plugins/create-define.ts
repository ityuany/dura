import type { AnyFn, Api } from '../typings';

export const createDefine =
  (api: Api) =>
  (fn: AnyFn) =>
  async (...args: unknown[]) => {
    try {
      return await fn(api.setState, api.getState)(...args);
    } catch (error) {
      if (!api.configureOptions.onError) {
        throw error;
      }
      api.configureOptions.onError?.(error as never);
    }
  };
