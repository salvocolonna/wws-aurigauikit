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

function convertToString(value: unknown): string {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'number') {
    return value.toString()
  } else {
    return JSON.stringify(value)
  }
}

function normalizeValue(value: any): string[] {
  if (Array.isArray(value)) {
    return value.map(v => convertToString(v))
  } else {
    return [convertToString(value)]
  }
}

function normalizeResponse(value: any): string | string[] {
  if (Array.isArray(value) && typeof value[0] === 'string') {
    try {
      return (value as string[]).map(v => JSON.parse(v))
    } catch (error) {
      return value
    }
  } else if (typeof value === 'string') {
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  } else {
    return value
  }
}

interface Record {
  key?: string | number
  [key: string]: any
}

interface SelectProps {
  didSelect?: (v: SelectValue) => any
  willDisplay?: (v: string | number | Record) => string
  scrollNode?: HTMLElement
  multiple?: boolean
  style: CSSProperties
  data: (number | string | Record)[]
  value?: any
  loading?: boolean
  disabled?: boolean
}

function SelectAnt(props: SelectProps) {
  const [isOpened, setIsOpened] = React.useState(false)
  const selectRef = React.useRef((null as unknown) as Select<(number | string | Record)[]>)

  const willDisplay = (v: string | number | Record) => {
    if (props.willDisplay && v !== null && v !== undefined) {
      const display = props.willDisplay
      if (Array.isArray(v)) return v.map(v => display(v))
      return display(v)
    } else {
      return v
    }
  }

  const handleChange = React.useCallback(
    (value: (string | number | Record)[]) => {
      let res = normalizeResponse(value)
      console.log('res:', res)
      if (props.didSelect && res) {
        return props.didSelect(res)
      } else {
        return res
      }
    },
    [props.didSelect]
  )

  function handleSelect() {
    if (!props.multiple) {
      setIsOpened(false)
      console.log('blur')
      selectRef.current.blur()
    }
  }

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
          key = v.key ? v.key.toString() : JSON.stringify(v)
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
  }, [props.data])

  const value = React.useMemo(() => normalizeValue(props.value), [props.value])

  return (
    <Select
      ref={selectRef}
      value={value}
      mode={props.multiple ? 'multiple' : 'default'}
      style={props.style}
      showSearch
      optionFilterProp="children"
      getPopupContainer={trigger => trigger.parentElement as HTMLElement}
      onChange={v => handleChange(v)}
      onSelect={() => handleSelect()}
      onFocus={() => setIsOpened(true)}
      onBlur={() => setIsOpened(false)}
      open={isOpened}
      loading={props.loading}
      disabled={props.disabled}
    >
      {options}
    </Select>
  )
}

export default SelectAnt
