/*
  Auriga Web App Framework – UI Kit
  Session storage support
  Copyright 2016-2017 Auriga S.p.A.
*/

import $ from 'jquery'

$.aurigauikit = {
  ...$.aurigauikit,
  supportedDateFormats: ['DD/MM/YYYY'],
  defaultDateFormat: 'DD/MM/YYYY',
  'temporary-panels-persistence-time': 5000,
  'temporary-panels-auto-dismiss-time': 300,
}

$.fn.exists = function() {
  return this.length > 0
}

Storage.prototype.setObject = function(key, value) {
  this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getObject = function(key) {
  let value = this.getItem(key)
  return value && JSON.parse(value)
}

window.guid = () => {
  console.warn('DEPRECATED: window.guid()')
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return `${S4() + S4()}-${S4()}-4${S4().substr(0, 3)}-${S4()}-${S4() + S4() + S4()}`.toLowerCase()
}
