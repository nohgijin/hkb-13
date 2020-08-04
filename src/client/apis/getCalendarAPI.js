
export const getCalendarAPI = async (params) => {
  const { year, month } = params

  const response = await fetch(`/api/board/1/${year}/${month}/calendar`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) return null
  if(response.redirected) location.href = response.url

  const { calendar } = await response.json()

  return calendar
}
