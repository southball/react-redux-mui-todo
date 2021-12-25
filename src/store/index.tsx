import { configureStore, Middleware } from '@reduxjs/toolkit';
import { todos } from './todos';
import { filter } from './filter';

const LOCAL_STORAGE_KEY = 'applicationState';

const localStorageMiddleware: Middleware = ({ getState }) => {
  return (next) => (action) => {
    const result = next(action);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(getState()));
    return result;
  };
};

const getPreloadedState = (): any => {
  const state = typeof window !== 'undefined' && localStorage?.getItem(LOCAL_STORAGE_KEY);
  if (state) {
    return JSON.parse(state);
  }
};

export const store = configureStore({
  reducer: {
    todos: todos.reducer,
    filter: filter.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([localStorageMiddleware]),
  preloadedState: getPreloadedState()
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
