/*
 Auriga Web App Framework – UI Kit
 Session storage support

 Copyright 2016-2017 Auriga S.p.A.
*/

import $ from "jquery"

class AppStorage {
  constructor(applicationId) {
    this.storage = localStorage
    this.init(applicationId)
  }

  init(applicationId) {
    this.applicationId = applicationId + "-"
  }

  clear() {
    this.storage.clear()
  }

  remove(key) {
    this.storage.removeItem(this.applicationId + key)
  }

  set(key, value) {
    this.setJSON(key, value)
  }

  get(key) {
    return this.getJSON(key)
  }

  setJSON(key, value) {
    this.storage.setItem(this.applicationId + key, JSON.stringify(value))
  }

  getJSON(key) {
    const value = this.storage.getItem(this.applicationId + key)
    if (value) return JSON.parse(value)
  }

  dump() {
    $.each(this.storage, function(k, v) {
      /* eslint-disable no-console */
      try {
        console.log(k, JSON.parse(v))
      } catch (e) {
        console.log(k, v)
      }
      /* eslint-enable no-console */
    })
  }
}

export default AppStorage

window.reactAppStorage = new AppStorage()
