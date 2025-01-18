# 오픈소스컨설팅 FE 과제

### Env
- Node 18.18.0

### Stack
- React 16.8
- Typescript 4.5
- Parcel 1.12.4
- React-i18Next 22.5.1
- Yarn

### Atlassian Design Components
- Avatar
- Button
- Comment
- DatePicker
- DynamicTable
- Form
- Heading
- Icon
- Lozenge
- Menu
- Modal
- Page
- Primitives (Grid, Flex, Box ...)
- SectionMessage
- Select
- Spinner
- TextField

### Main Functions 

- 다국어 기능(데이터 제외)
- 사용자 목록 페이지
    - 각 사용자 항목을 클릭하면 해당 사용자의 상세 정보를 표시
    - 사용자 정보 수정 (기능 구현 X 버튼만 생성)
    - 사용자 이름, 메일 검색
    - 자동완성 기능 제공
- 게시물 목록 페이지
    - 각 게시물 항목을 클릭하면 해당 게시물의 상세 정보를 표시
    - 게시물 내에 댓글 목록을 표시
    - 게시물 / 댓글 수정, 삭제 (기능 구현 X 버튼만 생성)
    - 게시물 검색 (제목 검색)
    - 제목 자동완성 기능 제공
    - 날짜를 통한 필터 제공
    - 페이징 기능
- 할일 목록을 표시하는 페이지
    - 완료된 할일과 미 완료된 할일을 테이블 내 아이콘으로 분류 가능하도록 표시
    - 페이징 기능
- 데이터 패칭 상태에 따른 렌더링 처리 기능 (error, loading, success)


### Install and Run
```
yarn install
yarn start
```

