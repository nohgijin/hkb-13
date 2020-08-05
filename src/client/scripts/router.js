import { Login } from './login/Login'
import { ReportsList } from './reportsList/ReportsList'
import { Calendar } from './calendar/Calendar'
import { Statistics } from './statistics/Statistics'
import { NavigationBar } from './navigation/Navigation'
import { NotFound } from './notFound/notFound'

const routePage = () => {
  const pathname = location.pathname

  const app = document.querySelector('.app')
  app.innerHTML = ''

  // render login page
  if (pathname === `/login`) {
    const login = new Login()
    app.append(login.$root)
    login.loadNaverBtn()
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
    app.append(new Statistics().$root)
    return
  } else {
    // render notFound page
    app.append(new NotFound().$root)
  }
}

window.addEventListener('popstate', routePage)
window.addEventListener('DOMContentLoaded', routePage)
