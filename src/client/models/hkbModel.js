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

    if (page === '/reports') {
      const reportsList = await getReportsListAPI({ year, month })
      this.notify({ year, month, page, data: reportsList })
    } else if (page === '/calendar') {
      const calendar = await getCalendarAPI({ year, month })
      this.notify({ year, month, page, data: calendar })
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
