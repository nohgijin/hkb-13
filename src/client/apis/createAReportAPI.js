export const createAReportAPI = async (report) => {
  const response = await fetch(`/api/board/1/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  })

  if (!response.ok) return null
  if(response.redirected) location.href = response.url

  const { createdReportId } = await response.json()

  return createdReportId
}
