import { Api } from '../typings';
import { RESTORE } from '../internal/const';
export function createRestore(api: Api) {
  const { reduxStore } = api.storeManager;
  return function restore() {
    reduxStore.dispatch({
      type: [api.createOptions.namespace, RESTORE].join('/'),
    });
  };
}
