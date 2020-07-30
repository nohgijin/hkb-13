import { urlParser } from '@/client/utils/urlParser'

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
        page: 'reports',
      },
      {
        el: this.querySelector('.calendar-page-btn'),
        page: 'calendar',
      },
      {
        el: this.querySelector('.statistics-page-btn'),
        page: 'statistics',
      },
    ]

    pageNavigators.forEach((nav) => {
      nav.el.addEventListener('click', (e) => {
        const result = urlParser(location.pathname)
        if (!result) return

        const { year, month } = result
        if (location.pathname !== nav.url)
          pushUrl(`/${year}/${month}/${nav.page}`)
      })
    })

    const calendarArrows = [
      {
        el: this.querySelector('.right'),
        value: 1,
      },
      {
        el: this.querySelector('.left'),
        value: -1,
      },
    ]

    calendarArrows.forEach((arrow) => {
      arrow.el.addEventListener('click', (e) => {
        const result = urlParser(location.pathname)
        if (!result) return

        const { year, month, page } = result
        const date = new Date(year, month + arrow.value)

        pushUrl(`/${date.getFullYear()}/${date.getMonth()}/${page}`)
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
