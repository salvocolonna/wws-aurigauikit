import React, { CSSProperties } from 'react'
import { Select } from 'antd'
import { SelectValue, LabeledValue } from 'antd/lib/select'
import 'antd/dist/antd.css'
import './ant-select-override.css'

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
  willDisplay?: (v: string | number | Record) => string
  scrollNode?: HTMLElement
  multiple?: boolean
  style: CSSProperties
  data: (number | string | Record)[]
  value?: any
  loading?: boolean
}

function SelectAnt(props: SelectProps) {
  const [options, setOptions] = React.useState([] as JSX.Element[])
  // const [container, setContainer] = React.useState(document.body)
  // const container = React.useRef((null as unknown) as HTMLDivElement)

  const willDisplay = (v: string | number | Record) => {
    console.log(v)
    if (props.willDisplay && v !== null && v !== undefined) {
      return props.willDisplay(v)
    } else {
      return v
    }
  }

  const didSelect = React.useCallback(
    (value: (string | number | Record)[]) => {
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
    [props.didSelect]
  )

  // React.useEffect(() => {
  //   const container = props.scrollNode || document.getElementById('#content-dynamic')
  //   if (container) {
  //     setContainer(container)
  //   }
  // })

  function getDefaultValue(value: any) {
    if (Array.isArray(value)) {
      return value.map(v => willDisplay(v))
    } else {
      const v = willDisplay(value)
      return [v]
    }
  }

  React.useEffect(() => {
    const data = props.data
    console.log('data', data)
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
      console.log(options)
      setOptions(options)
    }
  }, [props.data])

  console.log(document.querySelector('#content-dynamic'))
  const container = document.querySelector('#content-dynamic > div') || document.body
  console.log(container)

  return (
    <>
      {container ? (
        <Select
          defaultValue={getDefaultValue(props.value)}
          mode={props.multiple ? 'multiple' : 'default'}
          style={props.style}
          showSearch
          optionFilterProp="children"
          getPopupContainer={trigger => trigger.parentElement as HTMLElement} // container as HTMLElement}
          onChange={v => didSelect(v)}
          loading={props.loading}
        >
          {options}
        </Select>
      ) : null}
    </>
  )
}

export default SelectAnt
