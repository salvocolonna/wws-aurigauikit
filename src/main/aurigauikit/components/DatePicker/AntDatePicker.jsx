import React, { useRef, useEffect } from 'react'
import { DatePicker } from 'antd'

function AntDatePicker({ selected, onChange, minDate, maxDate, required }) {
  const ref = useRef()

  useEffect(() => {
    const [input] = ref.current.getElementsByTagName('input')
    if (required) input.setAttribute('required', 'true')
    return () => input.removeAttribute('required')
  }, [required])

  const disabled = date => {
    if (minDate && date < minDate) return true
    if (maxDate && date > maxDate) return true
    return false
  }
  return (
    <div ref={ref}>
      <DatePicker
        value={selected}
        onChange={onChange}
        disabledDate={disabled}
        required={required}
      />
    </div>
  )
}

export default AntDatePicker
