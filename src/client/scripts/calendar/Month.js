class Month {
  constructor(year, month, monthData) {
    this.year = year
    this.month = month
    this.data = monthData
    this.weeks = []
    this.init()
  }

  init() {
    this.setWeeks()
  }

  setWeeks() {
    this.weeks = []

    let date = new Date(this.year, this.month - 1, 1)
    let nextMonthFirstDate = new Date(this.year, this.month, 1)
    while (true) {
      let week = []
      while (true) {
        let day = date.getDay()
        week.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          income: this.getIncome(date.getDate()),
          expense: this.getExpense(date.getDate()),
        })
        date = new Date(date.setDate(date.getDate() + 1))
        if (day === 6) break
        if (date >= nextMonthFirstDate) break
      }
      this.weeks.push(week)
      if (date >= nextMonthFirstDate) break
    }
  }

  getWeeks() {
    return this.weeks
  }

  getFirstWeek() {
    return this.weeks[0]
  }

  getLastWeek() {
    return this.weeks[this.weeks.length - 1]
  }

  getIncome(date) {
    const idx = this.data.findIndex(
      (data) => data.date == date && data.type == 'income'
    )
    if (!this.data[idx]) return ''
    return this.data[idx].price
  }

  getExpense(date) {
    const idx = this.data.findIndex(
      (data) => data.date == date && data.type == 'expense'
    )
    if (!this.data[idx]) return ''
    return this.data[idx].price
  }
}

export { Month }
