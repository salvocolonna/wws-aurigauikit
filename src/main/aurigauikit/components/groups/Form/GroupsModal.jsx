import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import Modal from "aurigauikit/components/Modal"
import OrganizationalUnitModal from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitModal"
import SelectedBranchesTable from "./OrganizationalUnitTable"
import Checkbox from "aurigauikit/components/Checkbox"
import InfoLabel from "aurigauikit/components/InfoLabel"
import { ButtonsPanel } from "aurigauikit/components/Page"
import Select2 from "aurigauikit/components/Select2"
import { Grid, Div } from "aurigauikit/components/Grid"
import messages from "./messages"
import { defaultGroupTypes } from "../constants"
const ou = _userRoleMap.getOU()

class GroupModal extends React.Component {
  state = {
    mode: this.props.mode,
    showModal: false,
    organizationalUnit: ou,
    groupCode: this.props.branchGroupCode,
    groupDescription: this.props.branchGroupDescription,
    selectedBranches: this.props.branches || [],
    data: this.props.data || [],
    notPublic: this.props.notPublic,
    groupType: defaultGroupTypes[0]
  }

  componentWillReceiveProps(props) {
    let newState = {}
    if (this.state.branches !== props.branches) {
      newState = {
        selectedBranches: props.branches || [],
        branches: props.branches
      }
    }
    if (this.state.groupCode !== props.branchGroupCode) {
      newState = {
        ...newState,
        groupCode: props.branchGroupCode
      }
    }
    if (this.state.groupDescription !== props.branchGroupDescription) {
      newState = {
        ...newState,
        groupDescription: props.branchGroupDescription
      }
    }
    if (this.state.mode !== props.mode) {
      newState = {
        ...newState,
        mode: props.mode
      }
    }
    if (this.state.notPublic != props.notPublic) {
      newState = {
        ...newState,
        notPublic: props.notPublic
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
      notPublic: false
    })
  }

  async fetchData(selectedElements, service) {
    const data = await service.fetchData(selectedElements)
    this.setState({
      loading: false,
      showModal: false,
      data
    })
  }

  removeBranch(branchId) {
    this.setState(prevState => ({
      selectedBranches: prevState.selectedBranches.filter(row => row.branchId !== branchId)
    }))
  }

  async saveGroup(service) {
    const branchGroupBeanRequest = {
      branchGroupCode: this.state.groupCode,
      branchGroupDescription: this.state.groupDescription,
      branches: this.state.selectedBranches.map(b => ({
        branchId: b.branchId
      })),
      notPublic: this.state.notPublic
    }
    await service.saveBranchGroup(branchGroupBeanRequest)
    this.props.onSave()
  }

  async editGroup(service) {
    const branchGroupBeanRequest = {
      branchGroupCode: this.state.groupCode,
      branchGroupDescription: this.state.groupDescription,
      branches: this.state.selectedBranches.map(b => ({
        branchId: b.branchId
      })),
      notPublic: this.state.notPublic
    }
    await service.editBranchGroup(this.props.branchGroupId, branchGroupBeanRequest)
    this.props.onSave()
  }

  render() {
    const style = {
      minHeight: "500px",
      width: this.state.selectedBranches.length !== 0 ? "70%" : "50%"
    }
    if (!this.state.mode) return null
    return (
      <Modal style={style} show={this.props.show} onClose={() => this.onSelectionAborted()}>
        {this.state.mode === "create" && (
          <section>
            <Modal.Header title={<Msg {...messages.title} />} />
            <Modal.Content style={{ minHeight: "300px" }}>
              <Grid>
                <Div col="1-4">
                  <label>
                    <Msg {...messages.groupType} />
                  </label>
                  <Select2
                    style={{ width: "100%" }}
                    data={[...defaultGroupTypes, ...this.props.customTypes]}
                    value={this.state.groupType}
                    didSelect={value => this.setState({ groupType: value })}
                  />
                </Div>
                <Div col="1-4">
                  <label>
                    <Msg {...messages.code} />
                    <input
                      className="filter-element"
                      style={{ width: "100%" }}
                      type="text"
                      value={this.state.branchGroupCode}
                      onChange={e => this.setState({ branchGroupCode: e.target.value })}
                    />
                  </label>
                </Div>
                <Div col="1-2">
                  <label>
                    <Msg {...messages.description} />
                    <input
                      className="filter-element"
                      style={{ width: "100%" }}
                      type="text"
                      value={this.state.groupDescription}
                      onChange={e => this.setState({ groupDescription: e.target.value })}
                    />
                  </label>
                </Div>
              </Grid>
              <section>
                <ButtonsPanel>
                  <button
                    style={{ marginTop: 40 }}
                    className="btn btn-confirmatory"
                    onClick={() => this.setState({ showModal: true })}>
                    <Msg {...messages.add} />
                  </button>
                  <OrganizationalUnitModal
                    show={this.state.showModal}
                    onSelectionConfirmed={selectedElements =>
                      this.fetchData(selectedElements, this.props.service)
                    }
                    datasource={this.props.organizationalUnitDatasource}
                    canSelect={element => element.type === "BRANCH"}
                    dataComparator={(e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id}
                    onSelectionAborted={() => this.setState({ showModal: false })}
                    selectedElements={this.state.selectedBranches.map(branch => ({
                      id: branch.branchId,
                      type: "BRANCH"
                    }))}
                  />
                </ButtonsPanel>
                <SelectedBranchesTable
                  loading={this.state.loading}
                  data={this.state.selectedBranches}
                  groupType={this.state.groupType}
                  emptyState={<Msg {...messages.emptyState} />}
                  mode={this.state.mode}
                  onRemove={branch => this.removeBranch(branch.branchId)}
                  customTypes={this.props.customTypes}
                  customHeaders={this.props.customHeaders}
                  customColumns={this.props.customColumns}
                />
              </section>
              <section />
            </Modal.Content>
            <Modal.Footer>
              <div className="btn-group">
                <Checkbox
                  style={{ float: "left", marginLeft: 80 }}
                  isChecked={this.state.notPublic}
                  onChange={notPublic => this.setState({ notPublic: notPublic })}>
                  <Msg {...messages.private} />
                </Checkbox>
                <button
                  className="btn btn-warning-outline"
                  style={{ marginRight: "20px" }}
                  onClick={() => this.onSelectionAborted()}>
                  <Msg {...messages.undo} />
                </button>
                <button
                  className="btn btn-confirmatory"
                  disabled={!this.state.groupCode || this.state.selectedBranches.length === 0}
                  onClick={() => this.saveGroup(this.props.service)}>
                  <Msg {...messages.save} />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
        {this.state.mode === "view" && (
          <section>
            <Modal.Header title={<Msg {...messages.title} />} />
            <Modal.Content style={{ minHeight: "300px" }}>
              <section>
                <div className="grid">
                  <InfoLabel className="col-1-3" label={<Msg {...messages.code} />}>
                    {this.props.branchGroupCode}
                  </InfoLabel>
                  <InfoLabel className="col-1-3" label={<Msg {...messages.description} />}>
                    {this.props.branchGroupDescription}
                  </InfoLabel>
                  <InfoLabel className="col-1-3" label={<Msg {...messages.private} />}>
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
                  style={{ marginRight: "20px" }}
                  onClick={() => this.onSelectionAborted()}>
                  <Msg id="branch-groups-page.group-modal.button-back" />
                </button>
                <button
                  className="btn btn-confirmatory"
                  onClick={() => this.setState({ mode: "edit" })}>
                  <Msg id="branch-groups-page.group-modal.button-edit" />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
        {this.state.mode === "edit" && (
          <section>
            <Modal.Header title={<Msg id="branch-groups-page.group-modal.edit-group-title" />} />
            <Modal.Content style={{ minHeight: "300px" }}>
              <section>
                <div className="grid">
                  <div className="col-1-1">
                    <label>
                      <Msg id="branch-groups-page.group-modal.insert-code" />
                    </label>
                    <input
                      style={{ width: "100%" }}
                      type="text"
                      defaultValue={this.props.branchGroupCode}
                      onChange={e => this.setState({ groupCode: e.target.value })}
                    />
                  </div>
                  <div className="col-1-1" style={{ marginTop: "10px" }}>
                    <label>
                      <Msg id="branch-groups-page.group-modal.insert-desc" />
                    </label>
                    <input
                      style={{ width: "100%" }}
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
                    onClick={() => this.setState({ showModal: true })}>
                    <Msg {...messages.add} />
                  </button>
                  <OrganizationalUnitModal
                    show={this.state.showModal}
                    onSelectionConfirmed={selectedElements =>
                      this.fetchData(selectedElements, this.props.service)
                    }
                    datasource={this.props.organizationalUnitDatasource}
                    canSelect={element => element.type === "BRANCH"}
                    dataComparator={(e1, e2) => e1 && e2 && e1.type === e2.type && e1.id === e2.id}
                    onSelectionAborted={() => this.setState({ showModal: false })}
                    selectedElements={this.state.selectedBranches.map(branch => ({
                      id: branch.branchId,
                      type: "BRANCH"
                    }))}
                  />
                </ButtonsPanel>
                <SelectedBranchesTable
                  loading={this.state.loading}
                  data={this.state.selectedBranches}
                  removeBranch={branchId => this.removeBranch(branchId)}
                  emptyState={<Msg {...messages.emptyState} />}
                  mode={this.state.mode}
                  onRemove={branch => this.removeBranch(branch.branchId)}
                />
              </section>
              <section>
                <Checkbox
                  isChecked={this.state.notPublic}
                  onChange={notPublic => this.setState({ notPublic: notPublic })}
                  isDisabled={!this.state.notPublic}>
                  <Msg {...messages.private} />
                </Checkbox>
              </section>
            </Modal.Content>
            <Modal.Footer>
              <div className="btn-group">
                <button
                  className="btn btn-warning-outline"
                  style={{ marginRight: "20px" }}
                  onClick={() => this.onSelectionAborted()}>
                  <Msg {...messages.undo} />
                </button>
                <button
                  className="btn btn-confirmatory"
                  onClick={() => this.editGroup(this.props.service)}>
                  <Msg {...messages.save} />
                </button>
              </div>
            </Modal.Footer>
          </section>
        )}
      </Modal>
    )
  }
}

export default GroupModal
