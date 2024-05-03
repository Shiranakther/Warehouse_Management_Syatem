import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userType: null,
};

const accessSlice = createSlice({
  name: 'access',
  initialState,
  reducers: {
    setUserType(state, action) {
      state.userType = action.payload;
    },
  },
});

export const { setUserType } = accessSlice.actions;
export const selectUserType = state => state.access.userType;

export default accessSlice.reducer;