import React, { useState, useMemo } from 'react'

function getScrollbarWidth() {
  let outer = document.createElement('div')
  outer.style.visibility = 'hidden'
  outer.style.width = '100px'
  outer.style.msOverflowStyle = 'scrollbar'
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = 'scroll'
  const inner = document.createElement('div')
  inner.style.width = '100%'
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  return widthNoScroll - widthWithScroll
}

const OrganizationalUnitSearch = ({ items, onRemove, canRemove }) => {
  const [search, setSearch] = useState('')
  const currentItems = useMemo(() => {
    const found = ({ description, code }) => {
      const value = description + ' (' + code + ')'
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    }
    return items.filter(found)
  }, [items, search])

  const scroll = useMemo(() => getScrollbarWidth(), [])

  return (
    <div className="OuPopover">
      <div className="OuSearchContainer">
        <div
          style={{
            backgroundColor: '#fff',
            width: items.length <= 3 ? null : `calc(100% - ${scroll}px`,
            paddingTop: 1,
            borderRadius: 4,
          }}
        >
          <label className="OuSearch">Search</label>
          <input
            className="OuSearchInput"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>
      {currentItems.length > 0 ? (
        <div className="OuSearchItems">
          {currentItems.map(item => {
            const { code, description, id, title = description + ' (' + code + ')' } = item
            return (
              <div className="OuItem" key={title + id}>
                {title}
                {(canRemove ? canRemove(item) : true) && (
                  <i className="fa fa-times feedback-icon" onClick={() => onRemove(item)} />
                )}
              </div>
            )
          })}
        </div>
      ) : (
        <div style={{ marginTop: 70 }} className="OuItem">
          No items matching {'"' + search + '"'}
        </div>
      )}
    </div>
  )
}

export default OrganizationalUnitSearch
