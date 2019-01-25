import React from "react"
import renderer from "react-test-renderer"

import Loader from "./"

describe("Loader", () => {
  it("displays as expected", () => {
    const component = renderer.create(<Loader />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
  it("overrides and adds style attributes", () => {
    const component = renderer.create(
      <Loader style={{ float: "left", transform: "translateY(-50px)" }} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
