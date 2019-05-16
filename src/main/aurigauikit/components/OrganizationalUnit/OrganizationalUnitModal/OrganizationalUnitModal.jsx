import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import SimpleTable from '../../SimpleTable/SimpleTable'
import Modal from '../../Modal'
import Radio from 'aurigauikit/components/Radio'
import Spinner from 'aurigauikit/components/Spinner'
import messages from '../messages'
import OrganizationalUnit from '../OrganizationalUnit'
import './organizational-unit-modal.less'
import Tree from 'aurigauikit/components/Tree'

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
    if (!element || !element.table)
      return { caption: null, headers: [], columns: [], data: [], page, onPageChange }
    const table = parseTable(element, intl)
    return { ...table, page, onPageChange }
  }, [element, intl, page])

  async function update({ openPath, selectedPath }) {
    const element = search(tree.data, selectedPath)
    const newTree = { openPath, selectedPath, loadingPath: null }
    if (element.table && element.table.rows.length > 0) setTree(tree => ({ ...tree, ...newTree }))
    else {
      setTree(tree => ({ ...tree, loadingPath: selectedPath }))
      const content = await fetchContent(datasource, element)
      const updatedTree = updateTree(tree.data, element.path, content)
      setTree(tree => ({ ...tree, ...newTree, data: updatedTree }))
      table.onPageChange(1)
    }
  }

  async function fetch() {
    const request = (currentRequest.current = new Date().valueOf())
    setLoading(true)
    const data = await fetchRoot(datasource)
    if (request === currentRequest.current) {
      setTree(state => ({ ...state, data }))
      table.onPageChange(1)
      setLoading(false)
    }
  }

  return { ...tree, element, loading, update, fetch, table, setTree }
}

const OuModal = ({
  show,
  selectedElements,
  defaultSelection,
  datasource,
  radioOptions,
  intl,
  canSelect = () => true,
  canView = () => true,
  canRemove = () => true,
  onClose = () => {},
  onSelect = () => {},
  onRemove = () => {},
  onSelectionConfirmed = () => {},
  onSelectionAborted = () => {},
}) => {
  const intitialData = useRef(selectedElements)
  const touched = useMemo(() => !isEqual(selectedElements, intitialData.current), [
    selectedElements,
  ])
  const [option, setOption] = useState(null)
  const currentDatasource = option ? option.datasource : datasource

  const tree = useOuTree(currentDatasource, intl)

  useEffect(() => {
    if (show) intitialData.current = selectedElements
  }, [show]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (radioOptions && !option) {
      const [firstOption] = radioOptions
      setOption(firstOption)
    } else tree.fetch()
  }, [option]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (defaultSelection && selectedElements.length === 0) onSelect([defaultSelection])
  }, [defaultSelection, selectedElements, onSelect])

  const canReset = useMemo(() => {
    if (defaultSelection && selectedElements.find(a => dataComparator(a, defaultSelection)))
      return selectedElements.length > 1
    return selectedElements.length > 0
  }, [defaultSelection, selectedElements])

  const selectElements = elements => {
    const newElements = elements.filter(n => !selectedElements.find(e => dataComparator(e, n)))
    const getParents = path => {
      if (path === '0') return []
      const paths = (path || '0').split('-')
      paths.pop()
      const parentPath = paths.join('-')
      const parent = elements.find(e => (e.path || '0') === parentPath)
      return [...getParents(parentPath), parent]
    }
    const parents = newElements
      .reduce((parents, e) => [...parents, ...getParents(e.path)], [])
      .filter(Boolean)
    const children = newElements
      .reduce((children, e) => {
        return [
          ...children,
          ...elements.filter(n => n.path !== e.path && (n.path || '0').startsWith(e.path || '0')),
        ]
      }, [])
      .filter(Boolean)
    const filtered = elements.filter(e => {
      return !(parents.find(a => dataComparator(a, e)) || children.find(a => dataComparator(a, e)))
    })
    onSelect(filtered.length === 0 ? (defaultSelection ? [defaultSelection] : []) : filtered)
  }

  const changeOption = option => {
    tree.setTree(tree => ({ ...tree, openPath: null, selectedPath: null }))
    setOption(option)
  }

  const close = () => {
    onSelect(intitialData.current)
    onClose()
    onSelectionAborted()
  }

  const abort = () => {
    onSelect(intitialData.current)
    onClose()
    onSelectionAborted()
  }

  const confirm = () => {
    onClose()
    onSelectionConfirmed(selectedElements)
  }

  const title = (
    <span>
      <FormattedMessage {...messages.general.title} />
    </span>
  )

  return (
    <Modal show={show} style={{ width: '70%' }} onClose={close}>
      <Modal.Header title={title}>
        <div style={{ marginRight: -10, marginTop: -40 }}>
          <ResetButton
            disabled={!canReset}
            onClick={() => onSelect(defaultSelection ? [defaultSelection] : [])}
          />
        </div>
      </Modal.Header>
      <Modal.Content>
        {radioOptions && option && (
          <DatasourceSelector
            datasources={radioOptions}
            datasource={currentDatasource}
            onChange={changeOption}
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
                onSelectionChange={selectElements}
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
          <AbortButton onClick={abort} />
          <ConfirmButton disabled={!touched} onClick={confirm} />
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
        onChange={checked => checked && onChange(option)}
      >
        {option.i18nLabel ? <FormattedMessage id={option.i18nLabel} /> : option.label}
      </Radio>
    ))}
  </div>
)

const ResetButton = ({ disabled, onClick }) => {
  const style = {
    float: 'right',
    fontWeight: 'bold',
    margin: 10,
  }
  return (
    <button
      disabled={disabled}
      className="btn btn-primary-outline"
      style={style}
      onClick={() => onClick()}
    >
      <FormattedMessage {...messages.modal.general.reset} />
    </button>
  )
}

const AbortButton = ({ onClick }) => (
  <button
    className="btn btn-warning-outline"
    style={{ marginRight: '20px' }}
    onClick={() => onClick()}
  >
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

const parseTable = (element, intl) => {
  const caption = `${intl.formatMessage(
    messages.type[element.node.getType()]
  )} - ${element.node.getDescription()} (${element.node.getCode()})`
  const headers = element.table.headers.map(header =>
    intl.formatMessage(messages.modal.headers[header])
  )
  const columns = element.table.columns.map(column => {
    if (column === 'type') return { content: json => intl.formatMessage(messages.type[json.type]) }
    else return column
  })
  return { caption, headers, columns, data: element.table.rows }
}

async function fetchContent(datasource, { node, path }) {
  const [nodes, table] = await Promise.all([datasource.getNodes(node), datasource.getTable(node)])
  const children = nodes.map((child, index) => ({
    node: child,
    path: [path, index].join('-'),
    children: [],
  }))
  const rows = (table && table.getRowCount
    ? Array.from(Array(table.getRowCount())).map((_, i) => table.getRow(i))
    : []
  ).map((a, index) => ({ ...a, path: [path, index].join('-') }))
  const headers = table.getHeaders ? table.getHeaders() : []
  const columns = table.getColumns ? table.getColumns() : []
  return { children, table: { rows, headers, columns } }
}

async function fetchRoot(datasource) {
  const tree = await datasource.getNodes()
  const content = await fetchContent(datasource, { path: '0', node: tree[0] })
  return tree.map((element, index) => ({
    node: element,
    table: index === 0 ? content.table : null,
    path: index + '',
    children: index === 0 ? content.children : [],
  }))
}

const filterSelection = (elements, newElements) => {
  const getParents = path => {
    if (path === '0') return []
    const paths = (path || '0').split('-')
    paths.pop()
    const parentPath = paths.join('-')
    const parent = elements.find(e => (e.path || '0') === parentPath)
    return [...getParents(parentPath), parent]
  }
  const parents = newElements
    .reduce((parents, e) => [...parents, ...getParents(e.path)], [])
    .filter(Boolean)

  const children = newElements
    .reduce((children, e) => {
      return [
        ...children,
        ...elements.filter(n => n.path !== e.path && (n.path || '0').startsWith(e.path || '0')),
      ]
    }, [])
    .filter(Boolean)
  return elements.filter(e => {
    return !(parents.find(a => dataComparator(a, e)) || children.find(a => dataComparator(a, e)))
  })
}

export default injectIntl(OuModal)
