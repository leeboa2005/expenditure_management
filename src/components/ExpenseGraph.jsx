import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import icons from '../assets/graph/icons';
import SkeletonBar from '../assets/styles/skeleton/Bar';
import SkeletonCircle from '../assets/styles/skeleton/Circle';
import { fetchExpenses } from '../axios/expenseApi';

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
    background-color: ${(props) => props.color};
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

const ExpenseGraph = ({ selectedMonth }) => {
    const [expenseData, setExpenseData] = useState([]); // API로부터 받아온 지출 데이터를 저장
    const [animationReady, setAnimationReady] = useState(false);
    const [loading, setLoading] = useState(true);

    // 선택된 월의 데이터 필터링
    const filteredExpenseData = expenseData.filter((item) => {
        return new Date(item.date).getMonth() + 1 === selectedMonth;
    });

    // 카테고리별 데이터 집계
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

    // 데이터를 금액 순으로 정렬
    const sortedData = Object.entries(categorizedData).sort(([, amountA], [, amountB]) => amountB - amountA);
    const totalAmount = Object.values(categorizedData).reduce((accumulated, amount) => accumulated + amount, 0);

    // 데이터 변경 시 애니메이션 초기화
    useEffect(() => {
        setLoading(true);
        setAnimationReady(false);

        const loadExpenses = async () => {
            try {
                const data = await fetchExpenses();
                setExpenseData(data);
                setLoading(false);
                setTimeout(() => setAnimationReady(true), 300);
            } catch (error) {
                console.error('그래프 데이터 로딩 실패', error);
                setLoading(false);
            }
        };
        loadExpenses();
    }, [selectedMonth]);

    if (loading) {
        // 로딩 중일 때 Skeleton 컴포넌트를 표시
        const skeletons = [];
        for (let i = 0; i < 4; i++) {
            skeletons.push(
                <BarContainer key={i}>
                    <SkeletonCircle />
                    <SkeletonBar />
                </BarContainer>
            );
        }
        return <GraphContainer>{skeletons}</GraphContainer>;
    }

    return (
        <GraphContainer>
            {sortedData.length === 0 ? (
                <NoDataMessage>지출 데이터가 없습니다.</NoDataMessage>
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
    selectedMonth: PropTypes.number.isRequired,
};

export default ExpenseGraph;
