export const getCategoryStatisticsDataAPI = async (params) => {
  const { year, month } = params

  const response = await fetch(
    `/api/board/${year}/${month}/statistic/category`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  )

  if (!response.ok) return null
  if (response.redirected) location.href = response.url

  const { categoryStatisticsData } = await response.json()

  return categoryStatisticsData
}

export const getDailyStatisticsDataAPI = async (params) => {
  const { year, month } = params

  const response = await fetch(`/api/board/${year}/${month}/statistic/daily`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) return null
  if (response.redirected) location.href = response.url

  const { dailyStatisticsData } = await response.json()

  return dailyStatisticsData
}
