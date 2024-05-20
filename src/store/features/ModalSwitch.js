import { createSlice } from '@reduxjs/toolkit';

const isDisplay = false;

const modalSwitch = createSlice({
  name: 'modal',
  initialState: isDisplay,
  reducers: {
    updatedModalStatus: (state) => {
      return { isDisplay: !state.isDisplay };
    },
  },
});

export const { updatedModalStatus } = modalSwitch.actions;
export default modalSwitch.reducer;
