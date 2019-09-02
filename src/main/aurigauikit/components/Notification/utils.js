import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'

export const getToken = () => {
  const tokenData = localStorage.getItem(TOKEN_STORAGE_KEY)

  if (!tokenData) return false
  const token = JSON.parse(tokenData)
  const { access_token: accessToken } = token

  if (!accessToken) return false
  return accessToken
}
