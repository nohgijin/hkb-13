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
}

export { Month }