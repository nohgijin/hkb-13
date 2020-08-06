export const getUserAPI = async () => {
  const response = await fetch(`/api/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) return null
  if (response.redirected) location.href = response.url

  const { user } = await response.json()

  return user
}
