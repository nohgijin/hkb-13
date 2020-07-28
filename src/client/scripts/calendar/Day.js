import { DAY_CLASS } from '../../utils/constants'

export default class Day {
  constructor({ date, income, expense }) {
    this.date = date
    this.income = 5000
    this.expense = 3000

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    this.template = `
    <div class=${DAY_CLASS.DAY}>${this.date}</div>
    <div>${this.income}</div>
    <div>${this.expense}</div>
    `
  }
}

export { Day }
