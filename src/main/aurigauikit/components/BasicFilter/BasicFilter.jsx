import React from 'react'
import BasicFilterElement from './components/BasicFilterElement'
import ResetButton from './components/ResetButton'
import ApplyButton from './components/ApplyButton'
import RestoreButton from './components/RestoreButton'
import UndoButton from './components/UndoButton'
import SaveSearchButton from './components/SaveSearchButton'
import PreviousSearchesButton from './components/PreviousSearchesButton'
import SaveSearchModal from './components/SaveSearchModal'
import RemoveSearchModal from './components/RemoveSearchModal'
import SearchesTable from './components/SearchesTable'
import { Form } from 'aurigauikit/components/parsley'
import { Grid } from 'aurigauikit/components/Grid'
import temporaryPanels from 'aurigauikit/components/temporary-panels'
import './basic-filter.less'

const DELAY = 100

class BasicFilter extends React.Component {
  state = {
    mode: 'APPLY',
    search: null,
    showSave: false,
    showRemove: false,
    width: '100%',
    opacity: 1,
    maxHeight: 'none',
    saving: false,
    deleting: false,
    name: '',
  }

  changeSearch = search => this.setState({ search })

  reset = (fallback = true) => {
    if (this.props.onReset) this.props.onReset()
    else if (fallback) window.location.reload()
  }

  openSave = () => this.setState({ showSave: true })

  closeSave = () => this.setState({ showSave: false })

  openRemove = () => this.setState({ showRemove: true })

  closeRemove = () => this.setState({ showRemove: false, deleting: false })

  saveSearch = name => {
    this.setState({ saving: true }, async () => {
      try {
        await this.props.history.onSave(name)
        temporaryPanels.showConfirmatoryTemporaryPanel(`Successfully saved search ${name}`)
        this.closeSave()
      } catch (e) {
        console.error(e) // eslint-disable-line no-console
        temporaryPanels.showCriticalTemporaryPanel(`Error saving search ${name}`)
        throw e
      } finally {
        this.setState({ saving: false, name: '' }, () => this.changeMode('APPLY'))
      }
    })
  }

  removeSearch = search => {
    this.setState({ deleting: true }, async () => {
      try {
        await this.props.history.onRemove(search)
        this.closeRemove()
        if (this.props.history.searches.length === 0) this.changeMode('APPLY')
      } catch (e) {
        this.setState({ deleting: false })
      }
    })
  }

  changeMode = (mode, then) => {
    this.setState({ width: '50%', opacity: 0 }, () => {
      then && then()
      setTimeout(() => {
        this.setState({ mode, width: '100%', opacity: 1 })
      }, DELAY)
    })
  }

  restore = search => {
    this.changeMode('APPLY')
    this.props.history.onRestore(search)
  }

  render() {
    const { onApply, children, textReset, textApply, style, withButtons, history = {} } = this.props

    const { mode, width, opacity, search, showSave, showRemove, deleting, maxHeight } = this.state

    const transition = `width ${DELAY / 1000}s, height ${DELAY / 1000}s, opacity ${DELAY / 1000}s`
    const gridStyle = {
      overflow: 'inherit',
      maxHeight,
      width: `calc(${width} + 20px)`,
      opacity,
      transition,
    }

    return (
      <Form onSubmit={onApply} className="react-basic-filter" style={style}>
        <SaveSearchModal
          onClose={this.closeSave}
          onConfirm={this.saveSearch}
          show={showSave}
          saving={this.state.saving}
        />
        <RemoveSearchModal
          onClose={this.closeRemove}
          onConfirm={this.removeSearch}
          show={showRemove}
          deleting={deleting}
          search={search}
        />
        <Grid style={gridStyle}>
          {mode === 'RESTORE' && (
            <SearchesTable
              data={history.searches}
              search={search}
              onSearchChange={this.changeSearch}
              willDisplayParameters={history.willDisplay}
              onBookmark={history.onBookmark}
              onRemove={this.openRemove}
              metadata={history.metadata}
              onPageChange={history.onPageChange}
              onSort={history.onSort}
              loading={history.loading}
            />
          )}
          {(mode === 'APPLY' || mode === 'SAVE') && children}
          {withButtons && <Grid style={{ marginTop: 10, marginBottom: -55 }}>{withButtons}</Grid>}
          {mode === 'APPLY' && (
            <Grid className="react-basic-filter-buttons">
              <ApplyButton label={textApply} />
              <ResetButton label={textReset} onClick={this.reset} />
              {history.onSave && (
                <SaveSearchButton
                  label={textApply}
                  onClick={() => this.setState({ mode: 'SAVE' })}
                />
              )}
              {history.searches && history.searches.length > 0 && (
                <PreviousSearchesButton
                  label={textReset}
                  onClick={() => this.changeMode('RESTORE')}
                />
              )}
            </Grid>
          )}
          {mode === 'RESTORE' && (
            <Grid className="react-basic-filter-buttons">
              <RestoreButton
                disabled={!search}
                label={textApply}
                onClick={() => this.restore(search)}
              />
              <UndoButton label={textReset} onClick={() => this.changeMode('APPLY')} />
            </Grid>
          )}
          {mode === 'SAVE' && (
            <Grid className="react-basic-filter-buttons">
              <RestoreButton
                disabled={!this.state.name || this.state.saving}
                label={
                  <span>
                    <i className="fa fa-save" style={{ margin: 0, marginRight: 10 }} />
                    Save
                  </span>
                }
                onClick={() => this.saveSearch(this.state.name)}
              />
              <input
                style={{ width: 236, marginLeft: 10, marginRight: 10 }}
                type="text"
                placeholder="Insert name..."
                value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}
              />
              <UndoButton
                label={textReset}
                onClick={() => this.setState({ name: '', mode: 'APPLY' })}
              />
            </Grid>
          )}
        </Grid>
      </Form>
    )
  }
}

export { BasicFilter, BasicFilterElement }
