import { useContext } from 'react';
import { rootStoreContext, TRootStoreInstance } from './configureStore';

export function useMst<TR>(fn: (store: TRootStoreInstance) => TR): TR;
export function useMst(fn?: undefined): TRootStoreInstance;

export function useMst<TR>(
  fn?: (store: TRootStoreInstance) => TR
): TRootStoreInstance | TR {
  const store = useContext(rootStoreContext);

  // if we will have persist and replace store from cache
  // if (store === null) {
  //   throw new Error('Store cannot be null, please add a context provider');
  // }

  if (fn) {
    return fn(store);
  }

  return store;
}
