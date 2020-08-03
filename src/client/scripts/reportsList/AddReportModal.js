import { generateElement } from '@/client/utils/htmlGenerator'
import { createAReportAPI } from '@/client/apis'

export class AddReportModal {
  constructor(closeModal) {
    this.report = {
      category: '',
      content: '',
      date: '',
      paymentMethod: '',
      price: null,
      type: 'income',
    }
    this.closeModal = closeModal
    this.$root = generateElement(`<div class="modal-wrap"></div`)

    this.render()
  }

  setReportState(state) {
    this.report = { ...this.report, ...state }
  }

  generateTypeSelectForm(type) {
    const typeSelectForm = generateElement(`
      <div class="inex-selector row">
        <div class="name">분류</div>
        <div class="content">
          <button class="income-btn" ${
            type === 'income' ? 'selected' : ''
          }>수입</button>
          <button class="expense-btn" ${
            type === 'expense' ? 'selected' : ''
          }>지출</button>
        </div>
      </div>
    `)

    const incomeBtn = typeSelectForm.querySelector('.income-btn')
    const expenseBtn = typeSelectForm.querySelector('.expense-btn')

    const typeBtnClickHandler = (e) => {
      e.preventDefault()
      this.setReportState({
        type: e.target === incomeBtn ? 'income' : 'expense',
        category: '',
      })

      this.render()
    }
    incomeBtn.addEventListener('click', typeBtnClickHandler)
    expenseBtn.addEventListener('click', typeBtnClickHandler)

    return typeSelectForm
  }

  generateDaySelectForm(date) {
    const daySelectForm = generateElement(`
      <div class="day-selector row">
        <div class="name">날짜</div>
        <div class="content">
          <input type="date" value=${date} />
        </div>
      </div>
    `)

    daySelectForm.querySelector('input').addEventListener('change', (e) => {
      if (e.target.value) {
        const contentElm = this.$root.querySelector('.day-selector .content')
        contentElm.removeAttribute('data-err')
      }
      this.setReportState({ date: e.target.value })
    })

    return daySelectForm
  }

  generateCategorySelectForm(type, category) {
    const options =
      type === 'income'
        ? ['월급', '용돈', '기타수입']
        : [
            '식비',
            '생활',
            '쇼핑/뷰티',
            '교통',
            '의료/건강',
            '문화/여가',
            '미분류',
          ]

    const categorySelectForm = generateElement(`
      <div class="category-selector row">
        <div class="name">카테고리</div>
        <div class="content">
          <select name="category-select" id="">
            <option value='' selected>선택하세요</option>
            ${options
              .map((opt) => {
                const selected = opt === category ? 'selected' : ''
                return `<option value=${opt} ${selected}>${opt}</option>`
              })
              .join('')}
          </select>
        </div>
      </div>
    `)

    categorySelectForm
      .querySelector('select')
      .addEventListener('change', (e) => {
        if (e.target.value) {
          const contentElm = this.$root.querySelector(
            '.category-selector .content'
          )
          contentElm.removeAttribute('data-err')
        }
        this.setReportState({ category: e.target.value })
      })

    return categorySelectForm
  }

  generatePaymentSelectForm(paymentMethod) {
    const options = [
      '신한카드',
      '삼성카드',
      '카카오체크카드',
      '우리카드',
      '롯데카드',
      '배민체크카드',
    ]

    const paymentSelectForm = generateElement(`
      <div class="payment-selector row">
        <div class="name">결제수단</div>
        <div class="content">
          <select name="category-select" id="">
            <option value='' selected>선택하세요</option>
            ${options
              .map((opt) => {
                const selected = opt === paymentMethod ? 'selected' : ''
                return `<option value=${opt} ${selected}>${opt}</option>`
              })
              .join('')}
          </select>
        </div>
      </div>
    `)

    paymentSelectForm
      .querySelector('select')
      .addEventListener('change', (e) => {
        if (e.target.value) {
          const contentElm = this.$root.querySelector(
            '.payment-selector .content'
          )
          contentElm.removeAttribute('data-err')
        }
        this.setReportState({ paymentMethod: e.target.value })
      })

    return paymentSelectForm
  }

  generatePriceInputForm(price) {
    const priceInputForm = generateElement(`
      <div class="price-input row">
        <div class="name">금액</div>
        <div class="content">
          <input type="number" value=${price} placeholder="금액을 입력하세요."/>
        </div>
      </div>
    `)

    priceInputForm.querySelector('input').addEventListener('change', (e) => {
      if (e.target.value) {
        const contentElm = this.$root.querySelector('.price-input .content')
        contentElm.removeAttribute('data-err')
      }
      this.setReportState({ price: e.target.value })
    })

    return priceInputForm
  }

  generateContentInputForm(content) {
    const contentInputForm = generateElement(`
      <div class="content-input row">
        <div class="name">내용</div>
        <div class="content">
          <input type="text" value="${content}" placeholder="내용을 입력하세요." />
        </div>
      </div>
    `)

    contentInputForm.querySelector('input').addEventListener('change', (e) => {
      if (e.target.value) {
        const contentElm = this.$root.querySelector('.content-input .content')
        contentElm.removeAttribute('data-err')
      }
      this.setReportState({ content: e.target.value })
    })

    return contentInputForm
  }

  validateForm() {
    if (!this.report.category) {
      const contentElm = this.$root.querySelector('.category-selector .content')
      contentElm.setAttribute('data-err', '카테고리 정보를 선택해주세요!')
    }

    if (!this.report.content) {
      const contentElm = this.$root.querySelector('.content-input .content')
      contentElm.setAttribute('data-err', '설명을 입력해주세요!')
    }

    if (!this.report.date) {
      const contentElm = this.$root.querySelector('.day-selector .content')
      contentElm.setAttribute('data-err', '날짜를 선택해주세요!')
    }

    if (!this.report.paymentMethod) {
      const contentElm = this.$root.querySelector('.payment-selector .content')
      contentElm.setAttribute('data-err', '결제수단을 선택해주세요!')
    }

    if (!this.report.price) {
      const contentElm = this.$root.querySelector('.price-input .content')
      contentElm.setAttribute('data-err', '금액을 입력해주세요!')
    }

    return (
      !this.report.category ||
      !this.report.content ||
      !this.report.date ||
      !this.report.paymentMethod ||
      !this.report.price
    )
  }

  async createAReport() {
    if (this.validateForm()) return

    const createdReportId = await createAReportAPI(this.report)
    if (!createdReportId) {
      alert('생성 실패!')
    } else {
      this.closeModal()
    }
  }

  render() {
    const { category, content, paymentMethod, price, type, date } = this.report
    const modalElm = generateElement(`<div class="modal"></div>`)

    const closeBtnElm = generateElement(`<i class="icon close">xmark</i>`)
    closeBtnElm.addEventListener('click', this.closeModal)

    const formElm = generateElement(
      `<form action="" class="report-form"></form>`
    )

    formElm.append(this.generateTypeSelectForm(type))
    formElm.append(this.generateDaySelectForm(date))
    formElm.append(this.generateCategorySelectForm(type, category))
    formElm.append(this.generatePaymentSelectForm(paymentMethod))
    formElm.append(this.generatePriceInputForm(price))
    formElm.append(this.generateContentInputForm(content))

    const submitBtnElm = generateElement(
      `<button class="submit-btn">확인</button>`
    )
    submitBtnElm.addEventListener('click', (e) => {
      e.preventDefault()

      this.createAReport()
    })
    formElm.append(submitBtnElm)

    modalElm.append(closeBtnElm)
    modalElm.append(formElm)

    this.$root.innerHTML = ''
    this.$root.append(modalElm)
  }
}
