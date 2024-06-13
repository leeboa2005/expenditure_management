import { useRef } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const StyledFormWrap = styled.section`
    margin: 30px 0 20px 0;
    padding: 20px 0;
`;

const StyledForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    align-items: center;

    fieldset {
        display: flex;
        flex-direction: column;
        flex: 1 1 0%;
        min-width: 120px;
    }

    label {
        margin-bottom: 5px;
        font-weight: var(--font-bold);
        display: block;
    }

    input {
        padding: 8px;
        margin-bottom: 10px;
        border: var(--border-style);
        border-radius: var(--default-radius-2);
    }

    button {
        padding: 8px 20px;
        height: 34px;
        margin-top: 10px;
        background-color: #91cfec;
        color: var(--font-white-color);
    }
`;

const ExpenseForm = ({ onExpenseData }) => {
    const dateRef = useRef(null);
    const itemRef = useRef(null);
    const amountRef = useRef(null);
    const descriptionRef = useRef(null);
    const user = JSON.parse(localStorage.getItem('user')); // 사용자 정보 가져오기

    console.log('User:', user); // 사용자 정보 콘솔에 출력

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = uuidv4();
        const date = dateRef.current.value;
        const item = itemRef.current.value;
        const amount = amountRef.current.value;
        const description = descriptionRef.current.value;

        if (!date || !item || !amount || !description) {
            alert('입력창을 모두 입력해주세요.');
            return;
        }

        if (Number(amount) <= 0) {
            alert('금액은 0보다 커야 합니다.');
            return;
        }

        const expenseData = {
            id,
            date,
            item,
            amount: Number(amount),
            description,
            createdBy: user.nickname,
            userId: user.id,
        };

        console.log('Expense Data:', expenseData);

        onExpenseData(expenseData);

        e.target.reset();
    };

    return (
        <StyledFormWrap>
            <StyledForm onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="date">날짜</label>
                    <input type="date" id="date" placeholder="YYYY-MM-DD" ref={dateRef} />
                </fieldset>
                <fieldset>
                    <label htmlFor="item">항목</label>
                    <input type="text" id="item" placeholder="지출 항목" ref={itemRef} />
                </fieldset>
                <fieldset>
                    <label htmlFor="amount">금액</label>
                    <input type="number" id="amount" placeholder="지출 금액" ref={amountRef} />
                </fieldset>
                <fieldset>
                    <label htmlFor="description">내용</label>
                    <input type="text" id="description" placeholder="지출 내용" ref={descriptionRef} />
                </fieldset>
                <button type="submit">저장</button>
            </StyledForm>
        </StyledFormWrap>
    );
};

ExpenseForm.propTypes = {
    onExpenseData: PropTypes.func.isRequired,
};

export default ExpenseForm;
