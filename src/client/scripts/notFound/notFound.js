import { generateElement } from '@/client/utils/htmlGenerator'

export class NotFound {
  constructor() {
    this.$root = generateElement(`
      <div id="not-found">
        <div class="rain">
          <div class="otl"><img src="https://baemin.com/img/img-title-error.png" alt="">
            <p>404 NOT FOUND</p><a href="/reports"><img src="https://baemin.com/img/btn-home.png" alt=""></a>
          </div>
        </div>
      </div>
    `)
  }
}
