export const removeAReportAPI = async ({ reportId }) => {
  const resposne = await fetch(`/api/board/1/report/${reportId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!resposne.ok) return null

  const { success } = await resposne.json()

  return success
}
