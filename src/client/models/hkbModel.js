import { getReportsListAPI } from '@/client/apis/getReportsListAPI'
import { getCalendarAPI } from '@/client/apis/getCalendarAPI'

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
  }

  async getData(urlParams) {
    if (!urlParams) return

    const { year, month, page } = urlParams
    if (page === 'reports') {
      const reportsList = await getReportsListAPI({ year, month })
      this.notify({ year, month, reportsList })
    } else if (page === 'calendar') {
      const calendar = await getCalendarAPI({ year, month })
      this.notify({ year, month, calendar })
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
