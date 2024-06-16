import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../axios/expenseApi';

//전체 지출 데이터를 조회, 추가, 수정, 삭제하는 훅
export const useExpenses = () => {
    return useQuery({
        queryKey: ['expenses'], // 쿼리 키를 'expenses'로 설정
        queryFn: fetchExpenses, // 데이터를 가져오는 함수
    });
};

export const useAddExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addExpense, // 데이터를 추가하는 함수
        // 성공 시 전체지출 데이터를 다시 불러옴
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateExpense, // 데이터를 수정하는 함수
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExpense, // 데이터 삭제하는 함수
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};
