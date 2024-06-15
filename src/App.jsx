import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Router from './shared/Router';
import { checkAuth } from './redux/modules/authSlice';
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

    useEffect(() => {
        dispatch(checkAuth());
        setLoading(false);
    }, [dispatch]);
    if (loading) {
        return (
            <Loading>
                <img src="/loading.gif" alt="로딩 중" />
            </Loading>
        );
    }

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
