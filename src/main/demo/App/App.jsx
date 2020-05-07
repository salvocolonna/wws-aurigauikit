import React from 'react'
import { Route } from 'react-router-dom'
import { PageHeader, Breadcrumb } from 'aurigauikit/components/Page'
import StaticPanel from 'aurigauikit/components/StaticPanel'
import Demo from './Demo'
import components from './components'
import { Switch } from 'antd'

const TabSection = ({ children }) => (
  <section style={{ borderRadius: '4px' }}>
    <div style={{ marginBottom: '30px', marginTop: '10px' }}>{children}</div>
  </section>
)

export default ({ rerender }) => (
  <div>
    <section>
      <PageHeader>
        <Breadcrumb name="AurigaUiKit" />
      </PageHeader>
    </section>
    <section>
      <div style={{ float: 'right', marginTop: -60, display: 'flex' }}>
        <Switch checked={window.ANT_LAYOUT} onChange={rerender} />{' '}
        <div style={{ transform: 'translate(5px, 1px)', fontWeight: 'bold' }}>ANT</div>
      </div>
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
            <Route exact path={'/' + displayName} render={() => element(null)} />
            <Route
              exact
              path={'/' + displayName + '/:tab'}
              render={({ match }) => element(match.params.tab)}
            />
          </React.Fragment>
        )
      })}
    </section>
  </div>
)
