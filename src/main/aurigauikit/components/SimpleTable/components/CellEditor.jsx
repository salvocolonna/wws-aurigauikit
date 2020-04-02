import React from 'react'
import ReactDOM from 'react-dom'
import { Form } from 'aurigauikit/components/parsley'

class CellEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = { valid: false, isOpen: false }
    this.closeOnBodyClick = this.closeOnBodyClick.bind(this)
    this.inputId = guid()
  }

  validationChanged = valid => this.setState({ valid })

  componentDidMount() {
    document.body.addEventListener('click', this.closeOnBodyClick)
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.closeOnBodyClick)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({ isOpen: nextProps.isOpen })
    }
  }

  componentDidUpdate(prevProps) {
    const changed = this.props.value !== prevProps.value || this.props.isOpen !== prevProps.isOpen
    if (changed && this.state.isOpen) {
      const input = document.getElementById(this.inputId)
      if (input) {
        if (this.props.value) input.value = this.props.value
        input.focus()
        input.select()
      }
    }
  }

  closeOnBodyClick(e) {
    if (this.cellEditor && !this.cellEditor.contains(e.target)) this.aborted()
  }

  aborted = () => {
    this.setState({ isOpen: false })
    this.props.onEditAborted()
  }

  confirmed = () => {
    const input = document.getElementById(this.inputId)
    this.props.onEditConfirmed(this.props.rowIndex, this.props.colIndex, input.value)
    this.closeOnBodyClick({ target: null })
  }

  getValidations() {
    let validations = {}
    Object.keys(this.props.validations).forEach(key => {
      const prop = 'data-validation-' + key
      validations[prop] = this.props.validations[key]
    })

    return validations
  }

  render() {
    const style = {
      width: '260px',
      display: 'block',
      position: 'absolute',
      zIndex: 1100,
      top: `${this.props.position.top - 60}px`,
      left: `${this.props.position.left - 20}px`,
    }
    return ReactDOM.createPortal(
      this.state.isOpen && (
        <Form onValidationChange={this.validationChanged} onSubmit={this.confirmed}>
          <div
            className="celleditor-panel"
            style={style}
            ref={cellEditor => (this.cellEditor = cellEditor)}
          >
            <div className="celleditor-header">
              <h4 className="celleditor-title">{this.props.title}</h4>
            </div>
            <div className="celleditor-content">
              <div className="grid">
                <input
                  {...this.getValidations()}
                  type="text"
                  id={this.inputId}
                  defaultValue={this.props.value}
                />
              </div>
            </div>
            <div className="celleditor-footer">
              <div className="btn-group" role="group" aria-label="Cell Editor Buttons">
                <button className="btn btn-primary-outline" disabled={!this.state.valid}>
                  Confirm
                </button>
                <button className="btn btn-link" onClick={this.aborted}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </Form>
      ),
      document.body
    )
  }
}

window.CellEditor = CellEditor
export default CellEditor
