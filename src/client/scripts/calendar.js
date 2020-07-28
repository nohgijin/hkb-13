import Month from './Month'
import Day from './Day'

export default class Calendar {
  constructor(year, month) {
    this.$calendar = ''
    this.year = year
    this.month = month
    this.weeks = []

    this.init()
  }

  init() {
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
    this.$calendar = document.querySelector('#calendar')
    this.weeks.forEach((week) => {
      let weekTemplate = `<tr>`
      week.forEach((day) => {
        let today = new Day(day)
        weekTemplate += `<td>${today.template}</td>`
      })
      weekTemplate += `</tr>`
      this.template += weekTemplate
    })
    this.$calendar.innerHTML = this.template
  }
}

new Calendar(2020, 6)

// module.exports = { Calendar }
