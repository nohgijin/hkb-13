import { parseToLocalMoneyString } from '@/client/utils/parsers'
import { INCOME_CATEGORY, EXPENSE_CATEGORY } from '@/client/utils/constants'

/**
 * @typedef ReportData
 * @property { string } category
 * @property { string } content
 * @property { string } date
 * @property { number } id
 * @property { string } paymentMethod
 * @property { number } price
 * @property { string } type
 */

const getNameByCategory = (category) => {
  return category === INCOME_CATEGORY.SALARY
    ? ['money', 'money_dollar']
    : category === INCOME_CATEGORY.POCKET_MONEY
    ? ['money', 'money_dollar']
    : category === INCOME_CATEGORY.OTHERS
    ? ['money', 'money_dollar']
    : category === EXPENSE_CATEGORY.FOOD
    ? ['food', 'tray']
    : category === EXPENSE_CATEGORY.LIFE
    ? ['food', 'tray']
    : category === EXPENSE_CATEGORY.SHOP_BEAUTY
    ? ['shop', 'cart']
    : category === EXPENSE_CATEGORY.TRAFFIC
    ? ['transport', 'car_fill']
    : category === EXPENSE_CATEGORY.MEDICAL_HEALTH
    ? ['shop', 'cart']
    : category === EXPENSE_CATEGORY.CULTURE
    ? ['culture', 'film']
    : ['shop', 'cart']
}

/**
 * @param { ReportData } data
 */
export const reportElm = (data) => {
  const { category, content, id, paymentMethod, price, type } = data
  const sign = type === 'income' ? 1 : -1
  const money = parseToLocalMoneyString(price * sign)
  const [className, iconName] = getNameByCategory(category)

  return `
      <div class="row" data-report-id=${id}>
        <div class="btn-wrap">
          <button class="edit-btn"><i class="icon">pencil_circle_fill</i>수정</button>
          <button class="delete-btn"><i class="icon">xmark_circle_fill</i>삭제</button>
        </div>
        <i class="icon category-icon ${className}" title="${category}">${iconName}</i>
        <div class="description">${content}</div>
        <div class="payment">${paymentMethod}</div>
        <div class="price ${type}">${money}원</div>
      </div>
    `
}
