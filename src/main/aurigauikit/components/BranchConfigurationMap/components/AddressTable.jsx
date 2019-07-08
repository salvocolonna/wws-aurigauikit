import React from 'react'
import SimpleTable from 'aurigauikit/components/SimpleTable'
import Radio from 'aurigauikit/components/Radio'
import { FormattedMessage } from 'react-intl'

class AddressTable extends React.Component {
  getHeaderData = () => [
    { content: '' },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line1" />,
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.postal-code" />,
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.city" />,
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.country" />,
    },
  ]

  getColumns = () => [
    {
      content: json => (
        <Radio
          isChecked={this.props.selectedPlaceId === json.place_id}
          onChange={() => this.props.onSelectionChange(json.place_id)}
        />
      ),
    },
    {
      content: json => `${json.address1}${json.houseNumber ? ' ' + json.houseNumber : ''}`,
      cssClass: 'no-wrap',
    },
    {
      content: json => json.postalCode,
      cssClass: 'no-wrap',
    },
    {
      content: json => json.city,
      cssClass: 'no-wrap',
    },
    {
      content: json => json.country,
      cssClass: 'no-wrap',
    },
  ]

  getAddressComponent(components, type) {
    if (!components) return ''
    const found = components.find(x => x.types.includes(type))
    return found != undefined ? found.short_name : ''
  }

  render() {
    const { data } = this.props
    return (
      <SimpleTable
        caption={this.props.caption}
        headers={this.getHeaderData()}
        columns={this.getColumns()}
        data={data}
      />
    )
  }
}

export default AddressTable
