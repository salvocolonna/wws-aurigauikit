import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import messages from "./messages"
import styles from "./card-new.css"

export default ({ onClick }) => (
  <div className={styles.button} onClick={onClick}>
    <i className={"fa fa-plus-circle " + styles.icon} />
    <div className={styles.container}>
      <div className={styles.content}>
        <Msg {...messages.button.name} />
      </div>
    </div>
  </div>
)
