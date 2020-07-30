import { generateElement } from '@/client/utils/html-generator'
import { Calendar } from './calendar/Calendar'

import './navigation/navigation'
import './reportsList/reportsList'
import './notFound/notFound'

const render = (elements) => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  elements.forEach((el) => app.appendChild(el))
}

const routePage = (e) => {
  const pathname = location.pathname

  const app = document.querySelector('.app')
  app.innerHTML = ''

  const navigationBar = generateElement(
    `<navigation-bar class="navigation-bar"></navigation-bar>`
  )

  // render report page
  if (pathname === '/reports') {
    const reportsPage = generateElement(`<reports-list></reports-list>`)
    render([navigationBar, reportsPage])
    return
  }

  // render calendar page
  if (pathname === '/calendar') {
    app.prepend(navigationBar)
    let year = new Date().getFullYear()
    let month = new Date().getMonth() + 1
    new Calendar(year, month)
    return
  }

  // render statistics page
  if (pathname === '/statistics') {
    render([navigationBar])
    return
  }

  // render notFound page
  const notFoundPage = generateElement(`<not-found></not-found>`)
  render([notFoundPage])
}

window.addEventListener('popstate', routePage)
window.addEventListener('DOMContentLoaded', routePage)
