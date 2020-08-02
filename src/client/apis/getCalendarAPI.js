export const getCalendarAPI = async (params) => {
  const { year, month } = params

  const resposne = await fetch(`/api/board/1/${year}/${month}/calendar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!resposne.ok) return null

  const { calendar } = await resposne.json()

  return calendar
}
