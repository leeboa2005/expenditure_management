import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        error: null,
    },
    reducers: {
        // 사용자 정보를 설정하는 리듀서
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        // 오류 메시지를 설정하는 리듀서
        setError: (state, action) => {
            state.error = action.payload;
        },
        // 사용자 닉네임을 업데이트하는 리듀서
        updateNicknameSuccess: (state, action) => {
            if (state.userInfo) {
                state.userInfo.nickname = action.payload;
            }
        },
        // 사용자 정보와 오류 메시지를 초기화하는 리듀서
        clearUserInfo: (state) => {
            state.userInfo = null;
            state.error = null;
        },
    },
});

export const { setUserInfo, setError, updateNicknameSuccess, clearUserInfo } = userSlice.actions;

export default userSlice.reducer;
