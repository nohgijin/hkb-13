import { generateElement } from '@/client/utils/htmlGenerator'
import { html } from '@/client/utils/lit'

export const getPieChartElm = (data) => {
  const pieChartWrap = generateElement(html`<div class="pie-chart"></div>`)
  const pieChartElm = generateElement(html`<div class="pie"></div>`)

  const leftAnimator = generateElement(
    html`<div class="left-animator-wrap">
      <div class="animator"></div>
    </div>`
  )
  const rightAnimator = generateElement(
    html`<div class="right-animator-wrap">
      <div class="animator"></div>
    </div>`
  )

  pieChartElm.append(leftAnimator)
  pieChartElm.append(rightAnimator)

  const generateLegend = () => {
    const legendElm = generateElement(html`
      <div class="legend">
        <ul>
          ${data
            .map(
              (d, i) =>
                html`<li class="row color-${i.toString()}">${d.category}</li>`
            )
            .join('')}
        </ul>
      </div>
    `)

    return legendElm
  }

  const generateArc = (acc, data, idx) => {
    const wrap = generateElement(html`<div class="wrap"></div>`)
    const arc = generateElement(html`<div class="data"></div>`)

    const back = -180 + 360 * (acc + data.percent)
    wrap.style.transform = `rotate(${back}deg)`
    arc.style.transform = `rotate(${back * -1 + acc * 360}deg)`
    arc.classList.add(`color-${idx}`)
    arc.style.zIndex = Math.round(acc * 10)

    wrap.append(arc)

    return wrap
  }

  data.reduce((acc, data, idx) => {
    if (data.percent <= 0.5) {
      const arcElm = generateArc(acc, data, idx)
      pieChartElm.append(arcElm)
    } else {
      const percent = data.percent
      const arcElm = generateArc(acc, { ...data, percent: 0.5 }, idx)
      const arcElm2 = generateArc(
        acc + 0.5,
        { ...data, percent: percent - 0.5 },
        idx
      )

      pieChartElm.append(arcElm)
      pieChartElm.append(arcElm2)
    }

    return acc + data.percent
  }, 0)

  pieChartWrap.append(generateLegend())
  pieChartWrap.append(pieChartElm)

  return pieChartWrap
}
