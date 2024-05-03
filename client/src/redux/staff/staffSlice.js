import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentStaff: null,
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        signInStaffStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error when sign-in starts
        },
        signInStaffSuccess: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInStaffFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        registerStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error when registration starts
        },
        registerSuccess: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
            state.error = null;
        },
        registerFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        updateStart: (state) => {
            state.loading = true;
            state.error = null; // Reset error when update starts
        },
        updateSuccess: (state, action) => {
            state.currentStaff = action.payload;
            state.loading = false;
            state.error = null;
        },
        updateFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const {
    signInStaffStart,
    signInStaffSuccess,
    signInStaffFailure,
    registerStart,
    registerSuccess,
    registerFailure,
    updateStart,
    updateSuccess,
    updateFailure,
} = staffSlice.actions;

export default staffSlice.reducer;
