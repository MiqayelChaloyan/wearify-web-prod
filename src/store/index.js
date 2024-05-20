import { configureStore } from '@reduxjs/toolkit';

import MeasurementsDataReducer from './features/MeasurementsSlice';
import modalSwitchReducer from './features/ModalSwitch';
import AvatarLoadingReducer from './features/AvatarLoading';
import UserIdReducer from './features/UserId';
import AvatarErrorReducer from './features/AvatarError';

const store = configureStore({
  reducer: {
    state: MeasurementsDataReducer,
    isDisplay: modalSwitchReducer,
    isAvatarLoading: AvatarLoadingReducer,
    userId: UserIdReducer,
    avatarError: AvatarErrorReducer,
  },
});

export default store;