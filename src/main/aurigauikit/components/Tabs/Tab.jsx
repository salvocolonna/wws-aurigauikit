import React from "react"

class Tab extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { onClick, isOpen, name } = this.props
    const style = {
      textDecoration: "none",
      cursor: "pointer",
      borderBottom: (isOpen ? 2 : 0) + "px solid #fff"
    }
    return (
      <li role="presentation" className={isOpen ? "active" : ""}>
        <a href="javascript: void(0)" style={style} onClick={onClick}>
          {name}
        </a>
      </li>
    )
  }
}

export default Tab
