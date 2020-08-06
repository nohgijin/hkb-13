import {
  getReportsListAPI,
  getCalendarAPI,
  getDailyStatisticsDataAPI,
  getCategoryStatisticsDataAPI,
} from '@/client/apis'

import { Month } from '@/client/scripts/calendar/Month'

class Observable {
  constructor() {
    this._observers = new Set()
  }
  subscribe(observer) {
    this._observers.add(observer)
  }
  unsubscribe(observer) {
    this._observers = [...this._observers].filter(
      (subscriber) => subscriber !== observer
    )
  }
  notify(data) {
    this._observers.forEach((observer) => observer(data))
  }
}

class Model extends Observable {
  constructor() {
    super()

    const now = new Date()
    this.data = {
      year: now.getFullYear(),
      month: now.getMonth() + 1 || 0,
      page: '',
    }
  }

  getDate() {
    return [this.data.year, this.data.month]
  }

  setData(data) {
    this.data = { ...this.data, ...data }
    this.getData()
  }

  reload() {
    this.getData()
  }

  async getData() {
    const { year, month, page } = this.data

    if (page === '/reports') {
      const reportsList = await getReportsListAPI({ year, month })
      this.notify({ year, month, page, data: reportsList })
    } else if (page === '/calendar') {
      const calendar = await getCalendarAPI({ year, month })
      this.notify({ year, month, page, data: calendar })
    } else if (page === '/statistics') {
      const categoryStatisticsData = await getCategoryStatisticsDataAPI({
        year,
        month,
      })
      const dailyStatisticsData = await getDailyStatisticsDataAPI({
        year,
        month,
      })

      // 꺾은선 그래프에서 사용하는 데이터
      const daily = new Month(year, month, dailyStatisticsData)
        .getDaily()
        .map((data) => ({
          date: `${data.month}.${data.date}`,
          price: data.expense != '' ? parseInt(data.expense) : 0,
        }))


      this.notify({
        year,
        month,
        page,
        data: categoryStatisticsData.map((data) => ({
          ...data,
          price: parseInt(data.price),
        })),
        daily
      })
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
