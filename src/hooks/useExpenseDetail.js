import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios/api';

// 디테일 페이지에 사용되는 특정 지출 항목에 대한 조회, 수정, 삭제하는 훅
export const useExpenseDetail = (id) => {
    const queryClient = useQueryClient();

    const expenseQuery = useQuery({
        queryKey: ['expense', id],
        queryFn: async () => {
            const { data } = await api.get(`/expenses/${id}`);
            return data;
        },
        enabled: !!id, // ID가 있을 때만 실행
    });

    const updateExpenseMutation = useMutation({
        mutationFn: async ({ id, updatedExpense }) => {
            const { data } = await api.put(`/expenses/${id}`, updatedExpense);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['expenses']); // 성공 시 지출 목록 갱신
            queryClient.setQueryData(['expense', id], data);
        },
    });

    const deleteExpenseMutation = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/expenses/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']); // 성공 시 지출 목록 갱신
        },
    });

    return { expenseQuery, updateExpenseMutation, deleteExpenseMutation };
};
