import React from 'react'

const Header = ({ title, children }) => (
  <div className="dialog-header" style={{ width: '100%', marginTop: -15 }}>
    <span style={{ cfontSize: '1.2em' }}>{title}</span>
    {children}
  </div>
)

const Content = ({ children, style }) => (
  <div style={style} className="dialog-content">
    {children}
  </div>
)

const Footer = ({ children }) => <div className="dialog-footer">{children}</div>

export { Header, Content, Footer }
