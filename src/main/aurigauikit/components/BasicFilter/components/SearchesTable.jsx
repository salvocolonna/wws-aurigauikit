import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"
import { FormattedDate } from "react-intl"
import Radio from "aurigauikit/components/Radio"

const Bookmark = ({ bookmark, onClick }) => (
  <i
    onClick={onClick}
    style={{ color: bookmark ? "#2984C5" : "#aaa" }}
    className="fa fa-bookmark text-info"
  />
)

export default class extends React.Component {
  get headers() {
    return [
      "Name",
      "Created",
      { content: "Parameters", sortable: false },
      { content: <Bookmark bookmark />, cssStyle: { width: "3em" } },
      { content: "", sortable: false, cssStyle: { width: "3em" } }
    ]
  }

  get columns() {
    return [
      {
        content: data => {
          return (
            <Radio
              isChecked={this.props.search && this.props.search.searchId === data.searchId}
              onChange={() => this.props.onSearchChange(data)}>
              <span style={{ paddingLeft: 5 }}>
                {data.name || <span>Unnamed search {data.searchId}</span>}
              </span>
            </Radio>
          )
        }
      },
      {
        content: data => (
          <FormattedDate
            value={data.creationDate}
            year="numeric"
            month="2-digit"
            day="2-digit"
            hour="2-digit"
            minute="2-digit"
          />
        )
      },
      {
        content: data => {
          const parameters = this.props.willDisplayParameters(data)
          return (
            <ol className="labels-list">
              {parameters.map((param, i) => [
                <li key={i + "1"}>
                  {param.label}: {param.value}
                </li>,
                i < parameters.length - 1 && <li key={i + "2"} className="separator" />
              ])}
            </ol>
          )
        },
        cssStyle: { width: 450 }
      },
      {
        content: data => (
          <Bookmark bookmark={data.bookmark} onClick={() => this.props.onBookmark(data)} />
        )
      },
      {
        content: data => (
          <i
            className="fa fa-remove"
            style={{ color: "#DC402B", fontSize: 15 }}
            onClick={() => this.props.onRemove(data)}
          />
        )
      }
    ]
  }

  render() {
    const { metadata = {}, onSearchChange, data, onPageChange, loading, onSort } = this.props
    return (
      <SimpleTable
        caption="My searches"
        sortable
        pageable
        loading={loading}
        onRowClick={context => onSearchChange(context.currentRow)}
        pageSize={(metadata && metadata.pageSize) || 4}
        onSort={onSort}
        totalElements={metadata && metadata.totalElements}
        totalPages={metadata && metadata.totalPages}
        onPageChange={onPageChange}
        page={metadata && metadata.pageIndex}
        sort={metadata && metadata.sort}
        headers={this.headers}
        columns={this.columns}
        data={data}
      />
    )
  }
}
