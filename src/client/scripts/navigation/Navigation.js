import { hkbModel } from '@/client/models/hkbModel'

import { generateElement } from '@/client/utils/htmlGenerator'

export class NavigationBar {
  constructor(year, month, page) {
    this.year = year
    this.month = month
    this.page = page
    this.$root = generateElement(`<nav class="navigation"></nav>`)

    this.render()
    this.initEvents()

    hkbModel.subscribe(this.setData.bind(this))
  }

  setData({ year, month, page }) {
    this.year = year
    this.month = month
    this.page = page

    this.$root.querySelector('.year').innerText = `${this.year}년`
    this.$root.querySelector('.month').innerText = `${this.month}월`
  }

  pushUrl(href) {
    history.pushState({}, '', href)
    window.dispatchEvent(new Event('popstate'))
  }

  initEvents() {
    this.$root.querySelector('.left').addEventListener('click', () => {
      const date = new Date(this.year, this.month - 1)
      this.pushUrl(
        `/${date.getFullYear()}/${date.getMonth() || 12}/${this.page}`
      )
    })

    this.$root.querySelector('.right').addEventListener('click', () => {
      const date = new Date(this.year, this.month + 1)
      this.pushUrl(
        `/${date.getFullYear()}/${date.getMonth() || 12}/${this.page}`
      )
    })

    this.$root
      .querySelector('.reports-page-btn')
      .addEventListener('click', () => {
        if (this.page !== 'reports')
          this.pushUrl(`/${this.year}/${this.month}/reports`)
      })
    this.$root
      .querySelector('.calendar-page-btn')
      .addEventListener('click', () => {
        if (this.page !== 'calendar')
          this.pushUrl(`/${this.year}/${this.month}/calendar`)
      })
    this.$root
      .querySelector('.statistics-page-btn')
      .addEventListener('click', () => {
        if (this.page !== 'statistics')
          this.pushUrl(`/${this.year}/${this.month}/statistics`)
      })
  }

  render() {
    const monthSelector = generateElement(`
      <div class="month-selector">
        <button class="left">
          <i class="icon">arrowtriangle_left_fill</i>
        </button>
        <div class="year">${this.year}년</div>
        <div class="month">${this.month}월</div>
        <button class="right">
          <i class="icon">arrowtriangle_right_fill</i>
        </button>
      </div>
    `)
    const pageSelector = generateElement(`
      <div class="page-selector">
        <button class="reports-page-btn selected">내역</button>
        <button class="calendar-page-btn">달력</button>
        <button class="statistics-page-btn">통계</button>
      </div>
    `)

    this.$root.innerHTML = ''
    this.$root.append(monthSelector)
    this.$root.append(pageSelector)
  }
}
