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
    this.$root.querySelector('.year').innerText = `${year}`
    this.$root.querySelector('.month').innerText = `${month}`

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
    const pathname = location.pathname

    const monthSelector = generateElement(`
      <div class="month-selector">
        <button class="left">
          <i class="icon">arrowtriangle_left_fill</i>
        </button>
        <div class="year">${year}</div>
        <div class="month">${month}</div>
        <button class="right">
          <i class="icon">arrowtriangle_right_fill</i>
        </button>
      </div>
    `)

    const pageSelector = generateElement(`
      <div class="page-selector">
        <button class="reports-page-btn ${
          pathname === '/reports' ? 'selected' : ''
        }"><i class="icon">square_list${
      pathname === '/reports' ? '_fill' : ''
    }</i>Histories</button>
        <button class="calendar-page-btn ${
          pathname === '/calendar' ? 'selected' : ''
        }"><i class="icon">calendar_circle${
      pathname === '/calendar' ? '_fill' : ''
    }</i>Calendar</button>
        <button class="statistics-page-btn ${
          pathname === '/statistics' ? 'selected' : ''
        }"><i class="icon">chart_pie${
      pathname === '/statistics' ? '_fill' : ''
    }</i>Statistics</button>
    `)

    this.$root.innerHTML = ''
    this.$root.append(monthSelector)
    this.$root.append(pageSelector)
  }
}
