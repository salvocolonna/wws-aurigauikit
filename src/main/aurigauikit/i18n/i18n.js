import AppStorage from "aurigauikit/app-storage"

const appStorage = new AppStorage()

const i18n = window.i18n || {
  defaultLanguage: navigator.language.split("-")[0],
  messages: {},
  loadMessages: (lang, messages) =>
    (i18n.messages[lang] = {
      ...i18n.messages[lang],
      ...messages
    }),
  setCurrentLanguage: function(lang) {
    lang = typeof lang === "undefined" || lang == null ? this.defaultLanguage : lang.toLowerCase()
    appStorage.set("_lang", lang)
  },
  getCurrentLanguage: function() {
    const lang = appStorage.get("_lang")
    if (typeof lang === "undefined" || lang == null) {
      appStorage.set("_lang", this.defaultLanguage)
      return this.defaultLanguage
    }
    return lang
  }
}

export default i18n
