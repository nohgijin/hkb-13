import { Calendar } from './calendar/Calendar'

import { urlParser } from '@/client/utils/urlParser'
import { generateElement } from '@/client/utils/htmlGenerator'

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

  const results = urlParser(pathname)
  if (!results) {
    // render notFound page
    const notFoundPage = generateElement(`<not-found></not-found>`)
    render([notFoundPage])
    return
  }

  const { year, month, page } = results

  // render report page
  if (page === `reports`) {
    const reportsPage = generateElement(`<reports-list></reports-list>`)
    reportsPage.setAttribute('data-year', year)
    reportsPage.setAttribute('data-month', month)
    render([navigationBar, reportsPage])
    return
  }

  // render calendar page
  if (page === `calendar`) {
    app.prepend(navigationBar)
    new Calendar(year, month)
    return
  }

  // render statistics page
  if (page === `statistics`) {
    render([navigationBar])
    return
  }
}

window.addEventListener('popstate', routePage)
window.addEventListener('DOMContentLoaded', routePage)
