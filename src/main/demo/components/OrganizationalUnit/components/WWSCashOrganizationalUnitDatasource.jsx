import Ajax from "aurigauikit/ajax"

const tree = async params =>
  await Ajax("wwsca_frontend")("wwsca_backend").get("hierarchical/tree", params)

const table = async params =>
  await Ajax("wwsca_frontend")("wwsca_backend").get("hierarchical/table", params)

export default class {
  async getNodes(node = null) {
    if (node && !node.hasChildren()) return []
    const params = !node ? {} : { parentEntity: node.getType(), parentEntityId: node.getID() }
    const response = await tree(params)
    return response.map(node => ({
      getType: () => node.type,
      getID: () => node.id,
      getCode: () => node.code,
      getDescription: () => node.description,
      hasChildren: () => node.hasChilds
    }))
  }

  async getTable(node) {
    const response = await table({
      parentEntity: node.getType(),
      parentEntityId: node.getID()
    })
    return {
      getHeaderData: () => response.headers,
      getColumns: () => response.columns,
      getRowCount: () => response.elements.length,
      getRow: id => response.elements[id],
      getTotalRows: () => response.totalRows
    }
  }
}
/*
const data = [{
	type: 'PARENT_BANK',
	id: 1,
	code: '0001',
	description: 'Bank Entity',
	children: [{
		type: 'BANK',
		id: 1,
		code: '0001',
		description: 'Bank Entity'
	}]
}]*/
