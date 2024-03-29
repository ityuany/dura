import {
  Action,
  combineReducers,
  compose,
  ReducersMapObject,
  StoreEnhancer,
} from 'redux';
import { createImmerReducer } from './create-immer-reducer';
import { ActionTypes, __COMMIT__ } from './internal/const';
import { produceWithPatches } from 'immer';
import { createUseMount } from './plugins/create-use-mount';
import { createUseState } from './plugins/create-use-state';
import { createRestore } from './plugins/create-restore';
import { createDefine } from './plugins/create-define';
import {
  Api,
  ConfigureOptions,
  CreateOptions,
  StoreEnhancerExt,
  StoreManager,
} from './typings';

export function configure(
  configureOptions: ConfigureOptions,
): StoreEnhancer<StoreEnhancerExt> {
  const GLOBAL_REDUCERS: ReducersMapObject = { __AK__: () => ({}) };

  return (next) => (reducer, initialState) => {
    const reduxStore = next(reducer, initialState);

    function create<S extends Record<string, unknown>>(
      createOptions: CreateOptions<S>,
    ) {
      const { namespace } = createOptions;

      function createStoreManager(): StoreManager<S> {
        const has = () => !!GLOBAL_REDUCERS[namespace];
        const del = () => void delete GLOBAL_REDUCERS[namespace];
        const add = () =>
          void (GLOBAL_REDUCERS[namespace] = createImmerReducer(createOptions));
        const refresh = () => {
          reduxStore.replaceReducer(
            compose(reducer, combineReducers(GLOBAL_REDUCERS)),
          );
          const action: Action<string> = { type: ActionTypes.REFRESH };
          reduxStore.dispatch(action);
        };
        return {
          has,
          del,
          add,
          refresh,
          reduxStore,
        };
      }

      function createApi(): Api<S> {
        const getCommitType = (funcName: string) =>
          [namespace, `${__COMMIT__}${funcName || 'Anonymous'}`].join('/');
        const getState = () =>
          reduxStore.getState()[namespace] ?? createOptions.initialState;
        const setState = (fn: Function) => {
          const state = getState();
          if (state) {
            const [, patches] = produceWithPatches((draft) => {
              fn(draft);
            })(state);
            const action = {
              type: getCommitType(fn.name),
              payload: {
                patches,
              },
            };
            reduxStore.dispatch(action as never);
          }
        };
        return {
          configureOptions,
          setState,
          getState,
          createOptions,
          storeManager: createStoreManager(),
        };
      }

      const api = createApi();

      const useMount = createUseMount(api);
      const useState = createUseState(api);
      const define = createDefine(api);
      const restore = createRestore(api);

      return {
        namespace,
        initialState: createOptions.initialState,
        useState,
        define,
        useMount,
        restore,
        getState: api.getState,
      };
    }

    return {
      ...reduxStore,
      create,
    };
  };
}
