import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import { BasicFilter } from "aurigauikit/components/BasicFilter"
import { Grid, Div } from "aurigauikit/components/Grid"
import OrganizationalUnitSelect from "aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect"
import Select2 from "aurigauikit/components/Select2"
import messages from "./messages"
import { defaultGroupTypes } from "../constants"

const notPublic = ["ALL", "YES", "NO"]

const groupTypes = defaultGroupTypes

class BranchGroupFilter extends React.Component {
  changeCode = code => {
    const { onChange, filter } = this.props
    if (onChange) onChange({ ...filter, code })
  }

  changeGroupType = groupType => {
    const { onChange, filter } = this.props
    if (onChange) onChange({ ...filter, groupType })
  }

  changeNotPublic = notPublic => {
    const { onChange, filter } = this.props
    if (onChange) onChange({ ...filter, notPublic })
  }

  changeOrganizationalUnit = organizationalUnit => {
    const { onChange, filter } = this.props
    if (onChange) onChange({ ...filter, organizationalUnit })
  }

  changeOrganizationalUnits = organizationalUnits => {
    const { onChange, filter } = this.props
    if (onChange) onChange({ ...filter, organizationalUnits })
  }

  render() {
    const { customTypes, organizationalUnitDatasource, filter, onReset, onApply } = this.props
    return (
      <section>
        <BasicFilter onApply={onApply} onReset={onReset}>
          <Grid style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Div col="1-2">
              <label>
                <Msg {...messages.organizationalUnit} />
              </label>
              <OrganizationalUnitSelect
                multiple
                datasource={organizationalUnitDatasource}
                canSelect={element => element.type === "BRANCH"}
                defaultSelection={filter.organizationalUnit}
                selectedElements={filter.organizationalUnits}
                onSelectionChange={this.changeOrganizationalUnits}
                onSelect={this.changeOrganizationalUnit}
              />
            </Div>
            <Div col="1-2">
              <Grid>
                <Div col="1-3">
                  <label>
                    <Msg {...messages.groupType} />
                  </label>
                  <Select2
                    style={{ width: "100%" }}
                    data={[...groupTypes, ...customTypes]}
                    value={filter.groupType}
                    didSelect={this.changeGroupType}
                  />
                </Div>
                <Div col="1-3">
                  <label>
                    <Msg {...messages.code} />
                    <input
                      className="filter-element"
                      style={{ width: "100%" }}
                      type="text"
                      value={filter.code}
                      onChange={e => this.changeCode(e.target.value)}
                    />
                  </label>
                </Div>
                <Div col="1-3">
                  <label>
                    <Msg {...messages.private} />
                  </label>
                  <Select2
                    style={{ width: "100%" }}
                    data={notPublic}
                    value={filter.notPublic}
                    didSelect={this.changeNotPublic}
                  />
                </Div>
              </Grid>
            </Div>
          </Grid>
        </BasicFilter>
      </section>
    )
  }
}

export default BranchGroupFilter
