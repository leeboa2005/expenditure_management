import api from './api';

export const fetchExpenses = async () => {
    const response = await api.get('/expenses?_sort=date&_order=desc');
    return response.data;
};

export const addExpense = async (expense) => {
    const response = await api.post('/expenses', expense);
    return response.data;
};

export const updateExpense = async ({ id, ...updatedExpense }) => {
    const response = await api.put(`/expenses/${id}`, updatedExpense);
    return response.data;
};

export const deleteExpense = async (id) => {
    const response = await api.delete(`/expenses/${id}`);
    return response.data;
};
