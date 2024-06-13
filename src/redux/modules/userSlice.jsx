import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userInfo: null,
        error: null,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        updateNicknameSuccess: (state, action) => {
            if (state.userInfo) {
                state.userInfo.nickname = action.payload;
            }
        },
    },
});

export const { setUserInfo, setError, updateNicknameSuccess } = userSlice.actions;

export default userSlice.reducer;
