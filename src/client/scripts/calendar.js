import { Month } from './month'

class Calendar {
  constructor(year, month) {
    this.weeks = []
    let bfrMonth = new Month(year, month - 1)
    let curMonth = new Month(year, month)
    let afrMonth = new Month(year, month + 1)
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
}

new Calendar(2020, 6)

module.exports = Calendar
