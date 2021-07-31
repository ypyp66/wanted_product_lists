# 배포

https://focused-dubinsky-5c4000.netlify.app

# 0. 설치 및 실행

1. `git clone https://github.com/ypyp66/wanted_product_lists && cd ./wanted_product_lists`
2. `npm install && npm run start`

# 1. 과제 설명

> 고객들이 원하는 상품 목록을 만들기 위해 사용자의 상품 조회 이력을 만들고 특정 상품에 '관심 없음'을 표시할 수 있게 하며, 필터 기능을 포함하고자 한다.
- ClassComponent 사용
- LocalStorage 사용
- 외부 API를 사용하지 않고, Client의 리소스만 사용

# 2. 기술 스택 (사용한 라이브러리와 그 이유...)

1. `styled-components`
   - `css-in-js` 를 위해 사용했습니다.
2. `styled-reset`
   - 브라우저의 기본 `css` 를 제거하기 위해 사용했습니다.
3. `react-router-dom`
   - 페이지 라우팅을 위해 사용했습니다.

# 3. 역할 및 구현

## 같이

- `Home` 페이지 구조 잡기
- 라우팅 설정
- 로컬 스토리지 관련 함수 작성

## 남상혁

- filter 수정
- sort
- 리팩토링

## 이시형

- 제품 상세 페이지 구현
- svg 이미지 구현
- 전체 디자인 수정

# 4. 스크린샷
![recentList image](https://user-images.githubusercontent.com/65903404/127741596-ea230c8d-b10b-4bac-a96b-eefa520feda7.png)
