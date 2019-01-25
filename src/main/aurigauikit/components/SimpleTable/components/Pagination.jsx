import React from "react"

class Pagination extends React.Component {
  static displayName = "Pagination"

  constructor(props) {
    super(props)
  }

  goTo(page) {
    if (this.props.page !== page) this.props.onPageChange(page)
  }

  goBack() {
    if (this.props.page > 1) this.props.onPageChange(this.props.page - 1)
  }

  goForeward() {
    if (this.props.page < this.props.totalPages) this.props.onPageChange(this.props.page + 1)
  }

  static getPages(page, count) {
    const MAX = 3,
      CENTER = (MAX - 1) / 2
    let first = page - CENTER
    let last = count - page > CENTER ? page + CENTER : count

    if (page <= CENTER) {
      first = 1
      if (last + (CENTER - page + 1) > MAX - 1) last += CENTER - page + 1
    }

    if (count - page < CENTER && count > MAX - 1) first -= CENTER - (count - page)

    if (count < MAX) {
      first = 1
      last = count
    }

    return Array.from(Array(last - first + 1).keys()).map(x => Math.round(first + x))
  }

  render() {
    return (
      this.props.totalPages > 1 && (
        <div>
          <div style={{ textAlign: "right" }}>
            <div
              className="text-info"
              style={{
                float: "left",
                textAlign: "left",
                paddingTop: 5,
                fontWeight: "bold",
                fontSize: "0.8em"
              }}>
              {this.props.totalElements && (
                <div>
                  {this.props.pageSize} of {this.props.totalElements} elements{" "}
                </div>
              )}
              <div>
                {" "}
                Page {this.props.page} of {this.props.totalPages}
              </div>
            </div>
            <ul className="pagination" style={{ paddingTop: "5px" }}>
              <li onClick={() => this.goTo(1)}>
                <div className="paginationButton out">
                  <div className="paginationText">{"«"}</div>
                </div>
              </li>
              <li onClick={() => this.goBack()}>
                <div className="paginationButton out">
                  <div className="paginationText">{"<"}</div>
                </div>
              </li>
              {Pagination.getPages(this.props.page, this.props.totalPages).map(page => (
                <li key={page} onClick={() => this.goTo(page)}>
                  <div className={"paginationButton" + (this.props.page === page ? " active" : "")}>
                    <div className="paginationText">{page}</div>
                  </div>
                </li>
              ))}
              <li onClick={() => this.goForeward()}>
                <div className="paginationButton out">
                  <div className="paginationText">{">"}</div>
                </div>
              </li>
              <li onClick={() => this.goTo(this.props.totalPages)}>
                <div className="paginationButton out">
                  <div className="paginationText">{"»"}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      )
    )
  }
}

export default Pagination
