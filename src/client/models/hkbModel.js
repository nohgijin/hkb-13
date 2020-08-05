import { getReportsListAPI } from '@/client/apis'
import { getCalendarAPI } from '@/client/apis'

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

    const categoryStatisticsData = [
      { category: '쇼핑/뷰티', price: 837000 },
      { category: '식비', price: 302000 },
      { category: '생활', price: 137800 },
      { category: '교통', price: 83800 },
      { category: '문화/여가', price: 36800 },
      { category: '의료/건강', price: 12300 },
      { category: '미분류', price: 5400 },
    ]

    if (page === '/reports') {
      const reportsList = await getReportsListAPI({ year, month })
      this.notify({ year, month, page, data: reportsList })
    } else if (page === '/calendar') {
      const calendar = await getCalendarAPI({ year, month })
      this.notify({ year, month, page, data: calendar })
    } else if (page === '/statistics') {
      await setTimeout(() => {}, 400)
      this.notify({ year, month, page, data: categoryStatisticsData })
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
