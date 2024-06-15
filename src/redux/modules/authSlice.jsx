import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../../axios/api';

// 초기 상태: 처음에 토큰이 있으면 로그인된 상태로 설정
const initialState = {
    isAuthenticated: !!localStorage.getItem('accessToken'),
};

// 토큰이 유효한지 확인하는 비동기 액션
export const checkAuth = createAsyncThunk('auth/checkAuth', async (_, { rejectWithValue }) => {
    // localStorage에서 accessToken을 가져옴
    const accessToken = localStorage.getItem('accessToken');

    // accessToken이 없으면 에러 반환
    if (!accessToken) {
        return rejectWithValue('No token found');
    }

    try {
        // 서버에 토큰이 유효한지 확인하는 요청을 보냄
        const response = await loginApi.get('/user', {
            headers: {
                // 헤더에 토큰을 포함하여 요청
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            },
        });

        // 서버 응답에서 success가 true이면 토큰이 유효함
        if (response.data.success) {
            return response.data;
        } else {
            // 토큰이 유효하지 않으면 토큰과 사용자 정보를 삭제하고 에러 반환
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
            return rejectWithValue('Invalid token');
        }
    } catch (error) {
        // 요청 중 에러가 발생하면 토큰과 사용자 정보를 삭제하고 에러 반환
        localStorage.removeItem('accessToken');
        localStorage.removeItem('user');
        return rejectWithValue('Invalid token');
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // 로그인 액션: isAuthenticated를 true로 설정
        login: (state) => {
            state.isAuthenticated = true;
        },
        // 로그아웃 액션: isAuthenticated를 false로 설정하고 토큰과 사용자 정보를 삭제
        logout: (state) => {
            state.isAuthenticated = false;
            localStorage.removeItem('accessToken');
            localStorage.removeItem('user');
        },
    },
    extraReducers: (builder) => {
        // checkAuth 액션이 성공하면 isAuthenticated를 true로 설정
        builder
            .addCase(checkAuth.fulfilled, (state) => {
                state.isAuthenticated = true;
            })
            // checkAuth 액션이 실패하면 isAuthenticated를 false로 설정하고 토큰과 사용자 정보를 삭제
            .addCase(checkAuth.rejected, (state) => {
                state.isAuthenticated = false;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('user');
            });
    },
});

// 로그인과 로그아웃 액션을 export
export const { login, logout } = authSlice.actions;
// auth 리듀서를 export
export default authSlice.reducer;
