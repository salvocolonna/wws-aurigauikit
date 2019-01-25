import Parsley from "parsleyjs"

Parsley.addValidator("phone", {
  validateString: function(value) {
    return /^[0-9]{10}$/.test(value)
  },
  messages: {
    en: "This mobile phone is not correct",
    it: "Il numero non è corretto"
  }
})
