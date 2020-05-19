import React from 'react'
import { FormattedHTMLMessage, FormattedMessage, injectIntl } from 'react-intl'
import Modal from 'aurigauikit/components/Modal'
import OrganizationalUnitModal from 'aurigauikit/components/OrganizationalUnit/OrganizationalUnitModal'
import SelectedBranchesTable from './components/SelectedBranchesTable'
import Checkbox from 'aurigauikit/components/Checkbox'
import InfoLabel from 'aurigauikit/components/InfoLabel'
import { ButtonsPanel } from 'aurigauikit/components/Page'
import { showCriticalPanel, showConfirmatoryPanel } from 'aurigauikit/components/temporary-panels'
import { savingGroup as savingGroupMessages } from './messages'

const ou = _userRoleMap.getOU()

class GroupModal extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      mode: this.props.mode,
      showModal: false,
      organizationalUnit: ou,
      groupCode: this.props.branchGroupCode,
      groupDescription: this.props.branchGroupDescription,
      selectedBranches: this.props.branches || [],
      notPublic: this.props.notPublic,
    }
  }

  componentWillReceiveProps(props) {
    let newState = {}
    if (this.state.branches !== props.branches) {
      newState = {
        selectedBranches: props.branches || [],
        branches: props.branches,
      }
    }
    if (this.state.groupCode !== props.branchGroupCode) {
      newState = {
        ...newState,
        groupCode: props.branchGroupCode,
      }
    }
    if (this.state.groupDescription !== props.branchGroupDescription) {
      newState = {
        ...newState,
        groupDescription: props.branchGroupDescription,
      }
    }
    if (this.state.mode !== props.mode) {
      newState = {
        ...newState,
        mode: props.mode,
      }
    }
    if (this.state.notPublic != props.notPublic) {
      newState = {
        ...newState,
        notPublic: props.notPublic,
      }
    }
    this.setState(newState)
  }

  onSelectionAborted() {
    if (this.props.onSelectionAborted) this.props.onSelectionAborted()
    this.setState({
      organizationalUnit: ou,
      showModal: false,
      groupCode: null,
      groupDescription: null,
      selectedBranches: [],
      notPublic: false,
    })
  }

  async fetchData(selectedElements, service) {
    const selectedBranches = []
    for (let i = 0; i < selectedElements.length; i++) {
      const branchInfo = await service.readBranch(selectedElements[i].id)
      selectedBranches.push(branchInfo.content)
    }
    this.setState({
      loading: false,
      showModal: false,
      selectedBranches,
    })
  }

  removeBranch(branchId) {
    this.setState(prevState => ({
      selectedBranches: prevState.selectedBranches.filter(row => row.branchId !== branchId),
    }))
  }

  async saveGroup(service) {
    try {
      const branchGroupBeanRequest = {
        branchGroupCode: this.state.groupCode,
        branchGroupDescription: this.state.groupDescription,
        branches: this.state.selectedBranches.map(b => ({
          branchId: b.branchId,
        })),
        notPublic: this.state.notPublic,
      }
      await service.saveBranchGroup(branchGroupBeanRequest)
      this.props.onSave()
      showConfirmatoryPanel(this.props.intl.formatMessage(savingGroupMessages.SUCCESS))
    } catch (error) {
      console.log(error)
      showCriticalPanel(this.props.intl.formatMessage(savingGroupMessages.ERROR))
    }
  }

  async editGroup(service) {
    const branchGroupBeanRequest = {
      branchGroupCode: this.state.groupCode,
      branchGroupDescription: this.state.groupDescription,
      branches: this.state.selectedBranches.map(b => ({
        branchId: b.branchId,
      })),
      notPublic: this.state.notPublic,
    }
    await service.editBranchGroup(this.props.branchGroupId, branchGroupBeanRequest)
    this.props.onSave()
  }

  render() {
    const style = {
      minHeight: '500px',
      width: '70%',
    }
    if (!this.state.mode) return null
    return (
      <Modal style={style} show={this.props.show} onClose={() => this.onSelectionAborted()}>
        {this.state.mode === 'create' && (
          <section>
            <Modal.Header
              title={<FormattedMessage id="branch-groups-page.group-modal.create-group-title" />}
            />
            <Modal.Content style={{ minHeight: '300px' }}>
              <section>
                <div className="grid">
                  <div className="col-1-1">
                    <label>
                      <FormattedMessage id="branch-groups-page.group-modal.insert-code" />
                    </label>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      onChange={e => this.setState({ groupCode: e.target.value })}
                    />
                  </div>
                  <div className="col-1-1" style={{ marginTop: '10px' }}>
                    <label>
                      <FormattedMessage id="branch-groups-page.group-modal.insert-desc" />
                    </label>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      onChange={e => this.setState({ groupDescription: e.target.value })}
                    />
                  </div>
                </div>
              </section>
              <section>
                <ButtonsPanel>
                  <button
                    className="btn btn-confirmatory"
                    onClick={() => this.setState({ showModal: true })}
                  >
                    <FormattedMessage id="branch-groups-page.group-modal.button-add-branch" />
                  </button>
                  <OrganizationalUnitModal
                    show={this.state.showModal}
                    onSelectionConfirmed={selectedElements =>
                      this.fetchData(selectedElements, this.props.service)
                    }
                    datasource={this.props.organizationalUnitDatasource}
                    canSelect={element => element.type === 'BRANCH'}
                    dataComparator={(e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id}
                    onSelectionAborted={() => this.setState({ showModal: false })}
                    selectedElements={this.state.selectedBranches}
                    onSelect={items => this.setState({ selectedBranches: items })}
                  />
                </ButtonsPanel>
                <SelectedBranchesTable
                  loading={this.state.loading}
                  data={this.state.selectedBranches}
                  emptyState={
                    <FormattedHTMLMessage id="branch-groups-page.group-modal.static-panel" />
                  }
                  mode={this.state.mode}
                  onRemove={branch => this.removeBranch(branch.branchId)}
                />
              </section>
              <section>
                <Checkbox
                  isChecked={this.state.notPublic}
                  onChange={event => this.setState({ notPublic: event.target.checked })}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.notPublic" />
                </Checkbox>
              </section>
            </Modal.Content>
            <Modal.Footer>
              <div className="btn-group">
                <button
                  className="btn btn-warning-outline"
                  style={{ marginRight: '20px' }}
                  onClick={() => this.onSelectionAborted()}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-cancel" />
                </button>
                <button
                  className="btn btn-confirmatory"
                  disabled={!this.state.groupCode || this.state.selectedBranches.length === 0}
                  onClick={() => this.saveGroup(this.props.service)}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-save" />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
        {this.state.mode === 'view' && (
          <section>
            <Modal.Header
              title={<FormattedMessage id="branch-groups-page.group-modal.view-group-title" />}
            />
            <Modal.Content style={{ minHeight: '300px' }}>
              <section>
                <div className="grid">
                  <InfoLabel
                    className="col-1-3"
                    label={<FormattedMessage id="branch-groups-page.info-label.group-code" />}
                  >
                    {this.props.branchGroupCode}
                  </InfoLabel>
                  <InfoLabel
                    className="col-1-3"
                    label={<FormattedMessage id="branch-groups-page.info-label.group-desc" />}
                  >
                    {this.props.branchGroupDescription}
                  </InfoLabel>
                  <InfoLabel
                    className="col-1-3"
                    label={<FormattedMessage id="branch-groups-page.info-label.group-notPublic" />}
                  >
                    {this.props.notPublic ? (
                      <i className="fa fa-check" />
                    ) : (
                      <i className="fa fa-remove" />
                    )}
                  </InfoLabel>
                </div>
              </section>
              <section>
                <SelectedBranchesTable
                  loading={this.state.loading}
                  data={this.props.branches}
                  mode={this.state.mode}
                />
              </section>
            </Modal.Content>
            <Modal.Footer>
              <div className="btn-group">
                <button
                  className="btn btn-warning-outline"
                  style={{ marginRight: '20px' }}
                  onClick={() => this.onSelectionAborted()}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-back" />
                </button>
                <button
                  className="btn btn-confirmatory"
                  onClick={() => this.setState({ mode: 'edit' })}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-edit" />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
        {this.state.mode === 'edit' && (
          <section>
            <Modal.Header
              title={<FormattedMessage id="branch-groups-page.group-modal.edit-group-title" />}
            />
            <Modal.Content style={{ minHeight: '300px' }}>
              <section>
                <div className="grid">
                  <div className="col-1-1">
                    <label>
                      <FormattedMessage id="branch-groups-page.group-modal.insert-code" />
                    </label>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      defaultValue={this.props.branchGroupCode}
                      onChange={e => this.setState({ groupCode: e.target.value })}
                    />
                  </div>
                  <div className="col-1-1" style={{ marginTop: '10px' }}>
                    <label>
                      <FormattedMessage id="branch-groups-page.group-modal.insert-desc" />
                    </label>
                    <input
                      style={{ width: '100%' }}
                      type="text"
                      defaultValue={this.props.branchGroupDescription}
                      onChange={e => this.setState({ groupDescription: e.target.value })}
                    />
                  </div>
                </div>
              </section>
              <section>
                <ButtonsPanel>
                  <button
                    className="btn btn-confirmatory"
                    onClick={() => this.setState({ showModal: true })}
                  >
                    <FormattedMessage id="branch-groups-page.group-modal.button-add-branch" />
                  </button>
                  <OrganizationalUnitModal
                    show={this.state.showModal}
                    onSelectionConfirmed={selectedElements =>
                      this.fetchData(selectedElements, this.props.service)
                    }
                    datasource={this.props.organizationalUnitDatasource}
                    canSelect={element => element.type === 'BRANCH'}
                    dataComparator={(e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id}
                    onSelectionAborted={() => this.setState({ showModal: false })}
                    selectedElements={this.state.selectedBranches.map(branch => ({
                      id: branch.branchId,
                      type: 'BRANCH',
                    }))}
                  />
                </ButtonsPanel>
                <SelectedBranchesTable
                  loading={this.state.loading}
                  data={this.state.selectedBranches}
                  removeBranch={branchId => this.removeBranch(branchId)}
                  emptyState={
                    <FormattedHTMLMessage id="branch-groups-page.group-modal.static-panel" />
                  }
                  mode={this.state.mode}
                  onRemove={branch => this.removeBranch(branch.branchId)}
                />
              </section>
              <section>
                <Checkbox
                  isChecked={this.state.notPublic}
                  onChange={notPublic => this.setState({ notPublic: notPublic })}
                  isDisabled={!this.state.notPublic}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.notPublic" />
                </Checkbox>
              </section>
            </Modal.Content>
            <Modal.Footer>
              <div className="btn-group">
                <button
                  className="btn btn-warning-outline"
                  style={{ marginRight: '20px' }}
                  onClick={() => this.onSelectionAborted()}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-cancel" />
                </button>
                <button
                  className="btn btn-confirmatory"
                  onClick={() => this.editGroup(this.props.service)}
                >
                  <FormattedMessage id="branch-groups-page.group-modal.button-save" />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
      </Modal>
    )
  }
}

export default injectIntl(GroupModal)
