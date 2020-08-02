import { Month } from './Month'
import { Day } from './Day'
import {} from '../../styles/components/calendar.scss'
import { generateElement } from '@/client/utils/htmlGenerator'
import { comma } from '@/client/utils/comma'
import { hkbModel } from '@/client/models/hkbModel'

export class Calendar {
  constructor() {
    this.$root = generateElement(`<main class="calendar-page"></main>`)

    this.weeks = []
    this.totalExpense = 0
    this.totalIncome = 0

    hkbModel.subscribe(this.render.bind(this))
  }

  setWeeks({ year, month, calendar }) {
    this.weeks = []
    const bfrMonth = new Month(year, month - 1, [])
    const curMonth = new Month(year, month, calendar)
    const afrMonth = new Month(year, month + 1, [])

    const brfMonthLastWeek = bfrMonth.getLastWeek()
    const curMonthWeeks = curMonth.getWeeks()
    const afrMonthFirstWeek = afrMonth.getFirstWeek()

    brfMonthLastWeek.forEach((date) => (date.disable = true))
    afrMonthFirstWeek.forEach((date) => (date.disable = true))

    for (let index = 0; index < curMonthWeeks.length; index++) {
      const curMonthWeek = curMonthWeeks[index]
      if (index == 0 && curMonthWeek.length < 7) {
        this.weeks.push(brfMonthLastWeek.concat(curMonthWeek))
      } else if (index == curMonthWeeks.length - 1 && curMonthWeek.length < 7) {
        this.weeks.push(curMonthWeek.concat(afrMonthFirstWeek))
      } else {
        this.weeks.push(curMonthWeek)
      }
    }

    this.totalIncome = curMonth.getTotalIncome()
    this.totalExpense = curMonth.getTotalExpense()
  }

  async render({ year, month, page, data: calendar }) {
    if (page !== 'calendar' || !calendar) return

    this.setWeeks({ year, month, calendar })

    const $calendar = generateElement(
      `<section class="calendar-section"></section>`
    )
    const $calendarIncome = generateElement(
      `<div class="calendar-income">${'수입 ' + comma(this.totalIncome)}</div>`
    )
    const $calendarExpense = generateElement(
      `<div class="calendar-expense">${
        '지출 ' + comma(this.totalExpense)
      }</div>`
    )
    const $calendarTable = generateElement(
      `<table><thead class='day'><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr></thead><tbody></tbody></table>`
    )

    const $calendarTableBody = $calendarTable.querySelector('tbody')

    let weeksTemplate = ''
    this.weeks.forEach((week) => {
      let weekTemplate = `<tr>`
      week.forEach((day) => {
        weekTemplate += `<td>${new Day(day).getTemplate()}</td>`
      })
      weekTemplate += `</tr>`
      weeksTemplate += weekTemplate
    })

    $calendarTableBody.innerHTML = weeksTemplate

    $calendarTable.appendChild($calendarTableBody)
    $calendar.appendChild($calendarIncome)
    $calendar.appendChild($calendarExpense)
    $calendar.appendChild($calendarTable)

    this.$root.innerHTML = ''
    this.$root.appendChild($calendar)
  }
}
