# 🧩 React + TypeScript 프로젝트 (FSD 구조 기반)

## 📚 개요

이 프로젝트는 **React + TypeScript + Vite** 환경에서 개발되며, **Feature-Sliced Design(FSD)** 아키텍처를 기반으로 구성됩니다.  
페이지 라우팅은 **React Router v6**를 사용하며, 각 기능은 `features`, `entities`, `pages`, `shared`, `app`으로 관심사를 분리하여 구성됩니다.

---

## 📁 프로젝트 구조
```
src/
├── app/ # 앱 초기화 및 라우터 구성
│ ├── App.tsx
│ └── main.tsx
│
├── pages/ # 라우팅 단위의 페이지
│ ├── home/HomePage.tsx
│ └── about/AboutPage.tsx
│
├── features/ # 독립적인 기능 단위
│ └── greet-user/
│ ├── model/useGreet.ts
│ └── ui/GreetInput.tsx
│
├── entities/ # 도메인 UI 단위 (상태 없음)
│ └── user/ui/UserGreeting.tsx
│
├── shared/ # 공통 UI/유틸
│ ├── ui/Input.tsx
│ └── router/routes.tsx
```

## 🚀 실행 방법

### 1. 프로젝트 초기화
```bash
npm create vite@latest react-fsd-app --template react-ts
cd react-fsd-app
npm install

npm run dev
```
