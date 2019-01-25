import React from "react"
import { FormattedMessage as Msg } from "react-intl"
import Loader from "aurigauikit/components/Loader"
import messages from "./messages"

export default ({
  onSave,
  onAdd,
  onEdit,
  onUndo,
  editable,
  canAdd,
  canBuild,
  canEdit = true,
  onBuild,
  saving
}) => (
  <div style={{ textAlign: "right", marginTop: 40, marginRight: 40 }}>
    {!editable &&
      canBuild && (
        <button
          style={{ width: 180, marginRight: canEdit ? 20 : 0 }}
          className="btn btn-primary-outline"
          onClick={onBuild}>
          Build widget
        </button>
      )}
    {canEdit &&
      !editable && (
        <button style={{ width: 180 }} className="btn btn-primary" onClick={onEdit}>
          <Msg {...messages.editLayout} />
        </button>
      )}
    {editable && (
      <button
        disabled={saving}
        style={{ width: 180, marginRight: 20 }}
        className="btn btn-primary-outline"
        onClick={onUndo}>
        <Msg {...messages.undoEditLayout} />
      </button>
    )}
    {editable &&
      canAdd && (
        <button
          disabled={saving}
          style={{ width: 180, marginRight: 20 }}
          className="btn btn-primary"
          onClick={onAdd}>
          <Msg {...messages.addWidget} />
        </button>
      )}
    {editable && (
      <button
        disabled={saving}
        style={{ width: 180 }}
        className="btn btn-confirmatory"
        onClick={onSave}>
        {saving ? <Msg {...messages.saving} /> : <Msg {...messages.saveLayout} />}
      </button>
    )}
  </div>
)
