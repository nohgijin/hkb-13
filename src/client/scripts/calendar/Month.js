import data from './dummy'

class Month {
  constructor(year, month) {
    //한 달의 주
    this.weeks = []
    let date = new Date(year, month - 1, 1)
    let nextMonthFirstDate = new Date(year, month, 1)
    while (true) {
      //한 주의 일
      let week = []
      while (true) {
        //요일 구하는 함수
        let day = date.getDay()
        week.push({
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          date: date.getDate(),
          income: this.getIncome(date.getDate()),
          expense: this.getExpense(date.getDate()),
        })
        //하루 증가
        date = new Date(date.setDate(date.getDate() + 1))
        //일요일이면 다음주로
        if (day === 6) break
        if (date >= nextMonthFirstDate) break
      }
      this.weeks.push(week)
      if (date >= nextMonthFirstDate) break
    }
    this.init()
  }

  init() {
    this.getWeeks()
    this.getFirstWeek()
    this.getLastWeek()
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
    const idx = data.findIndex(
      (data) => data.date == date && data.type == 'income'
    )
    if (!data[idx]) return ''
    return data[idx].price
  }

  getExpense(date) {
    const idx = data.findIndex(
      (data) => data.date == date && data.type == 'expense'
    )
    if (!data[idx]) return ''
    return data[idx].price
  }
}

export { Month }
