import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icons from '../assets/graph/icons';

const COLORS = [
    '#93CDE9',
    '#1BC9A6',
    '#5D6DBE',
    '#F15B87',
    '#F56971',
    '#E4CB6D',
    '#fc8969',
    '#E8738F',
    '#FF4560',
    '#A4DDED',
    '#FFB347',
    '#B39EB5',
    '#fa635b',
    '#ffd1dc',
];

const GraphContainer = styled.div`
    width: 100%;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    padding: 17px 10px;
`;

const BarContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`;

const Bar = styled.div`
    margin-right: 7px;
    //배경색을 props로 전달받은 color 값으로 설정
    background-color: ${(props) => props.color};
    // bar 컴포넌트의 너비를 props로 전달받은 width 값의 백분율로 설정
    width: ${(props) => props.width}%;
    height: 30px;
    border-radius: 10px;
    transition: width 2s ease-in-out;

    @media only screen and (max-width: 734px) {
        height: 22px;
    }
`;

const LabelContainer = styled.div`
    display: flex;
    align-items: center;
    padding: 5px 10px;
`;

const Label = styled.p`
    min-width: 70px;

    @media only screen and (max-width: 734px) {
        font-size: 14px;
        min-width: 30px;
    }
`;

const PriceLabel = styled.p`
    min-width: 80px;
    @media only screen and (max-width: 734px) {
        font-size: 14px;
        min-width: 60px;
    }
`;

const NoDataMessage = styled.div`
    color: var(--font-gray-color);
    text-align: center;
    padding: 60px;
`;

const ImageContainer = styled.div`
    position: relative;
    width: 40px;
    height: 40px;
    margin-right: 5px;
    // props로 전달된 color 값을 설정
    background-color: ${(props) => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
        width: 22px;
        height: auto;
        color: #fff;
    }

    @media only screen and (max-width: 734px) {
        width: 27px;
        height: 27px;

        svg {
            width: 17px;
        }

        .Label {
            min-width: 30px;
        }
        .PriceLabel {
            min-width: 50px;
        }
    }
`;

const ExpenseGraph = ({ expenseData = [], selectedMonth }) => {
    const [animationReady, setAnimationReady] = useState(false);

    useEffect(() => {
        setAnimationReady(false);
        const timeout = setTimeout(() => setAnimationReady(true), 200);
        return () => clearTimeout(timeout);
    }, [expenseData, selectedMonth]);

    const filteredExpenseData = expenseData.filter((item) => {
        return new Date(item.date).getMonth() + 1 === selectedMonth;
    });

    const categorizedData = filteredExpenseData.reduce((accumulated, expense) => {
        const { item, amount } = expense;
        if (item && amount) {
            if (!accumulated[item]) {
                accumulated[item] = 0;
            }
            accumulated[item] += Number(amount);
        }
        return accumulated;
    }, {});

    const sortedData = Object.entries(categorizedData).sort(([, amountA], [, amountB]) => amountB - amountA);
    const totalAmount = Object.values(categorizedData).reduce((accumulated, amount) => accumulated + amount, 0);

    return (
        <GraphContainer>
            {Object.keys(categorizedData).length === 0 ? (
                <NoDataMessage>그래프로 표현할 데이터가 없습니다.</NoDataMessage>
            ) : (
                sortedData.map(([item, amount], index) => {
                    const selectedColor = COLORS[index % COLORS.length];
                    const IconComponent = icons[item] || icons['기타'];
                    return (
                        <BarContainer key={item}>
                            <LabelContainer>
                                <ImageContainer color={selectedColor}>
                                    <IconComponent />
                                </ImageContainer>
                                <Label>{item}</Label>
                            </LabelContainer>
                            <Bar
                                color={selectedColor}
                                width={animationReady ? (amount / totalAmount) * 100 : 0}
                                title={`${item}: ${((amount / totalAmount) * 100).toFixed(2)}%`}
                            />
                            <PriceLabel>{`${amount}원`}</PriceLabel>
                        </BarContainer>
                    );
                })
            )}
        </GraphContainer>
    );
};

ExpenseGraph.propTypes = {
    expenseData: PropTypes.array.isRequired,
    selectedMonth: PropTypes.number.isRequired,
};

export default ExpenseGraph;
