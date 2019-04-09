import React from 'react'
import { FormattedNumber } from 'react-intl'

function FormattedCurrency({
  values,
  mainCurrency = 'EUR',
  separator = ', ',
  noZero,
  cleanMarkup = false,
}) {
  if (!values) return null
  if (typeof values.length === 'undefined') values = [values]
  if (noZero) values = values.filter(x => x.value !== 0)
  const maybe = v => (v.length !== 0 ? v : [{ currencyCode: mainCurrency, value: 0 }])
  return !cleanMarkup ? (
    <div>
      {maybe(values).map((element, index) => (
        <pre
          key={index}
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 'inherit',
          }}>
          <FormattedNumber value={element.value} style="currency" currency={element.currencyCode} />
          {values.length > index + 1 && separator}
        </pre>
      ))}
    </div>
  ) : (
    <span>
      {maybe(values).map((element, index) => (
        <span
          key={index}
          style={{
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 'inherit',
          }}>
          <FormattedNumber value={element.value} style="currency" currency={element.currencyCode} />
          {values.length > index + 1 && separator}
        </span>
      ))}
    </span>
  )
}

export default FormattedCurrency
