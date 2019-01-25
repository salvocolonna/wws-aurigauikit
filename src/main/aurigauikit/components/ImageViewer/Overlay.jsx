import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import styles from "./styles.less"
import messages from "./messages"
import sizeMe from "react-sizeme"
import ContextMenu from "aurigauikit/components/ContextMenu"

export default sizeMe({
  monitorHeight: true,
  monitorPosition: true
})(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.container = React.createRef()
      this.state = { menu: { context: { position: null } } }
    }

    closeMenu = () => this.setState({ menu: { context: { position: null } } })

    openMenu = e => {
      const {
        width,
        height,
        position: { top, left }
      } = this.props.size
      const position = {
        left: this.container.current.offsetLeft + width / 2,
        top: this.container.current.offsetTop - height / 2
      }
      this.setState({ menu: { context: { position } } })
    }

    click = () => {
      const { onClick, editable } = this.props
      setTimeout(this.closeMenu, 0)
      this.closeMenu()
      if (editable && onClick) onClick()
    }

    render() {
      const { editable, width, height, bordered, circle, className, style, onRemove } = this.props
      return (
        <div
          className={["ImageViewer-overlay", className].join(" ")}
          style={{
            width,
            height,
            marginBottom: -height,
            borderRadius: circle ? "50%" : bordered ? 6 : undefined,
            ...style
          }}
          onClick={onRemove ? this.openMenu : this.click}
          ref={this.container}>
          {onRemove && (
            <div className={"ImageViewer-uploader"}>
              <i style={{ marginRight: 10 }} className="fa fa-pencil" />
              <Msg {...messages.edit} />
              <ContextMenu
                center
                items={[
                  {
                    title: "Upload",
                    action: this.click,
                    iconName: "upload"
                  },
                  {
                    title: "Remove",
                    action: () => editable && onRemove && onRemove(),
                    iconName: "remove",
                    style: "destructive"
                  }
                ]}
                onCloseRequested={this.closeMenu}
                context={this.state.menu.context}
              />
            </div>
          )}
        </div>
      )
    }
  }
)
