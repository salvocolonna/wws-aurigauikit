import React from "react"
import ReactTable, {
  Column,
  Header,
  Row,
  Caption
} from "aurigauikit/components/SimpleTable/ReactTable"
import SimpleTable from "aurigauikit/components/SimpleTable/SimpleReactTable"
import Pagination from "aurigauikit/components/SimpleTable/components/Pagination"
import isFunction from "lodash/isFunction"
import StaticPanel from "aurigauikit/components/StaticPanel"

const people = [
  { id: 1, name: "Anna", age: 35 },
  { id: 2, name: "Jimmy", age: 23 },
  { id: 3, name: "Johnny", age: 25 },
  { id: 4, name: "Helen", age: 26 }
]

const Static = () => (
  <ReactTable>
    <Caption>Simple</Caption>
    <Header>Name</Header>
    <Header>Age</Header>
    <Row>
      <Column>Anna</Column>
      <Column>35</Column>
    </Row>
    <Row>
      <Column>Jimmy</Column>
      <Column>23</Column>
    </Row>
  </ReactTable>
)

const StaticPagingAndSorting = () => (
  <ReactTable sortable>
    <Header>Name</Header>
    <Header>Age</Header>
    <Row>
      <Column>Anna</Column>
      <Column>35</Column>
    </Row>
    <Row>
      <Column>Jimmy</Column>
      <Column>23</Column>
    </Row>
    <Row>
      <Column>Helen</Column>
      <Column>25</Column>
    </Row>
    <Row>
      <Column>Johnny</Column>
      <Column>26</Column>
    </Row>
    <Pagination pageSize={2} />
  </ReactTable>
)

const Example = () => (
  <ReactTable sortable>
    <Header>Name</Header>
    <Header>Age</Header>
    {people.map(({ id, name, age }) => (
      <Row key={id}>
        <Column>{name}</Column>
        <Column>{age}</Column>
      </Row>
    ))}
    <Pagination pageSize={2} />
  </ReactTable>
)

const ExampleRenderProps = () => (
  <ReactTable sortable data={people}>
    <Header>Name</Header>
    <Header>Age</Header>
    {({ id, name, age }) => (
      <Row key={id}>
        <Column>{name}</Column>
        <Column>{age}</Column>
      </Row>
    )}
    <Pagination pageSize={2} />
  </ReactTable>
)

export default () => {
  return (
    <div style={{ width: "100%" }}>
      <SimpleTable
        headers={[
          {
            content: <b> Header 1 </b>,
            cssClass: "label-outline-confirmatory"
          },
          {
            content: <i> Header 2 </i>,
            cssStyle: { backgroundColor: "#f1f7fc", color: "#1e6292" }
          },
          {
            content: <i> Virtual header </i>,
            cssStyle: { backgroundColor: "#81878c", color: "#fef2f2" }
          }
        ]}
        columns={[
          {
            content: json => <b> {json.column1} </b>,
            cssClass: "label-outline-confirmatory"
          },
          {
            content: json => <i> {json.column2} </i>,
            cssStyle: { backgroundColor: "#f1f7fc", color: "#1e6292" }
          },
          {
            content: () => <StaticPanel> Virtual column </StaticPanel>,
            cssStyle: { backgroundColor: "#81878c", color: "#fef2f2" }
          }
        ]}
        data={[{ column1: "Column 1 Row 1", column2: "Column 2 Row 1" }]}
      />
      <br />
      <br />
      <br />
      <br />
      <Static />
      <br />
      <br />
      <StaticPagingAndSorting />
      <br />
      <br />
      <Example />
      <br />
      <br />
      <ExampleRenderProps />
    </div>
  )
}
