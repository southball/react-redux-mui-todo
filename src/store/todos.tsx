import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';

export interface Todo {
  title: string;
  description: string;
  completed: boolean;
  tags: string[];
}

export const todos = createSlice({
  name: 'todos',
  initialState: {} as Record<string, Todo>,
  reducers: {
    addTodo(state, action: PayloadAction<Todo>) {
      const id = nanoid();;
      state[id] = action.payload;
    },
    removeTodo(state, action: PayloadAction<string>) {
      delete state[action.payload];
    },
    toggleCompleted(state, action: PayloadAction<string>) {
      state[action.payload].completed = !state[action.payload].completed;
    }
  }
});

export const tagsSelector = createSelector(
  (state: RootState) => state.todos,
  (todos) => [...new Set(Object.values(todos).flatMap((todo) => todo.tags))]
);
