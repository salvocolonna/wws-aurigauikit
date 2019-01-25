import React from "react"

const Show = ({ organizationalUnit }) => (
  <div style={{ marginBottom: "5px", textAlign: "left" }}>
    {!organizationalUnit && (
      <div>
        {" "}
        <b style={{ marginBottom: "5px" }}> Select an Organizational Unit </b>{" "}
      </div>
    )}
    {organizationalUnit && (
      <div>
        <Prop name="Id"> {organizationalUnit.id} </Prop>
        <Prop name="Type"> {organizationalUnit.type} </Prop>
        <Prop name="Code"> {organizationalUnit.code} </Prop>
        <Prop name="Description"> {organizationalUnit.description} </Prop>
      </div>
    )}
  </div>
)

const Prop = ({ name, children }) => (
  <div>
    <b> {name}: </b>
    <i> {children} </i>
  </div>
)

export default Show
