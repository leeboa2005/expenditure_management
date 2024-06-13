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
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<ContentLayout />}>
                    <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
                    <Route path="/detail/:id" element={isAuthenticated ? <Detail /> : <Navigate to="/login" />} />
                    <Route path="/mypage" element={isAuthenticated ? <MyPage /> : <Navigate to="/login" />} />
                </Route>
                <Route element={<BasicLayout />}>
                    <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={isAuthenticated ? <Navigate to="/" /> : <Signup />} />
                </Route>
                <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
