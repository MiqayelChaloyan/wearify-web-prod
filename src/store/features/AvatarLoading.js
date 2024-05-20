import { createSlice } from '@reduxjs/toolkit';

const isLoading = false;

const avatarLoading = createSlice({
  name: 'avatar-loading',
  initialState: isLoading,
  reducers: {
    updatedAvatarLoadingStatus: (state, action) => {
      return { isLoading: action.payload };
    },
  },
});

export const { updatedAvatarLoadingStatus } = avatarLoading.actions;
export default avatarLoading.reducer;
