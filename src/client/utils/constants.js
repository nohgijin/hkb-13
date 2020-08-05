const INCOME_CATEGORY = {
  SALARY: '월급',
  POCKET_MONEY: '용돈',
  OTHERS: '기타수입',
}

const EXPENSE_CATEGORY = {
  FOOD: '식비',
  LIFE: '생활',
  SHOP_BEAUTY: '쇼핑/뷰티',
  TRAFFIC: '교통',
  MEDICAL_HEALTH: '의료/건강',
  CULTURE: '문화/여가',
  UNDEF: '미분류',
}

const CALENDAR_CLASS = {
  DAY: 'day',
  DATE: 'date',
  INCOME: 'income',
  EXPENSE: 'expense',
}

const MONTH_SELECTOR_CLASS = {
  LEFT: 'left',
  RIGHT: 'right',
}

const payments = [
  '신한카드',
  '삼성카드',
  '국민카드',
  '카카오뱅크',
  '신한은행',
  '우리은행',
  '농협은행',
  '국민은행',
  '현금',
]
const categories = [
  { name: '월급', type: 'income' },
  { name: '용돈', type: 'income' },
  { name: '기타수입', type: 'income' },
  { name: '식비', type: 'expense' },
  { name: '생활', type: 'expense' },
  { name: '쇼핑/뷰티', type: 'expense' },
  { name: '교통', type: 'expense' },
  { name: '의료/건강', type: 'expense' },
  { name: '문화/여가', type: 'expense' },
  { name: '미분류', type: 'expense' },
]

module.exports = {
  INCOME_CATEGORY,
  EXPENSE_CATEGORY,
  CALENDAR_CLASS,
  MONTH_SELECTOR_CLASS,
  payments,
  categories,
}
