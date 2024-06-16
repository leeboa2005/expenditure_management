import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import Home from '../pages/Home';
import Detail from '../pages/Detail';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import BasicLayout from './BasicLayout';
import ContentLayout from './ContentLayout';
import MyPage from '../pages/Mypage';
import { checkAuth } from '../redux/modules/authSlice';

const Router = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated); // 인증 상태를 가져옴
    const dispatch = useDispatch();

    useEffect(() => {
        // 컴포넌트가 마운트될 때 인증 상태를 확인
        dispatch(checkAuth())
            .unwrap()
            .catch((error) => {
                console.error('인증 확인 실패:', error);
            });
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                {/* 로그인 O */}
                <Route element={<ContentLayout />}>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/detail/:id" element={isAuthenticated ? <Detail /> : <Navigate to="/login" />} />
                    <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <Navigate to="/login" />} />
                </Route>
                {/* 로그인 X */}
                <Route element={<BasicLayout />}>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
                </Route>
                {/* 인증 상태에 따라 기본 경로로 리디렉션 */}
                <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
