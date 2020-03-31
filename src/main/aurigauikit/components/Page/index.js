import React, { useState } from 'react'
import sizeMe from 'react-sizeme'
import { withRouter } from 'react-router-dom'
import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'
import errorPic from './images/error.png'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'
import './style.less'
import { Layout } from 'antd'
import { useMediaQuery } from 'react-responsive'

const { Content } = Layout

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

export const authenticated = (key = TOKEN_STORAGE_KEY) => Component => {
  return withRouter(props => {
    const auth = localStorage.getObject(key)
    if (!auth) {
      props.history.push('/login')
      return null
    }
    return <Component {...props} />
  })
}

export const Error = withRouter(
  class Error extends React.Component {
    state = { error: null }

    componentDidCatch({ stack }, { componentStack }) {
      this.setState({ error: stack + componentStack })
      if (this.unlisten) this.unlisten()
    }

    componentDidMount() {
      const { history } = this.props
      this.unlisten = history.listen(() => {
        this.setState({ error: null })
      })
    }

    refreshPage = () => {
      const { history } = this.props
      history.push('/')
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
)

export const createPage = (Topbar, Sidebar, legacy = true) => {
  if (legacy) {
    const SizedSidebar = sizeMe({ noPlaceholder: true })(Sidebar)
    const SizedTopbar = sizeMe({ monitorHeight: true, noPlaceholder: true })(Topbar)
    return Component =>
      class extends React.Component {
        state = { sidebar: 0, topbar: 0, opacity: 0.5 }
        onTopbar = size => this.setState({ topbar: size.height })
        onSidebar = size => this.setState({ sidebar: size.width })
        getSize = () => {
          const { topbar, sidebar } = this.state
          if (topbar === 0 && sidebar === 0) return null
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
          const size = this.getSize()
          return (
            <div id="container">
              <SizedSidebar
                onSize={this.onSidebar}
                topbar={this.state.topbar}
                {...this.props.sidebarProps}
              />
              <div id="main">
                <SizedTopbar onSize={this.onTopbar} />
                {size && (
                  <div
                    id="content-dynamic"
                    style={{
                      display: 'block',
                      position: 'relative',
                      overflowY: 'auto',
                      overflowX: 'hidden',
                      opacity: this.state.opacity,
                      ...size,
                    }}
                  >
                    <Error>
                      <Component {...this.props} />
                    </Error>
                  </div>
                )}
              </div>
            </div>
          )
        }
      }
  }
  return Component =>
    function(props) {
      const [collapsed, setCollapsed] = useState(false)
      const isTabletOrMobile = useMediaQuery({ query: '(max-width: 1224px)' })
      function toggle() {
        setCollapsed(!collapsed)
      }
      const isCollapsed = collapsed || isTabletOrMobile
      return (
        <Layout>
          <Sidebar collapsed={collapsed} isTablet={isTabletOrMobile} />
          <Layout>
            <Topbar onCollapse={toggle} collapsed={collapsed} isTablet={isTabletOrMobile} />
            <Content
              style={{
                marginLeft: isCollapsed ? 80 : 200,
                marginTop: 64,
                padding: 24,
                background: '#fff',
                minHeight: 280,
              }}
            >
              <Error>
                <Component {...props} />
              </Error>
            </Content>
          </Layout>
        </Layout>
      )
    }
}
