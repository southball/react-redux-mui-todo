import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { tagsSelector, todos as todosSlice } from '../store/todos';
import { Autocomplete, Button, Chip, Grid, TextField } from '@mui/material';

interface AddTodoProps {
}

export const AddTodo: React.FC<AddTodoProps> = () => {
  const dispatch = useAppDispatch();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const tagsAutocompleteOptions = useAppSelector(tagsSelector);

  const onAddItem = (event: any) => {
    event.preventDefault();
    dispatch(
      todosSlice.actions.addTodo({
        title,
        description,
        completed: false,
        tags
      })
    );
    setTitle('');
    setDescription('');
    setTags([]);
  };

  return (
    <>
      <Grid container rowSpacing={1}>
        <Grid item xs={12}>
          <TextField
            type='text'
            label='Title'
            value={title}
            onChange={(event) => void setTitle(event.target.value)}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label='Description'
            value={description}
            onChange={(event) => void setDescription(event.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Autocomplete
            options={tagsAutocompleteOptions}
            multiple
            freeSolo
            value={tags}
            onChange={(_event, value) => setTags(value)}
            renderTags={(value, getTagProps) => value.map((option, index) =>
              // eslint-disable-next-line react/jsx-key
              <Chip variant='outlined' label={option} {...getTagProps({ index })} />
            )}
            renderInput={(params) => (
              <TextField {...params} label='Tags' />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type='submit' variant='contained' fullWidth onClick={onAddItem}>
            Add Todo
          </Button>
        </Grid>
      </Grid>
    </>
  );
};