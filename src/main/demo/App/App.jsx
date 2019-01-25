import React from "react"
import { Route } from "react-router-dom"
import { PageHeader, Breadcrumb } from "aurigauikit/components/Page"
import StaticPanel from "aurigauikit/components/StaticPanel"
import Demo from "./Demo"
import components from "./components"

const TabSection = ({ children }) => (
  <section style={{ borderRadius: "4px" }}>
    <div style={{ marginBottom: "30px", marginTop: "10px" }}>{children}</div>
  </section>
)

export default () => (
  <div>
    <section>
      <PageHeader>
        <Breadcrumb name="AurigaUiKit" />
      </PageHeader>
    </section>
    <section>
      {Object.keys(components).map(displayName => {
        const component = components[displayName]
        const { description } = component.metadata
        const element = tab => (
          <TabSection>
            {description && (
              <div style={{ marginBottom: 30 }}>
                <StaticPanel style={{ paddingLeft: 10 }}>{description}</StaticPanel>
              </div>
            )}
            <Demo displayName={displayName} component={component} tab={tab} />
          </TabSection>
        )
        return (
          <React.Fragment key={displayName}>
            <Route exact path={"/" + displayName} render={() => element(null)} />
            <Route
              exact
              path={"/" + displayName + "/:tab"}
              render={({ match }) => element(match.params.tab)}
            />
          </React.Fragment>
        )
      })}
    </section>
  </div>
)
