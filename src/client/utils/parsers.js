export const urlParser = (path) => {
  const regex = /\/([0-9]+)\/([0-9]+)\/([A-Za-z]+)/gm
  const res = regex.exec(path)
  if (!res) return

  return {
    year: parseInt(res[1]),
    month: parseInt(res[2]),
    page: res[3],
  }
}

export const parseToLocalMoneyString = (money) => {
  return String(money).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,')
}
