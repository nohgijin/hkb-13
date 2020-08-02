import { reportElm } from './report'
import { hkbModel } from '@/client/models/hkbModel'

import { dateParser } from '@/client/utils/parsers'
import { generateElement } from '@/client/utils/htmlGenerator'

export class ReportsList {
  constructor() {
    this.$root = generateElement(`<main class="reports-page"></main>`)

    hkbModel.subscribe(this.render.bind(this))
  }

  getDateString(date) {
    const { year, month, day } = dateParser(date)
    const thisYear = new Date().getFullYear()
    const weekdays = ['목', '금', '토', '일', '월', '화', '수']
    return `${thisYear !== year ? year : ''}${month}월 ${day}일 ${
      weekdays[new Date(date).getDay()]
    }`
  }

  render({ page, data: reportsList }) {
    if (page !== 'reports' || !reportsList) return

    const listElm = generateElement(`<section class="list-section"></section>`)

    let prevDate = null
    let prevReportElm = null
    reportsList.forEach((report) => {
      const { date } = report

      if (prevDate === date && prevReportElm) {
        const reportsBodyElm = prevReportElm.querySelector('.report-body')
        const reportRowElm = generateElement(reportElm(report))

        reportsBodyElm.appendChild(reportRowElm)
      } else {
        const dailyReportElm = generateElement(`
          <div class="daily-reports">
            <div class="report-header">
              <div class="day">${this.getDateString(date)}</div>
            </div>
            <div class="report-body">
              ${reportElm(report)}
            </div>
          </div>
        `)

        prevDate = date
        prevReportElm = dailyReportElm
        listElm.appendChild(dailyReportElm)
      }
    })

    this.$root.innerHTML = ''
    this.$root.appendChild(listElm)
  }
}
