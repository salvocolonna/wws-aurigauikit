import React from "react"
import { FormattedMessage, injectIntl } from "react-intl"

import isEqual from "lodash.isequal"

import SimpleTable from "../../SimpleTable/SimpleTable"
import Tree from "../../Tree/Tree"
import Modal from "../../Modal"
import Radio from "aurigauikit/components/Radio"
import Spinner from "aurigauikit/components/Spinner"
import Checkbox from "aurigauikit/components/Checkbox"
import { Grid, Div } from "aurigauikit/components/Grid"
import StaticPanel from "aurigauikit/components/StaticPanel"
import GroupingTable from "./GroupingTable"
import "./organizational-unit-modal.less"
import messages from "../messages"

class OrganizationalUnitModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      tree: [],
      openPath: null,
      grouping: false,
      selectedPath: null,
      loadingPath: null,
      selectedElements: this.props.selectedElements
        ? this.props.selectedElements
        : this.props.defaultSelection
          ? [this.props.defaultSelection]
          : [],
      tablePage: 1,
      selectedOption: this.props.radioOptions ? this.props.radioOptions[0] : null,
      datasource: this.props.datasource
    }
  }

  componentWillReceiveProps(props) {
    if (
      this.props.selectedElements &&
      (!isEqual(props.selectedElements, this.props.selectedElements) ||
        !isEqual(props.selectedElements, this.state.selectedElements))
    ) {
      this.setState({ selectedElements: props.selectedElements })
    }
    if (!props.radioOptions && props.datasource !== this.state.datasource) {
      this.setState({ datasource: props.datasource })
    }
    if (this.props.show !== props.show && props.show) {
      this.setState({ tree: null }, () => this.componentDidMount())
    }
  }

  onConfirm() {
    this.props.onSelectionConfirmed(this.state.selectedElements)
  }

  onAbort() {
    if (this.props.onSelectionAborted) this.props.onSelectionAborted()
  }

  onSelect(selectedElements) {
    this.setState({ selectedElements: selectedElements })
  }

  onReset() {
    this.setState({
      selectedElements: this.props.defaultSelection ? [this.props.defaultSelection] : []
    })
  }

  onPageChange(page) {
    this.setState({ tablePage: page })
  }

  componentDidMount() {
    const { radioOptions } = this.props
    if (radioOptions) {
      this.setState(
        {
          selectedOption: radioOptions[0],
          datasource: radioOptions[0].datasource,
          loading: true
        },
        () => this.fetchInitialData()
      )
    } else this.setState({ loading: true }, () => this.fetchInitialData())
  }

  async fetchInitialData() {
    const tree = await this.state.datasource.getNodes()
    const content = await this.fetchContent({ path: "0", node: tree[0] })
    this.setState({
      tree: tree.map((element, index) => ({
        node: element,
        table: index === 0 ? content.table : null,
        path: index + "",
        children: index === 0 ? content.children : []
      })),
      openPath: "0",
      selectedPath: "0",
      loading: false,
      forceLoading: false
    })
  }

  async fetchContent({ node, path }) {
    const [nodes, table] = await Promise.all([
      this.state.datasource.getNodes(node),
      this.state.datasource.getTable(node)
    ])

    const children = nodes.map((child, index) => ({
      node: child,
      path: [path, index].join("-"),
      children: []
    }))

    const rows = table.getRowCount
      ? Array.from(Array(table.getRowCount())).map((_, i) => table.getRow(i))
      : []

    const headers = table.getHeaders ? table.getHeaders() : []
    const columns = table.getColumns ? table.getColumns() : []

    return {
      children,
      table: { rows, headers, columns }
    }
  }

  async updateTree(element) {
    const content = await this.fetchContent(element)
    const updatedTree = updateTree(this.state.tree, element.path, content)
    this.setState({ tree: updatedTree })
  }

  onTreeClick(treeState) {
    const element = search(this.state.tree, treeState.selectedPath)
    const newState = {
      openPath: treeState.openPath,
      selectedPath: treeState.selectedPath,
      loadingPath: null,
      tablePage: 1
    }
    if (element.table) this.setState(newState)
    else {
      this.setState({ loadingPath: treeState.selectedPath })
      this.updateTree(element)
        .then(() => this.setState(newState))
        .catch(e => {
          console.error("ERROR", e) //eslint-disable-line no-console
          this.setState({
            loadingPath: null,
            tablePage: 1
          })
        })
    }
  }

  getColumns(columns) {
    return columns.map(column => {
      if (column === "type")
        return {
          content: json => this.props.intl.formatMessage(messages.type[json.type])
        }
      else return column
    })
  }

  onGroup = () => this.setState({ grouping: true })
  onGroupUndo = () => this.setState({ grouping: false })
  static defaultProps = {
    dataComparator: (e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id,
    canSelect: () => true
  }
  render() {
    const element = search(this.state.tree, this.state.selectedPath)
    if (this.state.selectedPath && element && element.table) var table = element.table // eslint-disable-line no-var
    const hasSelected = !(
      this.state.selectedElements &&
      this.state.selectedElements.length === 0 + (this.props.defaultSelection ? 1 : 0)
    )
    const {
      show,
      canSelect,
      defaultSelection,
      dataComparator,
      radioOptions,
      groupable,
      intl
    } = this.props
    return (
      <Modal
        style={{ width: "70%", minHeight: !this.state.grouping && "600px" }}
        show={show}
        onClose={() => this.onAbort()}>
        <Modal.Header
          title={
            <span>
              <FormattedMessage {...messages.general.title} />
              {this.state.grouping && <span> - New Group </span>}
            </span>
          }>
          <div style={{ marginRight: -10, marginTop: -40 }}>
            {!this.state.grouping && (
              <ResetButton disabled={!hasSelected} onClick={() => this.onReset()} />
            )}
            {groupable &&
              !this.state.grouping && (
                <GroupButton disabled={!hasSelected} onClick={() => this.onGroup()} />
              )}
          </div>
        </Modal.Header>
        {!this.state.grouping && (
          <Modal.Content>
            {radioOptions && (
              <div style={{ display: "inline-block", width: "100%" }}>
                {radioOptions.map((radioOption, i) => (
                  <Radio
                    key={i}
                    style={{
                      float: "left",
                      paddingRight: 20,
                      paddingBottom: 10
                    }}
                    isChecked={isEqual(this.state.selectedOption, radioOption)}
                    onChange={checked => {
                      if (checked)
                        this.setState(
                          {
                            selectedOption: radioOption,
                            datasource: radioOption.datasource,
                            loading: true,
                            forceLoading: true
                          },
                          () => this.fetchInitialData()
                        )
                    }}>
                    {radioOption.i18nLabel ? (
                      <FormattedMessage id={radioOption.i18nLabel} />
                    ) : (
                      radioOption.message
                    )}
                  </Radio>
                ))}
              </div>
            )}
            <Body>
              {((!this.state.tree && this.state.loading) || this.state.forceLoading) && (
                <Spinner target="org-modal-body" config={{ top: "calc(22vh)" }} />
              )}
              <Left>
                <Tree
                  onElementClick={state => this.onTreeClick(state)}
                  openPath={this.state.openPath}
                  selectedPath={this.state.selectedPath}
                  willDisplay={node => `${node.getDescription()} (${node.getCode()})`}
                  loadingPath={this.state.loadingPath}
                  canView={this.state.selectedOption && this.state.selectedOption.canView}
                  data={this.state.tree}
                />
              </Left>
              <Right>
                <h3 style={{ margin: 0, marginBottom: 10, fontSize: 15 }}>
                  {table &&
                    `${intl.formatMessage(
                      messages.type[element.node.getType()]
                    )} - ${element.node.getDescription()} (${element.node.getCode()})`}
                </h3>
                {table && (
                  <SimpleTable
                    selectable
                    pageable
                    pageSize={8}
                    data={table.rows}
                    onSelectionChange={selectedElements => this.onSelect(selectedElements)}
                    selectedRows={this.state.selectedElements}
                    headers={table.headers.map(
                      header => intl.formatMessage(messages.modal.headers[header])
                    )}
                    canSelect={element =>
                      this.state.selectedOption
                        ? this.state.selectedOption.canSelect(element)
                        : canSelect(element)
                    }
                    onPageChange={page => this.onPageChange(page)}
                    page={this.state.tablePage}
                    defaultSelection={[defaultSelection]}
                    dataComparator={dataComparator}
                    columns={this.getColumns(table.columns)}
                  />
                )}
              </Right>
            </Body>
          </Modal.Content>
        )}
        {this.state.grouping && (
          <Modal.Content>
            <section style={{ marginTop: 20 }}>
              <Grid>
                <Div col="1-4">
                  <label>
                    {/*<FormattedMessage id="branch-groups-page.group-modal.insert-code" />*/}
                    Description
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    onChange={e => this.setState({ groupCode: e.target.value })}
                  />
                </Div>
                <Div col="9-12">
                  <label>
                    {/*<FormattedMessage id="branch-groups-page.group-modal.insert-desc" />*/}
                    Description
                  </label>
                  <input
                    style={{ width: "100%" }}
                    type="text"
                    onChange={e => this.setState({ groupDescription: e.target.value })}
                  />
                </Div>
              </Grid>
            </section>
            <section style={{ marginBottom: 60 }}>
              <GroupingTable
                data={this.state.selectedElements}
                columns={this.getColumns(table.columns)}
                headers={table.headers.map(header =>
                  intl.formatMessage(messages.modal.headers[header])
                )}
              />
            </section>
          </Modal.Content>
        )}
        <Modal.Footer>
          <FooterButtons>
            <Selection elements={this.state.selectedElements} />
            {!this.state.grouping && <AbortButton onClick={() => this.onAbort()} />}
            {!this.state.grouping && (
              <ConfirmButton
                disabled={!hasSelected && !this.props.defaultSelection}
                onClick={() => this.onConfirm()}
              />
            )}
            {this.state.grouping && (
              <Checkbox
                style={{ float: "left", marginLeft: 80 }}
                isChecked={this.state.notPublic}
                onChange={notPublic => this.setState({ notPublic: notPublic })}>
                <FormattedMessage {...messages.modal.general.notPublic} />
              </Checkbox>
            )}
            {this.state.grouping && <GroupUndoButton onClick={() => this.onGroupUndo()} />}
            {this.state.grouping && (
              <GroupConfirmButton
                disabled={!hasSelected && !this.props.defaultSelection}
                onClick={() => this.onConfirm()}
              />
            )}
          </FooterButtons>
        </Modal.Footer>
      </Modal>
    )
  }
}

const Body = ({ children }) => (
  <div id="org-modal-body" className="grid organizational-unit-grid">
    {children}
  </div>
)
const Left = ({ children }) => <div className="col-7-12 organizational-unit-tree"> {children} </div>
const Right = ({ children }) => (
  <div className="col-5-12 organizational-unit-table"> {children} </div>
)
const FooterButtons = ({ children }) => <div className="btn-group"> {children} </div>

const sameType = (type, ous) => ous.filter(ou => ou.type === type)
const allTypes = ous => ous.map(ou => ou.type).filter((c, i, a) => a.indexOf(c) === i)

const Selection = injectIntl(({ elements, intl }) => {
  const Panel = ({ children }) => (
    <StaticPanel
      style={{
        float: "left",
        marginLeft: 80,
        padding: 0,
        paddingRight: 10,
        paddingLeft: 10
      }}>
      {children}
    </StaticPanel>
  )
  if (elements && elements.length === 0) {
    return (
      <Panel>
        <em>No elements selected</em>
      </Panel>
    )
  }
  const types = allTypes(elements)
  return (
    <Panel>
      <em>Selection</em>{" "}
      {types.map((type, i) => {
        const sameElements = sameType(type, elements)
        return (
          <span key={i}>
            <b>{intl.formatMessage(messages.type[type])}</b>: {sameElements && sameElements.length}
            {types && i < types.length - 1 && ", "}
          </span>
        )
      })}
    </Panel>
  )
})

const GroupButton = ({ disabled, onClick }) => {
  const style = {
    float: "right",
    font: '13.3333px "Open Sans", sans-serif',
    fontWeight: "bold",
    margin: 10
  }
  return (
    <button
      disabled={disabled}
      className="btn btn-confirmatory-outline"
      style={style}
      onClick={() => onClick()}>
      <i
        className="fa fa-compress"
        style={{
          textAlign: "center",
          padding: "2px",
          lineHeight: "32px",
          cursor: "pointer"
        }}
      />
      <FormattedMessage {...messages.modal.groupSelection} />
    </button>
  )
}

const UndoButton = ({ onClick }) => {
  const style = {
    float: "right",
    font: '13.3333px "Open Sans", sans-serif',
    fontWeight: "bold",
    margin: 10
  }
  return (
    <button className="btn btn-warning-outline" style={style} onClick={() => onClick()}>
      <i
        className="fa fa-compress"
        style={{
          textAlign: "center",
          padding: "2px",
          lineHeight: "32px",
          cursor: "pointer"
        }}
      />
      {/*<FormattedMessage id="organizational-unit-modal.group-selection" />*/}
      Add more
    </button>
  )
}

const ResetButton = ({ disabled, onClick }) => {
  const style = {
    float: "right",
    font: '13.3333px "Open Sans", sans-serif',
    fontWeight: "bold",
    margin: 10
  }
  return (
    <button
      disabled={disabled}
      className="btn btn-primary-outline"
      style={style}
      onClick={() => onClick()}>
      <FormattedMessage {...messages.modal.general.reset} />
    </button>
  )
}

const AbortButton = ({ onClick }) => (
  <button
    className="btn btn-warning-outline"
    style={{ marginRight: "20px" }}
    onClick={() => onClick()}>
    <FormattedMessage {...messages.modal.general.cancel} />
  </button>
)

const ConfirmButton = ({ disabled, onClick }) => (
  <button disabled={disabled} className="btn btn-confirmatory" onClick={() => onClick()}>
    <FormattedMessage {...messages.modal.general.select} />
  </button>
)

const GroupUndoButton = ({ onClick }) => (
  <button
    className="btn btn-warning-outline"
    style={{ marginRight: "20px" }}
    onClick={() => onClick()}>
    {/*<FormattedMessage id="organizational-unit-modal.cancel" />*/}
    Undo
  </button>
)

const GroupConfirmButton = ({ disabled, onClick }) => (
  <button disabled={disabled} className="btn btn-confirmatory" onClick={() => onClick()}>
    {/*<FormattedMessage id="organizational-unit-modal.select" />*/}
    Save group
  </button>
)

const search = (tree, path) => {
  if (!tree) return null
  return tree.reduce((found, next) => {
    const same = next.path === path
    const last = !next.children
    return same ? next : last ? found : search(next.children, path) || found
  }, null)
}

const updateTree = (tree, path, content) => {
  return tree.map(element => {
    if (path === element.path) {
      element.children = content.children
      element.table = content.table
    } else if (element.children) updateTree(element.children, path, content)
    return element
  })
}

export default injectIntl(OrganizationalUnitModal)
