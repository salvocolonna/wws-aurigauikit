import React from 'react'
import { useHistory, useRouteMatch } from 'react-router-dom'
import { Tabs as AntdTabs } from 'antd'
import Tab from './Tab'

type Props = {
  router?: boolean
  basename?: string
} & React.ComponentProps<typeof AntdTabs>

const Tabs: React.FC<Props> = ({ router, basename = '', children, ...props }) => {
  const history = useHistory()
  const match = useRouteMatch()
  const [activeKey, setActiveKey] = React.useState('0')

  const activeRoute = (React.Children.toArray(children) as any)
    .filter(Boolean)
    .find(({ props }) => `${basename}${props.path}` === match.url)

  const onChange = path => {
    if (router) history.push(`${basename}${path}`)
    else setActiveKey(path)
  }

  return (
    <AntdTabs
      onChange={onChange}
      activeKey={router ? activeRoute.props.path : activeKey}
      {...props}
    >
      {(React.Children.toArray(children) as any)
        .filter(Boolean)
        .map(({ props: { name, path, children, ...props } }, index) => (
          <AntdTabs.TabPane key={path || String(index)} tab={name} {...props}>
            {children}
          </AntdTabs.TabPane>
        ))}
    </AntdTabs>
  )
}

export default Tabs
