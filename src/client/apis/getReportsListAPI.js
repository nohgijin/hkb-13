export const getReportsListAPI = async (params) => {
  const { year, month } = params

  const response = await fetch(`/api/board/1/${year}/${month}/report`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) return null
  if(response.redirected) location.href = response.url

  const { reportsList } = await response.json()

  return reportsList
}
