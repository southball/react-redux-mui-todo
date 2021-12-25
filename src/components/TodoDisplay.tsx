import { Box, Button, Checkbox, Chip, Paper } from '@mui/material';
import { Todo, todos as todosSlice } from '../store/todos';
import ClearIcon from '@mui/icons-material/Clear';
import { useAppDispatch } from '../hooks';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

interface TodoDisplayProps {
  id: string;
  todo: Todo;
}

export const TodoDisplay: React.FC<TodoDisplayProps> = ({ id, todo }) => {
  const dispatch = useAppDispatch();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Paper key={id} elevation={2} sx={{ display: 'flex', flexDirection: 'column', mb: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Checkbox checked={todo.completed} onChange={(event) => dispatch(todosSlice.actions.toggleCompleted(id))} />
        <Box sx={{
          flexGrow: 1,
          overflowX: 'hidden',
          textOverflow: 'ellipsis',
          textDecoration: todo.completed ? 'line-through' : 'none'
        }}>
          {todo.title}
        </Box>
        <Button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        </Button>
        <Button onClick={() => dispatch(todosSlice.actions.removeTodo(id))}>
          <ClearIcon />
        </Button>
      </Box>
      {isOpen && (
        <>
          <Box sx={{ display: 'flex', mx: 1, mb: 1 }}>
            {todo.tags.map((tag) => <Chip key={tag} label={tag} sx={{ mr: 1 }} />)}
          </Box>
          <Box sx={{ display: 'flex', mx: 1 }}>
            {todo.description}
          </Box>
        </>
      )}
    </Paper>
  );
};