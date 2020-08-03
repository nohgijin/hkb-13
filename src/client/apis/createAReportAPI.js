export const createAReportAPI = async ({ report }) => {
  const resposne = await fetch(`/api/board/1/report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(report),
  })

  if (!resposne.ok) return null

  const { createdReportId } = await resposne.json()
  return createdReportId
}
