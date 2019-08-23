export const getToken = () => {
  const tokenData = localStorage.getItem('wws-auth-token')

  if (!tokenData) return false
  const token = JSON.parse(tokenData)
  const { access_token: accessToken } = token

  if (!accessToken) return false
  return accessToken
}
