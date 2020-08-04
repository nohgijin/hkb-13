import { generateElement } from '@/client/utils/htmlGenerator'
import { html } from '@/client/utils/lit'

export const getPieChartElm = (data) => {
  const svgElm = generateElement(html`<div class="pie"></div>`)
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

  svgElm.append(leftAnimator)
  svgElm.append(rightAnimator)

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
      svgElm.append(arcElm)
    } else {
      const percent = data.percent
      const arcElm = generateArc(acc, { ...data, percent: 0.5 }, idx)
      const arcElm2 = generateArc(
        acc + 0.5,
        { ...data, percent: percent - 0.5 },
        idx
      )

      svgElm.append(arcElm)
      svgElm.append(arcElm2)
    }

    return acc + data.percent
  }, 0)

  return svgElm
}
