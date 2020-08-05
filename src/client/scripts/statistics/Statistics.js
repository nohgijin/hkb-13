import { generateElement } from '@/client/utils/htmlGenerator'
import { html } from '@/client/utils/lit'
import { hkbModel } from '@/client/models/hkbModel'

import { getPieChartElm } from './pieChart'
import { getBarChartElm } from './barChart'

export class Statistics {
  constructor() {
    this.$root = generateElement(html`<main class="statistics-page"></main>`)

    this.render()
    // hkbModel.subscribe(this.render.bind(this))
  }

  render() {
    const categoryStatisticsData = [
      { category: '쇼핑/뷰티', price: 837000 },
      { category: '식비', price: 302000 },
      { category: '생활', price: 137800 },
      { category: '교통', price: 83800 },
      { category: '문화/여가', price: 36800 },
      { category: '의료/건강', price: 12300 },
      { category: '미분류', price: 5400 },
    ]

    const totalPrice = categoryStatisticsData.reduce(
      (acc, cur) => acc + cur.price,
      0
    )
    categoryStatisticsData.forEach((row) => {
      const percent = (row.price / totalPrice).toFixed(2)
      row.percent = parseFloat(percent)
    })

    const pieChartElm = getPieChartElm(categoryStatisticsData)
    const barChartElm = getBarChartElm(categoryStatisticsData)

    this.$root.append(pieChartElm)
    this.$root.append(barChartElm)
  }
}
