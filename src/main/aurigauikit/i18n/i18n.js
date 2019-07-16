import AppStorage from 'aurigauikit/app-storage'

const appStorage = new AppStorage('i18n')

const i18n = window.i18n || {
  defaultLanguage: navigator.language.split('-')[0],
  messages: {},
  loadMessages: (lang, messages) =>
    (i18n.messages[lang] = {
      ...i18n.messages[lang],
      ...messages,
    }),
  setCurrentLanguage: function(lang) {
    lang = typeof lang === 'undefined' || lang == null ? this.defaultLanguage : lang.toLowerCase()
    appStorage.set('-language', lang)
  },
  getCurrentLanguage: function() {
    const lang = appStorage.get('-language')
    if (typeof lang === 'undefined' || lang == null) {
      appStorage.set('-language', this.defaultLanguage)
      return this.defaultLanguage
    }
    return lang
  },
}

export default i18n
