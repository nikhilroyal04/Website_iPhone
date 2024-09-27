import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sortOption: 'featured', 
};

const sortSlice = createSlice({
  name: 'sort',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload; 
    },
  },
});

export const { setSortOption } = sortSlice.actions;
export const selectSortOption = (state) => state.sort.sortOption;

export default sortSlice.reducer;
