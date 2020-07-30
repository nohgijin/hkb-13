import { generateElement } from '@/client/utils/html-generator'
import { Calendar } from '../calendar/Calendar'

const notFoundPage = generateElement(`
<div id="not-found">
  <div class="rain">
    <div class="otl"><img src="https://baemin.com/img/img-title-error.png" alt="">
      <p>404 NOT FOUND</p><a href="/reports"><img src="https://baemin.com/img/btn-home.png" alt=""></a>
    </div>
  </div>
</div>
`)

const reportsPage = generateElement(`
<main class="reports-page">
<section class="list-section">
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 16일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon shop" title="쇼핑/뷰티">cart</i>
        <div class="description">미용실</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 15일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <!-- <i class="icon category-icon food" title="식비">poultry_leg</i> -->
        <i class="icon category-icon food" title="식비">tray</i>
        <div class="description">BBQ 황금올리브</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon transport" title="교통">car_fill</i>
        <div class="description">지난달 교통비</div>
        <div class="payment">국민은행</div>
        <div class="price minus">-53,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 14일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon culture" title="문화/여가">film</i>
        <div class="description">아이언맨3 4D</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-40,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>

  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 16일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon shop" title="쇼핑/뷰티">cart</i>
        <div class="description">미용실</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 15일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <!-- <i class="icon category-icon food" title="식비">poultry_leg</i> -->
        <i class="icon category-icon food" title="식비">tray</i>
        <div class="description">BBQ 황금올리브</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon transport" title="교통">car_fill</i>
        <div class="description">지난달 교통비</div>
        <div class="payment">국민은행</div>
        <div class="price minus">-53,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 14일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon culture" title="문화/여가">film</i>
        <div class="description">아이언맨3 4D</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-40,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>

  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 16일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon shop" title="쇼핑/뷰티">cart</i>
        <div class="description">미용실</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 15일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <!-- <i class="icon category-icon food" title="식비">poultry_leg</i> -->
        <i class="icon category-icon food" title="식비">tray</i>
        <div class="description">BBQ 황금올리브</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-20,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon transport" title="교통">car_fill</i>
        <div class="description">지난달 교통비</div>
        <div class="payment">국민은행</div>
        <div class="price minus">-53,000원</div>
    </div>
  </div>
  </div>
  <div class="daily-reports">
    <div class="report-header">
      <div class="day">6월 14일 화</div>
      <!-- <div class="daily-total">
        <div class="plus">+26,000원</div>
        <div class="minus">-13,000원</div>
      </div> -->
    </div>
    <div class="report-body">
      <div class="row">
        <i class="icon category-icon culture" title="문화/여가">film</i>
        <div class="description">아이언맨3 4D</div>
        <div class="payment">현대카드</div>
        <div class="price minus">-40,000원</div>
      </div>
      <div class="row">
        <i class="icon category-icon money" title="월급">money_dollar</i>
        <div class="description">월급</div>
        <div class="payment">국민은행</div>
        <div class="price plus">+2,750,000원</div>
    </div>
  </div>
  </div>
  
  </div>
</section>
</main>
`)
const routePage = (e) => {
  const app = document.querySelector('.app')
  const main = document.querySelector('.main')

  switch (location.pathname) {
    case '/reports': {
      console.log(reportsPage)
      app.replaceChild(reportsPage, main)
      break
    }
    case '/calendar': {
      const calendar = new Calendar(2020, 7)
      const calendarPage = generateElement(calendar.template)
      app.replaceChild(calendarPage, main)
      break
    }
    case '/statistics': {
      break
    }
    default: {
      app.innerHTML = ''
      app.appendChild(notFoundPage)
    }
  }
}

window.addEventListener('popstate', routePage)

const pushUrl = (href) => {
  history.pushState({}, '', href)
  window.dispatchEvent(new Event('popstate'))
}

window.addEventListener('DOMContentLoaded', (e) => {
  routePage()

  const pageNavigators = [
    {
      el: document.querySelector('nav.page-selector .reports-page-btn'),
      url: '/reports',
    },
    {
      el: document.querySelector('nav.page-selector .calendar-page-btn'),
      url: '/calendar',
    },
    {
      el: document.querySelector('nav.page-selector .statistics-page-btn'),
      url: '/statistics',
    },
  ]

  pageNavigators.forEach((nav) => {
    nav.el.addEventListener('click', (e) => {
      pushUrl(nav.url)
    })
  })
})
