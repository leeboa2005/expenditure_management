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
    }
`;

const Signup = () => {
    const [nickname, setNickname] = useState('');
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignUp = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('비밀번호가 일치하지 않습니다. 다시 확인해주세요.');
            return;
        }

        try {
            const response = await loginApi.post('/register', {
                id,
                password,
                nickname,
            });
            const data = response.data;
            if (data.success) {
                navigate('/login');
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
                <label htmlFor="id">아이디</label>
                <input type="text" value={id} onChange={(e) => setId(e.target.value)} placeholder="ID" />
                <label htmlFor="password">비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="비밀번호"
                />
                <label htmlFor="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="비밀번호 확인"
                />
                <button type="submit">회원가입</button>
            </form>
        </SignUpForm>
    );
};

export default Signup;
