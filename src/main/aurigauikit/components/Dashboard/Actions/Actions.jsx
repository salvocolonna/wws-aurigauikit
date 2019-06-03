import React from 'react'
import { FormattedMessage as Msg } from 'react-intl'
import Loader from 'aurigauikit/components/Loader'
import messages from './messages'
import './style.less'

export default ({
  onSave,
  onAdd,
  onEdit,
  onUndo,
  editable,
  canAdd,
  canEdit = true,
  saving,
  margin = 40,
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
    {!editable && canAdd && (
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
