import { generateElement } from '@/client/utils/htmlGenerator'

export class Login {
  constructor() {
    this.$root = generateElement(`
      <main class="login-page">
        <a href='/login/naver'>
        <img src="/image/naverLogin.png"></a>
      </main>
    `)
  }
}
