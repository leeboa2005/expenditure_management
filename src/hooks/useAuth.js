import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, checkAuth } from '../redux/modules/authSlice';
import { loginApi } from '../axios/api';
import { useEffect } from 'react';

// 토큰 확인 함수
const verifyToken = async () => {
    const token = localStorage.getItem('accessToken'); // 로컬 스토리지에서 토큰을 가져옴
    if (!token) {
        console.error('유효한 토큰이 없습니다.');
        throw new Error('No token found');
    }
    try {
        const response = await loginApi.get('/user', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.data) {
            return response.data;
        } else {
            console.error('잘못된 토큰입니다. ');
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.error('토큰 오류 확인:', error);
        throw error;
    }
};

// 인증 상태를 관리하는 커스텀 훅
export const useAuth = () => {
    const dispatch = useDispatch();
    // 인증 상태를 리덕스 스토어에서 가져옴
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    // 토큰을 확인하고 결과를 처리
    const { isLoading, error } = useQuery({
        queryKey: ['auth'],
        queryFn: verifyToken, // 토큰 확인 함수 호출
        onSuccess: () => {
            dispatch(login()); // 성공 시 로그인 액션 디스패치
        },
        onError: (error) => {
            console.error('토큰 오류 확인:', error);
            dispatch(logout()); // 실패 시 로그아웃 액션 디스패치
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    // 컴포넌트가 마운트될 때 인증 상태 확인
    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return { isLoading, isAuthenticated, error };
};
