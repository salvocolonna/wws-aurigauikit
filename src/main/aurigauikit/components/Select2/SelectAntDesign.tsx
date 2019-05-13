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
<<<<<<< HEAD
  didSelect?: (v: SelectValue) => any
  willDisplay?: (v: string | number | Record) => string
=======
  didSelect?: (v: SelectValue) => void
  willDisplay?: (v: any) => string
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
  scrollNode?: HTMLElement
  multiple?: boolean
  style: CSSProperties
  data: (number | string | Record)[]
  value?: any
  loading?: boolean
  disabled?: boolean
}

function SelectAnt(props: SelectProps) {
<<<<<<< HEAD
  const [isOpened, setIsOpened] = React.useState(false)
  const selectRef = React.useRef((null as unknown) as Select<(number | string | Record)[]>)

  const willDisplay = (v: string | number | Record) => {
=======
  const willDisplay = (v: any) =>  {
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
    if (props.willDisplay && v !== null && v !== undefined) {
      const display = props.willDisplay
      if (Array.isArray(v)) return v.map(v => display(v))
      return display(v)
    } else {
      return v
    }
  }

<<<<<<< HEAD
  const handleChange = React.useCallback(
    (value: (string | number | Record)[]) => {
      let res = normalizeResponse(value)
      console.log('res:', res)
      if (props.didSelect && res) {
=======
  const didSelect = React.useCallback(
    (value: (any)[]) => {
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
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
        return props.didSelect(res)
      } else {
        return res
      }
    },
    [props.didSelect]
  )

<<<<<<< HEAD
  function handleSelect() {
    if (!props.multiple) {
      setIsOpened(false)
      console.log('blur')
      selectRef.current.blur()
    }
  }

=======
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
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
<<<<<<< HEAD

=======
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
      return options
    }
    return []
  }, [props.data])

<<<<<<< HEAD
  const value = React.useMemo(() => normalizeValue(props.value), [props.value])

  return (
    <Select
      ref={selectRef}
=======
  const value = React.useMemo(() => willDisplay(props.value), [props.value])

  return (
    <Select
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
      value={value}
      mode={props.multiple ? 'multiple' : 'default'}
      style={props.style}
      showSearch
      optionFilterProp="children"
<<<<<<< HEAD
      getPopupContainer={trigger => trigger.parentElement as HTMLElement}
      onChange={v => handleChange(v)}
      onSelect={() => handleSelect()}
      onFocus={() => setIsOpened(true)}
      onBlur={() => setIsOpened(false)}
      open={isOpened}
      loading={props.loading}
      disabled={props.disabled}
=======
      loading={props.loading}
      onChange={didSelect}
>>>>>>> 562352e614ccb81deaa69a4d4795688fb41bc7ea
    >
      {options}
    </Select>
  )
}

export default SelectAnt
