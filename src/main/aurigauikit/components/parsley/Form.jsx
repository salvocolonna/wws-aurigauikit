import React from "react"
import $ from "jquery"

class Form extends React.Component {
  constructor(props) {
    super(props)
  }

  inputKeyPressed = e => {
    if (e.keyCode === 13) {
      this.submit(e)
    } else if (this.props.onValidationChange) {
      this.validate()
    }
  }

  submit = e => {
    e.preventDefault()
    e.stopPropagation()
    const valid = this.validate()
    if (valid && this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  validate = () => this.parsleyForm.validate()

  isValid = () => this.parsleyForm.isValid()

  componentDidMount() {
    this.parsleyForm = $(this.form).parsley()
    if (this.props.onValidationChange) {
      this.parsleyForm.on("field:validated", () => this.props.onValidationChange(this.isValid()))
    }
    $("input", $(this.form)).bind("keydown", this.inputKeyPressed)
  }

  componentWillUnmount() {
    $("input", $(this.form)).unbind("keydown", this.inputKeyPressed)
  }

  render() {
    const { children, className, style } = this.props
    return (
      <form
        ref={form => (this.form = form)}
        className={className}
        onSubmit={this.submit}
        style={style}
        data-validation-focus="first"
        data-validate="parsley">
        {children}
      </form>
    )
  }
}

export default Form
