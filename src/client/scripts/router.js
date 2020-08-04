import { Login } from './login/Login'
import { ReportsList } from './reportsList/ReportsList'
import { Calendar } from './calendar/Calendar'
import { NavigationBar } from './navigation/Navigation'
import { Settings } from './Settings/Settings'
import { NotFound } from './notFound/notFound'

const routePage = () => {
  const pathname = location.pathname

  const app = document.querySelector('.app')
  app.innerHTML = ''

  // render login page
  if (pathname === `/login`) {
    app.append(new Login().$root)
    return
  }

  // render report page
  if (pathname === `/reports`) {
    app.append(new NavigationBar().$root)
    app.append(new ReportsList().$root)
    return
  }

  // render calendar page
  else if (pathname === `/calendar`) {
    app.append(new NavigationBar().$root)
    app.append(new Calendar().$root)
    return
  }

  // render statistics page
  else if (pathname === `/statistics`) {
    app.append(new NavigationBar().$root)
    return
  }

  // render settings page
  else if (pathname === `/settings`) {
    app.append(new NavigationBar().$root)
    app.append(new Settings().$root)
    return
  }

  // render notFound page
  else {
    app.append(new NotFound().$root)
  }
}

window.addEventListener('popstate', routePage)
window.addEventListener('DOMContentLoaded', routePage)
