import React from "react"
import TreeElement from "./TreeElement"
import Select2 from "aurigauikit/components/Select2"
import "./tree.less"

class Tree extends React.Component {
  traverse = (tree, selectedPath) => {
    if (!selectedPath) return ""
    const paths = selectedPath.split("-")
    if (paths.length > 1) {
      return this.traverse(tree[paths[0]].children, paths.slice(1, paths.length).join("-"))
    }
    return tree[paths[0]]
  }

  onElementClick(open, path) {
    if (!this.props.loadingPath) {
      let newPath = path
      if (open) {
        if (this.props.selectedPath === path) newPath = path.substring(0, path.lastIndexOf("-"))
        else newPath = this.props.openPath
      }
      if (this.props.onElementClick)
        this.props.onElementClick({ openPath: newPath, selectedPath: path })
    }
  }

  getSelects(data = this.props.data) {
    const selector = (
      <Select2
        style={{ width: "100%" }}
        data={data}
        value={data[0]}
        willDisplay={child => child.node && child.node.name}
      />
    )
    return selector
  }

  render() {
    const { data, getIcon, getVisibility, hidePrevious, style } = this.props
    return (
      <div className="tree" style={style}>
        {data &&
          data.map(
            (element, index) =>
              (!getVisibility || getVisibility(element)) && (
                <TreeElement
                  key={index}
                  hidePrevious={hidePrevious}
                  element={element}
                  index={index}
                  willDisplay={node => this.props.willDisplay(node)}
                  openPath={this.props.openPath}
                  selectedPath={this.props.selectedPath}
                  customIcon={getIcon && getIcon(element)}
                  getIcon={getIcon}
                  getVisibility={getVisibility}
                  loadingPath={this.props.loadingPath || ""}
                  onClick={(open, path) => this.onElementClick(open, path)}
                />
              )
          )}
      </div>
    )
  }
}

export default Tree
