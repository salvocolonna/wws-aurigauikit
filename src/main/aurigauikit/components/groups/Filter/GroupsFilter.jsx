import React from 'react'
import { FormattedMessage as Msg, injectIntl } from 'react-intl'
import { BasicFilter } from 'aurigauikit/components/BasicFilter'
import { Row, Col } from 'antd'
import OrganizationalUnitSelect from 'aurigauikit/components/OrganizationalUnit/OrganizationalUnitSelect'
import Select2 from 'aurigauikit/components/Select2'
import messages, { notPublicMessages } from './messages'

const notPublic = ['ALL', 'YES', 'NO']

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
    const { organizationalUnitDatasource, filter, onReset, onApply, intl } = this.props
    return (
      <section>
        <BasicFilter onApply={onApply} onReset={onReset}>
          <Row gutter={16} type="flex">
            <Col xs={24} md={12}>
              <label>
                <Msg {...messages.organizationalUnit} />
              </label>
              <OrganizationalUnitSelect
                multiple
                radioOptions={organizationalUnitDatasource}
                canSelect={element => element.type === 'ASSET'}
                defaultSelection={filter.organizationalUnit}
                selectedElements={filter.organizationalUnits}
                onSelectionChange={this.changeOrganizationalUnits}
              />
            </Col>
            <Col xs={24} md={6}>
              <label>
                <Msg {...messages.code} />
                <input
                  className="filter-element"
                  style={{ width: '100%' }}
                  type="text"
                  value={filter.code}
                  onChange={e => this.changeCode(e.target.value)}
                />
              </label>
            </Col>
            <Col xs={24} md={6}>
              <label>
                <Msg {...messages.private} />
              </label>
              <Select2
                style={{ width: '100%' }}
                data={notPublic}
                value={filter.notPublic}
                willDisplay={flag => intl.formatMessage(notPublicMessages[flag])}
                didSelect={this.changeNotPublic}
              />
            </Col>
          </Row>
        </BasicFilter>
      </section>
    )
  }
}

export default injectIntl(BranchGroupFilter)
