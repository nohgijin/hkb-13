
import { urlParser } from '@/client/utils/parsers'
import { generateElement } from '@/client/utils/htmlGenerator'

import { hkbModel } from '@/client/models/hkbModel'

import { ReportsList } from './reportsList/ReportsList'
import {Calendar}  from './calendar/Calendar'
import './navigation/navigation'
import './notFound/notFound'

const render = (elements) => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  elements.forEach((el) => app.appendChild(el))
}

const routePage = (urlParams) => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  const { year, month, page } = urlParams
  const navigationBar = generateElement(
    `<navigation-bar class="navigation-bar"></navigation-bar>`
  )

  navigationBar.setAttribute('data-year', year)
  navigationBar.setAttribute('data-month', month)

  // render report page
  if (page === `reports`) {
    app.append(navigationBar)
    app.append(new ReportsList().$root)
    return
  }

  // render calendar page
  else if (page === `calendar`) {
    app.append(navigationBar)
    app.append(new Calendar().$root)
    return
  }

  // render statistics page
  if (page === `statistics`) {
    render([navigationBar])
    return
  }
}

sessionStorage.setItem('prevPage', null)

const movePageHandler = () => {
  const pathname = location.pathname

  const urlParams = urlParser(pathname)
  if (!urlParams) {
    // render notFound page
    const notFoundPage = generateElement(`<not-found></not-found>`)
    sessionStorage.setItem('prevPage', null)
    render([notFoundPage])
    return
  }

  const prevPage = sessionStorage.getItem('prevPage')
  if (prevPage !== urlParams.page) {
    sessionStorage.setItem('prevPage', urlParams.page)
    routePage(urlParams)
  }

  hkbModel.getData(urlParams)
}

window.addEventListener('popstate', movePageHandler)
window.addEventListener('DOMContentLoaded', movePageHandler)
