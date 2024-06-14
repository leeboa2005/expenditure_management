import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useExpenseDetail } from '../hooks/useExpenseDetail';
import useUserInfo from '../hooks/useUserInfo';

const StyledDetail = styled.div`
    margin-top: 30px;
`;

const StyledDetailBox = styled.div`
    padding: 30px;
    background-color: #f8f8f8;
    border-radius: var(--default-radius);
    border: var(--border-style);
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const InfoBox = styled.div`
    width: 80%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    p:first-child {
        margin-bottom: 10px;
        font-size: 12px;
        color: var(--font-gray-color);
    }

    p:last-child {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        max-width: 100%;
    }
`;

const ModifyBox = styled.form`
    width: 100%;
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

        @media only screen and (max-width: 1068px) {
            margin-bottom: 10px;
        }

        @media only screen and (max-width: 734px) {
            width: 100%;
        }
    }
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0 40px 0;

    button {
        padding: 10px 20px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 14px;
        color: var(--font-white-color);
    }

    .edit {
        background-color: #1bc9a6;
    }

    .delete {
        background-color: #67b0b6;
    }

    .back {
        background-color: #91cfec;
    }

    .save {
        background-color: #1bc9a6;
    }

    .cancel {
        background-color: #91cfec;
    }
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const Detail = () => {
    const { id } = useParams(); // URL에서 id 값을 가져옴
    const navigate = useNavigate();
    const { expenseQuery, updateExpenseMutation, deleteExpenseMutation } = useExpenseDetail(id);
    const userInfo = useUserInfo(); // 사용자 정보 가져오기

    const [isEditing, setIsEditing] = useState(false); // 수정 모드 상태 관리
    const [editedExpense, setEditedExpense] = useState(null); // 수정할 지출 항목 상태 관리

    useEffect(() => {
        if (expenseQuery.data) {
            setEditedExpense(expenseQuery.data); // 지출 항목 데이터가 로드되면 상태 설정
        }
    }, [expenseQuery.data]);

    const handleEdit = () => {
        setIsEditing(true); // 수정 모드로 전환
    };

    const handleSave = () => {
        // 입력값 검증
        if (!editedExpense.date || !editedExpense.item || !editedExpense.description || !editedExpense.amount) {
            alert('입력창을 모두 입력해주세요.');
            return;
        }

        if (Number(editedExpense.amount) <= 0) {
            alert('금액은 0보다 커야 합니다.');
            return;
        }

        updateExpenseMutation.mutate({ id, updatedExpense: editedExpense });
        setIsEditing(false); // 수정 모드 취소
        alert('정상적으로 수정 되었습니다.');
        navigate('/');
    };

    const handleCancel = () => {
        setIsEditing(false);
        if (expenseQuery.data) {
            setEditedExpense(expenseQuery.data); // 원래 데이터로 복원
        }
    };

    const handleDelete = () => {
        const confirmed = window.confirm('정말 삭제하시겠습니까? 😮');
        if (confirmed) {
            deleteExpenseMutation.mutate(id); // 지출 항목 삭제
            alert('삭제되었습니다. 👋');
            navigate('/');
        } else {
            alert('취소 되었습니다.');
        }
    };

    const handleBack = () => {
        navigate(-1);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedExpense((prevExpense) => ({
            ...prevExpense,
            [name]: name === 'amount' ? (value ? parseInt(value) : '') : value, // 입력 값 업데이트
        }));
    };

    if (expenseQuery.isLoading) {
        return (
            <LoadingContainer>
                <img src="/loading.gif" alt="로딩 중" />
            </LoadingContainer>
        );
    }

    if (expenseQuery.isError) {
        return <div>에러가 발생했습니다.</div>; // 에러 메시지 표시
    }

    if (!editedExpense) {
        return <div>항목을 찾을 수 없습니다.</div>; // 항목을 찾을 수 없을 때 메세지 표시
    }

    const isAuthor = userInfo && userInfo.id === editedExpense.userId; // 현재 사용자가 항목 작성자인지 확인
    return (
        <StyledDetail>
            {isEditing ? (
                <StyledDetailBox key={editedExpense.id}>
                    <ModifyBox>
                        <fieldset>
                            <label htmlFor="date">날짜</label>
                            <input
                                type="date"
                                name="date"
                                placeholder="YYYY-MM-DD"
                                value={editedExpense.date}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="item">항목</label>
                            <input
                                type="text"
                                name="item"
                                placeholder="지출 항목"
                                value={editedExpense.item}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="amount">금액</label>
                            <input
                                type="number"
                                name="amount"
                                placeholder="지출 금액"
                                value={editedExpense.amount}
                                onChange={handleChange}
                            />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="description">내용</label>
                            <input
                                type="text"
                                name="description"
                                placeholder="지출 내용"
                                value={editedExpense.description}
                                onChange={handleChange}
                            />
                        </fieldset>
                    </ModifyBox>
                </StyledDetailBox>
            ) : (
                <StyledDetailBox key={editedExpense.id}>
                    <InfoBox>
                        <p>{editedExpense.date}</p>
                        <p>{`${editedExpense.item} - ${editedExpense.description}`}</p>
                    </InfoBox>
                    <span>{`${editedExpense.amount} 원`}</span>
                </StyledDetailBox>
            )}

            <ButtonGroup>
                {isEditing ? (
                    <>
                        <button className="save" onClick={handleSave}>
                            저장
                        </button>
                        <button className="cancel" onClick={handleCancel}>
                            취소
                        </button>
                    </>
                ) : (
                    <>
                        {isAuthor && (
                            <>
                                <button className="edit" onClick={handleEdit}>
                                    수정
                                </button>
                                <button className="delete" onClick={handleDelete}>
                                    삭제
                                </button>
                            </>
                        )}
                        <button className="back" onClick={handleBack}>
                            뒤로가기
                        </button>
                    </>
                )}
            </ButtonGroup>
        </StyledDetail>
    );
};

export default Detail;
