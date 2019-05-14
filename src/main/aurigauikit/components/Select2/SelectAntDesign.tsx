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
  options?: { tags?: boolean }
  style: CSSProperties
  data: (number | string | Record)[]
  value?: any
  loading?: boolean
  disabled?: boolean
}

function SelectAnt(props: SelectProps) {
  const [isOpened, setIsOpened] = React.useState(false)
  const selectRef = React.useRef((null as unknown) as Select<(number | string | Record)[]>)

  const handleChange = React.useCallback(
    (value: (string | number | Record)[]) => {
      let res = normalizeResponse(value)
      if (props.didSelect && res) {
        return props.didSelect(res)
      } else {
        return res
      }
    },
    [props]
  )

  React.useEffect(() => {
    if (isOpened === false) {
      selectRef.current.blur()
    }
  }, [isOpened])

  function handleSelect() {
    if (!props.multiple) {
      setIsOpened(false)
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
            {props.willDisplay ? props.willDisplay(v) : v}
          </Option>
        )
      })
      return options
    }
    return []
  }, [props])

  const value = React.useMemo(() => {
    const display = (v: any) => (props.willDisplay ? props.willDisplay(v) : v)
    if (Array.isArray(props.value)) {
      return props.value.map(v => display(v))
    } else {
      return [display(props.value)]
    }
  }, [props])

  const mode = React.useMemo(() => {
    if (props.options && props.options.tags) return 'tags'
    if (props.multiple) return 'multiple'
    return 'default'
  }, [props.options, props.multiple])

  return (
    <Select
      ref={selectRef}
      value={value}
      mode={mode}
      style={props.style}
      showSearch
      optionFilterProp="children"
      getPopupContainer={trigger => trigger.parentElement as HTMLElement}
      onChange={handleChange}
      onSelect={handleSelect}
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
