import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '../axios/api';
import styled from 'styled-components';

const SignUpForm = styled.div`
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

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    // 유효성 검사 함수
    const validateForm = () => {
        const errors = {};
        if (!nickname.trim()) {
            errors.nickname = '닉네임을 입력해주세요.';
        }
        if (!id.trim()) {
            errors.id = '아이디를 입력해주세요.';
        }
        if (!password.trim()) {
            errors.password = '비밀번호를 입력해주세요.';
        } else {
            const hasTwoLetters = /[a-zA-Z].*[a-zA-Z]/.test(password); // 최소 두 개의 영문자가 포함되어 있는지 확인
            if (!hasTwoLetters) {
                errors.password = '비밀번호에는 최소 두 개의 영문자가 포함되어야 합니다.';
            }
            if (password.length < 6) {
                errors.password = '비밀번호는 최소 6자리여야 합니다.';
            }
        }
        if (password !== confirmPassword) {
            errors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }
        return errors;
    };

    // 회원가입 처리 함수
    const handleSignUp = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm(); // 유효성 검사 실행
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await loginApi.post(
                '/register',
                {
                    id,
                    password,
                    nickname,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            const data = response.data;
            if (data.success) {
                navigate('/login'); // 회원가입 성공 시 로그인 페이지로 이동
            } else {
                alert('회원가입 실패하였습니다.');
            }
        } catch (error) {
            console.error('Signup error:', error);
            alert('회원가입 실패하였습니다.');
        }
    };

    return (
        <SignUpForm>
            <h1>
                <img src="/logo.png" alt="로고" />
            </h1>
            <form onSubmit={handleSignUp}>
                <label htmlFor="nickname">닉네임</label>
                <input
                    type="text"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    placeholder="닉네임"
                />
                {errors.nickname && <p className="notice">{errors.nickname}</p>}
                <label htmlFor="id">아이디</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                {errors.id && <p className="notice">{errors.id}</p>}
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                {errors.password && <p className="notice">{errors.password}</p>}
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                />
                {errors.confirmPassword && <p className="notice">{errors.confirmPassword}</p>}
                <button type="submit">회원가입</button>
            </form>
        </SignUpForm>
    );
};

export default Signup;
