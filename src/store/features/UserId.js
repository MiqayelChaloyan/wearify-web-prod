import { createSlice } from '@reduxjs/toolkit';

const userId = null;

const userID = createSlice({
  name: 'user-id',
  initialState: userId,
  reducers: {
    setUserId: (state, action) => {
      return { userId: action.payload };
    },
    getUserId: (state) => {
      return state.userId;
    }
  },
});

export const { setUserId, getUserId } = userID.actions;
export default userID.reducer;
