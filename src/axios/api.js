import axios from 'axios';

// json-server의 기본 URL을 설정
const api = axios.create({
    baseURL: '/api', // Vite 프록시 설정에 맞게 수정
});

// 로그인 관련 서버의 기본 URL을 설정
const loginApi = axios.create({
    baseURL: 'https://moneyfulpublicpolicy.co.kr',
});

// 인터셉터 설정
const setupInterceptors = (instance) => {
    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log('인터셉트 요청 성공!');
        return config;
    });

    instance.interceptors.response.use(
        (response) => {
            console.log('인터셉트 응답 받았어요!');
            return response;
        },
        (error) => {
            console.log('인터셉트 응답을 받지 못했습니다.', error);
            return Promise.reject(error);
        }
    );
};

// 인터셉터를 두 개의 인스턴스에 설정
setupInterceptors(api);
setupInterceptors(loginApi);

export { api, loginApi };
export default api;
