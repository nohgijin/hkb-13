export const comma = (number) => {
  // str = String(str)
  // return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
  return number.toLocaleString()
}
