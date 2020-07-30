import { Observable } from './Observable'

class CalendarModel extends Observable {
  constructor(year, month) {
    super()
    this.year = year
    this.month = month
    this.beforeMonth = []
    this.curMonth = []
    this.afterMonth = []
    this.getInitialData()
  }

  async prevMonth() {
    if (this.month == 1) {
      this.month = 12
      this.year--
      await this.getInitialData()

      return
    }
    this.month -= 1
    await this.getInitialData()

  }

  async nextMonth() {
    if (this.month == 12) {
      this.month = 1
      this.year++
      await this.getInitialData()

      return
    }
    this.month += 1
    await this.getInitialData()

  }

  async getInitialData() {
    let response = await fetch(`/api/board/1/${this.month - 1}/calendar`, {
      method: 'GET',
    })
    let data = await response.json()
    this.beforeMonth = data.calendar

    response = await fetch(`/api/board/1/${this.month}/calendar`, {
      method: 'GET',
    })
    data = await response.json()
    this.curMonth = data.calendar

    response = await fetch(`/api/board/1/${this.month + 1}/calendar`, {
      method: 'GET',
    })
    data = await response.json()
    this.afterMonth = data.calendar

    this.notify({
      beforeMonth: this.beforeMonth,
      curMonth: this.curMonth,
      afterMonth: this.afterMonth,
    })
  }
}

export { CalendarModel }
