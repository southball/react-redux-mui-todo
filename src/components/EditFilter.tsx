import React, { useState } from 'react';
import { Autocomplete, Chip, Grid, TextField } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../hooks';
import { tagsSelector } from '../store/todos';
import { filter } from '../store/filter';

interface EditFilterProps {
}

export const EditFilter: React.FC<EditFilterProps> = () => {
  const { query, tags } = useAppSelector(state => state.filter);
  const dispatch = useAppDispatch();
  const tagsAutocompleteOptions = useAppSelector(tagsSelector);

  return (
    <Grid container columnSpacing={1} rowSpacing={1}>
      <Grid item xs={12} md={6}>
        <TextField
          placeholder="Query"
          value={query}
          onChange={(event) => dispatch(filter.actions.setQuery(event.target.value))}
          fullWidth
        /></Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          options={tagsAutocompleteOptions}
          multiple
          value={tags}
          onChange={(_event, value) => dispatch(filter.actions.setTags(value))}
          renderTags={(value, getTagProps) => value.map((option, index) =>
            // eslint-disable-next-line react/jsx-key
            <Chip variant='outlined' label={option} {...getTagProps({ index })} />
          )}
          renderInput={(params) => (
            <TextField {...params} label='Tag' />
          )}
          sx={{ mb: 2 }}
        />
      </Grid>
    </Grid>
  );
};