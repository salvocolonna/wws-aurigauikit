import React from 'react'

class TreeElement extends React.Component {
  getPath = () => TreeElement.getPath(this.props.index, this.props.parentPath)

  isOpen = () => {
    return TreeElement.isOpen(
      this.props.element,
      this.props.openPath,
      this.props.index,
      this.props.parentPath
    )
  }

  static getPath(index, parentPath) {
    let path = index + ''
    if (parentPath) path = parentPath + '-' + index
    return path
  }

  static isOpen(element, openPath, index, parentPath) {
    const path = TreeElement.getPath(index, parentPath)
    if (openPath === path) return true
    else if (element.children) {
      for (let childIndex = 0; childIndex < element.children.length; childIndex++) {
        const child = element.children[childIndex]
        if (TreeElement.isOpen(child, openPath, childIndex, path)) return true
      }
    }
    return false
  }

  selected = () => this.props.selectedPath === this.getPath()

  render() {
    const path = this.getPath()
    const open = this.isOpen()
    const {
      element,
      loadingPath,
      openPath,
      selectedPath,
      onClick,
      customIcon,
      getIcon,
      getVisibility,
      hidePrevious,
    } = this.props
    const hasChildren = element.node.hasChildren()
    const icon = !hasChildren ? 'fa-circle' : 'fa-folder' + (open ? '-open' : '')
    const loading = loadingPath === element.path
    const canSee = !hidePrevious || !openPath || (hidePrevious && path === openPath)
    const showChildren = open && element.children && element.children.length > 0
    return (
      <ul>
        <Li canSee={canSee} selected={this.selected()} hidePrevious={hidePrevious}>
          {canSee && !(hidePrevious && path === openPath) && (
            <Element
              loading={loading}
              icon={icon}
              customIcon={customIcon}
              onClick={() => onClick(open, path)}
              node={this.props.willDisplay(element.node, element.path)}
            />
          )}
          {showChildren &&
            element.children.map(
              (child, childIndex) =>
                (!getVisibility || getVisibility(child)) && (
                  <TreeElement
                    key={childIndex}
                    hidePrevious={!canSee && hidePrevious}
                    element={child}
                    willDisplay={this.props.willDisplay}
                    index={childIndex}
                    openPath={openPath}
                    loadingPath={loadingPath}
                    getIcon={getIcon}
                    getVisibility={getVisibility}
                    customIcon={getIcon && getIcon(child)}
                    selectedPath={selectedPath}
                    onClick={(open, childPath) => onClick(open, childPath)}
                    parentPath={path}
                  />
                )
            )}
        </Li>
      </ul>
    )
  }
}

const Li = ({ canSee, selected, children, hidePrevious }) => (
  <li
    className={'tree-folder-group' + (selected && !hidePrevious ? ' selected' : '')}
    style={{
      marginLeft: hidePrevious ? 0 : null,
      paddingLeft: hidePrevious ? 0 : null,
      border: !canSee ? 0 : null,
    }}
  >
    {children}
  </li>
)

const Element = ({ loading, icon, customIcon, onClick, node }) => (
  <div>
    {loading && <div className="loader" />}
    {!loading && customIcon ? (
      <div style={{ display: 'inline-block' }} onClick={() => onClick()}>
        {customIcon}
      </div>
    ) : (
      <span className={`fa ${icon}`} onClick={() => onClick()} />
    )}
    <div className="tree-folder-action" onClick={() => onClick()}>
      {node}
    </div>
  </div>
)

export default TreeElement
