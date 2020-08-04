import { reportElm } from './report'
import { EditReportModal } from './EditReportModal'
import { AddReportModal } from './AddReportModal'
import { hkbModel } from '@/client/models/hkbModel'

import { dateParser } from '@/client/utils/parsers'
import { generateElement } from '@/client/utils/htmlGenerator'

import { removeAReportAPI } from '@/client/apis'

export class ReportsList {
  constructor() {
    this.$root = generateElement(`<main class="reports-page"></main>`)
    this.$formModal = null
    hkbModel.subscribe(this.render.bind(this))
  }

  getDateString(date) {
    const { year, month, day } = dateParser(date)
    const thisYear = new Date().getFullYear()
    const weekdays = ['목', '금', '토', '일', '월', '화', '수']
    return `${thisYear !== year ? year : ''}${month}월 ${day}일 ${
      weekdays[new Date(date).getDay()]
    }`
  }

  generateAddReportBtnElm() {
    const addReportBtnElm = generateElement(`<button>추가</button>`)
    addReportBtnElm.addEventListener('click', () => {
      this.openAddModal()
    })
    return addReportBtnElm
  }

  openEditModal(report) {
    this.$formModal = new EditReportModal(
      report,
      this.closeModal.bind(this)
    ).$root
    this.openModal()
  }

  openAddModal() {
    this.$formModal = new AddReportModal(this.closeModal.bind(this)).$root
    this.openModal()
  }

  openModal() {
    // modal 바깥을 누르면 꺼지게 하기 위함
    this.$formModal.addEventListener('click', (e) => {
      if (e.target === this.$formModal) this.closeModal()
    })

    // modal이 켜졌을 때 main화면의 scroll을 막기 위함
    document.body.style.overflow = 'hidden'

    this.$root.prepend(this.$formModal)
  }

  closeModal() {
    // main화면 scroll 잠금 해제
    document.body.style.overflow = 'initial'

    this.$formModal.remove()
    this.$formModal = null
  }

  async deleteReport(reportId) {
    if (!confirm('정말로 삭제하시겠습니까?')) return

    const success = await removeAReportAPI(reportId)

    if (!success) {
      alert('삭제 실패!')
    } else {
      hkbModel.reload()
    }
  }

  render({ page, data: reportsList }) {
    if (page !== '/reports' || !reportsList) return

    const listElm = generateElement(`<section class="list-section"></section>`)

    let prevDate = null
    let prevReportElm = null
    reportsList.forEach((report) => {
      const { date } = report
      const reportRowElm = generateElement(reportElm(report))

      reportRowElm.querySelector('.edit-btn').addEventListener('click', (e) => {
        this.openEditModal(report)
      })
      reportRowElm
        .querySelector('.delete-btn')
        .addEventListener('click', (e) => {
          this.deleteReport(report.id)
        })

      if (prevDate === date && prevReportElm) {
        const reportsBodyElm = prevReportElm.querySelector('.report-body')
        reportsBodyElm.appendChild(reportRowElm)
      } else {
        const dailyReportElm = generateElement(`
          <div class="daily-reports">
            <div class="report-header">
              <div class="day">${this.getDateString(date)}</div>
            </div>
            <div class="report-body">
            </div>
          </div>
        `)

        dailyReportElm.querySelector('.report-body').append(reportRowElm)
        prevDate = date
        prevReportElm = dailyReportElm
        listElm.appendChild(dailyReportElm)
      }
    })

    this.$root.innerHTML = ''
    this.$root.append(this.generateAddReportBtnElm())
    this.$root.append(listElm)
  }
}
