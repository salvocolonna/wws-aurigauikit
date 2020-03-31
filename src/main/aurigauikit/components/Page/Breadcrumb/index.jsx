import React from 'react'
import { Link } from 'react-router-dom'
import './breadcrumb.less'

export const BreadcrumbLink = ({ name, to, last, router }) => (
  <li className={last ? 'line-last' : ''}>
    {to && (router ? <Link to={to}>{name}</Link> : <a href={to}>{name}</a>)}
    {!to && <a style={{ cursor: 'pointer', textDecoration: 'none' }}>{name}</a>}
  </li>
)

export const Breadcrumb = ({ name, children, router }) => (
  <nav style={{ display: 'inline-block' }}>
    <ol className="breadcrumb">
      {children ? (
        children.length > 0 ? (
          children.map((child, index) =>
            index < children.length - 1 ? (
              <BreadcrumbLink router={router} {...child.props} key={index} />
            ) : (
              <BreadcrumbLink router={router} {...child.props} key={index} last />
            )
          )
        ) : (
          <BreadcrumbLink router={router} {...children.props} last />
        )
      ) : (
        ''
      )}
      <li className="current">{name}</li>
    </ol>
  </nav>
)
