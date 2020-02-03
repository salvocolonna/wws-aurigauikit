import React from 'react'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import { useState } from 'react'

const EditableCell = ({ value }) => {
  const [hover, setHover] = useState(false)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input
        onMouseOut={() => setHover(false)}
        onMouseLeave={() => setHover(false)}
        onMouseOver={() => setHover(true)}
        readOnly={!hover}
        style={{
          border: hover ? undefined : '1px solid transparent',
          background: hover ? undefined : 'transparent',
          paddingRight: 25,
          textAlign: 'right',
        }}
        defaultValue={value}
      />
      <i
        style={{ display: 'not' }}
        className="fa fa-pen"
        style={{ marginLeft: -20, color: '#2984c5' }}
      />
    </div>
  )
}

export default function() {
  const [data, setData] = useState([{ column1: 10, column2: 20 }, { column1: 30, column2: 40 }])

  const changeColumn = () => {}

  const columns = [
    {
      content: json => <EditableCell value={json.column1} onChange={changeColumn} />,
      cssStyle: { width: '50%' },
      cssClass: 'number-column',
    },
    {
      content: json => <EditableCell value={json.column2} onChange={changeColumn} />,
      cssStyle: { width: '50%' },
      cssClass: 'number-column',
    },
  ]
  return (
    <SimpleTable
      headers={[
        { content: 'Header 1', cssClass: 'number-column' },
        { content: 'Header 2', cssClass: 'number-column' },
      ]}
      columns={columns}
      data={data}
    />
  )
}
