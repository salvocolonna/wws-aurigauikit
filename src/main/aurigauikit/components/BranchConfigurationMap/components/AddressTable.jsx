import React from "react"
import SimpleTable from "aurigauikit/components/SimpleTable"
import Radio from "aurigauikit/components/Radio"
import { FormattedMessage } from "react-intl"

class AddressTable extends React.Component {
  getHeaderData = () => [
    { content: "" },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line1" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line2" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line3" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line4" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.line5" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.postal-code" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.city" />
    },
    {
      content: <FormattedMessage id="branch-configuration-page.address-modal.table.country" />
    }
  ]

  getColumns = () => [
    {
      content: json => (
        <Radio
          isChecked={this.props.selectedPlaceId === json.place_id}
          onChange={() => this.props.onSelectionChange(json.place_id)}
        />
      )
    },
    {
      content: json =>
        this.getAddressComponent(json.address_components, "route") +
        " " +
        this.getAddressComponent(json.address_components, "street_number"),
      cssClass: "no-wrap"
    },
    { content: "", cssClass: "no-wrap" },
    { content: "", cssClass: "no-wrap" },
    {
      content: json =>
        this.getAddressComponent(json.address_components, "administrative_area_level_2"),
      cssClass: "no-wrap"
    },
    {
      content: json =>
        this.getAddressComponent(json.address_components, "administrative_area_level_1"),
      cssClass: "no-wrap"
    },
    {
      content: json => this.getAddressComponent(json.address_components, "postal_code"),
      cssClass: "no-wrap"
    },
    {
      content: json => this.getAddressComponent(json.address_components, "locality"),
      cssClass: "no-wrap"
    },
    {
      content: json => this.getAddressComponent(json.address_components, "country"),
      cssClass: "no-wrap"
    }
  ]

  getAddressComponent(components, type) {
    const found = components.find(x => x.types.includes(type))
    return found != undefined ? found.short_name : ""
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
