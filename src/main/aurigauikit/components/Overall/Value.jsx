import React from "react"
import styles from "./style.less"

export default ({ children, style }) => (
  <div style={style} className={styles.value}>
    {children}
  </div>
)
