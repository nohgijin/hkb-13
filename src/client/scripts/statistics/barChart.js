import { generateElement } from '@/client/utils/htmlGenerator'
import { parseToLocalMoneyString } from '@/client/utils/parsers'
import { html } from '@/client/utils/lit'

export const getBarChartElm = (statistics) => {
  const barChartElm = generateElement(html`<div class="bar-chart"></div>`)

  statistics.forEach((data, idx) => {
    const { category, price, percent } = data
    const rowElm = generateElement(html`<div
      class="row color-${idx.toString()}"
    >
      <div class="name">${category}</div>
      <div class="percent">${(percent * 100).toString()}%</div>
      <div class="chart"><div class="bar"></div></div>
      <div class="price">${parseToLocalMoneyString(price)}원</div>
    </div>`)

    rowElm.querySelector('.bar').style.width = `${(percent * 100).toString()}%`

    barChartElm.append(rowElm)
  })

  return barChartElm
}
