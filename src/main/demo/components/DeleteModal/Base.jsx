import React from 'react'
import DeleteModal from 'aurigauikit/components/DeleteModal'

export default function() {
  const [show, toggle] = React.useState(false)

  return (
    <>
      <button onClick={() => toggle(true)}>Show</button>
      {show ? (
        <DeleteModal title={'title'} onConfirm={() => toggle(false)} onCancel={() => toggle(false)}>
          Content
        </DeleteModal>
      ) : null}
    </>
  )
}
