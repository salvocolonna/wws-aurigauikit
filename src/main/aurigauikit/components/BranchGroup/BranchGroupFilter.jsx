import React from 'react'
import { BasicFilter, BasicFilterElement } from 'aurigauikit/components/BasicFilter'
import OrganizationalUnitSelect from 'aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect'
import Select2 from 'aurigauikit/components/Select2'

const ou = _userRoleMap.getOU()

const notPublic = [{ id: 'ALL' }, { id: 'YES' }, { id: 'NO' }]

class BranchGroupFilter extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      organizationalUnit: [ou],
      branchGroupCode: '',
      notPublic: notPublic[0],
    }
  }

  onOUSelected(selectedItem) {
    this.setState({
      organizationalUnit: selectedItem,
    })
  }

  notifyApply() {
    if (typeof this.props.notifyApply === 'function') {
      this.props.notifyApply({
        organizationalUnit: this.state.organizationalUnit,
        branchGroupCode: this.state.branchGroupCode,
        notPublic: this.state.notPublic,
      })
    }
  }

  resetFilter() {
    this.setState({
      organizationalUnit: ou,
      branchGroupCode: '',
      notPublic: notPublic[0],
    })
  }

  render() {
    return (
      <section>
        <BasicFilter onApply={() => this.notifyApply()} onReset={() => this.resetFilter()}>
          <BasicFilterElement col="1-2" text="organizational-unit.title">
            <OrganizationalUnitSelect
              datasource={this.props.organizationalUnitDatasource}
              canSelect={element => element.type === 'BRANCH'}
              selectedElements={this.state.organizationalUnit}
              defaultSelection={this.state.organizationalUnit}
              onSelectionChange={selectedItem => this.onOUSelected(selectedItem)}
            />
          </BasicFilterElement>
          <BasicFilterElement col="1-3" text="branch-groups-page.filter.branch-group-code">
            <input
              className="filter-element"
              style={{ width: '100%' }}
              type="text"
              value={this.state.branchGroupCode}
              onChange={e => this.setState({ branchGroupCode: e.target.value })}
            />
          </BasicFilterElement>
          <BasicFilterElement col="1-6" text="branch-groups-page.filter.notPublic">
            <Select2
              style={{ width: '100%' }}
              data={notPublic}
              value={this.state.notPublic}
              willDisplay={value => value.id}
              didSelect={value => this.setState({ notPublic: value })}
            />
          </BasicFilterElement>
        </BasicFilter>
      </section>
    )
  }
}

export default BranchGroupFilter
