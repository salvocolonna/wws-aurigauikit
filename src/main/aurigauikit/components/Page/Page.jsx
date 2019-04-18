import React from "react"
import "./breadcrumb.less"

function Breadcrumb({ name, children }) {
  return (
    <nav style={{ display: "inline-block" }}>
      <ol className="breadcrumb">
        {children ? (
          children.length > 0 ? (
            children.map((child, index) =>
              index < children.length - 1 ? (
                <BreadcrumbLink {...child.props} key={index} />
              ) : (
                <BreadcrumbLink {...child.props} key={index} last />
              )
            )
          ) : (
            <BreadcrumbLink {...children.props} last />
          )
        ) : (
          ""
        )}
        <li className="current">{name}</li>
      </ol>
    </nav>
  )
}

function BreadcrumbLink({ name, to, last }) {
  return (
    <li className={last ? "line-last" : ""}>
      {to && <a href={to}>{name}</a>}
      {!to && <a style={{ cursor: "default", textDecoration: "none" }}>{name}</a>}
    </li>
  )
}

function PageHeader({ children }) {
  return <section> {children} </section>
}

function PageMain({ children }) {
  return <section> {children} </section>
}

function PageFooter({ children }) {
  return <section> {children} </section>
}

function PageActions({ children }) {
  return <div style={{ marginBottom: "10px", float: "right" }}>{children}</div>
}

function ButtonsPanel({ children }) {
  return <div style={{ textAlign: "right", marginBottom: "-30px" }}> {children} </div>
}

export { PageActions, PageHeader, PageFooter, BreadcrumbLink, Breadcrumb, PageMain, ButtonsPanel }
