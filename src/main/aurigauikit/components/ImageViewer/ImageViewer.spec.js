import React from "react"
import renderer from "react-test-renderer"

import ImageViewer from "./ImageViewer"

jest.mock("./Image")
jest.mock("./Overlay")

describe("ImageViewer", () => {
  it("displays as expected", () => {
    const component = renderer.create(<ImageViewer />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("forewards style and className", () => {
    const component = renderer.create(
      <ImageViewer imageStyle={{ borderRadius: 50 }} className="image-viewer" />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("displays as expected editable", () => {
    const component = renderer.create(<ImageViewer editable />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
