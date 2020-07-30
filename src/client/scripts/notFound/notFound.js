export class NotFound extends HTMLElement {
  constructor() {
    super()
    this.setElements()
  }

  setElements() {
    this.innerHTML = `
    <div id="not-found">
      <div class="rain">
        <div class="otl"><img src="https://baemin.com/img/img-title-error.png" alt="">
          <p>404 NOT FOUND</p><a href="/reports"><img src="https://baemin.com/img/btn-home.png" alt=""></a>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('not-found', NotFound)
