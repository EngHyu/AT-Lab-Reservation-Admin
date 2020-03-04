# 프론트엔드 시작하기

1. frontend 폴더에 들어가 `yarn` 명령어를 통해 개발에 사용된 node 모듈을 내려받습니다.
2. `yarn start` 명령어를 통해 실행할 수 있습니다.
3. `yarn build` 명령어를 통해 정적 웹을 빌드할 수 있습니다. build 폴더 아래에 위치합니다.
4. `yarn serve` 명령어를 통해 정적 웹을 serve 할 수 있습니다.

# 프론트엔드 구조
```
frontend/
ㄴ public/
  ㄴ index.html
  ㄴ manifest.json
  ㄴ robots.txt

ㄴ src/
  ㄴ components/
  ㄴ strings/
  ㄴ styles/
  ㄴ index.js
  ㄴ serviceWorker.js
  ㄴ settings.js
```

- `public` 폴더에는 템플릿과 기타 등등 설정 파일이 들어있습니다.

- `yarn start` 하시면 `src/index.js`를 통해 진입합니다.
`src/index.js`는 각종 React component를 포함한 `src/components/App.js`를 불러와, `<App />`을 템플릿 도큐먼트에 붙입니다. 이후 `serviceWorker`에 등록합니다.

- React component는 `src/components` 아래에 있습니다. 다른 것보다 `table.js`를 중점적으로 보시면 될 것 같습니다. 코드가 좀 더럽습니다. 아래 라이브러리를 사용하였습니다.

    - react-bootstrap-table-next
    - react-bootstrap-table2-paginator
    - react-bootstrap-table2-toolkit

    `react-bootstrap-table2-editor`를 사용하면 수정도 가능합니다. 이곳을 참고하여 주세요.
    [https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html](https://react-bootstrap-table.github.io/react-bootstrap-table2/storybook/index.html)

- db 내용은 axios를 통해 `backend ([localhost:3000](http://localhost:3000) )`에서 불러옵니다.

- `strings/` 아래에 언어 파일이 있으나 현재 `ko.json`만 사용하고 있습니다.

- `styles/`에 모든 css 파일이 있으며, `<Table />`이나 `ImportCSV />`에 대한 내용은 `App.css`에 있습니다.

- `settings.js` 파일에는 테이블 width 값이 지정되어 있습니다.