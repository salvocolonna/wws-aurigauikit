import React from 'react'
import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'
import temporaryPanels from '../temporary-panels'
import './style.css'

/* 
logo: {src: image, alt: string}
*/
function LoginPage(props) {
  const {
    logo,
    userProfilePath,
    tokenPath,
    authParams,
    type = 'basic',
    onLogin = data => console.log('login successful', data),
    onError,
  } = props

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  async function submit(event) {
    event.preventDefault()
    const queryParams = Object.entries(authParams).reduce((string, [key, value]) => {
      return string + key + '=' + value + '&'
    }, '?')

    let authUrl = tokenPath + queryParams

    const authOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }

    switch (type) {
      case 'basic':
        authOptions.headers['X-Authorization'] = btoa(`${username}:${password}`)
        break
      case 'query':
        authUrl = authUrl + `username=${username}&password=${password}`
        break
      default:
        break
    }

    try {
      setLoading(true)
      const authResponse = await fetch(authUrl, authOptions)
      const authData = await authResponse.json()
      localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(authData))

      const userResponse = await fetch(userProfilePath, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.access_token}`,
        },
      })

      if (userResponse.status !== 200) throw new Error(userResponse.statusText)
      const userData = await userResponse.json()

      setLoading(false)
      onLogin(userData)
    } catch (error) {
      setLoading(false)
      if (onError && typeof onError === 'function') {
        onError(error)
      } else {
        console.log(error.message)
        temporaryPanels.showCriticalTemporaryPanel('Invalid username or password!')
      }
    }
  }

  const isDisabled = password.length === 0 || username.length === 0

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-form" style={{ padding: 40, paddingLeft: 20, paddingRight: 20 }}>
            {logo && (
              <div className="login-logo">
                <img src={logo.src} alt={logo.alt} />
              </div>
            )}
            <div id="login-main">
              <form method="POST">
                <div style={{ paddingLeft: 40, paddingRight: 40 }}>
                  <label>
                    Username
                    <input
                      value={username}
                      style={{ width: '100%', marginTop: 3 }}
                      onChange={e => setUsername(e.target.value)}
                      type="text"
                    />
                  </label>
                </div>
                <div style={{ paddingLeft: 40, paddingRight: 40 }}>
                  <label style={{ marginTop: 20 }}>
                    Password
                    <input
                      value={password}
                      style={{ width: '100%', marginTop: 3 }}
                      onChange={e => setPassword(e.target.value)}
                      type="password"
                    />
                  </label>
                </div>
                <div style={{ padding: '20px 40px' }}>
                  <button
                    disabled={isDisabled || loading}
                    onClick={submit}
                    style={{ width: '50%', float: 'right' }}
                    className="btn btn-primary"
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
