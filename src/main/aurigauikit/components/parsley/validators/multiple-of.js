import Parsley from "parsleyjs"

Parsley.addValidator("multipleOf", {
  // requirementType: 'integer',
  validateNumber: function(value, requirement) {
    return 0 === Math.round(value * 10000) % Math.round(requirement * 10000)
  },
  messages: {
    en: "This value should be a multiple of %s",
    fr: "Cette valeur doit être un multiple de %s",
    it: "Il valore dev'essere un multiplo di %s"
  }
})
