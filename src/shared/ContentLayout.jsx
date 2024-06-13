import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const StyledLayout = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainContent = styled.div`
    margin: var(--layout-center);
    width: var(--default-width);
    flex: 1;
`;

const ContentLayout = () => {
    return (
        <StyledLayout>
            <Header />
            <MainContent>
                <Outlet />
            </MainContent>
            <Footer />
        </StyledLayout>
    );
};

export default ContentLayout;
