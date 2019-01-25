import React from "react"
import renderer from "react-test-renderer"
import { shallow } from "enzyme"
import Switch from "./Switch"

describe("Switch", () => {
  it("displays as expected", () => {
    const component = renderer.create(<Switch checked />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })

  it("calls onChange callback", () => {
    const onChange = jest.fn()
    const component = shallow(<Switch onChange={onChange} />)
    component.find("input").simulate("change")
    expect(onChange.mock.calls).toHaveLength(1)
  })
})
