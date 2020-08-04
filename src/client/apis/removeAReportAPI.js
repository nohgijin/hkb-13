export const removeAReportAPI = async (reportId) => {
  const response = await fetch(`/api/board/1/report/${reportId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) return null
  if (response.redirected) location.href = response.url

  const { success } = await response.json()

  return success
}
