/*
 Auriga Web App Framework – UI Kit
 Temporary Panels Message Queue

 Copyright 2016 Auriga S.p.A.
 */

/*
 Automatically shows next messages in queue when the page loads
 */

import $ from 'jquery'

$(() => $.messagesQueue.dequeue())

/*
 Message Queue implementation
 */

let _cookieKey = '_auik_temporary_messages'
let _messages

function TemporaryPanelMessageQueue() {
  this.init()
}

$.extend(TemporaryPanelMessageQueue.prototype, {
  init: function() {
    _messages = sessionStorage.getItem(_cookieKey)

    if (!_messages) {
      _messages = []
    } else {
      _messages = JSON.parse(_messages)
    }
  },

  enqueue: function(text, style) {
    _messages.unshift({
      text: text,
      style: style,
      timestamp: new Date(),
    })
    sessionStorage.setItem(_cookieKey, JSON.stringify(_messages))
  },

  dequeue: function() {
    let message = _messages.pop()

    if (typeof message === 'undefined') {
      return false
    } else {
      $.showTemporaryPanel(message.text, message.style)
      sessionStorage.setItem(_cookieKey, JSON.stringify(_messages))
      return true
    }
  },

  length: function() {
    return _messages.length
  },
})

$.messagesQueue = new TemporaryPanelMessageQueue()
