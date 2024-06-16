import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setError, clearUserInfo } from '../redux/modules/userSlice';
import { loginApi } from '../axios/api';

// 인가된 사용자 정보를 가져오는 훅
const useUserInfo = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated); // 로그인 여부 확인
    const userInfo = useSelector((state) => state.user.userInfo); // redux 스토어에서 사용자 정보 가져옴

    //
    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isLoggedIn && !userInfo) {
                // 로그인되어 있고 사용자 정보 없을때
                try {
                    const token = localStorage.getItem('accessToken'); // 토큰을 가져옴
                    if (!token) {
                        throw new Error('No access token found');
                    }
                    const response = await loginApi.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    dispatch(setUserInfo(response.data)); // 사용자 정보를 redux 스토어에 저장
                } catch (error) {
                    console.error('사용자 정보를 가져오는데 실패했습니다.', error);
                    dispatch(setError(error.toString())); // 오류 발생 시 에러 상태 업데이트
                }
            }
        };

        fetchUserInfo();
    }, [isLoggedIn, userInfo, dispatch]); // isLoggedIn, userInfo, dispatch가 변경될 때마다 실행

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(clearUserInfo()); // 사용자가 로그아웃되면 사용자 정보 초기화
        }
    }, [isLoggedIn, dispatch]); // isLoggedIn, dispatch가 변경될 때마다 실행

    return userInfo;
};

export default useUserInfo;
