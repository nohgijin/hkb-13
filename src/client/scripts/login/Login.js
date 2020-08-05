import { generateElement } from '@/client/utils/htmlGenerator'
import { html } from '@/client/utils/lit'
const { naverConfig } = require('../../../config/naverPassport')
export class Login {
  constructor() {
    this.$root = generateElement(html`
      <main class="login-page">
        <h1>돈을 아끼자!</h1>
        <div class="login-buttons">
          <div id="naverIdLogin"></div>
          <a href="/login/google" class="btn btn-google">
            <i class="icon">logo_google</i>
            <span class="content">Sign in with Google</span>
          </a>
          <a href="/login/github" class="btn btn-github">
            <i class="icon">logo_github</i>
            <span class="content">Sign in with GitHub</span>
          </a>
        </div>
      </main>
    `)
  }

  loadNaverBtn() {
    var naverLogin = new naver.LoginWithNaverId({
      clientId: naverConfig.CLIENT_ID,
      callbackUrl: naverConfig.CALLBACK_URL,
      loginButton: { color: 'green', type: 3, height: 52 },
    })
    naverLogin.init()
  }
}
