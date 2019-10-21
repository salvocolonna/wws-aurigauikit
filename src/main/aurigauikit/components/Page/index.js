import React from 'react'
import sizeMe from 'react-sizeme'
import { withRouter } from 'react-router-dom'
import { TOKEN_STORAGE_KEY } from 'aurigauikit/constants'
import errorPic from './images/error.png'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'
import './style.less'
import { Layout, Menu, Icon } from 'antd'

const { Header, Sider, Content } = Layout

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  }

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    })
  }

  render() {
    return (
      <Layout>
        <Layout>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 280,
            }}
          >
            Content
          </Content>
        </Layout>
      </Layout>
    )
  }
}
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

export const createPage = (Topbar, Sidebar) => {
  return Component =>
    class extends React.Component {
      state = { collapsed: false }

      toggle = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        })
      }

      render() {
        return (
          <Layout>
            <Sidebar collapsed={this.state.collapsed} />
            <Layout>
              <Topbar onCollapse={this.toggle} collapsed={this.state.collapsed} />
              <Content
                style={{
                  marginLeft: this.state.collapsed ? 80 : 200,
                  marginTop: 64,
                  padding: 24,
                  background: '#fff',
                  minHeight: 280,
                }}
              >
                <Error>
                  <Component {...this.props} />
                </Error>
              </Content>
            </Layout>
          </Layout>
        )
      }
    }
}
