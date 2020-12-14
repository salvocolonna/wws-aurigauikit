import React, { useState, useEffect, useMemo, useRef } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import SimpleTable from '../../SimpleTable/SimpleTable'
import Spinner from 'aurigauikit/components/Spinner'
import messages from '../messages'
import OrganizationalUnit from '../OrganizationalUnit'
import Tree from 'aurigauikit/components/Tree'
import './organizational-unit-modal.less'
import { Checkbox, Radio } from 'antd'

const dataComparator = (e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id

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
    if (!element.node.hasChildren()) return
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
      setTree(state => ({ ...state, data, openPath: '0', selectedPath: '0' }))
      table.onPageChange(1)
      setLoading(false)
    }
  }

  return { ...tree, element, loading, update, fetch, table, setTree }
}

const InlineOu = ({
  selectedElements,
  defaultSelection,
  datasource,
  radioOptions,
  intl,
  selectableType,
  canSelect = () => true,
  canView = () => true,
  onSelect = () => {},
  canRemove,
  onRemove,
}) => {
  const intitialData = useRef(selectedElements)
  const [option, setOption] = useState(null)
  const currentDatasource = option ? option.datasource : datasource

  const tree = useOuTree(currentDatasource, intl)

  useEffect(() => {
    intitialData.current = selectedElements
  }, [])

  useEffect(() => {
    if (radioOptions && !option) {
      const [firstOption] = radioOptions
      setOption(firstOption)
    } else tree.fetch()
  }, [option]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (defaultSelection && selectedElements.length === 0) onSelect([defaultSelection])
  }, [defaultSelection, selectedElements, onSelect])

  const selectElements = elements => {
    const newElements = elements.filter(n => !selectedElements.find(e => dataComparator(e, n)))
    const oldElements = elements.filter(n => selectedElements.find(e => dataComparator(e, n)))
    const getParents = path => {
      if (!path || path === '0') return []
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
          ...oldElements.filter(n => n.path && n.path !== e.path && n.path.startsWith(e.path)),
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

  const unselect = item => {
    const index = selectedElements.findIndex(a => a.type === item.type && a.id === item.id)
    const items = [...selectedElements]
    items.splice(index, 1)
    onSelect(items)
  }

  const canUnselect = item =>
    defaultSelection
      ? !(item.type === defaultSelection.type && item.id === defaultSelection.id)
      : true

  return (
    <>
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
            willDisplay={(node, path) => (
              <TreeNode
                selectableType={selectableType}
                node={node}
                path={path}
                selectedElements={selectedElements}
                selectElements={selectElements}
                canSelect={canSelect}
              />
            )}
            loadingPath={tree.loadingPath}
            canView={(option ? option.canView : canView) || canView}
            data={tree.data}
          />
        </div>
        <div className="col-5-12 organizational-unit-table">
          {tree.element && tree.element.table && (
            <SimpleTable
              sortable
              selectable
              selectableType={selectableType}
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
        <OrganizationalUnit
          data={selectedElements}
          onRemove={onRemove || unselect}
          canRemove={canRemove || canUnselect}
        />
      </div>
    </>
  )
}

const TreeNode = ({ canSelect, selectElements, selectedElements, node, path, selectableType }) => {
  const element = {
    path,
    id: node.getID(),
    type: node.getType(),
    code: node.getCode(),
    hasChilds: node.hasChildren(),
    description: node.getDescription(),
  }
  const checked = !!selectedElements.find(a => dataComparator(a, element))
  const select = e => {
    e.preventDefault()
    e.stopPropagation()
    if (selectableType === 'single') selectElements([element])
    else {
      if (!checked) selectElements([...selectedElements, element])
      else selectElements(selectedElements.filter(e => !dataComparator(e, element)))
    }
  }
  return (
    <span>
      {canSelect(element) &&
        (selectableType === 'single' ? (
          <Radio checked={checked} onClick={select} />
        ) : (
          <Checkbox checked={checked} onClick={select} />
        ))}
      <span>{`${node.getDescription()} ${node.getCode() ? `(${node.getCode()})` : ''}`}</span>
    </span>
  )
}

const DatasourceSelector = ({ datasource, datasources, onChange }) => (
  <div style={{ display: 'inline-block', width: '100%' }}>
    {datasources.map((option, i) => (
      <Radio
        key={i}
        style={{ float: 'left', paddingRight: 20, paddingBottom: 10 }}
        checked={datasource === option.datasource}
        onChange={checked => checked && onChange(option)}
      >
        {option.i18nLabel ? <FormattedMessage id={option.i18nLabel} /> : option.label}
      </Radio>
    ))}
  </div>
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
  const caption = `${
    messages.type[element.node.getType()]
      ? intl.formatMessage(messages.type[element.node.getType()])
      : element.node.getType()
  } - ${element.node.getDescription()} ${
    element.node.getCode() ? `(${element.node.getCode()})` : ''
  }`
  const headers = element.table.headers.map(header =>
    messages.modal.headers[header] ? intl.formatMessage(messages.modal.headers[header]) : header
  )
  const columns = element.table.columns.map(column => {
    if (column === 'type')
      return {
        content: json =>
          messages.type[json.type] ? intl.formatMessage(messages.type[json.type]) : json.type,
      }
    else return column
  })
  return { caption, headers, columns, data: element.table.rows }
}

async function fetchContent(datasource, { node, path }) {
  try {
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
  } catch (error) {
    console.log(error)
  }
}

async function fetchRoot(datasource) {
  try {
    const tree = await datasource.getNodes()
    const content = await fetchContent(datasource, { path: '0', node: tree[0] })
    return tree.map((element, index) => ({
      node: element,
      table: index === 0 ? content.table : null,
      path: index + '',
      children: index === 0 ? content.children : [],
    }))
  } catch (error) {
    console.log(error)
  }
}

export default injectIntl(InlineOu)
