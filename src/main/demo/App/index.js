import '@babel/polyfill'
import 'whatwg-fetch'
import ReactDOM from 'react-dom'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import moment from 'moment'
import { IntlProvider, addLocaleData } from 'react-intl'
import Parsley from 'aurigauikit/components/parsley'
import 'aurigauikit/style/main.less'
import 'aurigauikit/style/ant-override.less'
import i18n from 'aurigauikit/i18n'
import 'aurigauikit/commons'
import 'aurigauikit/components/temporary-panels'
import SidebarDemo from './SidebarDemo'
import TopbarDemo from './TopbarDemo'
import 'aurigauikit/i18n/i18n-lang-en'
import 'aurigauikit/i18n/i18n-lang-it'
import 'aurigauikit/i18n/i18n-lang-fr'
import { createPage } from 'aurigauikit/components/Page'
import Demo from './App'

const langs = {
  it: require('react-intl/locale-data/it'),
  fr: require('react-intl/locale-data/fr'),
  en: require('react-intl/locale-data/en'),
}

const langAndCountryCode = navigator.language
const langCode = langAndCountryCode.split('-')[0]
Parsley.setLocale(langCode)
moment.locale(langAndCountryCode)
addLocaleData(langs[langCode])

window.ANT_LAYOUT = true

const render = () => {
  const App = createPage(TopbarDemo, SidebarDemo)(Demo)
  const rerender = () => {
    window.ANT_LAYOUT = !window.ANT_LAYOUT
    render()
  }
  ReactDOM.render(
    <IntlProvider locale={langAndCountryCode} messages={i18n.messages[langCode]}>
      <BrowserRouter>
        <App rerender={rerender} />
      </BrowserRouter>
    </IntlProvider>,
    document.getElementById('app')
  )
}

render()
