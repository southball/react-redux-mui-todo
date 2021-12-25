import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  query: string;
  tags: string[];
}

export const filter = createSlice({
  name: 'filter',
  initialState: {
    query: '',
    tags: []
  } as FilterState,
  reducers: {
    setQuery(state, action: PayloadAction<string>) {
      state.query = action.payload;
    },
    setTags(state, action: PayloadAction<string[]>) {
      state.tags = action.payload;
    }
  }
});
