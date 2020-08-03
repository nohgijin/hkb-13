export const getReportsListAPI = async (params) => {
  const { year, month } = params

  const resposne = await fetch(`/api/board/1/${year}/${month}/report`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!resposne.ok) return null

  const { reportsList } = await resposne.json()

  return reportsList
}
