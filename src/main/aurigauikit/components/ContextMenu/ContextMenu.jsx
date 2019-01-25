import React from "react"
import ReactDOM from "react-dom"
import "./menu.less"

import sizeMe from "react-sizeme"

class ContextMenu extends React.Component {
  constructor(props) {
    super(props)
    this.id = guid()
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this)
    this.closeOnResize = this.closeOnResize.bind(this)
  }

  static defaultProps = { items: [] }

  componentDidMount() {
    document.body.addEventListener("click", this.closeOnBodyClick)
    window.addEventListener("resize", this.closeOnResize)
    document.getElementById("content-dynamic").addEventListener("scroll", this.closeOnResize)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.closeOnBodyClick)
    window.removeEventListener("resize", this.closeOnResize)
    document.getElementById("content-dynamic").removeEventListener("scroll", this.closeOnResize)
  }

  closeOnBodyClick(e) {
    if (!this.children.includes(e.target) && !this.children.includes(e.target.parentNode))
      this.props.onCloseRequested()
  }

  closeOnResize() {
    this.props.onCloseRequested()
  }

  onItemClick(item) {
    item.action(this.props.context)
    this.props.onCloseRequested()
  }

  render() {
    const { context, items, size, center } = this.props
    const { position } = context
    const isOpen = context !== null && position !== null
    let left = 0,
      top = 0
    if (isOpen) {
      left = center ? position.left - size.width / 2 : position.left - size.width
      top =
        (center ? position.top - size.height / 2 : position.top) -
        document.getElementById("content-dynamic").scrollTop
    }
    this.children = []
    return ReactDOM.createPortal(
      isOpen && (
        <div
          className="menu"
          id={this.id}
          style={{ display: "block", top: `${top}px`, left: `${left}px` }}>
          <ul ref={list => (this.list = list)}>
            {items.map(
              (item, index) =>
                item.title ? (
                  <li
                    ref={child => this.children.push(child)}
                    key={index}
                    className={
                      item.hidden && item.hidden(context) ? "hidden" : item.style ? item.style : ""
                    }
                    onClick={() => this.onItemClick(item)}>
                    <i
                      style={{ marginLeft: item.iconName ? "5px" : "" }}
                      className={item.iconName ? "fa fa-" + item.iconName : "fa fa-fw"}
                    />
                    {item.title}
                  </li>
                ) : (
                  <li key={index} style={{ margin: 0 }} className="separator" />
                )
            )}
          </ul>
        </div>
      ),
      document.body
    )
  }
}

export default sizeMe({
  monitorHeight: true,
  monitorPosition: true
})(ContextMenu)
