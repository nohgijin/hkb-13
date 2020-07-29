import { CALENDAR } from '../../utils/constants'

export default class Day {
  constructor({ date, income, expense, disable }) {
    this.date = date
    this.disable = disable
    this.income = 5000
    this.expense = 3000

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    this.template = `
    <div class='${this.disable ? 'disable' : ''}'>
      <div class='${CALENDAR.DATE}'>${this.date}</div>
      <div class='${CALENDAR.INCOME}'>${this.income}</div>
      <div class='${CALENDAR.EXPENSE}'>${this.expense}</div>
    </div>
    `
  }
}

export { Day }
