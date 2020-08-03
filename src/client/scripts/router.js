import { Login } from './login/Login'
import { ReportsList } from './reportsList/ReportsList'
import { Calendar } from './calendar/Calendar'
import { NavigationBar } from './navigation/Navigation'
import './notFound/notFound'

const routePage = () => {
  const app = document.querySelector('.app')
  app.innerHTML = ''

  // render login page
  if (pathname === `/login`) {
    app.append(new Login().$root)
    return
  }

  app.append(new NavigationBar().$root)

  // render report page
  if (pathname === `/reports`) {
    app.append(new ReportsList().$root)
    return
  }

  // render calendar page
  else if (pathname === `/calendar`) {
    app.append(new Calendar().$root)
    return
  }

  // render statistics page
  else if (pathname === `/statistics`) {
    return
  } else {
    // render notFound page
  }
}

window.addEventListener('popstate', routePage)
window.addEventListener('DOMContentLoaded', routePage)
