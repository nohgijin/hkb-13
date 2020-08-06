import { generateElement } from '@/client/utils/htmlGenerator'
import { html } from '@/client/utils/lit'
import { hkbModel } from '@/client/models/hkbModel'

import { getPieChartElm } from './pieChart'
import { getBarChartElm } from './barChart'
import { parseToLocalMoneyString } from '@/client/utils/parsers'

import { Line } from './lineChart'

export class Statistics {
  constructor() {
    this.$root = generateElement(html`<main class="statistics-page"></main>`)

    // 'categorical' | 'daily'
    this.viewType = 'categorical'
    this.categoryStatisticsData = []
    this.dailyStatisticsData = []
    this.totalPrice = 0
    hkbModel.subscribe(this.setData.bind(this))
  }

  setData({ data: categoryStatisticsData, daily }) {
    if(!daily) return
    const totalPrice = categoryStatisticsData.reduce(
      (acc, cur) => acc + cur.price,
      0
    )

    this.totalPrice = totalPrice
    this.categoryStatisticsData = categoryStatisticsData
    
    this.dailyStatisticsData = daily
    this.render()
  }

  generateHeader() {
    const isCategorical = this.viewType === 'categorical'
    const statisticsHeaderElm = generateElement(html`
      <div class="header">
        <div class="type-selector">
          <div class="categorical-expense">
            <div class="box ${isCategorical ? 'selected' : ''}"></div>
            <div class="type">카테고리별 지출</div>
          </div>
          <div class="daily-expense">
            <div class="box ${isCategorical ? '' : 'selected'}"></div>
            <div class="type">일별 지출</div>
          </div>
        </div>
        <div class="total">
          <div class="name">이번 달 지출 금액</div>
          <div class="price">${parseToLocalMoneyString(this.totalPrice)}원</div>
        </div>
      </div>
    `)

    const categoricalExpenseBtn = statisticsHeaderElm.querySelector(
      '.categorical-expense'
    )
    const dailyExpenseBtn = statisticsHeaderElm.querySelector('.daily-expense')
    categoricalExpenseBtn.addEventListener('click', (e) => {
      this.viewType = 'categorical'
      this.render()
    })
    dailyExpenseBtn.addEventListener('click', (e) => {
      this.viewType = 'daily'
      this.render()
    })

    return statisticsHeaderElm
  }

  generateCategoricalExpense() {
    this.categoryStatisticsData.forEach((row) => {
      const percent = (row.price / this.totalPrice).toFixed(2)
      row.percent = parseFloat(percent)
    })

    const fragmentElm = document.createDocumentFragment()
    const pieChartElm = getPieChartElm(this.categoryStatisticsData)
    const barChartElm = getBarChartElm(this.categoryStatisticsData)

    fragmentElm.append(pieChartElm)
    fragmentElm.append(barChartElm)

    return fragmentElm
  }

  render() {
    this.$root.innerHTML = ''

    const statisticsHeaderElm = this.generateHeader()
    this.$root.append(statisticsHeaderElm)

    if (this.viewType === 'categorical') {
      const categoricalExpense = this.generateCategoricalExpense()
      this.$root.append(categoricalExpense)
    }

    if (this.viewType === 'daily') {
      const canvas = generateElement(html`<canvas
        class="canvas"
        width="600"
        height="400"
      ></canvas> `)
      this.$root.append(canvas)
      new Line(canvas, this.dailyStatisticsData)
    }
    
  }
}
