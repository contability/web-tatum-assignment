# 다수의 API 효율적 관리 방안

제가 생각하는 Tanstack-Query를 사용한 대규모 API 관리 체계에 대한 전체 프로세스입니다.

## 1. API 문서 확인

### 1.1 API 스펙 확인

- OpenAPI/Swagger 등을 통한 API 명세 확인
- 자동 타입 생성 도구와의 호환성 검토
- 스펙 품질 및 정확성 검증

### 1.2 실제 응답 데이터 검증

- Postman, Insomnia 등을 활용한 실제 API 호출 테스트 진행
- 문서 명세와 실제 응답 데이터의 일치 여부 확인
- 타입 효율성 체크하여 불필요한 복잡성 방지

### 1.3 에러 응답 구조 파악

- 통일된 에러 응답 포맷 확인
- HTTP 상태 코드별 에러 응답 구조 분석
- 프론트엔드 에러 핸들링 로직 공통화 가능성 평가

### 1.4 기존 타입과의 호환성 검토

- 이미 구현된 인터페이스 재사용 가능성 확인
- 공통 타입으로 추출 가능한 패턴 식별
- 비슷한 도메인 API들의 타입 통합 가능성 검토

### 1.5 백엔드 팀과의 소통 체계

- 스펙 변경 시 사전 논의 프로세스 확립
- 모호한 명세에 대한 질의응답 채널 구축
- API 변경 사항 공지 및 마이그레이션 가이드 요청

## 2. API 타입 작성

### 2.1 타입 구조 설계

#### 공통 응답 Wrapper 타입

```typescript
// 표준 API 응답 구조
export interface StandardResponse<T> {
  success: boolean;
  httpStatusCode: number;
  result: T;
  message?: string;
}

// 에러 응답 구조
export interface ErrorResponse {
  url?: string;
  status: number;
  message: string;
  error: string;
}
```

#### 도메인별 기본 타입 정의

```typescript
// 사용자 역할 타입
const USER_ROLE = {
  ADMIN: 'ADMIN',
  USER: 'USER',
  GUEST: 'GUEST',
} as const;

type UserRoleType = (typeof USER_ROLE)[keyof typeof USER_ROLE];

// 재사용 가능한 기본 엔티티 타입
interface User {
  id: number;
  email: string;
  name: string;
  role: UserRoleType;
  createdAt: string;
  updatedAt: string;
}
```

### 2.2 네이밍 컨벤션

#### Request/Response 타입 구분

```typescript
// Request 타입
interface UserCreateRequest {
  email: string;
  name: string;
  password: string;
}

// Response 타입
interface UserCreateResponse {
  user: User;
  accessToken: string;
}
```

#### 상수 객체 타입 네이밍

```typescript
// {도메인}_{필드} 형식의 상수 객체
const ORDER_STATUS = {
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  CANCELLED: 'CANCELLED',
} as const;

type OrderStatusType = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

const PRODUCT_CATEGORY = {
  ELECTRONICS: 'ELECTRONICS',
  CLOTHING: 'CLOTHING',
  BOOKS: 'BOOKS',
} as const;

type ProductCategoryType = (typeof PRODUCT_CATEGORY)[keyof typeof PRODUCT_CATEGORY];
```

### 2.3 타입 파일 구조

```
src/
├── types/
│   ├── common/
│   │   ├── api.ts          # 공통 API 응답 타입
│   │   └── pagination.ts   # 페이지네이션 관련 타입
│   └── api/
│       ├── user.ts         # 사용자 API 모든 요청/응답 타입
│       └── product.ts      # 상품 API 모든 요청/응답 타입
```

### 2.4 타입 작성 프로세스

1. OpenAPI 등을 통해 스펙에서 기본 구조 파악
2. 실제 응답 데이터로 타입 정확성 검증
3. 공통 패턴 추출하고 재사용 가능한 타입 설계
4. 도메인별 타입 파일 분리하고 구조화
5. TypeScript strict 모드에서 타입 안전성 검증

## 3. API 호출 훅 구성

### 3.1 Client/Server 분리 구조 (Next.js)

#### Client Side 훅

```typescript
// API 함수 정의
const getAdminCloudList = async () => {
  const result = await axiosClientAPI().get<StandardResponse<Cloud[]>>('/admin/management/users/cloud/list');
  return result.data;
};

// React Query 훅
export const useCloudList = () => {
  return useQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
    queryFn: async () => await getAdminCloudList(),
    refetchOnWindowFocus: false,
  });
};
```

#### Server Side 훅

```typescript
// Server API 함수
const fetchAdminCloudList = async () => {
  const result = await axiosServerAPI().get<StandardResponse<Cloud[]>>('/admin/management/users/cloud/list');
  return result.data;
};

// Prefetch 함수
export const prefetchCloudList = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
    queryFn: async () => await fetchAdminCloudList(),
  });

  return queryClient;
};
```

### 3.2 쿼리 키 팩토리 시스템

#### 쿼리 키 정의

```typescript
export const QUERY_KEYS = {
  CLOUD: 'CLOUD',
  USER: 'USER',
  PRODUCT: 'PRODUCT',
  ORDER: 'ORDER',
} as const;

export const QUERY_KEY_FACTORY = (queryKey: keyof typeof QUERY_KEYS) => {
  const all = [QUERY_KEYS[queryKey]] as const;
  const lists = () => [...all, 'list'] as const;
  const details = [...all, 'detail'] as const;
  const detail = (id: number | string) => [...details, id] as const;
  const mutations = [...all, 'mutations'] as const;
  const mutation = <T>(action: string, data?: T) => [...mutations, action, data] as const;

  return { lists, detail, mutation };
};
```

#### 활용 예시

```typescript
// 쿼리 키 사용
const cloudListKey = QUERY_KEY_FACTORY('CLOUD').lists();
const cloudDetailKey = QUERY_KEY_FACTORY('CLOUD').detail('cloud-123');

// 낙관적 업데이트 시 쿼리 무효화
queryClient.invalidateQueries({
  queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
});
```

### 3.3 뮤테이션 훅 패턴

```typescript
export const useCreateCloud = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CloudCreateRequest) => {
      return await createCloud(data);
    },
    onSuccess: () => {
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
      });
    },
    onError: error => {
      // 에러 처리는 axios interceptor에서 처리됨
      console.error('Cloud 생성 실패:', error);
    },
  });
};
```

### 3.4 훅 구조 표준화

#### 네이밍 컨벤션

```typescript
// 조회 훅: use{Domain}{Action}
export const useUserList = () => { ... };
export const useUserDetail = (id: string) => { ... };

// 뮤테이션 훅: use{Action}{Domain}
export const useCreateUser = () => { ... };
export const useUpdateUser = () => { ... };
export const useDeleteUser = () => { ... };

// Prefetch 함수: prefetch{Domain}{Action}
export const prefetchUserList = async () => { ... };
export const prefetchUserDetail = async (id: string) => { ... };
```

### 3.5 쿼리 옵션 관리

```typescript
// 도메인별 기본 쿼리 옵션
const CLOUD_QUERY_OPTIONS = {
  staleTime: 5 * 60 * 1000, // 5분
  cacheTime: 10 * 60 * 1000, // 10분
  refetchOnWindowFocus: false,
  retry: 2,
};

const USER_QUERY_OPTIONS = {
  staleTime: 3 * 60 * 1000, // 3분
  cacheTime: 10 * 60 * 1000, // 10분
  refetchOnWindowFocus: false,
  retry: 3,
};

export const useCloudList = () => {
  return useQuery({
    queryKey: QUERY_KEY_FACTORY('CLOUD').lists(),
    queryFn: getAdminCloudList,
    ...CLOUD_QUERY_OPTIONS,
  });
};
```

### 3.6 훅 파일 구조

```
src/
├── lib/
│   └── services/
│       ├── cloud/
│       │   ├── client.ts    # 클라이언트 사이드 API 훅
│       │   └── server.ts    # 서버 사이드 API 훅
│       └── user/
│           ├── client.ts
│           └── server.ts
```

## 4. 전체 워크플로우

### 4.1 새로운 API 추가 시 프로세스

1. **API 문서 검토** → OpenAPI 등을 통한 스펙 확인 및 실제 응답 테스트를 진행합니다
2. **타입 정의** → Request/Response 타입을 작성하고 기존 타입과의 호환성을 검토합니다
3. **쿼리 키 등록** → 쿼리 키 팩토리에 새로운 도메인을 추가합니다
4. **훅 구현** → Client/Server 분리된 API 호출 훅을 구현합니다
5. **테스트** → 타입 안전성 및 실제 동작을 검증합니다

### 4.2 API 변경 시 대응 방안

1. **변경 사항 파악** → 스키마 변경, 필드 추가/삭제/수정을 확인합니다
2. **타입 업데이트** → 관련 타입 정의를 수정합니다
3. **훅 수정** → 필요시 훅 로직을 업데이트합니다
4. **영향도 분석** → 변경으로 인한 기존 코드 영향 범위를 확인하는 것이 중요합니다

### 4.3 대규모 API 관리의 핵심 원칙

- **일관성**: 모든 API에 최대한 동일한 패턴과 규칙을 적용하는 것이 중요하다고 생각합니다
- **재사용성**: 공통 타입과 유틸리티를 최대한 활용하는 것이 효율적입니다
- **확장성**: 새로운 API 추가 시 기존 구조에 쉽게 통합할 수 있어야 한다고 생각합니다
- **유지보수성**: 명확한 파일 구조와 네이밍으로 코드 가독성을 향상시키는 것이 중요하다고 생각합니다

이러한 체계적인 접근을 통해 대규모 API를 효율적으로 관리하고, 개발 생산성과 코드 품질을 동시에 확보할 수 있다고 생각합니다.
