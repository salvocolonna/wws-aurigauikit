import React from 'react'
import temporaryPanels from '../temporary-panels'
import './style.css'

// TODO: option to remove basic auth

/* 
logo: {src: image, alt: string}
*/
function LoginPage(props) {
  const {
    logo,
    contextPathApp,
    contextPathAuthServer,
    basepath,
    authParams,
    type = 'basic',
    onLogin = data => console.log('login successful', data),
    onError,
  } = props

  const [username, setUsername] = React.useState('user_bank_manager')
  const [password, setPassword] = React.useState('test')

  async function submit(event) {
    event.preventDefault()
    const queryParams = Object.entries(authParams).reduce((string, [key, value]) => {
      return string + key + '=' + value + '&'
    }, '?')

    let authUrl = `${basepath}/${contextPathAuthServer}/oauth/token` + queryParams

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
      const authResponse = await fetch(authUrl, authOptions)
      const authData = await authResponse.json()
      localStorage.setItem('wws-auth-token', authData)

      const userResponse = await fetch(`${basepath}/${contextPathApp}/api/v1/user`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${authData.access_token}`,
        },
      })
      const userData = await userResponse.json()

      onLogin(userData)
      // localStorage.setItem('auth-token', JSON.stringify(authData))
    } catch (error) {
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
                    disabled={isDisabled}
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
