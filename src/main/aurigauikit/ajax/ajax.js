/*
Auriga Web App Framework – UI Kit
Session storage support

Copyright 2016-2018 Auriga S.p.A.
*/

import i18n from "../i18n"

import { RESPONSE, REQUEST, API_KEY } from "./constants"
import RequestMaker from "./request-builder"

import { getSessionToken, isResponseType } from "./utils"

const getURL = ({
  protocol = "http",
  hostname = location.hostname,
  port = 8080,
  ["context-path"]: contextPath = ""
}) => `${protocol}://${hostname}:${port}${contextPath}/api/v1`

class Ajax extends RequestMaker {
  constructor(frontend, backend) {
    super()

    this.api = typeof backend === "string" ? `/${backend}/api/v1` : getURL(backend)

    const apiKey = API_KEY[frontend]
    const sessionToken = getSessionToken()
    const authorization = sessionToken ? `${apiKey}, ${sessionToken}` : apiKey

    this.headers = {
      "Content-Type": "application/json",
      "Accept-Language": i18n.getCurrentLanguage(),
      Authorization: authorization
    }
  }

  http = (method, resourceOrType, { data, params, options }) => {
    if (isResponseType(resourceOrType)) {
      const type = resourceOrType
      if (method === "GET" || method === "DELETE") {
        return (resource, params, options) => {
          return this[REQUEST](method, resource, {
            params,
            options,
            type
          })
        }
      } else {
        return (resource, data, params, options) => {
          return this[REQUEST](method, resource, {
            params,
            data,
            options,
            type
          })
        }
      }
    }
    const resource = resourceOrType
    const type = RESPONSE.JSON
    return this[REQUEST](method, resource, {
      params,
      data,
      options,
      type
    })
  }

  get = (resourceOrType, params, options) => this.http("GET", resourceOrType, { params, options })

  delete = (resourceOrType, params, options) =>
    this.http("DELETE", resourceOrType, { params, options })

  post = (resourceOrType, data, params, options) =>
    this.http("POST", resourceOrType, { data, params, options })

  put = (resourceOrType, data, params, options) =>
    this.http("PUT", resourceOrType, { data, params, options })

  getRaw = this.get(RESPONSE.RAW)
  deleteRaw = this.delete(RESPONSE.RAW)
  postRaw = this.post(RESPONSE.RAW)
  putRaw = this.put(RESPONSE.RAW)

  getText = this.get(RESPONSE.TEXT)
  deleteText = this.delete(RESPONSE.TEXT)
  postText = this.post(RESPONSE.TEXT)
  putText = this.put(RESPONSE.TEXT)

  getBlob = this.get(RESPONSE.BLOB)
  deleteBlob = this.delete(RESPONSE.BLOB)
  postBlob = this.post(RESPONSE.BLOB)
  putBlob = this.put(RESPONSE.BLOB)

  async [REQUEST](method, resource, { data, params, options, type }) {
    const { request, fetchOptions } = this.create({
      headers: this.headers,
      api: this.api,
      method,
      resource,
      data,
      params,
      options
    })
    const response = await fetch(request, fetchOptions)
    if (response.ok) {
      if (response.status !== 204) {
        return await {
          [RESPONSE.JSON]: async () => {
            const json = await response.json()
            return params && params._metadata ? json : json.content || json
          },
          [RESPONSE.TEXT]: () => response.text(),
          [RESPONSE.BLOB]: () => response.blob(),
          [RESPONSE.RAW]: () => response
        }[type]()
      }
    } else {
      const text = await response.text()
      throw {
        status: response.status,
        statusText: response.statusText,
        errors: text === "" ? [] : JSON.parse(text).errors
      }
    }
  }
}

const instances = {}

export * from "./constants"
export * from "./utils"
export default frontend => backend => {
  const key = `${typeof backend === "string" ? `/${backend}/api/v1` : getURL(backend)}_${frontend}`
  if (!instances[key]) instances[key] = new Ajax(frontend, backend)
  return instances[key]
}
