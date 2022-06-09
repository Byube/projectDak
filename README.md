# BlockChainsvr_adminclient

## 설치

```
npm install (개발시 npm 사용 버전 6.14.15 node v14.18.1)
```

## 실행

#### 개발 환경
```
npm run dev
```

## 프로젝트 build
```
npm run build
```

## 프로젝트 build 및 서버환경으로 전환
```
npm run serve
```
## Stack

-   [Vue 3.2.25](https://v3.vuejs.org/)
-   [Vuex 4.0](https://vuex.vuejs.org)
-   [Router](https://router.vuejs.org/)
-   [Vite 2.0](https://vitejs.dev/)
-   [Primevue 3.10.0](https://primefaces.org/primevue/#/)
-   [primeflex 3.1.2](https://www.primefaces.org/primeflex/)
-   eslint
-   prettier

<pre>
├─public                          - 테마, tmp이미지
├─src                             - 프로젝트 소스코드
│  ├─api                          - 서버, 통신 모듈
│  ├─assets                       - 공통, css, 이미지
│  ├─common                       - 프로젝트 공통
│  │ └─contants.js                - 상수 파일
│  ├─components
│  │  ├─dialogs                   - 공통 및 특정 다이아로그 컴포넌트
│  │  ├─popup                     - 팝업 컴포넌트
│  │  └─tables
│  │      └─header                - 공통 TableHeader
│  ├─router                       - 화면이동 파일
│  ├─store                        - vuex 모듈
│  │  └─modules
│  ├─views                        - 웹 화면
│  │    ├─common                  - 오류, 잘못된 접근 화면
│  │    ├─footer                  - 화면 하단
│  │    ├─header                  - 화면 상단
│  │    │  └─sideNav              - 화면 메뉴트리
│  │    ├─main                    - 메인화면

│  │    │  └─SignIn.vue           - 로그인 화면
│  │    └─themes                  - 테마변경
│  ├─App.vue                      - 메인 vue
│  ├─index.css                    - tailwindcss
│  └─main.js                      - 메인 랜더
│
├─ .env.development               - 개발 환경변수
├─ .env.product                   - 운영 환경변수
├─ index.html                     - vue 랜더링 탬플릿
├─ package-lock.json              - npm 패키지간 의존성 설정
├─ package.json                   - npm 설정
├─ postcss.config.js              - post css 설정
├─ tailwind.config.js             - tailwind css 설정
├─ vite.config.js                 - vite 설정
└─ README.md                      - readme

</pre>