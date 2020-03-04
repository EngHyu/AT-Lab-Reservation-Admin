# 백엔드 시작하기

1. backend 폴더에 들어가 `yarn` 명령어를 통해 개발에 사용된 node 모듈을 내려받습니다.
2. `yarn start` 명령어를 통해 실행할 수 있습니다.
3. `yarn serve` 명령어를 통해 pm2로 serve 할 수 있습니다.
4. `yarn delete` 명령어를 통해 종료할 수 있습니다.

# 백엔드 구조
```
backend/
ㄴ controller/
     ㄴ index.js
     ㄴ upload.js

ㄴ model/index.js
ㄴ router/index.js

ㄴ uploads
ㄴ app.js
ㄴ package.json
```

- `yarn start` 하시면 `app.js`를 통해 진입합니다. 모든 라우팅 작업은 `router/index.js`가 처리합니다.

- `router/index.js`는 주어진 url과 method에 따라 `controller/index.js`의 getTable, postTable을 실행합니다.

- `controller/index.js`는 `model/index.js`를 통해 db에서 정보를 가져오거나, 업로드 받은 파일을 `controller/upload.js`를 이용하여 `uploads/`에 저장합니다. upload 콜백 함수에서 이 파일을 바탕으로 db를 수정합니다. 비동기 작업인데 처리하기 힘들어서 일단 setTimeout으로 작업했습니다.

- db는 `better-sqlite3`을 사용하고 있으며 `model/index.js`에서 확인할 수 있습니다. 사용자 앱 `static/db.db`에 직접 접근합니다.