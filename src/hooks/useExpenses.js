import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, addExpense, updateExpense, deleteExpense } from '../axios/expenseApi';

export const useExpenses = () => {
    return useQuery({
        queryKey: ['expenses'],
        queryFn: fetchExpenses,
    });
};

export const useAddExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: addExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useUpdateExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};

export const useDeleteExpense = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteExpense,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['expenses'] });
        },
    });
};
