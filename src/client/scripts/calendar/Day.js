import { CALENDAR_CLASS } from '../../utils/constants'
import { comma } from '@/client/utils/comma'

export default class Day {
  constructor({ year, month, date, income, expense, disable }) {
    this.year = year
    this.month = month
    this.date = date
    this.disable = disable
    this.income = income
    this.expense = expense
    this.init()
  }

  init() {
    this.setElements()
  }

  isToday() {
    this.today = new Date()
    if (
      this.today.getFullYear() == this.year &&
      this.today.getMonth() == this.month - 1 &&
      this.today.getDate() == this.date
    ) {
      return true
    }
    return false
  }

  setElements() {
    if (this.isToday()) this.same = true

    if (this.income != 0) this.income = '+' + comma(this.income)
    if (this.expense != 0) this.expense = '-' + comma(this.expense)

    this.template = `
    <div class='${this.disable ? 'disable' : ''}'>
      <div class='${this.same ? 'today' : ''}'>
        <div class='${CALENDAR_CLASS.DATE}'>${this.date}</div>
      </div>
      <div class='${CALENDAR_CLASS.INCOME}'>${this.income}</div>
      <div class='${CALENDAR_CLASS.EXPENSE}'>${this.expense}</div>
    </div>
    `
  }

  getTemplate() {
    return this.template
  }
}

export { Day }
