export class NavigationBar extends HTMLElement {
  constructor() {
    super()
    this.setElements()
  }

  connectedCallback() {
    this.initEvents()
  }

  initEvents() {
    const pushUrl = (href) => {
      history.pushState({}, '', href)
      window.dispatchEvent(new Event('popstate'))
    }

    const pageNavigators = [
      {
        el: this.querySelector('.reports-page-btn'),
        url: '/reports',
      },
      {
        el: this.querySelector('.calendar-page-btn'),
        url: '/calendar',
      },
      {
        el: this.querySelector('.statistics-page-btn'),
        url: '/statistics',
      },
    ]

    pageNavigators.forEach((nav) => {
      nav.el.addEventListener('click', (e) => {
        if (location.pathname !== nav.url) pushUrl(nav.url)
      })
    })
  }

  setElements() {
    this.innerHTML = `
    <nav class="month-selector">
      <button class="left">
        <i class="icon">arrowtriangle_left_fill</i>
      </button>
      <div class="year">2020년</div>
      <div class="month">6월</div>
      <button class="right">
        <i class="icon">arrowtriangle_right_fill</i>
      </button>
    </nav>
    
    <nav class="page-selector">
      <button class="reports-page-btn selected">내역</button>
      <button class="calendar-page-btn">달력</button>
      <button class="statistics-page-btn">통계</button>
    </nav>
    `
  }

  // connectedCallback() {}
  // disconnectedCallback() {}
  // attributeChangedCallback(attrName, oldVal, newVal) {}
  // adaotedCallback() {}
}

// Element 정의하기
customElements.define('navigation-bar', NavigationBar)
