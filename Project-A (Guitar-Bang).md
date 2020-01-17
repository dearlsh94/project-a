# Project-A (Guitar-Bang)

1. create-react-app 프로젝트 생성
2. Library 추가
3. firebase db 생성
   1. hosting 기능 추가
   2. storage 기능 추가
4. Project-A 와 DB 연결 및 Router 설정
4. typescript 설정
6. Git 연결
7. Material-UI 적용



## 1. create-react-app 프로젝트 생성

```c
$npm i -g create-react-app
$cd [Project Path]
$create-react-app [AppName]
$npm run start
```



## 2. Library 추가

### typescript

- ```
  $npm i -g typescript #for use to tsc (typescript compiler)
  $npm i --save-dev typescript
  $tsc --init
  $npm i @types/react @types/react-dom
  ```

### react-router

- ```
  $npm i react-router
  $npm i react-router-dom
  $npm i @types/react-router-dom
  ```

### firebase

- ```
  $npm i firebase
  ```


### Material-UI

- ```
  $npm i @material-ui/core
  $npm i @material-ui/icons
  ```

### image-slider

- ```
  $npm i react-image-gallery
  $npm i @type/react-image-gallery
  ```

### Sass

- ```
  $npm i node-sass
  ```



## 3. Project-A 와 DB 연결 및 Router 설정

```
$npm i -g firebase-tools
$cd [Project Path]
$firebase login
```

- `src`-`shared`-`Firebase.tsx` 파일 추가

  - ```javascript
    import * as firebase from 'firebase'
    
    const projectId = "${ProjectID}";
    let config = {
        apiKey: "${APIKey}",
        authDomain: `${projectId}.firebaseapp.com`,
        databaseURL: `https://${projectId}.firebaseio.com`,
        projectId: `${projectId}`,
        storageBucket: `${projectId}.appspot.com`,
        messagingSenderId: "${MessageId}"
    };
    let database;
    
    // create object for firebase handling
    export const initFirebase = () => {
        if (!firebase.apps.length) { //check already firebase run
            firebase.initializeApp(config);
        }
        database = firebase.database();
    };
    ```

- `App.tsx` 파일 수정

  - ```javascript
    import React, { Component } from 'react';
    import {BrowserRouter, Route} from 'react-router-dom';
    import { initFirebase } from './shared/Firebase';
    
    import Home from './pages/Home';
    
    export default class App extends Component<{}, {}> {
    
        constructor(props: {}) {
          super(props);
          initFirebase();
        }
    
        render() {
            return (
              <BrowserRouter>
                <div>
                    <Route exact path="/" component={Home}/>
                </div>
              </BrowserRouter>
            )
        }
    }
    ```
  
  
  

## 4. typescirpt 설정

- `tsconfig.json` 파일 생성

  - ```
    $tsc --init
    ```

- `tsconfig.json` 파일 수정

  - rootDir : 소스 코드 디렉토리

  - outDir : 소스 출력 디렉토리

  - jsx : react 용으로 사용하기 위함

    ```
    "outDir": "build",
    "rootDir": "src",
    "jsx": "react",
    ```

- `package.json` 파일 "scripts"추가

  - ```
    "tsc": "tsc",
    ```

- 테스트용 .tsx 파일 생성

  - React 컴포넌트 형태로 사용하기 위해서는 .tsx 확장자를 사용한다.

- `$npm run tsc` 실행 하면 build 폴더에 js로 컴파일 된 파일 생성

- .js 파일 .tsx 파일로 변경



## 5. Git 연결

- Git Repository 생성
- Local Repository를 Git Remote Repository와 연결

```
$cd {ProjectPath}
$git init
$git remote add origin {URL}
```



## 6. Material-UI 적용

- [Material-UI](https://material-ui.com/)





## Error 

### TS18003

- No inputs were found in config file
- ts 파일이 하나도 없어서 발생한 문제로 보임. 테스트용 .ts 파일 생성 후 픽스



### Implicity has an 'any' type

- 모듈 구현(implement)과 타입 선언(declaration) 중 타입 선언이 되어 있지 않아 발생하는 문제.
- .js파일은 모듈 구현만 이루어지고 .ts파일은 모듈 구현과 타입 선언이 이루어진다.
- 따라서 .js로 구현 된 모듈에 대한 별도의 타입 선언을 해줘야 한다.
- 타입 선언만 이루어지는 파일은 .d.ts 확장자를 사용한다.
- npm에 타입 선언이 되어 있는 모듈들은 `$npm i @types/module` 로 설치가 가능하다.
- 그렇지 않은 경우에는 `index.d.ts` 파일을 생성하여 별도로 선언해주어야 한다. 
- ***별도 선언 방법은 추후 필요하게 되면 알아보자.***



### Cannot read property 'setState' of undefined

- 호출하는 함수가 bind 되어 있지 않아 발생하는 문제.

- 방법 1 - 생성자에서 바인딩

  - ```
    this.handleChange = this.handleChange.bind(this);
    ```

- 방법 2- 화살표 함수로 구현

  - ```
    handleChange = () => {
    }
    ```

  

## What is this?

- `tsconfig.json` 파일 설정 변경 제안

  - 빌드나 실행은 정상적으로 되었음.

    ```
    The following changes are being made to your tsconfig.json file:
      - compilerOptions.lib to be suggested value: dom,dom.iterable,esnext (this can be changed)
      - compilerOptions.allowJs to be suggested value: true (this can be changed)
      - compilerOptions.skipLibCheck to be suggested value: true (this can be changed)
      - compilerOptions.allowSyntheticDefaultImports to be suggested value: true (this can be changed)
      - compilerOptions.module must be esnext (for import() and import/export)
      - compilerOptions.moduleResolution must be node (to match webpack resolution)
      - compilerOptions.resolveJsonModule must be true (to match webpack loader)
      - compilerOptions.isolatedModules must be true (implementation limitation)
      - compilerOptions.noEmit must be true
      - include should be src
    ```

  - ***나중에 옵션 하나씩 찾아보기***