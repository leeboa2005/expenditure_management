import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginApi } from '../axios/api';
import { updateNicknameSuccess } from '../redux/modules/userSlice';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useUserInfo from '../hooks/useUserInfo';

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 140px);
    padding: 20px;
`;

const ContentContainer = styled.div`
    max-width: 400px;
    width: 100%;
    padding: 50px 20px;
    background-color: var(--grey-color);
    border-radius: var(--default-radius);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
`;

const Title = styled.h2`
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
`;

const Info = styled.p`
    font-size: 18px;
    margin: 10px 0;
    color: #666;
`;

const Input = styled.input`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    margin: 15px 0 10px 0;
    border: 1px solid #ddd;
    font-size: 16px;
    box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    border-radius: var(--default-radius-2);
`;

const Button = styled.button`
    width: 100%;
    max-width: 400px;
    padding: 10px;
    background-color: #8ec8f3;
    color: #fff;
    border: none;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: var(--main-hover-color);
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

const MyPage = () => {
    const [newNickname, setNewNickname] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    useUserInfo();

    useEffect(() => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            navigate('/login');
        }
    }, [isAuthenticated, navigate]);

    const handleNicknameChange = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            const formData = new FormData();
            formData.append('nickname', newNickname);

            const response = await loginApi.patch('/profile', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                dispatch(updateNicknameSuccess(response.data.nickname));
                alert('닉네임이 변경되었습니다.');
                setNewNickname('');
            } else {
                alert('닉네임 변경에 실패했습니다.');
            }
        } catch (error) {
            console.error('닉네임 변경에 실패했습니다.', error);
            alert('닉네임 변경에 실패했습니다.');
        }
    };

    return (
        <PageContainer>
            <ContentContainer>
                <Title>프로필 수정</Title>
                {userInfo && (
                    <>
                        <Info>아이디: {userInfo.id}</Info>
                        <Info>닉네임: {userInfo.nickname}</Info>
                        <form onSubmit={handleNicknameChange}>
                            <Input
                                type="text"
                                value={newNickname}
                                onChange={(e) => setNewNickname(e.target.value)}
                                placeholder="새 닉네임"
                            />
                            <Button type="submit">닉네임 변경</Button>
                        </form>
                    </>
                )}
            </ContentContainer>
        </PageContainer>
    );
};

export default MyPage;
