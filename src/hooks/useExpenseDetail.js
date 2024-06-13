import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../axios/api';

export const useExpenseDetail = (id) => {
    const queryClient = useQueryClient();

    const expenseQuery = useQuery({
        queryKey: ['expense', id],
        queryFn: async () => {
            const { data } = await api.get(`/expenses/${id}`);
            return data;
        },
        enabled: !!id,
    });

    const updateExpenseMutation = useMutation({
        mutationFn: async ({ id, updatedExpense }) => {
            const { data } = await api.put(`/expenses/${id}`, updatedExpense);
            return data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['expenses']);
            queryClient.setQueryData(['expense', id], data);
        },
    });

    const deleteExpenseMutation = useMutation({
        mutationFn: async (id) => {
            await api.delete(`/expenses/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['expenses']);
        },
    });

    return { expenseQuery, updateExpenseMutation, deleteExpenseMutation };
};
