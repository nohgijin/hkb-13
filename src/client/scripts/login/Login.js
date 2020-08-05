import { generateElement } from '@/client/utils/htmlGenerator'
const { naverConfig } = require('@/config/naverPassport')
export class Login {
  constructor() {
    this.$root = generateElement(`
      <main class="login-page">
        <h1>돈을 아끼자!</h1>
        <div id="naverIdLogin"></div>
        <a href='/login/google' class="btn btn-block btn-social btn-lg btn-google">
          <span class="fa fa-google"></span>
          Sign in with Google
        </a>
        <a href='/login/github' class="btn btn-block btn-social btn-lg btn-github">
        <span class="fa fa-github"></span>
        Sign in with GitHub
      </a>
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
