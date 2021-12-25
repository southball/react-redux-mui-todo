import { useAppDispatch, useAppSelector } from '../hooks';
import { TodoDisplay } from './TodoDisplay';
import React from 'react';
import { EditFilter } from './EditFilter';
import { filteredTodos } from '../store/filteredTodos';

interface TodosDisplayProps {
}

export const TodosDisplay: React.FC<TodosDisplayProps> = () => {
  const todos = useAppSelector(filteredTodos);
  const dispatch = useAppDispatch();

  return (
    <>
      <EditFilter />
      {Object.entries(todos).map(([id, todo]) => (
        <TodoDisplay key={id} id={id} todo={todo} />
      ))}
    </>
  );
};
