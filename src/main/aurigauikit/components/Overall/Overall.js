import React from "react"
import styles from "./style.less"

export default ({ children }) => (
  <div style={{ padding: 10 }}>
    <div className={styles.overall} style={{ padding: 20, paddingLeft: 5 }}>
      {children}
    </div>
  </div>
)
