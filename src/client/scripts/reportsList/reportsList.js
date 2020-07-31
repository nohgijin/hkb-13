import { getReportsListAPI } from '@/client/apis/getReportsListAPI'

import { generateElement } from '@/client/utils/htmlGenerator'

import { INCOME_CATEGORY, EXPENSE_CATEGORY } from '@/client/utils/constants'

export class ReportsList extends HTMLElement {
  constructor() {
    super()
    this.initElements()
  }

  connectedCallback() {
    this.initVariables()
    this.initEvents()
    this.getReportsList()
  }

  initEvents() {}

  initVariables() {
    this.year = this.getAttribute('data-year')
    this.month = this.getAttribute('data-month')

    this.listSectionElm = this.querySelector('section.list-section')
  }

  getDateString(year, month, date) {
    const weekdays = ['목', '금', '토', '일', '월', '화', '수']
    return `${month}월 ${date}일 ${
      weekdays[new Date(year, month, date).getDay()]
    }`
  }

  parseToLocalMoneyString(money) {
    return String(money).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  }

  getNameByCategory(category) {
    return category === INCOME_CATEGORY.SALARY
      ? ['money', 'money_dollar']
      : category === INCOME_CATEGORY.POCKET_MONEY
      ? ['money', 'money_dollar']
      : category === INCOME_CATEGORY.OTHERS
      ? ['money', 'money_dollar']
      : category === EXPENSE_CATEGORY.FOOD
      ? ['food', 'tray']
      : category === EXPENSE_CATEGORY.LIFE
      ? ['food', 'tray']
      : category === EXPENSE_CATEGORY.SHOP_BEAUTY
      ? ['shop', 'cart']
      : category === EXPENSE_CATEGORY.TRAFFIC
      ? ['transport', 'car_fill']
      : category === EXPENSE_CATEGORY.MEDICAL_HEALTH
      ? ['shop', 'cart']
      : category === EXPENSE_CATEGORY.CULTURE
      ? ['culture', 'film']
      : ['shop', 'cart']
  }

  async getReportsList() {
    const { year, month } = this
    const reportsList = await getReportsListAPI({ year, month })

    if (!reportsList) return

    const fragmentElm = document.createDocumentFragment()

    let prevDate = null
    let prevReportElm = null
    reportsList.forEach((report) => {
      const { category, content, date, id, paymentMethod, price, type } = report
      const sign = type === 'income' ? 1 : -1
      const money = this.parseToLocalMoneyString(price * sign)
      const [className, iconName] = this.getNameByCategory(category)

      if (prevDate === date && prevReportElm) {
        const reportsBodyElm = prevReportElm.querySelector('.report-body')
        const reportRowElm = generateElement(`
          <div class="row" data-report-id=${id}>
            <i class="icon category-icon ${className}" title="${category}">${iconName}</i>
            <div class="description">${content}</div>
            <div class="payment">${paymentMethod}</div>
            <div class="price ${type}">${money}원</div>
          </div>
        `)

        reportsBodyElm.appendChild(reportRowElm)
      } else {
        const dailyReportElm = generateElement(`
          <div class="daily-reports">
            <div class="report-header">
              <div class="day">${this.getDateString(year, month, date)}</div>
            </div>
            <div class="report-body">
              <div class="row" data-report-id=${id}>
              <i class="icon category-icon ${className}" title="${category}">${iconName}</i>
                <div class="description">${content}</div>
                <div class="payment">${paymentMethod}</div>
                <div class="price ${type}">${money}원</div>
              </div>
            </div>
          </div>
        `)

        prevDate = date
        prevReportElm = dailyReportElm
        fragmentElm.appendChild(dailyReportElm)
      }
    })

    this.listSectionElm.innerHTML = ''
    this.listSectionElm.appendChild(fragmentElm)
  }

  initElements() {
    this.innerHTML = `
      <main class="reports-page">
        <section class="list-section"></section>
      </main>
    `
  }
}

customElements.define('reports-list', ReportsList)
