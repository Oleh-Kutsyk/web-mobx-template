import React from 'react';
import { types, Instance } from 'mobx-state-tree';
import makeInspectable from 'mobx-devtools-mst';

import { persist } from 'src/store/utils/persist';

import { auth } from 'src/store/auth';
import { entities } from 'src/store/entities';
import { pages } from 'src/store/pages';
import { ui } from 'src/store/ui';

// Sets global behavior settings on the active MobX instance. Use this to change how MobX behaves as a whole.
// https://www.mobxjs.com/refguide/api.html#configure

// Global error listener, which is invoked for every error that is thrown from a reaction.
// https://www.mobxjs.com/refguide/api.html#onreactionerror

// By default, MobX will catch and rethrow exceptions happening in your code to make sure that a reaction in one exception
// does not prevent the scheduled execution of other, possibly unrelated, reactions.
// This means exceptions are not propagated back to the original causing code and therefore you won't be able to catch them using try/catch.
// There may be times when you want to catch those errors, for example when unit testing your reactions.
// You can disable this behaviour using disableErrorBoundaries.
// https://www.mobxjs.com/refguide/api.html#disableerrorboundaries-boolean

// Mobx State Tree course
// https://mobx-state-tree.js.org/concepts/trees#creating-models

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const RootStore: any = types.model({
  auth,
  entities,
  pages: types.optional(pages, {}),
  ui,
});

const initialState = RootStore.create();

persist(initialState);

makeInspectable(initialState);

export const rootStore = initialState;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type TRootStoreInstance = Instance<typeof RootStore>;

export const rootStoreContext =
  React.createContext<TRootStoreInstance>(rootStore);
export const RootStoreProvider = rootStoreContext.Provider;
