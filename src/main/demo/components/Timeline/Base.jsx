import React from 'react'
import Timeline from 'aurigauikit/components/Timeline'

export default () => {
  return (
    <Timeline step={5} unselectable>
      <Timeline.Step failed>
        Step 1
      </Timeline.Step>
      <Timeline.Step skipped>Step 2</Timeline.Step>
      <Timeline.Step>Step 3</Timeline.Step>
      <Timeline.Step skipped>Step 4</Timeline.Step>
      <Timeline.Step skipped>Step 5</Timeline.Step>
      <Timeline.Step confirmed={false} loading>Step 6</Timeline.Step>
    </Timeline>
  )
}

