import { Month } from './Month'
import { Day } from './Day'
import {} from '../../styles/components/calendar.scss'
import { generateElement } from '@/client/utils/htmlGenerator'
import { comma } from '@/client/utils/comma'
import { CalendarModel } from '../store/CalendarModel'
import { hkbModel } from '@/client/models/hkbModel'

export default class Calendar {
  constructor(year, month) {
    this.$root = generateElement(`<main class="calendar-page"></main>`)

    hkbModel.subscribe(this.render.bind(this))

    this.$month = ''
    this.$left = ''
    this.$right = ''

    this.year = year
    this.month = month
    this.weeks = []
    this.totalExpense = 0
    this.totalIncome = 0
    this.template = ``
    this.calendarModel = new CalendarModel(this.year, this.month)
    this.calendarModel.subscribe(this.init.bind(this))
  }

  init(data) {
    this.weeks = []
    this.setWeeks(data)
    this.setElements()
  }

  setWeeks(data) {
    let bfrMonth = new Month(this.year, this.month - 1, data.beforeMonth)
    let curMonth = new Month(this.year, this.month, data.curMonth)
    let afrMonth = new Month(this.year, this.month + 1, data.afterMonth)
    let brfMonthLastWeek = bfrMonth.getLastWeek()
    let curMonthWeeks = curMonth.getWeeks()
    let afrMonthFirstWeek = afrMonth.getFirstWeek()

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

  setElements() {
    this.template = `
    <main class="calendar-page main">
      <section class="calendar-section">
        <div class="calendar-income">수입 </div>
        <div class="calendar-expense">지출 </div>
          <table>
            <thead class="day">
              <tr>
                <th>일</th>
                <th>월</th>
                <th>화</th>
                <th>수</th>
                <th>목</th>
                <th>금</th>
                <th>토</th>
              </tr>
            </thead>
            <tbody>
  `
    this.weeks.forEach((week) => {
      let weekTemplate = `<tr>`
      week.forEach((day) => {
        let today = new Day(day)
        weekTemplate += `<td>${today.template}</td>`
      })
      weekTemplate += `</tr>`
      this.template += weekTemplate
    })
    this.template += `</tbody></table></section></main>`

    document.querySelector('.year').innerText = this.year + '년'
    document.querySelector('.month').innerText = this.month + '월'

    const app = document.querySelector('.app')
    const main = document.querySelector('.main')
    const calendarPage = generateElement(this.template)

    calendarPage.querySelector('.calendar-income').innerText =
      '수입 ' + comma(this.totalIncome)
    calendarPage.querySelector('.calendar-expense').innerText =
      '지출 ' + comma(this.totalExpense)

    if (!main) app.append(calendarPage)
    else app.replaceChild(calendarPage, main)
  }

  async render({ year, month, calendar }) {
    if (!calendar) return

    const $calendar = generateElement(
      `<section class="calendar-section"></section>`
    )
    const $calendarIncome = generateElement(
      `<div class="calendar-income">수입 </div>`
    )
    const $calendarExpense = generateElement(
      `<div class="calendar-expense">지출 </div>`
    )
    const $calendarTable = generateElement(`<table></table>`)
    const $calendarTableHeader = generateElement(
      `<thead class="day"><tr><th>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th>토</th></tr></thead>`
    )
    const $calendarTableBody = generateElement(`<tbody></tbody>`)

    this.weeks.forEach((week) => {
      let weekTemplate = `<tr>`
      week.forEach((day) => {
        weekTemplate += `<td>${new Day(day).getTemplate()}</td>`
      })
      weekTemplate += `</tr>`
      $calendarTableBody.appendChild(generateElement(weekTemplate))
    })

    $calendarTable.appendChild($calendarTableHeader)
    $calendarTable.appendChild($calendarTableBody)

    $calendar.appendChild($calendarIncome)
    $calendar.appendChild($calendarExpense)
    $calendar.appendChild($calendarTable)

    this.$root.innerHTML = ''
    this.$root.appendChild($calendar)
  }
}

export { Calendar }
