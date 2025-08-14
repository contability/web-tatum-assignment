# 효율적인 i18n 적용 방안

## 1. 경험했던 적용 사례

### 사용 기술 스택

- **라이브러리**: next-i18next
- **프레임워크**: Next.js
- **지원 언어**: 한국어, 영어, 중국어, 베트남어, 일본어 (5개 언어)

### 구현 방식

#### 설정 구조

```javascript
// next-i18next.config.js
module.exports = {
  i18n: {
    defaultLocale: 'default',
    locales: ['default', 'ko', 'en', 'ch', 'vi', 'ja'],
    localeDetection: false,
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
```

#### 미들웨어 기반 언어 감지

```typescript
// src/middleware.ts
if (req.nextUrl.locale === 'default') {
  const locale = req.cookies.get('locale')?.value || 'en';
  return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url));
}
```

#### 번역 파일 구조

```
public/locales/
├── ko/
│   └── common.json
├── en/
│   └── common.json
├── ch/
│   └── common.json
├── vi/
│   └── common.json
└── ja/
    └── common.json
```

#### 컴포넌트 사용법

```jsx
const { t } = useTranslation('common');
return <button>{t('번역')}</button>;
```

## 2. 문제점

### 개발 생산성 저하

- 모든 텍스트를 `t()` 함수로 감싸야 하는 번거로움
- 새로운 텍스트 추가 시마다 JSON 파일 수정 필요
- 개발자가 번역 키 네이밍까지 고려해야 하는 부담

### 번들 크기 증가

- i18next 전체 생태계로 인한 무거운 번들 크기
- 모든 언어 파일이 초기 로드 시 함께 로드됩니다
- 불필요한 의존성들이 포함됩니다

### 타입 안정성 부족

- 번역 키의 오타 위험 (런타임에서만 발견 가능)
- 존재하지 않는 키 참조 시 에러 없이 키 자체가 렌더링됩니다
- IDE에서 자동완성 지원이 부족합니다

### JSON 파일 관리의 복잡성

- 파일 크기가 커질수록 중복 키 관리가 어렵습니다
- 언어별 파일 간 구조 불일치 발생 가능성
- 사용하지 않는 번역 키 정리의 어려움

### 컨텍스트별 번역 한계

- 한 단어가 페이지나 문맥에 따라 다르게 번역되어야 하는 경우
- 예: "Apply"가 지원서 페이지에서는 "지원하기", 설정 페이지에서는 "적용하기"
- 현재 구조로는 동일한 키로 다른 번역을 제공하기 어렵습니다

### 번역 워크플로우 비효율성

- 개발자와 번역가 간의 협업 과정이 복잡합니다
- 번역 진행 상황 추적이 어렵습니다
- 번역 품질 관리 프로세스가 부재합니다

## 3. 효율적인 i18n 적용 방안

> 아래 제시하는 해결 방안들은 이번 사전 과제를 위해 조사한 내용을 바탕으로 작성된 것입니다.
> 실제로는 기존 적용 사례 이후 i18n 개선을 적용해본 경험이 없어, 실무에서는 프로젝트 규모, 팀 구성, 기술 스택 등의 상황에 따라 예상과 다른 문제들이 발생할 가능성이 높습니다.
> 따라서 실제 적용 시에는 이를 기본 방향으로 삼되, 현실적인 제약사항과 예상치 못한 이슈들을 고려하여 유연하게 수정 및 보완해야 할 것입니다.

### 개발 생산성 저하 → next-intl + 자동화 도구

#### 기존 문제점 (next-i18next 기반)

- 모든 텍스트를 `t()` 함수로 감싸야 하는 번거로움
- 새로운 텍스트 추가 시마다 JSON 파일 수정 필요
- 번역 키 오타 시 런타임에서만 발견 가능

#### 적용 방안

**1. next-intl 도입으로 개발자 경험 개선**

```typescript
// next-intl은 더 직관적인 API 제공
import { useTranslations } from 'next-intl';

function MyComponent() {
  const t = useTranslations('Navigation');
  return <nav>{t('home')}</nav>; // 더 간결한 사용법
}

// 메시지 파일도 더 구조적
// messages/ko.json
{
  "Navigation": {
    "home": "홈",
    "about": "소개"
  }
}
```

**2. 컴파일 타임 타입 체킹**

```typescript
// next-intl은 TypeScript와 더 잘 통합됨
import type { AbstractIntlMessages } from 'next-intl';

declare global {
  interface IntlMessages extends AbstractIntlMessages {
    Navigation: {
      home: string;
      about: string;
    };
  }
}

// 이제 t('wrongKey') 같은 오타는 컴파일 시점에 발견됨
```

### 번들 크기 증가 → App Router + 스트리밍

#### 기존 문제점 (next-i18next 기반)

- 모든 언어 파일이 초기 로드 시 함께 로드됨
- 사용하지 않는 언어도 번들에 포함됨
- 페이지 전환 시에도 불필요한 번역 파일 로딩

#### 적용 방안

**1. Next.js 13+ App Router와 next-intl 조합**

```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // 서버에서 해당 언어만 로드
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
```

**2. 페이지별 메시지 분할과 스트리밍**

```typescript
// app/[locale]/dashboard/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function DashboardPage() {
  // 대시보드 페이지에 필요한 번역만 로드
  const t = await getTranslations('Dashboard');

  return (
    <div>
      <h1>{t('title')}</h1>
      {/* 컴포넌트는 스트리밍으로 점진적 로딩 */}
    </div>
  );
}
```

### 타입 안정성 부족 → 자동 타입 생성 적용

#### 기존 문제점 (next-i18next 기반)

- 번역 키의 오타 위험 (런타임에서만 발견 가능)
- 존재하지 않는 키 참조 시 에러 없이 키 자체가 렌더링됨
- IDE에서 자동완성 지원 부족

#### 적용 방안

**1. 개발 중 실시간 검증**

```typescript
// next.config.js에서 개발 서버 실행 시 검증
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

module.exports = withNextIntl({
  experimental: {
    typedRoutes: true, // 라우트도 타입 체크
  },
});
```

### JSON 파일 관리의 복잡성 → 구조적 파일 관리 적용

#### 기존 문제점 (next-i18next 기반)

- 하나의 큰 JSON 파일로 인한 관리 어려움
- 여러 개발자가 동시에 수정할 때 충돌 발생

#### 적용 방안

**1. 네임스페이스별 파일 분리**

```
public/locales/
├── ko/
│   ├── common.json      # 공통 텍스트
│   ├── navigation.json  # 네비게이션 관련
│   ├── auth.json        # 인증 관련
│   └── dashboard.json   # 대시보드 관련
└── en/
    ├── common.json
    ├── navigation.json
    ├── auth.json
    └── dashboard.json
```

### 컨텍스트별 번역 한계 → ICU MessageFormat + 리치 텍스트

#### 기존 문제점 (next-i18next 기반)

- 한 단어가 페이지나 문맥에 따라 다르게 번역되어야 하는 경우 처리 어려움
- 복수형, 성별, 숫자 포맷 등 복잡한 언어 규칙 지원 부족
- HTML 태그가 포함된 번역 처리의 복잡함

#### 적용 방안

**1. ICU MessageFormat으로 동적 번역**

```typescript
// messages/ko.json
{
  "items": "{count, plural, =0 {항목이 없습니다} =1 {항목 1개} other {항목 #개}}",
  "welcome": "안녕하세요, <strong>{name}</strong>님!",
  "lastLogin": "{gender, select, male {그는} female {그녀는} other {이 사용자는}} {date, date, medium}에 마지막으로 로그인했습니다"
}

// 컴포넌트에서 사용
const t = useTranslations();
<p>{t('items', { count: itemCount })}</p>
<p>{t.rich('welcome', { name: 'John', strong: (chunks) => <strong>{chunks}</strong> })}</p>
```

**2. 컨텍스트 기반 자동 번역 선택**

```typescript
// 라우트 기반 자동 컨텍스트 감지
const useContextualTranslation = () => {
  const pathname = usePathname();
  const context = pathname.includes('/admin') ? 'admin' :
                  pathname.includes('/settings') ? 'settings' : 'general';

  return useTranslations(context);
};

// messages/ko.json
{
  "admin": {
    "apply": "승인하기"
  },
  "settings": {
    "apply": "적용하기"
  },
  "general": {
    "apply": "신청하기"
  }
}
```

### 결론

1. **next-intl + App Router**: 더 나은 개발자 경험과 성능 최적화
2. **자동 타입 생성**: 컴파일 타임 안전성과 개발 효율성 향상
3. **구조적 파일 관리**: 번역 파일 관리의 체계화와 자동화
4. **ICU MessageFormat**: 복잡한 언어 규칙과 동적 콘텐츠 지원
