import React from 'react'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import StatusCode from 'aurigauikit/components/StatusCode/StatusCode'

export default function() {
  return (
    <SimpleTable
      headers={['Header 0', 'Header 1', 'Header 2']}
      columns={[{ content: c => <StatusCode code={c.column0} /> }, 'column1', 'column2']}
      data={[
        {
          column0: 'OK',
          column1: 'Column 1 Row 1',
          column2: 'Column 2 Row 1',
        },
        {
          column0: 'WARN',
          column1: 'Column 1 Row 2',
          column2: 'Column 2 Row 2',
        },
        {
          column0: 'CRITICAL',
          column1: 'Column 1 Row 3',
          column2: 'Column 2 Row 3',
        },
        {
          column0: 'WAITING',
          column1: 'Column 1 Row 4',
          column2: 'Column 2 Row 4',
        },
      ]}
    />
  )
}
