import { useState } from 'react';
import styled from 'styled-components';
import ExpenseForm from '../components/ExpenseForm';
import ExpenseHistory from '../components/ExpenseHistory';
import MonthlyExpense from '../components/MonthlyExpense';
import ExpenseGraph from '../components/ExpenseGraph';
import { useExpenses, useAddExpense } from '../hooks/useExpenses';

const StyledHome = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const Home = () => {
    const { data: expenseData = [], status } = useExpenses();
    const addExpenseMutation = useAddExpense();

    const onExpenseData = (data) => {
        addExpenseMutation.mutate(data);
    };

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const savedMonth = localStorage.getItem('selectedMonth');
        return savedMonth ? parseInt(savedMonth) : new Date().getMonth() + 1;
    });

    const onChangeMonth = (month) => {
        setSelectedMonth(month);
        localStorage.setItem('selectedMonth', month.toString());
    };

    const filteredExpenseData = expenseData.filter((item) => new Date(item.date).getMonth() + 1 === selectedMonth);

    if (status === 'loading') {
        return <div>로딩 중...</div>;
    }

    if (status === 'error') {
        return <div>에러가 발생했습니다.</div>;
    }

    return (
        <StyledHome>
            <ExpenseForm onExpenseData={onExpenseData} />
            <ExpenseGraph expenseData={expenseData} selectedMonth={selectedMonth} />
            <MonthlyExpense selectedMonth={selectedMonth} onChangeMonth={onChangeMonth} />
            <ExpenseHistory expenseData={filteredExpenseData} />
        </StyledHome>
    );
};

export default Home;
