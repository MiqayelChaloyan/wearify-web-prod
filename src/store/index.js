import { configureStore } from '@reduxjs/toolkit';

import MeasurementsDataReducer from './features/MeasurementsSlice';

const store = configureStore({
  reducer: {
    state: MeasurementsDataReducer,
  },
});

export default store;