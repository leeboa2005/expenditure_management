import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledMonthlyWrap = styled.section`
    width: 100%;
    background-color: #fff;
    margin: 20px 0;
    padding: 20px 0;
    border-radius: 16px;
`;

const StyledMonthlyBtnWrap = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, 120px);
    justify-content: space-evenly;
    gap: 20px;
`;

const StyledMonthlyBtn = styled.div`
    text-align: center;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    height: 60px;
    padding: 20px;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    color: #000;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    background-color: ${(props) =>
        props.$active ? '#91cfec' : '#f6f7fa'}; // 활성화 됬을때 #91cfec , 비활성화 됬을떄 #f6f7fa
`;

const MonthlyExpense = ({ selectedMonth, onChangeMonth }) => {
    const monthArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    return (
        <StyledMonthlyWrap>
            <StyledMonthlyBtnWrap>
                {monthArr.map((month) => (
                    <StyledMonthlyBtn
                        key={month}
                        $active={selectedMonth === month} // 활성화 상태 확인
                        onClick={() => onChangeMonth(month)} // 월 변경 함수 호출
                    >
                        {month}월
                    </StyledMonthlyBtn>
                ))}
            </StyledMonthlyBtnWrap>
        </StyledMonthlyWrap>
    );
};

MonthlyExpense.propTypes = {
    selectedMonth: PropTypes.number.isRequired,
    onChangeMonth: PropTypes.func.isRequired,
};

export default MonthlyExpense;
