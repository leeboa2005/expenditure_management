// configureStore.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/authSlice';
import userReducer from '../modules/userSlice';

import expenseDataReducer from '../modules/expenseDataSlice';

// configureStore 함수를 사용하여 Redux 스토어를 설정합니다.
const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        expenseData: expenseDataReducer,
    },
});

export default store;
