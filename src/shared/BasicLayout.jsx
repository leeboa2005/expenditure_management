import styled from 'styled-components';
import { Outlet } from 'react-router-dom';

const StyledLayout = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainContent = styled.div`
    width: 100%;
`;

const BasicLayout = () => {
    return (
        <StyledLayout>
            <MainContent>
                <Outlet />
            </MainContent>
        </StyledLayout>
    );
};

export default BasicLayout;
