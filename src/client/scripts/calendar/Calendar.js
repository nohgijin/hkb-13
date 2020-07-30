import { Month } from './Month'
import { Day } from './Day'
import {} from '../../styles/components/calendar.scss'
import { CALENDAR_CLASS, MONTH_SELECTOR_ID } from '../../utils/constants'

export default class Calendar {
  constructor(year, month) {
    this.$month = ''
    this.$left = ''
    this.$right = ''

    this.year = year
    this.month = month
    this.weeks = []
    this.template = ``

    this.init()
    // this.bindEvent()
  }

  init() {
    this.weeks = []
    this.setWeeks()
    this.setElements()
  }

  setWeeks() {
    let bfrMonth = new Month(this.year, this.month - 1)
    let curMonth = new Month(this.year, this.month)
    let afrMonth = new Month(this.year, this.month + 1)
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
  }

  setElements() {
    this.template = `
    <main class="calendar-page">
      <section class="calendar-section">
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

    this.$left = document.querySelector(`#${MONTH_SELECTOR_ID.LEFT}`)
    this.$right = document.querySelector(`#${MONTH_SELECTOR_ID.RIGHT}`)
  }

  bindEvent() {
    this.before = this.beforeMonth.bind(this)
    this.after = this.nextMonth.bind(this)
    this.$left.addEventListener('click', this.before)
    this.$right.addEventListener('click', this.after)
  }

  beforeMonth() {
    if (this.month == 1) {
      this.month = 12
      this.init()
      return
    }
    this.month -= 1
    this.init()
  }

  nextMonth() {
    if (this.month == 12) {
      this.month = 1
      this.init()
      return
    }
    this.month += 1
    this.init()
  }
}

export { Calendar }
