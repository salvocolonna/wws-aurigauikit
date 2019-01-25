import React from "react"
import styles from "./style.less"

export default ({ children, style }) => (
  <button className={styles.floatingButton} style={style}>
    <span>{children}</span>
  </button>
)
