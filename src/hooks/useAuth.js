import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, checkAuth } from '../redux/modules/authSlice';
import { loginApi } from '../axios/api';
import { useEffect } from 'react';

const verifyToken = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
        console.error('verifyToken - No token found');
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
            console.error('verifyToken - Invalid token');
            throw new Error('Invalid token');
        }
    } catch (error) {
        console.error('verifyToken - Error:', error);
        throw error;
    }
};

export const useAuth = () => {
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const { isLoading, error } = useQuery({
        queryKey: ['auth'],
        queryFn: verifyToken,
        onSuccess: () => {
            dispatch(login());
        },
        onError: (error) => {
            console.error('useAuth - verifyToken error:', error);
            dispatch(logout());
        },
        refetchOnWindowFocus: false,
        retry: false,
    });

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return { isLoading, isAuthenticated, error };
};
