import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Router from './shared/Router';
import { checkAuth } from './redux/modules/authSlice';
import GlobalStyle from './assets/styles/GlobalStyle';

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkAuth());
    }, [dispatch]);

    return (
        <>
            <GlobalStyle />
            <Router />
        </>
    );
};

export default App;
