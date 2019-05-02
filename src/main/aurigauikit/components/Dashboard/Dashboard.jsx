import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import Actions from "./Actions"
import { AddWidgetModal } from "./AddWidget"
import isFunction from "lodash/isFunction"
import Card from "aurigauikit/components/Card"
import "react-grid-layout/css/styles.css"
import "react-resizable/css/styles.css"
import styles from "./styles.css"
import { injectIntl } from "react-intl"

const MARGIN = 40

class WidgetError extends React.Component {
  state = { error: false }
  componentDidCatch(e, eInfo) {
    this.setState({ error: true })
    console.error({ e, eInfo })
  }
  refresh = () => this.setState({ error: false })
  render() {
    const { children } = this.props
    const { error } = this.state
    return error ? (
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            color: "#DC402B",
            fontWeight: "bold",
            fontSize: 18,
            marginBottom: 10
          }}>
          Error rendering data
        </div>
        <button className="btn btn-primary-outline" onClick={this.refresh}>
          Retry
        </button>
      </div>
    ) : (
      children
    )
  }
}

@injectIntl
export default class Dashboard extends React.Component {
  state = {
    breakpoint: getBreakpoint(),
    edit: false,
    add: false,
    layouts: this.props.layouts,
    saving: false
  }

  static defaultProps = {
    layouts: { lg: [], sm: [], xs: [] },
    breakpoints: { lg: 1200, sm: 768, xs: 480 },
    cols: { lg: 12, sm: 6, xs: 3 }
  }

  isAdded = name => {
    const { breakpoint, edit, layouts: currentLayouts } = this.state
    const { layouts } = this.props
    const layout = (edit ? currentLayouts : layouts)[breakpoint]
    if (!layout || layout.length === 0) return false
    return !!layout.find(({ i }) => i === name)
  }

  edit = () => {
    const { layouts } = this.props
    this.setState({ edit: true, layouts })
  }

  add = name => this.setState({ add: name })

  removeWidget = name => {
    const { layouts: currentLayouts = { lg: [], sm: [], xs: [] }, breakpoint } = this.state
    const widgets = currentLayouts[breakpoint].filter(({ i }) => i !== name)
    const layouts = { ...currentLayouts, [breakpoint]: widgets }
    this.setState({ layouts })
  }

  addWidget = ({ name, defaultSize }) => {
    console.log('adding wid')
    
    const { cols } = this.props
    const { breakpoint, layouts: l } = this.state
    const currentLayouts = l || { lg: [], sm: [], xs: [] }
    const position = findEmptySpace(
      currentLayouts[breakpoint],
      defaultSize[breakpoint] || { w: 3, h: 2 },
      cols[breakpoint]
    )
    const widget = { i: name, ...position }
    const layouts = {
      ...currentLayouts,
      [breakpoint]: [...(currentLayouts[breakpoint] || []), widget]
    }
    this.props.onSave(layouts)
    this.setState({ layouts, add: null })
  }

  undoEdit = () => {
    const { layouts } = this.props
    this.setState({ edit: false, layouts })
  }

  undoAdd = () => this.setState({ add: null })

  save = () => {
    const { layouts, breakpoint } = this.state
    const { onSave } = this.props
    this.setState({ saving: true }, async () => {
      await onSave(layouts, breakpoint)
      this.setState({ edit: false, saving: false })
    })
  }

  changeBreakpoint = breakpoint => this.setState({ breakpoint })

  changeLayouts = layouts => this.setState({ layouts })

  getUnaddedWidgets = () => {
    return React.Children.toArray(this.props.children)
      .filter(({ props: { name } }) => !this.isAdded(name))
      .map(({ props: { name, children, defaultSize = {} } }) => ({
        name,
        defaultSize,
        widget: isFunction(children) ? children(true, true) : children
      }))
  }

  getWidgets = () => {
    const { intl, messages, children } = this.props
    const { edit, add, saving } = this.state
    return React.Children.toArray(children)
      .filter(({ props: { name } }) => this.isAdded(name))
      .map(({ props: { name, loading, children, ...wrapperProps }, type: { displayName } }) => {
        const Wrapper = displayName === WidgetCard.displayName ? WidgetCard : "div"
        const title = messages ? (messages[name] ? intl.formatMessage(messages[name]) : name) : name
        return (
          <div key={name}>
            {isFunction(children) ? (
              <Wrapper title={title} edit={edit} add={add} loading={loading} {...wrapperProps}>
                <WidgetError>{children(this.state, () => this.removeWidget(name))}</WidgetError>
              </Wrapper>
            ) : (
              <React.Fragment>
                {!loading && (
                  <DeleteWidget
                    show={edit && !add && !saving}
                    name={name}
                    onClick={this.removeWidget}
                  />
                )}
                <Wrapper
                  title={title}
                  edit={edit}
                  add={add}
                  name={name}
                  loading={loading}
                  {...wrapperProps}>
                  <WidgetError>{children}</WidgetError>
                </Wrapper>
              </React.Fragment>
            )}
          </div>
        )
      })
  }

  render() {
    const { layouts, breakpoints, cols, margin = MARGIN, messages, onBuild, free } = this.props

    const { edit, layouts: currentLayouts, add, saving } = this.state

    const unAddedWidgets = this.getUnaddedWidgets()
    const widgets = this.getWidgets()
    return (
      <UnMarginDiv size={margin}>
        {!free && (
          <Actions
            canBuild={onBuild}
            onBuild={onBuild}
            canAdd={unAddedWidgets.length > 0}
            onSave={this.save}
            onUndo={this.undoEdit}
            onEdit={this.edit}
            onAdd={this.add}
            editable={edit}
            saving={saving}
          />
        )}
        {add && (
          <AddWidgetModal
            widgets={unAddedWidgets}
            messages={messages}
            onAdd={this.addWidget}
            onClose={this.undoAdd}
            onBuild={onBuild}
          />
        )}
        <ResponsiveReactGridLayout
          layouts={edit ? currentLayouts : layouts}
          breakpoints={breakpoints}
          onLayoutChange={(_, layouts) => this.changeLayouts(layouts)}
          onBreakpointChange={this.changeBreakpoint}
          margin={[margin, margin]}
          measureBeforeMount
          useCSSTransforms
          isDraggable={!saving && (free || edit)}
          isResizable={!saving && (free || edit)}
          cols={cols}>
          {widgets}
        </ResponsiveReactGridLayout>
      </UnMarginDiv>
    )
  }
}

const getBreakpoint = () =>
  window.innerWidth <= 480 ? "xs" : window.innerWidth <= 768 ? "sm" : "lg"

const collide = ({ x: x2, y: y2, w: w2, h: h2 }, { x: x1, y: y1, w: w1, h: h1 }) =>
  x1 + w1 - 1 >= x2 && x1 <= x2 + w2 - 1 && y1 + h1 - 1 >= y2 && y1 <= y2 + h2 - 1

const findEmptySpace = (layout, size, res) => {
  let y = 0
  if (!layout || layout.length === 0) return { x: 0, y, ...size }
	while (true) { // eslint-disable-line
    for (let x = 0; x < res - size.w + 1; x++) {
      let found = false
      const position = { ...size, x, y }
      for (let size of layout) if (collide(position, size)) found = true
      if (!found) return position
    }
    y++
  }
}

const DeleteWidget = ({ show, name, onClick, style }) => {
  if (!show) return null
  return (
    <i
      style={{ zIndex: 1000, ...style }}
      className={"fa fa-remove " + styles.deleteIcon}
      onClick={e => {
        e.preventDefault()
        onClick(name)
      }}
    />
  )
}

const UnMarginDiv = ({ size, children, ...props }) => {
  const offset = `calc(100% + ${size * 2}px)`
  const style = {
    marginTop: -size,
    marginLeft: -size,
    height: offset,
    width: offset
  }
  return (
    <div style={style} {...props}>
      {children}
    </div>
  )
}

const WidgetCard = ({ edit, children, add, ...props }) => (
  <Card
    fullscreen={!edit}
    fullscreenContent={
      <div
        style={{
          minHeight: 500,
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%"
        }}>
        {children}
      </div>
    }
    {...props}>
    {add === name ? (
      children
    ) : (
      <div
        style={{
          padding: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          height: "100%"
        }}>
        {children}
      </div>
    )}
  </Card>
)

const Widget = ({ name, defaultSize = {} }) => null // eslint-disable-line no-unused-vars
Widget.displayName = "Widget"
WidgetCard.displayName = "WidgetCard"
Dashboard.Widget = Widget
Dashboard.WidgetCard = WidgetCard
Dashboard.DeleteWidget = DeleteWidget
export { Widget, WidgetCard, DeleteWidget }
