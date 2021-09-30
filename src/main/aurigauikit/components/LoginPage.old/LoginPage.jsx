import React from 'react'
import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'
import temporaryPanels from '../temporary-panels'
import Spinner from '../Spinner'

import './style.css'

/* 
logo: {src: image, alt: string}
*/

function buildAuth({ authParams, tokenPath, type, username, password }) {
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
  return [authUrl, authOptions]
}

async function authenticateAndGetUser(authUrl, authOptions, userProfilePath) {
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
  return userData
}

function LoginPage(props) {
  const {
    logo,
    userProfilePath,
    tokenPath,
    authParams,
    type = 'basic',
    onLogin = data => console.log('login successful', data),
    onError,
    messages = {
      error: 'An error occurred, retry later!',
      invalid: 'Invalid username or password!',
    },
  } = props

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    async function login() {
      if (authParams.grant_type === 'client_credentials') {
        setLoading(true)

        const [authUrl, authOptions] = buildAuth({
          authParams,
          tokenPath,
          type,
        })

        try {
          const userData = await authenticateAndGetUser(authUrl, authOptions, userProfilePath)
          onLogin(userData)
          setLoading(false)
        } catch (error) {
          setLoading(false)
          if (onError && typeof onError === 'function') {
            onError(error)
          } else {
            console.log(error.message)
            temporaryPanels.showCriticalTemporaryPanel(messages.error)
          }
        }
      }
    }

    login()
  }, [
    authParams,
    authParams.grant_type,
    tokenPath,
    type,
    userProfilePath,
    onLogin,
    onError,
    messages.error,
  ])

  async function submit(event) {
    if (event) event.preventDefault()

    const [authUrl, authOptions] = buildAuth({
      authParams,
      tokenPath,
      type,
      password,
      username,
    })

    try {
      setLoading(true)
      const userData = await authenticateAndGetUser(authUrl, authOptions, userProfilePath)
      setLoading(false)
      onLogin(userData)
    } catch (error) {
      setLoading(false)
      if (onError && typeof onError === 'function') {
        onError(error)
      } else {
        console.log(error.message)
        temporaryPanels.showCriticalTemporaryPanel(messages.invalid)
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
            {loading && authParams.grant_type === 'client_credentials' && (
              <div id="login-spinner" style={{ position: 'relative', height: 100, width: '100%' }}>
                <Spinner target={'login-spinner'} style={{ backgroundColor: 'transparent' }} />
              </div>
            )}
            {authParams.grant_type === 'password' && (
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
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
