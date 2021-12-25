import { createSelector } from '@reduxjs/toolkit';
import { RootState } from './index';

export const filteredTodos = createSelector(
  (state: RootState) => state.todos,
  (state: RootState) => state.filter.tags,
  (state: RootState) => state.filter.query,
  (todos, tags, query) =>
    Object.fromEntries(Object.entries(todos).filter(([id, todo]) => (
      tags.every((tag) => todo.tags.includes(tag)) &&
      query.split(' ').every((keyword) =>
        [todo.title, todo.description, ...todo.tags].some((field) => field.includes(keyword))
      )
    )))
);