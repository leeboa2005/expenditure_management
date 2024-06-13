// authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isAuthenticated: false,
    token: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isAuthenticated = true;
            state.token = action.payload;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            localStorage.removeItem('accessToken');
        },
        checkAuth: (state) => {
            const token = localStorage.getItem('accessToken');
            if (token) {
                state.isAuthenticated = true;
                state.token = token;
            } else {
                state.isAuthenticated = false;
                state.token = null;
            }
        },
    },
});

export const { login, logout, checkAuth } = authSlice.actions;
export default authSlice.reducer;
