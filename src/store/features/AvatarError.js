import { createSlice } from '@reduxjs/toolkit';

const isAvatarError = false;

const avatarError = createSlice({
  name: 'avatar-error',
  initialState: isAvatarError,
  reducers: {
    updatedAvatarErrorStatus: (state, action) => {
      return { isAvatarError: action.payload };
    },
  },
});

export const { updatedAvatarErrorStatus } = avatarError.actions;
export default avatarError.reducer;
