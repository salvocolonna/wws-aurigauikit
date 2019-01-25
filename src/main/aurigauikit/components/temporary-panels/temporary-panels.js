/*
 Auriga Web App Framework – UI Kit
 Temporary Panels

 Copyright 2016 Auriga S.p.A.
 */

import $ from "jquery"
import React from "react"
import ReactDOMServer from "react-dom/server"

$.showInfoTemporaryPanel = function(message) {
  return $.showTemporaryPanel(message, "info")
}

$.showConfirmatoryTemporaryPanel = function(message) {
  return $.showTemporaryPanel(message, "confirmatory")
}

$.showWarningTemporaryPanel = function(message) {
  return $.showTemporaryPanel(message, "warning")
}

$.showCriticalTemporaryPanel = function(message) {
  return $.showTemporaryPanel(message, "critical")
}

$.showTemporaryPanel = function(message, style, iconName) {
  const defaultIcons = {
    info: "fa-info-circle",
    confirmatory: "fa-check-circle",
    warning: "fa-exclamation-triangle",
    critical: "fa-exclamation-circle"
  }

  const animationTime = $.aurigauikit["temporary-panels-auto-dismiss-time"]
  const persistenceTime = $.aurigauikit["temporary-panels-persistence-time"]

  iconName = typeof iconName === "undefined" ? defaultIcons[style] : iconName

  let html = ReactDOMServer.renderToString(
    <div
      id="_temporary-panel"
      className={`temporary-panel temporary-panel-${style}`}
      style={{ zIndex: 5000 }}>
      <i className={`fa ${iconName} fa-1x`} />
      <span> {message} </span>
      <i className="fa fa-times" />
    </div>
  )

  let panel = $("#_temporary-panel")
  // avoid panel overlapping
  if (panel.exists()) panel.remove()
  $("body").append(html)
  panel = $("#_temporary-panel")

  const _hideAndRemovePanel = function() {
    panel.shiftUp(animationTime, function() {
      panel.remove()

      // show next message if present
      $.messagesQueue.dequeue()
    })
  }

  // add custom click handler with element removal support
  $("#_temporary-panel .fa.fa-times").click(function() {
    panel.shiftUp(animationTime, _hideAndRemovePanel)
  })

  //
  // show panel
  //
  panel.css("display", "block")
  panel.shiftDown(animationTime)

  // auto hide panel after animationTime
  setTimeout(function() {
    _hideAndRemovePanel()
  }, persistenceTime)
}

/*
 Animate an element shifting it down (change only position)
 */
$.fn.shiftDown = function(animationTime, callback) {
  let tp = $(this)
  tp.css("top", -tp.outerHeight())
  tp.animate({ opacity: 1, top: 0 }, animationTime, "swing", callback)
}

/*
 Animate an element shifting it up (change only position)
 */
$.fn.shiftUp = function(animationTime, callback) {
  let tp = $(this)
  tp.animate({ opacity: 1, top: -tp.outerHeight() }, animationTime, "swing", callback)
}
