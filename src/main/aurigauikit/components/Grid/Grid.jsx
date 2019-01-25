import React from "react"

export function Grid({ padding = 20, children, style, className }) {
  children = children.length >= 1 ? children : [children]
  return (
    <div
      className={`grid ${className || ""}`}
      style={{
        marginLeft: -padding / 2,
        width: `calc(100% + ${padding}px)`,
        ...style
      }}>
      {children &&
        children.map((child, i) => {
          if (child && child.type && child.type.displayName === "Grid") {
            const { children, ...props } = child.props
            return (
              <Grid
                key={i}
                {...props}
                padding={padding}
                style={{
                  ...props.style,
                  paddingLeft: padding / 2,
                  paddingRight: padding / 2
                }}>
                {children}
              </Grid>
            )
          }
          if (child && child.type && child.type.displayName === "Div") {
            const { children, ...props } = child.props
            return (
              <Div key={i} {...props} padding={padding}>
                {children}
              </Div>
            )
          } else
            return (
              <div
                key={i}
                style={{
                  paddingLeft: padding / 2,
                  paddingRight: padding / 2
                }}>
                {child}
              </div>
            )
        })}
    </div>
  )
}

export function Div({ col, padding = 20, children, style, className }) {
  return (
    <div
      className={`col-${col} ${className || ""}`}
      style={{
        paddingLeft: padding / 2,
        paddingRight: padding / 2,
        ...style
      }}>
      {children}
    </div>
  )
}
