import React, { Suspense } from "react"
import Spinner from "aurigauikit/components/Spinner"
import StaticPanel from "aurigauikit/components/StaticPanel"
import { Tabs, Tab } from "aurigauikit/components/Tabs"
import { withRouter } from "react-router-dom"
import CodeMirror from "react-codemirror"
import "codemirror/lib/codemirror.css"
import "codemirror/mode/jsx/jsx"
import "./base16-light.css"

class Demo extends React.Component {
  state = { code: {}, loading: false }

  componentDidCatch({ stack }, { componentStack }) {
    this.setState({ error: stack + componentStack })
  }

  componentDidMount() {
    const { tab, history, displayName } = this.props
    if (!tab) {
      const first = this.getParts()[0]
      history.push("/" + displayName + "/" + first)
    } else this.fetchCode(tab)
  }

  componentDidUpdate(prev) {
    const { tab } = this.props
    if (prev.tab !== tab) this.fetchCode(tab)
  }

  getParts = () => {
    const { component } = this.props
    return Object.keys(component).filter(part => part !== "metadata")
  }

  fetchCode = async tab => {
    const { component } = this.props
    this.setState({ loading: true })
    const { default: part } = await component[tab].code()
    this.setState(({ code }) => ({
      loading: false,
      error: false,
      tab,
      code: { ...code, [tab]: part }
    }))
  }

  render() {
    const { component, displayName, tab } = this.props
    const { code, error, loading } = this.state
    const parts = this.getParts()
    return (
      <div>
        <Tabs router basename={"/" + displayName}>
          {parts.map(part => {
            const Component = component[part].component
            return (
              <Tab key={part} name={part} path={"/" + part}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20
                  }}>
                  <Suspense fallback={Spinner}>
                    {error ? (
                      <StaticPanel
                        style={{ maxHeight: 300, overflowY: "auto", padding: 20 }}
                        type="critical">
                        <b>Invalid component</b> <br /> <pre>{error}</pre>
                      </StaticPanel>
                    ) : (
                      <Component />
                    )}
                  </Suspense>
                </div>
              </Tab>
            )
          })}
        </Tabs>
        {!loading && (
          <div>
            <h3 style={{ marginTop: "20px" }}>Code</h3>
            <div style={{ border: "1px solid #ccc", pointerEvents: "none" }}>
              <CodeMirror
                value={code[tab] || ""}
                options={{
                  theme: "base16-light-custom",
                  tabSize: 2,
                  lineNumbers: true,
                  mode: "jsx",
                  value: code[tab] || ""
                }}
              />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default withRouter(Demo)
