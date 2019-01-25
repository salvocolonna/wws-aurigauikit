import React from "react"
import PivotTableUI from "react-pivottable/PivotTableUI"
import TableRenderers from "react-pivottable/TableRenderers"
import Plot from "react-plotly.js"
import createPlotlyRenderers from "react-pivottable/PlotlyRenderers"
import ReactDOM from "react-dom"
import sizeMe from "react-sizeme"
import "react-pivottable/pivottable.css"
import "./pivot-table.less"
window.Plot = Plot

window.plots = []

const unmountedOnSizeChange = Component => {
  const TOLLERANCE = 0
  @sizeMe({ monitorHeight: true })
  class UnmountedOnSizeChangeComponent extends React.Component {
    state = { key: Math.random() }
    sizeChanged = props => {
      const { width, height } = this.props.size
      return (
        width &&
        height &&
        (width < props.size.width - TOLLERANCE ||
          width > props.size.width + TOLLERANCE ||
          height < props.size.height - TOLLERANCE ||
          height > props.size.height + TOLLERANCE)
      )
    }
    componentDidUpdate(props) {
      const drp = document.getElementsByClassName("pvtDropdownCurrentOpen")
      if (drp.length === 0 && this.sizeChanged(props)) this.setState({ key: Math.random() })
    }
    render() {
      return <Component key={this.state.key} {...this.props} />
    }
  }
  return UnmountedOnSizeChangeComponent
}

const FixedPlot = props => (
  <Plot
    {...props}
    useResizeHandler
    layout={{ autosize: true }}
    style={{ width: "100%", height: "100%" }}
  />
)

const PlotlyRenderers = createPlotlyRenderers(FixedPlot)

const renderers = { ...TableRenderers, ...PlotlyRenderers }

const removeInstanceFields = pivot => {
  if (pivot.aggregators) delete pivot.aggregators
  if (pivot.renderers) delete pivot.renderers
  if (pivot.sorters) delete pivot.sorters
  if (pivot.onChange) delete pivot.onChange
  return pivot
}

class Pivot extends React.Component {
  constructor(props) {
    super(props)
    this.id = guid()
    this.pivotChanged = this.pivotChanged.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeDraggablesOnBodyClick)
    if (!this.props.editable) {
      const node = ReactDOM.findDOMNode(this.pivot)
      node.classList.add("view-only")
    }
  }

  componentDidUpdate(props) {
    if (props.editable !== this.props.editable) {
      const node = ReactDOM.findDOMNode(this.pivot)
      if (!props.editable) {
        if (!node.classList.contains("view-only")) node.classList.add("view-only")
      } else {
        if (node.classList.contains("view-only")) node.classList.remove("view-only")
      }
    }
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.closeDraggablesOnBodyClick)
  }

  closeDraggablesOnBodyClick = e => {
    const node = ReactDOM.findDOMNode(this.pivot)
    const filterBox = node.getElementsByClassName("pvtFilterBox")[0]
    if (filterBox && !filterBox.contains(e.target)) {
      const closeBox = node.getElementsByClassName("pvtCloseX")[0]
      if (closeBox) closeBox.click()
    }
  }

  pivotChanged(pivot) {
    const openDropdown = document.getElementsByClassName("pvtDropdownCurrentOpen")[0]
    if (openDropdown) {
      const icon = openDropdown.getElementsByClassName("pvtDropdownIcon")[0]
      if (icon) icon.click()
    }
    if (this.props.onChange) this.props.onChange(removeInstanceFields(pivot))
  }

  render() {
    const { pivot } = this.props
    return (
      <PivotTableUI
        onChange={this.pivotChanged}
        ref={pivot => (this.pivot = pivot)}
        renderers={renderers}
        {...pivot}
      />
    )
  }
}

@unmountedOnSizeChange
export default class extends React.Component {
  render() {
    return (
      <div style={{ width: "100%" }}>
        <Pivot {...this.props} />
      </div>
    )
  }
}
