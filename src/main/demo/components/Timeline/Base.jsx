import React from 'react'
import Timeline from 'aurigauikit/components/Timeline'

export default () => {
  return (
    <Timeline step={7}>
      <Timeline.Step>
        Step 1
      </Timeline.Step>
      <Timeline.Step skipped loading>Step 2</Timeline.Step>
      <Timeline.Step failed>Step 3</Timeline.Step>
      <Timeline.Step skipped>Step 4</Timeline.Step>
      <Timeline.Step skipped>Step 5</Timeline.Step>
      <Timeline.Step confirmed={false} loading>Step 6</Timeline.Step>
      <Timeline.Step confirmed={false}>Step 7</Timeline.Step>
      <Timeline.Step warn>Step 8</Timeline.Step>
    </Timeline>
  )
}

