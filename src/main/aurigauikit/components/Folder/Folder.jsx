import React from "react"
import Card from "aurigauikit/components/Card"

class Folder extends React.Component {
  constructor(props) {
    super(props)
    this.state = { openActions: false }
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this)
  }

  componentDidMount() {
    document.body.addEventListener("click", this.closeOnBodyClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.closeOnBodyClick)
  }

  closeOnBodyClick = e =>
    !this.folder.contains(e.target) &&
    this.setState({
      openActions: false
    })

  cardClicked = () => this.setState({ openActions: true })

  render() {
    const { children, style, title, action, actions, clickable = true } = this.props
    return (
      <Card
        fullscreen={false}
        title={title}
        className={`react-folder ${clickable ? "clickable" : ""}`}
        style={style}
        onClick={e => clickable && (action ? action() : this.cardClicked(e))}>
        <div ref={folder => (this.folder = folder)} className="react-folder-content">
          {this.state.openActions && <FolderActions actions={actions} />}
          <i className="fa fa-external-link card-icon-top-bottom" />
          <div style={{ padding: 15 }}>{children}</div>
        </div>
      </Card>
    )
  }
}

const FolderActions = ({ actions }) => (
  <div className="react-folder-actions">
    <ul>
      {actions.map((action, i) => (
        <Action key={i} title={action.title} onClick={() => action.action()} />
      ))}
    </ul>
  </div>
)

const Action = ({ title, onClick }) => (
  <li onClick={() => onClick()}>
    <i className="fa fa-fw" />
    <span>{title}</span>
  </li>
)

export default Folder
