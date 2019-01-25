// Extract missingMessages from translations

import fs from "fs"
import path from "path"

const PLACEHOLDER = ""

const PLUGIN = "MissingTranslations"

export default class MissingTranslations {
  constructor({
    path,
    languages = ["en", "it"],
    defaultLanguage = "en",
    includeExisting = false,
    placehold = true,
    filter
  }) {
    this.path = path
    this.defaultLanguage = defaultLanguage
    this.languages = languages
    this.includeExisting = includeExisting
    this.placehold = placehold
    this.filter = filter
  }

  static extractorName = "metadataMissingTranslations"

  find = (language, messages) => {
    let existing = {}
    if (fs.existsSync(path.resolve(__dirname, `${this.path}/${language}.json`)))
      existing = require(`${this.path}/${language}.json`)

    const exists = message =>
      !existing[message.id] || existing[message.id].startsWith(`$[${this.defaultLanguage}] `)
    const missingMessages = messages.filter(exists)

    const translations = missingMessages.reduce((translations, message) => {
      const translation =
        language !== this.defaultLanguage
          ? this.placehold
            ? `$[${this.defaultLanguage}] ${message.defaultMessage}`
            : PLACEHOLDER
          : message.defaultMessage || PLACEHOLDER
      return { ...translations, [message.id]: translation }
    }, {})

		console.warn(Object.keys(translations).length, "missing messages for lang", language) // eslint-disable-line
    const existingTranslations = this.includeExisting ? existing : {}

    return { ...sortObject(translations), ...sortObject(existingTranslations) }
  }

  apply(compiler) {
    const messages = []
    compiler.hooks.compilation.tap(PLUGIN, compilation => {
      compilation.hooks.normalModuleLoader.tap(PLUGIN, (context, module) => {
        context[MissingTranslations.extractorName] = metadata => {
          if (metadata["react-intl"]) {
            if (this.filter) {
              metadata["react-intl"].messages.forEach(message => {
                if (this.filter(module.resource, message.id)) messages.push(message)
              })
            } else messages.push(...metadata["react-intl"].messages)
          }
        }
      })
    })
    compiler.hooks.emit.tapAsync(PLUGIN, (compilation, callback) => {
      this.languages.forEach(language => {
        const missingTranslations = this.find(language, messages)
        const source = JSON.stringify(missingTranslations, 0, 2)
        compilation.assets[`missing-translations/${language}.json`] = {
          source: () => source,
          size: () => source.length
        }
      })
      callback()
    })
  }
}

function sortObject(o) {
  let sorted = {}
  let key
  let a = []
  for (key in o) if (o.hasOwnProperty(key)) a.push(key)
  a.sort()
  for (key = 0; key < a.length; key++) sorted[a[key]] = o[a[key]]
  return sorted
}
