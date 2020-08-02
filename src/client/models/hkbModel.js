import { getReportsListAPI } from '@/client/apis/getReportsListAPI'

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

      setTimeout(() => {
        this.notify({ year, month, reportsList })
      }, 1000)
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
