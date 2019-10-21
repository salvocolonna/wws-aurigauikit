import React from 'react'
import './page-anchors.less'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

export class AnchorsProvider extends React.Component {
  state = { anchors: [] }

  static childContextTypes = {
    anchors: PropTypes.arrayOf(PropTypes.object),
    addAnchor: PropTypes.func,
    removeAnchor: PropTypes.func,
  }

  scrollTo = anchor => scrollTo(anchor)

  addAnchor = anchor => {
    this.setState(
      state => ({ anchors: [...state.anchors, anchor] }),
      () => this.props.onChange && this.props.onChange(this.state.anchors)
    )
  }

  removeAnchor = anchor => {
    this.setState(
      state => {
        const index = state.anchors.findIndex(a => a.id === anchor.id)
        const anchors = state.anchors
        anchors.splice(index, 1)
        return { anchors }
      },
      () => this.props.onChange && this.props.onChange(this.state.anchors)
    )
  }

  getChildContext() {
    return {
      anchors: this.state.anchors,
      addAnchor: this.addAnchor,
      removeAnchor: this.removeAnchor,
    }
  }

  render() {
    return <div> {this.props.children} </div>
  }
}

export const withAnchors = Component => {
  return class extends React.Component {
    static contextTypes = {
      anchors: PropTypes.arrayOf(PropTypes.object),
      addAnchor: PropTypes.func,
      removeAnchor: PropTypes.func,
    }

    render() {
      const { anchors, addAnchor, removeAnchor } = this.context
      return (
        <Component
          addAnchor={addAnchor}
          removeAnchor={removeAnchor}
          anchors={anchors}
          {...this.props}
        />
      )
    }
  }
}

export const AnchoredSection = withAnchors(
  class extends React.Component {
    constructor(props) {
      super(props)
      this.id = guid()
    }

    componentDidMount() {
      if (this.props.addAnchor) {
        const {
          id,
          props: { name },
          decoratedName,
        } = this
        this.props.addAnchor({
          id: this.props.id || id,
          name: decoratedName ? decoratedName : name,
        })
      }
    }

    componentWillUnmount() {
      if (this.props.removeAnchor) {
        const {
          id,
          props: { name },
          decoratedName,
        } = this
        this.props.removeAnchor({
          id: this.props.id || id,
          name: decoratedName ? decoratedName : name,
        })
      }
    }

    render() {
      const { name, children, id } = this.props
      return (
        <section id={id || this.id}>
          <Anchor name={name} />
          <div style={{ padding: 10 }}>{children}</div>
        </section>
      )
    }
  }
)

const Anchor = ({ name }) => (
  <h3
    style={{
      marginBottom: 0,
      textTransform: 'uppercase',
      color: '#3C434A',
      borderTop: '1px solid #ccc',
      padding: 10,
    }}
  >
    <span style={{ fontSize: '.8em' }}>{name}</span>
    <div className="page-anchors-action" style={{ fontSize: 10 }} onClick={() => toTop()}>
      <em style={{ paddingRight: 5 }}>
        {' '}
        <FormattedMessage id="page.anchors.back-to-top" />{' '}
      </em>
      <b>
        <i style={{ fontSize: '2em', transform: 'translateY(2px)' }} className="fa fa-angle-up" />
      </b>
    </div>
  </h3>
)

AnchoredSection.addTo = anchors => ref => {
  if (ref) {
    const {
      id,
      props: { name },
      decoratedName,
    } = ref
    anchors.push({
      id: ref.props.id || id,
      name: decoratedName ? decoratedName : name,
    })
  }
}

export const PageAnchors = withAnchors(
  class extends React.Component {
    render() {
      const { anchors = [] } = this.props
      return (
        <ul className="page-anchors-list">
          <label>
            <FormattedMessage id="page.anchors.table-of-contents" />
          </label>
          {anchors.map(({ id, name }, index) => (
            <li key={index}>
              <a
                href="#"
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  scrollTo({ id })
                }}
              >
                <i className="fa fa-angle-right page-anchors-icon" />
                <span>{name}</span>
              </a>
            </li>
          ))}
        </ul>
      )
    }
  }
)

const scrollTo = ({ id }) => {
  document.body.scrollTop = document.getElementById(id).offsetTop - 75
}

const toTop = () => {
  document.body.scrollTop = 0
}

export function idChanged(arr1, arr2) {
  let changed = false
  arr1.forEach(i1 => (changed = changed || arr2.find(i2 => i2.id === i1.id) === undefined))
  return changed
}
