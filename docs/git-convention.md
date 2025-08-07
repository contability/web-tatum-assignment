## Git Commit Convention

### 1. Branch Naming

---

```bash
FRONTEND-[ISSUE_KEY]
# ex. FRONTEND-123
```

위와 같은 구조로 브랜치 이름을 구성한다.

<br/>

### 2. Commit Message

---

- Default Message

```bash
(VERB_NAME) MESSAGE
# ex. (add) 기본 커밋 메시지 예시입니다.
```

<br/>

- Detail Message

```bash
(VERB_NAME) MESSAGE

- Description1
- Description2
# ex. (refactor) 상세 커밋 메시지 예시입니다.
#
# - 자세한 내용을 기입합니다.
# - ...
```

위와 같은 구조로 커밋 메시지를 구성한다.
메시지는 (1)의 동사 목록에 있는 동사로 시작하도록 한다.

#### (1) 동사 목록

- add - 새로운 기능, 코드 등의 추가
- remove - 기존의 기능, 코드 등을 삭제
- fix - 잘못된 동작, 오타 등의 수정
- refactor - 정상적인 기존 동작 및 성능, 호환성 등의 개선
- merge - 브랜치 병합
- hotfix - 잘못된 동작, 오타 등의 긴급 수정
- setup - 설정의 변경
