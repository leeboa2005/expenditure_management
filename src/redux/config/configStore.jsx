import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../modules/authSlice';
import userReducer from '../modules/userSlice';

import expenseDataReducer from '../modules/expenseDataSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        auth: authReducer,
        expenseData: expenseDataReducer,
    },
});

export default store;
