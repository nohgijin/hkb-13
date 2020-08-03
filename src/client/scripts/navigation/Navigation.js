import { hkbModel } from '@/client/models/hkbModel'

import { generateElement } from '@/client/utils/htmlGenerator'

export class NavigationBar {
  constructor() {
    hkbModel.setData({ page: location.pathname })

    this.$root = generateElement(`<nav class="navigation"></nav>`)

    this.render()
    this.initEvents()
  }

  setDate(year, month) {
    this.$root.querySelector('.year').innerText = `${year}년`
    this.$root.querySelector('.month').innerText = `${month}월`

    hkbModel.setData({ year, month })
  }

  pushUrl(page) {
    history.pushState({}, '', page)

    window.dispatchEvent(new Event('popstate'))
  }

  initEvents() {
    this.$root.querySelector('.left').addEventListener('click', () => {
      const [year, month] = hkbModel.getDate()
      if (month === 1) {
        this.setDate(year - 1, 12)
      } else {
        const date = new Date(year, month - 1)
        this.setDate(date.getFullYear(), date.getMonth())
      }
    })

    this.$root.querySelector('.right').addEventListener('click', () => {
      const [year, month] = hkbModel.getDate()
      const date = new Date(year, month + 1)
      if (month === 11) {
        this.setDate(year, 12)
      } else {
        this.setDate(date.getFullYear(), date.getMonth())
      }
    })

    const pathname = location.pathname
    this.$root
      .querySelector('.reports-page-btn')
      .addEventListener('click', () => {
        if (pathname !== '/reports') this.pushUrl(`/reports`)
      })
    this.$root
      .querySelector('.calendar-page-btn')
      .addEventListener('click', () => {
        if (pathname !== '/calendar') this.pushUrl(`/calendar`)
      })
    this.$root
      .querySelector('.statistics-page-btn')
      .addEventListener('click', () => {
        if (pathname !== '/statistics') this.pushUrl(`/statistics`)
      })
  }

  render() {
    const [year, month] = hkbModel.getDate()

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
