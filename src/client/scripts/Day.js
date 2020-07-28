export default class Day {
  constructor({ date, income, expense }) {
    this.date = date
    this.income = income
    this.expense = expense

    this.init()
  }

  init() {
    this.setElements()
  }

  setElements() {
    this.template = `
    <div>${this.date}</div>
    <div>${this.income}</div>
    <div>${this.expense}</div>
    `
  }
}

// module.exports = { Day }
