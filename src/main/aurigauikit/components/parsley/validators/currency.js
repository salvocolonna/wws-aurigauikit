import Parsley from "parsleyjs"

Parsley.addValidator("currency", {
  requirementType: "string",
  validateString: function(value, requirement) {
    if (typeof value === "undefined" || value == null || value.length == 0) {
      return false
    }
    if (requirement.length == 0) {
      return false
    }

    if (typeof value !== "string") {
      value += ""
    }

    value = value.trim()

    let _hasSign = function(text) {
      let c = text.substring(0, 1)
      return c == "+" || c == "-"
    }

    let _countParts = function(text, allowSign, decimalSeparator) {
      if (typeof decimalSeparator === "undefined") {
        // TODO: localize
        decimalSeparator = "."
      }
      let p = text.indexOf(decimalSeparator)

      let result = [0, 0]
      if (p == -1) {
        result[0] = text.length
      } else {
        result[0] = text.substr(0, p).length
        result[1] = text.substr(p + decimalSeparator.length).length
      }

      if (allowSign) {
        result[0]--
      }

      return result
    }

    let allowSign = _hasSign(requirement)
    let hasSign = _hasSign(value)

    let requirementParts = _countParts(requirement, allowSign, "[.]")
    let valueParts = _countParts(value, hasSign)

    if (hasSign && !allowSign) {
      return false
    }

    if (valueParts[0] > requirementParts[0] || valueParts[1] > requirementParts[1]) {
      return false
    }

    return true
  },
  messages: {
    en: "This field must contain a valid currency amount.",
    it: "Questo campo deve contenere un importo valido."
  }
})
