import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import SimpleTable from '../../SimpleTable/SimpleTable'
import Tree from '../../Tree/Tree'
import Modal from '../../Modal'
import Radio from 'aurigauikit/components/Radio'
import Spinner from 'aurigauikit/components/Spinner'
import messages from '../messages'
import OrganizationalUnit from '../OrganizationalUnit'
import { isArray } from 'util'
import './organizational-unit-modal.less'

const dataComparator = (e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id
const isEqual = (a, b) => a.reduce((equal, a, i) => equal && dataComparator(a, b[i]), true)

const useOuTree = (datasource, intl) => {
  const currentRequest = useRef(null)
  const [loading, setLoading] = useState(false)
  const [page, onPageChange] = useState(1)

  const [tree, setTree] = useState({
    data: [],
    openPath: null,
    selectedPath: null,
    loadingPath: null,
  })

  const element = useMemo(() => search(tree.data, tree.selectedPath), [
    tree.data,
    tree.selectedPath,
  ])

  const table = useMemo(() => {
    if (!element || !element.table) {
      return {
        caption: null,
        headers: [],
        columns: [],
        data: [],
        page,
        onPageChange,
      }
    }
    const caption = `${intl.formatMessage(
      messages.type[element.node.getType()]
    )} - ${element.node.getDescription()} (${element.node.getCode()})`

    const headers = element.table.headers.map(header =>
      intl.formatMessage(messages.modal.headers[header])
    )

    const columns = element.table.columns.map(column => {
      if (column === 'type')
        return { content: json => intl.formatMessage(messages.type[json.type]) }
      else return column
    })
    return { caption, headers, columns, data: element.table.rows, page, onPageChange }
  }, [element])

  async function fetchContent({ node, path }) {
    const [nodes, table] = await Promise.all([datasource.getNodes(node), datasource.getTable(node)])
    const children = nodes.map((child, index) => ({
      node: child,
      path: [path, index].join('-'),
      children: [],
    }))
    const rows = table.getRowCount
      ? Array.from(Array(table.getRowCount())).map((_, i) => table.getRow(i))
      : []
    const headers = table.getHeaders ? table.getHeaders() : []
    const columns = table.getColumns ? table.getColumns() : []
    return { children, table: { rows, headers, columns } }
  }

  async function update(treeState) {
    const element = search(tree.data, treeState.selectedPath)
    const newTree = {
      openPath: treeState.openPath,
      selectedPath: treeState.selectedPath,
      loadingPath: null,
    }
    if (element.table && element.table.rows.length > 0) setTree(tree => ({ ...tree, ...newTree }))
    else {
      const request = (currentRequest.current = new Date().valueOf())
      setTree(tree => ({ ...tree, loadingPath: treeState.selectedPath }))
      const content = await fetchContent(element)
      const updatedTree = updateTree(tree.data, element.path, content)
      if (request === currentRequest.current) {
        setTree(tree => ({ ...tree, ...newTree, data: updatedTree }))
        table.onPageChange(1)
      }
    }
  }

  async function fetch() {
    const request = (currentRequest.current = new Date().valueOf())
    setLoading(true)
    const tree = await datasource.getNodes()
    const content = await fetchContent({ path: '0', node: tree[0] })
    if (request === currentRequest.current) {
      setTree(state => ({
        ...state,
        data: tree.map((element, index) => ({
          node: element,
          table: index === 0 ? content.table : null,
          path: index + '',
          children: index === 0 ? content.children : [],
        })),
      }))
      table.onPageChange(1)
      setLoading(false)
    }
  }

  return { ...tree, element, loading, update, fetch, table }
}

const OuModal = ({
  selectedElements,
  defaultSelection,
  datasource,
  onAbort,
  onSelect,
  onRemove,
  canSelect,
  canView,
  canRemove,
  radioOptions,
  intl,
  onSelectionConfirmed = () => {},
  onSelectionAborted = () => {},
}) => {
  const intitialData = useMemo(() => selectedElements, [])
  const touched = useMemo(() => !isEqual(selectedElements, intitialData), [selectedElements])
  const [option, setOption] = useState(null)
  const currentDatasource = option ? option.datasource : datasource

  const tree = useOuTree(currentDatasource, intl)

  useEffect(() => {
    if (radioOptions && !option) {
      const [firstOption] = radioOptions
      setOption(firstOption)
    } else tree.fetch()
  }, [option])

  useEffect(() => {
    if (defaultSelection) {
      if (!selectedElements.find(e => dataComparator(e, defaultSelection)))
        onSelect([defaultSelection, ...selectedElements])
    }
  }, [])

  const canReset = useMemo(() => {
    if (defaultSelection) return selectedElements.length > 1
    return selectedElements.length > 0
  })

  return (
    <Modal
      show
      style={{ width: '70%' }}
      onClose={() => {
        onSelect(intitialData)
        onAbort()
      }}>
      <Modal.Header
        title={
          <span>
            <FormattedMessage {...messages.general.title} />
          </span>
        }>
        <div style={{ marginRight: -10, marginTop: -40 }}>
          <ResetButton disabled={!canReset} onClick={() => onSelect([defaultSelection])} />
        </div>
      </Modal.Header>
      <Modal.Content>
        {radioOptions && option && (
          <DatasourceSelector
            datasources={radioOptions}
            datasource={currentDatasource}
            onChange={setOption}
          />
        )}
        <div id="org-modal-body" className="grid organizational-unit-grid">
          {tree.loading && <Spinner target="org-modal-body" config={{ top: '220px' }} />}
          <div className="col-7-12 organizational-unit-tree">
            <Tree
              onElementClick={tree.update}
              openPath={tree.openPath}
              selectedPath={tree.selectedPath}
              willDisplay={node => `${node.getDescription()} (${node.getCode()})`}
              loadingPath={tree.loadingPath}
              canView={(option ? option.canView : canView) || canView}
              data={tree.data}
            />
          </div>
          <div className="col-5-12 organizational-unit-table">
            {tree.element && tree.element.table && (
              <SimpleTable
                selectable
                pageable
                pageSize={8}
                canSelect={(option ? option.canSelect : canSelect) || canSelect}
                onSelectionChange={onSelect}
                selectedRows={selectedElements}
                dataComparator={dataComparator}
                {...tree.table}
              />
            )}
          </div>
        </div>
        <div style={{ float: 'left', marginTop: 20 }}>
          <OrganizationalUnit data={selectedElements} onRemove={onRemove} canRemove={canRemove} />
        </div>
        <div style={{ float: 'right', marginTop: 20 }}>
          <AbortButton
            onClick={() => {
              onSelect(intitialData)
              onAbort()
              onSelectionAborted()
            }}
          />
          <ConfirmButton
            disabled={!touched}
            onClick={() => {
              onAbort()
              onSelectionConfirmed(selectedElements)
            }}
          />
        </div>
      </Modal.Content>
      <Modal.Footer />
    </Modal>
  )
}

const DatasourceSelector = ({ datasource, datasources, onChange }) => (
  <div style={{ display: 'inline-block', width: '100%' }}>
    {datasources.map((option, i) => (
      <Radio
        key={i}
        style={{ float: 'left', paddingRight: 20, paddingBottom: 10 }}
        isChecked={datasource === option.datasource}
        onChange={checked => checked && onChange(option)}>
        {option.i18nLabel ? <FormattedMessage id={option.i18nLabel} /> : option.label}
      </Radio>
    ))}
  </div>
)

const ResetButton = ({ disabled, onClick }) => {
  const style = {
    float: 'right',
    font: '13.3333px "Open Sans", sans-serif',
    fontWeight: 'bold',
    margin: 10,
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
    style={{ marginRight: '20px' }}
    onClick={() => onClick()}>
    <FormattedMessage {...messages.modal.general.cancel} />
  </button>
)

const ConfirmButton = ({ disabled, onClick }) => (
  <button disabled={disabled} className="btn btn-confirmatory" onClick={() => onClick()}>
    <FormattedMessage {...messages.modal.general.select} />
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

export default injectIntl(OuModal)
