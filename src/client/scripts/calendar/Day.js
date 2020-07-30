import { CALENDAR_CLASS } from '../../utils/constants'

export default class Day {
  constructor({ date, income, expense, disable }) {
    this.date = date
    this.disable = disable
    this.income = income
    this.expense = expense

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    if (this.income != 0) this.income = '+' + this.income
    if (this.expense != 0) this.expense = '-' + this.expense

    this.template = `
    <div class='${this.disable ? 'disable' : ''}'>
      <div class='${CALENDAR_CLASS.DATE}'>${this.date}</div>
      <div class='${CALENDAR_CLASS.INCOME}'>${this.income}</div>
      <div class='${CALENDAR_CLASS.EXPENSE}'>${this.expense}</div>
    </div>
    `
  }
}

export { Day }
