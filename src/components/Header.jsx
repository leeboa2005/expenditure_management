import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/modules/authSlice';
import useUserInfo from '../hooks/useUserInfo';

const StyledHeader = styled.header`
    width: var(--default-width);
    padding: 10px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid #ddd;
    margin: 0 auto;
    color: #000;
    font-size: 16px;
    font-weight: 500;

    img {
        width: 130px;
    }

    nav {
        display: flex;
        align-items: center;
        gap: 20px;

        a {
            font-size: 16px;
        }

        @media only screen and (max-width: 734px) {
            p {
                display: none;
            }
        }
    }
`;

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const userInfo = useSelector((state) => state.user.userInfo);

    useUserInfo();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    return (
        <StyledHeader>
            <h1>
                <Link to="/">
                    <img src="/logo.png" alt="로고" />
                </Link>
            </h1>
            <nav>
                {userInfo ? <p>안녕하세요 {userInfo.nickname}님 👋</p> : <p>안녕하세요 사용자님 👋</p>}
                <Link to="/mypage">마이페이지</Link>
                <Link to="/login" onClick={handleLogout}>
                    로그아웃
                </Link>
            </nav>
        </StyledHeader>
    );
};

export default Header;
