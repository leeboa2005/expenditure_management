import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../redux/modules/authSlice';
import { loginApi } from '../axios/api';
import styled from 'styled-components';

const LoginForm = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    h1 {
        width: 150px;
        margin-bottom: 20px;

        img {
            width: 100%;
        }
    }

    form {
        width: 300px;

        input {
            display: block;
            width: 100%;
            padding: 8px 10px;
            margin-bottom: 10px;
            border: 1px solid rgb(208, 208, 208);
            outline: none;
            box-sizing: border-box;
        }

        label {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        button {
            width: 100%;
            padding: 8px;
            background-color: var(--main-color);
            color: #fff;
            font-weight: 600;
            border-radius: 0;
            &:hover {
                background-color: var(--main-hover-color);
            }
        }
        p.notice {
            color: #cf0606;
            font-size: 14px;
            margin-bottom: 5px;
        }
    }
`;

const SignUpLink = styled.div`
    width: 300px;
    margin-top: 15px;

    span:first-child {
        margin-right: 5px;
    }
    a {
        font-size: 14px;
        color: #919191;
    }
`;

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const errors = {};
        if (!id.trim()) {
            errors.id = '아이디를 입력해주세요.';
        }
        if (!password.trim()) {
            errors.password = '비밀번호를 입력해주세요.';
        }
        return errors;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await loginApi.post('/login', { id, password });
            const data = response.data;

            if (data.success) {
                localStorage.setItem(
                    'user',
                    JSON.stringify({
                        id: data.userId,
                        nickname: data.nickname,
                        accessToken: data.accessToken,
                    })
                );
                localStorage.setItem('accessToken', data.accessToken); // 토큰 저장
                console.log('Stored accessToken:', localStorage.getItem('accessToken')); // 로그 추가

                dispatch(login(data.accessToken)); // 로그인 상태 업데이트
                navigate('/');
            } else {
                alert('로그인 실패했습니다.');
            }
        } catch (error) {
            console.error('로그인 에러:', error);
            alert('로그인 실패했습니다.');
        }
    };

    return (
        <LoginForm>
            <h1>
                <img src="/logo.png" alt="로고" />
            </h1>
            <form onSubmit={handleLogin}>
                <label>아이디</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="아이디" />
                {errors.id && <p className="notice">{errors.id}</p>}
                <label>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                {errors.password && <p className="notice">{errors.password}</p>}
                <button type="submit">로그인</button>
            </form>
            <SignUpLink>
                <Link to="/signup">
                    <span>회원이 아니신가요?</span>
                    <span>회원가입</span>
                </Link>
            </SignUpLink>
        </LoginForm>
    );
};

export default Login;
