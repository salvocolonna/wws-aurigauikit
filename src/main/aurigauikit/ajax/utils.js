import AppStorage from 'aurigauikit/app-storage'
import getParams from './params'
import { RESPONSE, ST_START, TOKEN_END } from './constants'

export const isResponseType = resourceOrType => {
  return (
    resourceOrType === RESPONSE.JSON ||
    resourceOrType === RESPONSE.BLOB ||
    resourceOrType === RESPONSE.TEXT ||
    resourceOrType === RESPONSE.RAW
  )
}

export const getSessionToken = () => {
  const wwsisAppStorage = new AppStorage('wwsis')
  const auth = wwsisAppStorage.getJSON('auth')
  return auth != null ? `${ST_START}${auth.session_token}${TOKEN_END}` : null
}

const getHeaders = headers => {
  const requestHeaders = new Headers()
  const append = key => requestHeaders.append(key, headers[key])
  Object.keys(headers).forEach(append)
  return requestHeaders
}

export const createRequest = (method, api, headers, resource, body) => {
  const options = { method, body, headers: getHeaders(headers) }
  return new Request(`${api}/${resource}`, options)
}

export const withParams = (resource, params) => {
  if (params) return `${resource}?${getParams(params)}`
  return resource
}

export const getURL = ({
  protocol = location.protocol.substring(0, location.protocol.length - 1),
  hostname = location.hostname,
  port = location.port,
  ['context-path']: contextPath = '',
  version = 1,
}) => `${protocol}://${hostname}${port ? ':' + port : ''}${contextPath}/api/v${version}`
