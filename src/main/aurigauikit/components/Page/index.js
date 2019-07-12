import React from 'react'
import sizeMe from 'react-sizeme'
import { withRouter } from 'react-router-dom'
import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'
import errorPic from './images/error.png'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'
import './style.less'

export const PageHeader = ({ children }) => (
  <section style={{ display: 'flex', justifyContent: 'space-between' }}>{children}</section>
)
export const PageMain = ({ children }) => <section>{children}</section>
export const PageFooter = ({ children }) => <section>{children}</section>
export const PageActions = ({ children }) => (
  <div style={{ float: 'right', textAlign: 'right' }}>{children}</div>
)
export const ButtonsPanel = ({ children }) => (
  <div style={{ textAlign: 'right', marginTop: '20px', marginBottom: '10px' }}> {children} </div>
)

export * from './Breadcrumb'
export * from './PageAnchors'

export const withParams = Component => props => <Component {...props.match.params} {...props} />

export const authenticated = (key = TOKEN_STORAGE_KEY, errorPath = '/dashboard') => Component => {
  return withRouter(props => {
    const auth = localStorage.getObject(key)
    if (!auth) {
      props.history.push('/login')
      return null
    }
    return (
      <Error path={errorPath} history={props.history}>
        <Component {...props} />
      </Error>
    )
  })
}

export class Error extends React.Component {
  state = { error: null }

  componentDidCatch({ stack }, { componentStack }) {
    this.setState({ error: stack + componentStack })
  }

  refreshPage = () => {
    const { path, history } = this.props
    if (path === '/dashboard') {
      window.location.reload()
    } else {
      history.push(path)
    }
  }

  render() {
    const { error } = this.state

    if (error)
      return (
        <div className="error">
          <div className="error__img-container">
            <img src={errorPic} alt="error" />
          </div>
          <div className="error__wrapper">
            <div className="error__title error--align">
              <Msg {...messages.title} />
            </div>
            <div className="error__text error--align">
              <Msg {...messages.subtitle} />
            </div>
            <div className="error__text error--align">
              <Msg {...messages.text} />{' '}
              <a onClick={this.refreshPage}>
                <Msg {...messages.link} />
              </a>
            </div>
            <div className="error__img-container--mobile">
              <img src={errorPic} alt="error" />
            </div>
            <button disabled className="error__button btn btn-destructive">
              <Msg {...messages.button} />
            </button>
          </div>
        </div>
      )
    return this.props.children
  }
}

export const createPage = (Topbar, Sidebar) => {
  const SizedSidebar = sizeMe({ noPlaceholder: true })(Sidebar)
  const SizedTopbar = sizeMe({ monitorHeight: true, noPlaceholder: true })(Topbar)
  return Component =>
    class extends React.Component {
      state = { sidebar: 0, topbar: 0, opacity: 0.5 }
      onTopbar = size => this.setState({ topbar: size.height })
      onSidebar = size => this.setState({ sidebar: size.width })
      getSize = () => {
        const { topbar, sidebar } = this.state
        if (topbar === 0 && sidebar === 0) return { width: '100%' }
        const width = `calc(100vw - ${sidebar}px)`
        const height = `calc(100vh - ${topbar}px)`
        const minWidtb = width
        const minHeight = height
        return { width, height, minWidtb, minHeight }
      }

      componentDidMount() {
        this.setState({ opacity: 1 })
      }

      render() {
        return (
          <div id="container">
            <SizedSidebar onSize={this.onSidebar} topbar={this.state.topbar} />
            <div id="main">
              <SizedTopbar onSize={this.onTopbar} />
              <div
                id="content-dynamic"
                style={{
                  display: 'block',
                  position: 'relative',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  ...this.getSize(),
                  opacity: this.state.opacity,
                  minWidth: 300,
                }}
              >
                <Component {...this.props} />
              </div>
            </div>
          </div>
        )
      }
    }
}
