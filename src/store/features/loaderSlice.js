import { createSlice } from '@reduxjs/toolkit';

const isLoader = false;

const loaderSlice = createSlice({
  name: 'loader',
  initialState: isLoader,
  reducers: {
    updatedLoader: (state, action) => {
      return !isLoader ;
    },
  },
});

export const { updatedLoader } = loaderSlice.actions;
export default loaderSlice.reducer;
