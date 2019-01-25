import React from "react"
import "./styles.less"
import emptyImage from "./empty-image.png"

import Image from "./Image"
import Overlay from "./Overlay"

export default class extends React.Component {
  state = { size: { width: 0, height: 0 } }

  sizeUpdated = size => this.setState({ size })

  imageUploaded = file => {
    const { onUpload } = this.props
    if (onUpload) {
      const src = URL.createObjectURL(file)
      onUpload(src)
    }
  }

  render() {
    const { size } = this.state
    const {
      editable,
      imageStyle,
      className,
      imageClassName,
      style,
      bordered,
      circle,
      canRemove,
      onRemove
    } = this.props
    const classNames = ["ImageViewer", className]
    return (
      <div style={style} className={classNames.join(" ")}>
        <Image
          onSize={this.sizeUpdated}
          onResize={this.sizeUpdated}
          style={imageStyle}
          currentSize={this.state.size}
          className={imageClassName}
          src={this.props.src || emptyImage}
          bordered={bordered}
          circle={circle}
        />
        {editable && (
          <Overlay
            canRemove={canRemove}
            onRemove={onRemove}
            editable={editable}
            width={size.width}
            height={size.height}
            bordered={bordered}
            style={imageStyle}
            className={imageClassName}
            onClick={() => this.uploader && this.uploader.click()}
            circle={circle}
          />
        )}
        {editable && (
          <input
            ref={uploader => (this.uploader = uploader)}
            onChange={e => this.imageUploaded(e.target.files[0])}
            type="file"
            style={{ display: "none" }}
          />
        )}
      </div>
    )
  }
}
