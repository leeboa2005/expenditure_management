import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../axios/api';

// 초기 상태
const initialState = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
};

// 유효한 토큰인지 확인하는 비동기 액션
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        return rejectWithValue('No token found');
    }

    try {
        const response = await loginApi.get('/verifyToken', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (response.data.valid) {
            return response.data;
        } else {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return rejectWithValue('Invalid token');
        }
    } catch (error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        return rejectWithValue('Invalid token');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state) => {
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(checkAuth.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false;
            });
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
