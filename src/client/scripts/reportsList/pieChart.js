window.addEventListener('DOMContentLoaded', (e) => {
  const sgvElm = document.querySelector('svg.simple-pie')

  const slices = [
    { percent: 0.1, color: 'Coral' },
    { percent: 0.65, color: 'CornflowerBlue' },
    { percent: 0.2, color: '#00ab6b' },
    { percent: 0.05, color: '#aaab6b' },
  ]

  const fragmentElm = document.createDocumentFragment()

  let sum = 0
  slices.reduce((acc, cur, idx) => {
    const next = acc + cur.percent * 100
    const circleElm = document.createElement('circle')
    circleElm.classList.add(
      `${idx === 0 ? 'first' : idx === 1 ? 'second' : 'third'}`
    )
    // circleElm.style.strokeDasharray = `${next} 100`

    fragmentElm.appendChild(circleElm)
    return next
  }, 0)

  sgvElm.appendChild(fragmentElm)
  sgvElm.classList.add('active')
})
