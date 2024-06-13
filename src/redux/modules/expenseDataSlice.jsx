import { createSlice } from '@reduxjs/toolkit';

const expenseDataSlice = createSlice({
    name: 'expenseData',
    initialState: {
        items: [], // 초기값을 빈 배열로 설정
    },
    reducers: {
        setExpenseData: (state, action) => {
            state.items = action.payload; // 서버에서 가져온 데이터를 설정
        },
        addExpenseData: (state, action) => {
            state.items.push(action.payload); // 새로운 지출 데이터를 배열에 추가
        },
        deleteExpenseData: (state, action) => {
            state.items = state.items.filter((item) => item.id !== action.payload); // 지출 데이터 삭제
        },
        updateExpenseData: (state, action) => {
            const { id, updatedData } = action.payload;
            const index = state.items.findIndex((item) => item.id === id);
            if (index !== -1) {
                state.items[index] = { ...state.items[index], ...updatedData }; // 지출 데이터 업데이트
            }
        },
    },
});

export const { setExpenseData, addExpenseData, deleteExpenseData, updateExpenseData } = expenseDataSlice.actions;
export default expenseDataSlice.reducer;
