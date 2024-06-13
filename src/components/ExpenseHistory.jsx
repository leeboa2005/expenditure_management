import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const StyledHistoryWrap = styled.section`
    width: 100%;
    padding: 20px;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    margin-bottom: 30px;

    p.no_expense_msg {
        text-align: center;
        color: var(--font-gray-color);
    }
`;

const StyledHistoryList = styled.ul`
    width: 100%;
    margin: 10px 0;

    li {
        padding: 15px 20px;
        background-color: #fdfdfd;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;
        margin-bottom: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }
    li div {
        width: 80%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    li div span {
        font-size: 12px;
        color: var(--font-gray-color);
    }
    li div span:first-child::after {
        content: '|';
        margin: 0 6px;
        color: var(--font-gray-color);
    }
    li div p {
        margin-top: 10px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
`;

const ExpenseHistory = ({ expenseData = [] }) => {
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/detail/${id}`);
    };

    return (
        <StyledHistoryWrap>
            {expenseData.length === 0 ? (
                <p className="no_expense_msg">지출내역이 없습니다.</p>
            ) : (
                <StyledHistoryList>
                    {expenseData.map((expense) => (
                        <li key={expense.id}>
                            <div onClick={() => handleClick(expense.id)}>
                                <span>{expense.date}</span>
                                <span>작성자: {expense.createdBy}</span>
                                <p>{`${expense.item} - ${expense.description}`}</p>
                            </div>
                            <span>{`${expense.amount} 원`}</span>
                        </li>
                    ))}
                </StyledHistoryList>
            )}
        </StyledHistoryWrap>
    );
};

ExpenseHistory.propTypes = {
    expenseData: PropTypes.array.isRequired,
};

export default ExpenseHistory;
