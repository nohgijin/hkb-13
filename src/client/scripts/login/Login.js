import { generateElement } from '@/client/utils/htmlGenerator'

export class Login {
  constructor() {
    this.$root = generateElement(`
      <main class="login-page">
        <a href='/login/naver'>
        <img src="/image/naverLogin.png"></a>
        <a href='/login/google'>구글로로그인</a>
      </main>
    `)
  }
}
