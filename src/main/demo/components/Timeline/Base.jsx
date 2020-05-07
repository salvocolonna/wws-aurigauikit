import React from 'react'
import Timeline from 'aurigauikit/components/Timeline'

export default () => {
  return (
    <Timeline step={3} unselectable>
      <Timeline.Step confirmed={false} loading>
        Step 1
      </Timeline.Step>
      <Timeline.Step skipped>Step 2</Timeline.Step>
      <Timeline.Step skipped>Step 3</Timeline.Step>
      <Timeline.Step>Step 4</Timeline.Step>
    </Timeline>
  )
}
