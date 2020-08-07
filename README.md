# HKB-13

## ✔️ [Our Project Page](http://ec2-13-125-215-184.ap-northeast-2.compute.amazonaws.com:3000/login)

## ✋Team Members
- [![title](https://img.shields.io/badge/DEVLOPER-노기진-123456)](https://github.com/nohgijin)
- [![title](https://img.shields.io/badge/DEVLOPER-한규현-123456)](https://github.com/dnacu)

## Project description
월간 소비 및 지출에 대한 report를 작성하고, 내역 및 월별/카테고리별 통계를 확인할 수 있는 개인 가계부 서비스.

## Requirements
- Observable
- Client Routing
- Passport
- Oauth
- Automatic deploy
- Data visualization

## 🧞Quick Start
### 1. Clone & Install Packages
```bash
git clone https://github.com/woowa-techcamp-2020/hkb-13
cd hbk-13
npm install
```

### 2. Configuration database
Follow `config.example.js` to `config` folder
```js
const config = {
  DB_HOST: '',
  DB_NAME: '',
  DB_USER: '',
  DB_PW: '',
}

module.exports = { config }
```

### 3. Configuration passport
Follow `githubPassport.example.js` to `config` folder
```js
const githubConfig = {
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  CALLBACK_URL: 'http://13.125.215.184:3000/login/github/callback',
}
module.exports = { githubConfig }
```

Follow `googlePassport.example.js` to `config` folder
```js
const googleConfig = {
  CLIENT_ID: '',
  CLIENT_SECRET: '',
  CALLBACK_URL: 'http://localhost:3000/login/google/callback',
}

module.exports = { googleConfig }
```

### 4. NPM scripts
start both server and client
```bash
npm start
```
start server
```bash
npm run start:server
```
start client
```bash
npm run start:client
```
build production artifacts
```bash
npm run build
```
Then, you can access to your server http://localhost:3000/

------

## Technologies Used
**Frontend**
- ![title](https://img.shields.io/badge/-HTML5-E34F26?&logo=html5&logoColor=white)
- ![title](https://img.shields.io/badge/-SCSS-CC6699?&logo=Sass&logoColor=white)
- ![title](https://img.shields.io/badge/-Vanila_javascript-EDD63F?&logo=javascript&logoColor=white)
- ![title](https://img.shields.io/badge/-Webpack-7ac5f1?&logo=Webpack&logoColor=white)
- ![title](https://img.shields.io/badge/-Babel-eece4f?&logo=Babel&logoColor=white)

**Backend**
- ![title](https://img.shields.io/badge/-Node.js-339933?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-Passport-4479A1?&logo=Passport&logoColor=white)
- ![title](https://img.shields.io/badge/-Express-191919?&logo=Node.js&logoColor=white)
- ![title](https://img.shields.io/badge/-MySQL-4479A1?&logo=MySQL&logoColor=white)

**ETC**
- ![title](https://img.shields.io/badge/-EC2-232F3E?&logo=Amazon-AWS&logoColor=white)
- ![title](https://img.shields.io/badge/-Github-181717?&logo=Github&logoColor=white)
- ![title](https://img.shields.io/badge/-Slack-4A154B?&logo=Slack&logoColor=white)
- ![title](https://img.shields.io/badge/-Postman-4A154B?&logo=Postman&logoColor=white)

------

### Documentations
- [API Document](https://github.com/woowa-techcamp-2020/hkb-13/issues/2)
- [Postman API Document](https://documenter.getpostman.com/view/8220125/T1Dv6ZKB?version=latest)
- [DB SCHEME](https://github.com/woowa-techcamp-2020/hkb-13/issues/1)

------

## 프로젝트 구조
```bash
|--hkb-13
    |-- dist  
    |
    |-- public
    |
    |-- src
    |   |-- client  // Frontend
    |   |   |-- api // Client API 관련 파일 모음
    |   |   |
    |   |   |-- models // observer 패턴 모델 파일
    |   |   |
    |   |   |-- scripts
    |   |   |   |-- calendar
    |   |   |   |   ...  // 캘린더 파일 모음
    |   |   |   |
    |   |   |   |-- navigation
    |   |   |   |   ...  // 네이게이션 파일
    |   |   |   |
    |   |   |   |-- notFound
    |   |   |   |   ...  // 오류 파일
    |   |   |   |
    |   |   |   |-- reportsList  
    |   |   |   |   ...  // 거래내역 파일 모음
    |   |   |   |
    |   |   |   |-- store
    |   |   |   |   ...  // 옵저버 패턴 파일 모음
    |   |   |   |
    |   |   |   |-- statistics
    |   |   |   |   ...  // 통계 파일 모음
    |   |   |   |
    |   |   |
    |   |   |-- styles
    |   |   |   |
    |   |   |   |-- components
    |   |   |   |   ...  // 컴포넌트별 스타일
    |   |   |   |
    |   |   |
    |   |   |-- utils
    |   |   |   ...  // 공통 사용 함수 모음
    |   |   |
    |   |   |-- views
    |   |   |   ...  // html 파일
    |   |   |    
    |   |
    |   |-- config // database, passport config 파일 모음
    |   |
    |   |-- server  // Backend
    |   |   |
    |   |   |-- controller
    |   |   |   ...  // 라우터 요청에 따른 작업 처리
    |   |   |
    |   |   |-- model
    |   |   |   ...  // 데이터베이스 작업 처리
    |   |   |
    |   |   |-- router
    |   |   |
