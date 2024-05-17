import { configureStore } from '@reduxjs/toolkit';

import MeasurementsDataReducer from './features/MeasurementsSlice';
import loaderReducer from './features/loaderSlice';

const store = configureStore({
  reducer: {
    state: MeasurementsDataReducer,
    isLoader: loaderReducer
  },
});

export default store;