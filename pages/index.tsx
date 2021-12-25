import type { NextPage } from 'next';
import { TodosDisplay } from '../src/components/TodosDisplay';
import { Box, Button, Container, Drawer, Typography } from '@mui/material';
import { AddTodo } from '../src/components/AddTodo';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';

const Home: NextPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <Container>
      <Drawer variant='temporary' anchor='right' open={isDrawerOpen} onClose={() => setIsDrawerOpen(false)}>
        <Box sx={{ m: 2 }}>
          <Typography variant='h4' sx={{ my: 3 }}>Add Todo</Typography>
          <AddTodo />
        </Box>
      </Drawer>
      <Typography variant='h4' sx={{ my: 3 }}>Todos</Typography>
      <Button variant='outlined' onClick={() => setIsDrawerOpen(true)} sx={{ mb: 2 }}>
        <AddIcon /> Add Todo
      </Button>
      <TodosDisplay />
    </Container>
  );
};

export default Home;
