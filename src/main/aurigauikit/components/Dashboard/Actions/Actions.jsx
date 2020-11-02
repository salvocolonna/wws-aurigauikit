import React from 'react'
import { FormattedMessage as Msg } from 'react-intl'
import messages from './messages'
import './style.less'

export default ({
  onSave,
  onBuild,
  onAdd,
  onEdit,
  onUndo,
  editable,
  canAdd,
  canBuild,
  canEdit = true,
  saving,
}) => (
  <div className="dashboard-actions" style={{ textAlign: 'right' }}>
    {/* {!editable && canBuild && (
      <button
        style={{ width: 180, marginRight: canEdit ? 20 : 0 }}
        className="btn btn-primary-outline"
        onClick={onBuild}>
        Build widget
      </button>
    )} */}
    {canBuild && (
      <button
        style={{ width: 180 }}
        className="btn btn-primary"
        disabled={editable || saving}
        onClick={onBuild}
      >
        <Msg {...messages.buildWidget} />
      </button>
    )}
    {editable && canAdd && (
      <button disabled={saving} style={{ width: 180 }} className="btn btn-primary" onClick={onAdd}>
        <Msg {...messages.addWidget} />
      </button>
    )}
    {canEdit && !editable && (
      <button style={{ width: 180 }} className="btn btn-primary" onClick={onEdit}>
        <Msg {...messages.editLayout} />
      </button>
    )}
    {editable && (
      <button
        disabled={saving}
        style={{ width: 180 }}
        className="btn btn-primary-outline"
        onClick={onUndo}
      >
        <Msg {...messages.undoEditLayout} />
      </button>
    )}
    {/* {editable && canAdd && (
      <button
        disabled={saving}
        style={{ width: 180 }}
        className="btn btn-primary"
        onClick={onAdd}>
        <Msg {...messages.addWidget} />
      </button>
    )} */}
    {editable && (
      <button
        disabled={saving}
        style={{ width: 180 }}
        className="btn btn-confirmatory"
        onClick={onSave}
      >
        {saving ? <Msg {...messages.saving} /> : <Msg {...messages.saveLayout} />}
      </button>
    )}
  </div>
)
