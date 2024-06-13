import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUserInfo, setError, clearUserInfo } from '../redux/modules/userSlice';
import { loginApi } from '../axios/api';

const useUserInfo = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
    const userInfo = useSelector((state) => state.user.userInfo);

    useEffect(() => {
        const fetchUserInfo = async () => {
            if (isLoggedIn && !userInfo) {
                try {
                    const token = localStorage.getItem('accessToken');
                    if (!token) {
                        throw new Error('No access token found');
                    }
                    const response = await loginApi.get('/user', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    dispatch(setUserInfo(response.data));
                } catch (error) {
                    console.error('사용자 정보를 가져오는데 실패했습니다.', error);
                    dispatch(setError(error.toString()));
                }
            }
        };

        fetchUserInfo();
    }, [isLoggedIn, userInfo, dispatch]);

    useEffect(() => {
        if (!isLoggedIn) {
            dispatch(clearUserInfo());
        }
    }, [isLoggedIn, dispatch]);

    return userInfo;
};

export default useUserInfo;
