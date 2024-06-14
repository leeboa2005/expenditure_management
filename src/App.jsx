import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from './shared/Router';
import { checkAuth, logout } from './redux/modules/authSlice';
import GlobalStyle from './assets/styles/GlobalStyle';
import styled from 'styled-components';

const Loading = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const App = () => {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true); // 로딩 상태 관리

    // 컴포넌트가 마운트될 때 인증 상태를 확인
    useEffect(() => {
        dispatch(checkAuth()).finally(() => setLoading(false));

        // 브라우저가 닫힐 때 로그아웃 처리
        const handleBeforeUnload = () => {
            dispatch(logout());
        };
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [dispatch]);

    // 로딩 중일 때 로딩 화면 표시
    if (loading) {
        return (
            <Loading>
                <img src="/loading.gif" alt="로딩 중" />
            </Loading>
        );
    }

    // 로딩이 완료되면 메인 앱 렌더링
    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
};

export default App;
