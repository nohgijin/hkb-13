export const modifyAReportAPI = async ({ report, reportId }) => {
  const resposne = await fetch(`/api/board/1/report/${reportId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  })

  if (!resposne.ok) return null

  const { success } = await resposne.json()

  return success
}
