import { Observable } from './Observable'

class CalendarModel extends Observable {
  constructor(year, month) {
    super()
    this.year = year
    this.month = month
    this.beforeMonth = []
    this.curMonth = []
    this.afterMonth = []
    this.getData()
  }

  async prevMonth() {
    if (this.month == 1) {
      this.month = 12
      this.year--
      await this.getData()

      return
    }
    this.month -= 1
    await this.getData()
  }

  async nextMonth() {
    if (this.month == 12) {
      this.month = 1
      this.year++
      await this.getData()

      return
    }
    this.month += 1
    await this.getData()
  }

  async getData() {
    this.beforeMonth = await this.fetchMonthData(this.year, this.month - 1)
    this.curMonth = await this.fetchMonthData(this.year, this.month)
    this.afterMonth = await this.fetchMonthData(this.year, this.month + 1)

    this.notify({
      beforeMonth: this.beforeMonth,
      curMonth: this.curMonth,
      afterMonth: this.afterMonth,
    })
  }

  async fetchMonthData(year, month) {
    if (month == 0) {
      year--
      month = 12
    }
    if (month == 13) {
      year++
      month = 1
    }
    const response = await fetch(`/api/board/1/${year}/${month}/calendar`, {
      method: 'GET',
    })
    const { calendar } = await response.json()
    return calendar
  }
}

export { CalendarModel }
