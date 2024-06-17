# 프로젝트 이름
<img src="public/logo.png" width="190" />

## 데모 
<img src="https://github.com/leeboa2005/expenditure_management/assets/71476841/2dde4212-08b2-4427-9af6-13c3d6659d48" width="800" />

## 소개

이 프로젝트는 지출 관리 애플리케이션으로, 사용자는 자신의 지출 내역을 기록하고 관리할 수 있습니다. <br>
지출 내역을 월별, 그래프로 시각화하여 제공하며, 사용자 인증 기능을 포함합니다.

## 주요 기능
- 사용자 인증 (로그인 및 회원가입)
- 지출 내역 기록 및 조회
- 월별 지출 내역 그래프 시각화
- 사용자 정보 관리

## 디렉토리 구조

```lua
src/
├── assets/
│   ├── graph/
│   │   └── icons.jsx
│   └── styles/
│       ├── skeleton/
│       │   ├── Bar.js
│       │   └── Circle.js
│       │ 
│       └── GlobalStyle.jsx
├── axios/
│   ├── api.js
│   └── expenseApi.js
├── components/
│   ├── ExpenseForm.jsx
│   ├── ExpenseGraph.jsx
│   ├── ExpenseHistory.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── MonthlyExpense.jsx
├── config/
│   ├── queryClient.js
├── hooks/
│   ├── useAuth.js
│   ├── useExpenseDetail.js
│   ├── useExpenses.js
│   └── useUserInfo.js
├── pages/
│   ├── Detail.jsx
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Mypage.jsx
│   └── Signup.jsx
├── redux/
│   ├── config/
│   │   └── configStore.jsx
│   └── modules/
│       ├── authSlice.jsx
│       ├── expenseDataSlice.jsx
│       └── userSlice.jsx
├── shared/
│   ├── BasicLayout.jsx
│   ├── ContentLayout.jsx
│   ├── Router.jsx
│   └── App.jsx
├── .env.example
├── .eslintrc.js
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── vercel.json
└── vite.config.js
```
## json-server
[링크](https://github.com/leeboa2005/expenses-json-server)

 ## 사용 기술 
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/4b274a1b-323d-4bc4-8c72-6c72d77169e9)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/772f3e0c-ed87-403f-a973-8986b27b0613)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/4255389c-71e6-4da1-9cce-dadf09314841)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/294ef4c9-549c-4d66-b082-0aa3b937a61f)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/29bd87fd-44aa-4afb-895d-36a8676d57cd)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/804dc112-8479-434f-bd85-c74732357347)

## 배포 방법 
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/4616902c-df5f-442c-b97f-6203fa35e6ad)
![image](https://github.com/leeboa2005/expenditure_management/assets/71476841/94e44861-6682-4524-ba66-8feef390b23f)

## 배포 링크
[Hello Money](https://expenditure-management-phi.vercel)


## 설치 및 실행

### 요구사항

- Node.js (버전 14 이상)
- npm 또는 yarn

### 설치

```bash
git clone https://github.com/your-repository.git
cd your-repository
npm install
```
### 환경 변수 설정
프로젝트 루트에 .env 파일을 생성하고, .env.example 파일을 참고하여 환경 변수를 설정합니다.

- 예시 `.env 파일`
```bash
VITE_API_BASE_URL=https://your-api-url.com
VITE_LOGIN_API_BASE_URL=https://your-login-api-url.com
```

### 실행 

```bash
npm run dev
```



