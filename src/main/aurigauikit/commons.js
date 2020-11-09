/*
  Auriga Web App Framework – UI Kit
  Session storage support
  Copyright 2016-2017 Auriga S.p.A.
*/

import $ from 'jquery'
import { v4 as uuid } from 'uuid'

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

window.guid = uuid
