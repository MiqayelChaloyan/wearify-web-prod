import { createSlice } from '@reduxjs/toolkit';

import formInitialValues from 'pages/UserForm/formInitialValues';

const MeasurementsSlice = createSlice({
  name: 'MEASUREMENTS',
  initialState: formInitialValues,
  reducers: {
    addData: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { addData } = MeasurementsSlice.actions;

export default MeasurementsSlice.reducer;