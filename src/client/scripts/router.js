import { urlParser } from '@/client/utils/parsers'
import { generateElement } from '@/client/utils/htmlGenerator'

import { hkbModel } from '@/client/models/hkbModel'

import { ReportsList } from './reportsList/ReportsList'
import { Calendar } from './calendar/Calendar'
import { NavigationBar } from './navigation/Navigation'
import './notFound/notFound'

const render = (elements) => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  elements.forEach((el) => app.appendChild(el))
}

const routePage = ({ year, month, page }) => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  app.append(new NavigationBar(year, month, page).$root)

  // render report page
  if (page === `reports`) {
    app.append(new ReportsList().$root)
    return
  }

  // render calendar page
  else if (page === `calendar`) {
    app.append(new Calendar().$root)
    return
  }

  // render statistics page
  if (page === `statistics`) {
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
