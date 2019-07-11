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
    onLogin = data => console.log('login successful', data),
    onError,
  } = props

  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function submit(event) {
    event.preventDefault()
    const queryParams = Object.entries(authParams).reduce((string, [key, value]) => {
      return string + key + '=' + value + '&'
    }, '?')
    const url = `${basepath}/${contextPathAuthServer}/oauth/token` + queryParams
    const basic = btoa(`${username}:${password}`)

    try {
      const authResponse = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': basic },
      })
      const authData = await authResponse.json()
      localStorage.setItem('wws-auth-token')

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
