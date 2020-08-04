export const modifyAReportAPI = async (report) => {
  const response = await fetch(`/api/board/1/report/${report.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  })

  if (!response.ok) return null
  if(response.redirected) location.href = response.url

  const { success } = await response.json()

  return success
}
