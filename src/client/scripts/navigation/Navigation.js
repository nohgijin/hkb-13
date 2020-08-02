import { hkbModel } from '@/client/models/hkbModel'

import { generateElement } from '@/client/utils/htmlGenerator'

export class NavigationBar {
  constructor() {
    this.$root = generateElement(`<nav class="navigation"></nav>`)

    hkbModel.subscribe(this.render.bind(this))
  }

  pushUrl(href) {
    history.pushState({}, '', href)
    window.dispatchEvent(new Event('popstate'))
  }

  generateMonthSelectorElm(year, month, page) {
    const monthSelector = generateElement(`
      <div class="month-selector">
        <button class="left">
          <i class="icon">arrowtriangle_left_fill</i>
        </button>
        <div class="year">${year}년</div>
        <div class="month">${month}월</div>
        <button class="right">
          <i class="icon">arrowtriangle_right_fill</i>
        </button>
      </div>
    `)

    monthSelector.querySelector('.left').addEventListener('click', () => {
      const date = new Date(year, month - 1)
      this.pushUrl(`/${date.getFullYear()}/${date.getMonth() || 12}/${page}`)
    })

    monthSelector.querySelector('.right').addEventListener('click', () => {
      const date = new Date(year, month + 1)
      this.pushUrl(`/${date.getFullYear()}/${date.getMonth() || 12}/${page}`)
    })

    return monthSelector
  }

  generatePageSelectorElm(year, month, page) {
    const pageSelectorElm = generateElement(`
      <div class="page-selector">
        <button class="reports-page-btn selected">내역</button>
        <button class="calendar-page-btn">달력</button>
        <button class="statistics-page-btn">통계</button>
      </div>
    `)

    pageSelectorElm
      .querySelector('.reports-page-btn')
      .addEventListener('click', () => {
        if (page !== 'reports') this.pushUrl(`/${year}/${month}/reports`)
      })
    pageSelectorElm
      .querySelector('.calendar-page-btn')
      .addEventListener('click', () => {
        if (page !== 'calendar') this.pushUrl(`/${year}/${month}/calendar`)
      })
    pageSelectorElm
      .querySelector('.statistics-page-btn')
      .addEventListener('click', () => {
        if (page !== 'statistics') this.pushUrl(`/${year}/${month}/statistics`)
      })

    return pageSelectorElm
  }

  render({ year, month, page }) {
    this.$root.innerHTML = ''
    this.$root.append(this.generateMonthSelectorElm(year, month, page))
    this.$root.append(this.generatePageSelectorElm(year, month, page))
  }
}
