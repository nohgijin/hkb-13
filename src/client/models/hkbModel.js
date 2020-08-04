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
      month: now.getMonth(),
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

  async getData() {
    const { year, month, page } = this.data
    if (page === '/reports') {
      const reportsList = await getReportsListAPI({ year, month })
      this.notify({ year, month, page, data: reportsList })
    } else if (page === '/calendar') {
      const calendar = await getCalendarAPI({ year, month })
      this.notify({ year, month, page, data: calendar })
    } else if (page === '/statistics') {
    } else if (page === '/settings') {
      await setTimeout(() => {}, 0)
      this.notify({
        year,
        month,
        page,
        data: {
          category: [
            { name: '월급', type: 'income' },
            { name: '용돈', type: 'income' },
            { name: '기타수입', type: 'income' },
            { name: '식비', type: 'expense' },
            { name: '생활', type: 'expense' },
            { name: '쇼핑/뷰티', type: 'expense' },
            { name: '교통', type: 'expense' },
            { name: '의료/건강', type: 'expense' },
            { name: '문화/여가', type: 'expense' },
            { name: '미분류', type: 'expense' },
          ],
          payment: [
            { name: '신한카드' },
            { name: '삼성카드' },
            { name: '카카오체크카드' },
            { name: '우리카드' },
            { name: '롯데카드' },
            { name: '배민체크카드' },
          ],
        },
      })
    }
  }
}

const hkbModel = new Model()

export { hkbModel }
