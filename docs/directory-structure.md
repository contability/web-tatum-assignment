# DIRECTORY-STRUCTURE

---

# 디렉토리 구조

```
./
├── docs
├── public
├── src
│   ├── assets
│   ├── components
│   ├── hooks
│   ├── pages
│   ├── services
│   ├── store
│   ├── styles
│   ├── types
│   ├── utils
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── node_modules
├── package.json
├── tsconfig.json
├── vite.config.ts
├── index.html
├── ...
```

# 디렉토리 구조 설명

## 📁 **루트 디렉토리**

프로젝트의 설정 파일과 문서를 포함하는 루트 디렉토리.

### ▶️ 📂 **docs**

프로젝트 문서와 가이드를 담은 디렉토리.

### ▶️ 📂 **public**

정적 파일을 저장하는 디렉토리. 브라우저에서 직접 접근 가능한 파일들이 위치한다.

### ▶️ 📂 **src**

프로젝트의 주요 소스 코드를 담은 디렉토리.

#### 🔹 📂 **assets**

이미지, 폰트 등의 정적 자산을 저장하는 디렉토리.

#### 🔹 📂 **components**

UI 컴포넌트를 담은 디렉토리.

#### 🔹 📂 **hooks**

커스텀 React 훅을 관리하는 디렉토리.

#### 🔹 📂 **pages**

애플리케이션의 페이지 컴포넌트들을 담은 디렉토리.

#### 🔹 📂 **services**

API 통신 및 서비스 로직을 담은 디렉토리.

#### 🔹 📂 **store**

상태 관리 스토어를 담은 디렉토리.

#### 🔹 📂 **styles**

전역 스타일 및 스타일 관련 파일을 담은 디렉토리.

#### 🔹 📂 **types**

TypeScript 타입 정의 파일을 담은 디렉토리.

#### 🔹 📂 **utils**

프로젝트 전반에서 사용되는 유틸리티 함수를 담은 디렉토리.

#### 🔹 📄 **App.tsx**

애플리케이션의 루트 컴포넌트.

#### 🔹 📄 **main.tsx**

애플리케이션의 진입점.

#### 🔹 📄 **vite-env.d.ts**

Vite 환경 변수 타입 정의 파일.
