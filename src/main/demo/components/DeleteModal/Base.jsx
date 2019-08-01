import React from 'react'
import Prompt from 'aurigauikit/components/Prompt'

export default function () {
  const [showConfirmatory, toggleConfirmatory] = React.useState(false)
  const [showWarning, toggleWarning] = React.useState(false)
  const [showDestructive, toggleDestructive] = React.useState(false)

  return (
    <>
      <button style={{ marginRight: 10 }} onClick={() => toggleConfirmatory(true)}>
        Show confirmatory modal
      </button>
      <button style={{ marginRight: 10 }} onClick={() => toggleWarning(true)}>
        Show warning modal
      </button>
      <button onClick={() => toggleDestructive(true)}>Show destructive modal</button>
      {showConfirmatory ? (
        <Prompt
          type="confirmatory"
          title={'Confirmatory'}
          onConfirm={() => toggleConfirmatory(false)}
          onCancel={() => toggleConfirmatory(false)}
        >
          Content
        </Prompt>
      ) : null}
      {showWarning ? (
        <Prompt
          type="warning"
          title={'Warning'}
          onConfirm={() => toggleWarning(false)}
          onCancel={() => toggleWarning(false)}
        >
          Content
        </Prompt>
      ) : null}
      {showDestructive ? (
        <Prompt
          type="destructive"
          title={'Destructive'}
          onConfirm={() => toggleDestructive(false)}
          onCancel={() => toggleDestructive(false)}
        >
          Content
        </Prompt>
      ) : null}
    </>
  )
}
