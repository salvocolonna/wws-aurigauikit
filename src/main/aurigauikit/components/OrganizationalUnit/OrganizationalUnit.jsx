import React, { useMemo, useState, useRef } from "react"
import Popover, { usePopover } from "aurigauikit/components/Popover"
import "./style.css"

function getScrollbarWidth() {
  let outer = document.createElement("div")
  outer.style.visibility = "hidden"
  outer.style.width = "100px"
  outer.style.msOverflowStyle = "scrollbar"
  document.body.appendChild(outer)
  const widthNoScroll = outer.offsetWidth
  outer.style.overflow = "scroll"
  const inner = document.createElement("div")
  inner.style.width = "100%"
  outer.appendChild(inner)
  const widthWithScroll = inner.offsetWidth
  outer.parentNode.removeChild(outer)
  return widthNoScroll - widthWithScroll
}

const getData = (data = []) => () => {
  const types = Array.from(
    data.reduce((types, ou) => {
      types.add(ou.type)
      return types
    }, new Set())
  )
  return types.map(type => {
    const items = data.filter(item => item.type === type)
    return { type, items }
  })
}

const OuType = ({ name, items }) => {
  const ref = useRef()
  const popover = usePopover(ref)
  const [search, setSearch] = useState("")
  const currentItems = useMemo(() => {
    const found = ({ description, code }) => {
      const value = description + " (" + code + ")"
      return value.toLowerCase().indexOf(search.toLowerCase()) > -1
    }
    return items.filter(found)
  }, [items, search])
  return (
    <div
      className={"OuType" + (popover.position ? " OuTypeOpen" : "")}
      onClick={popover.show}
      ref={ref}>
      {items.length} {name}
      <Popover {...popover}>
        <div className="OuPopover">
          <div className="OuSearchContainer">
            <div
              style={{
                backgroundColor: "#fff",
                width: items.length <= 3 ? null : `calc(100% - ${getScrollbarWidth()}px`,
                paddingTop: 1,
                borderRadius: 4
              }}>
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
              {currentItems.map(
                ({ code, description, id, title = description + " (" + code + ")" }) => (
                  <div className="OuItem" key={title + id}>
                    {title}
                  </div>
                )
              )}
            </div>
          ) : (
            <div style={{ marginTop: 70 }} className="OuItem">
              No items matching {'"' + search + '"'}
            </div>
          )}
        </div>
      </Popover>
    </div>
  )
}

export default ({ data }) => {
  const ouTypes = useMemo(getData(data))
  return (
    <div className="Ou">
      {ouTypes.map(({ type, items }) => (
        <OuType key={type} name={type} items={items} />
      ))}
    </div>
  )
}
