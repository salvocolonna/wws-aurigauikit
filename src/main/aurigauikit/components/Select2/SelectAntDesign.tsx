import React, { CSSProperties } from 'react'
import { Select } from 'antd'
import { SelectValue } from 'antd/lib/select'

const Option = Select.Option

function getValue(value: number | string | Record): string {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return value.toString()
  } else {
    return JSON.stringify(value)
  }
}

interface Record {
  [key: string]: any
}

interface SelectProps {
  didSelect?: (v: SelectValue) => void
  willDisplay?: (v: any) => string
  scrollNode?: HTMLElement
  multiple?: boolean
  style: CSSProperties
  data: (number | string | Record)[]
  value?: any
  loading?: boolean
}

function SelectAnt(props: SelectProps) {
  const willDisplay = (v: any) =>  {
    if (props.willDisplay && v !== null && v !== undefined) {
      const display = props.willDisplay
      if (Array.isArray(v)) return v.map(v => display(v))
      return display(v)
    } else {
      return v
    }
  }
  console.log(props)

  const didSelect = React.useCallback(
    (value: (any)[]) => {
      console.log(value)
      let res
      if (Array.isArray(value) && typeof value[0] === 'string') {
        try {
          res = (value as string[]).map(v => JSON.parse(v))
        } catch (error) {
          res = value
        }
      } else if (typeof value === 'string') {
        try {
          res = JSON.parse(value)
        } catch (error) {
          res = value
        }
      } else {
        res = value
      }

      if (props.didSelect) {
        return props.didSelect(res)
      } else {
        return res
      }
    },
    [props]
  )

  const options = React.useMemo(() => {
    const data = props.data
    if (data && data.length) {
      const options = data.map(v => {
        let key = ''
        if (typeof v === 'string') {
          key = v
        } else if (typeof v === 'number') {
          key = v.toString()
        } else {
          key = v.key ? v.key : JSON.stringify(v)
        }
        return (
          <Option key={key} value={getValue(v)}>
            {willDisplay(v)}
          </Option>
        )
      })
      return options
    }
    return []
  }, [props.data, willDisplay])

  const value = React.useMemo(() => willDisplay(props.value), [props.value, willDisplay])

  return (
    <Select
      value={value}
      mode={props.multiple ? 'multiple' : 'default'}
      style={props.style}
      showSearch
      optionFilterProp="children"
      loading={props.loading}
      onChange={didSelect}
    >
      {options}
    </Select>
  )
}

export default SelectAnt
