import { CUSTOMHEADERS, FETCHOPTIONS, RAWBODY, AUTOCONTENTTYPE } from "./constants"

import { createRequest, withParams } from "./utils"

class RequestHolder {
  constructor(context) {
    this.context = context
    this.unset()
  }

  unset() {
    this.context[CUSTOMHEADERS] = {}
    this.context[FETCHOPTIONS] = {}
    this.context[RAWBODY] = false
    this.context[AUTOCONTENTTYPE] = false
  }

  get(type) {
    return this.context[type]
  }

  set(type, value) {
    this.context[type] = value
    return this.context
  }
}

export default class {
  constructor() {
    this.requestHolder = new RequestHolder(this)
  }

  create = ({
    headers: currentHeaders,
    api,
    method,
    resource,
    data,
    params,
    options = this.requestHolder.get(FETCHOPTIONS)
  }) => {
    const {
      ["Content-Type"]: contentType, // eslint-disable-line no-unused-vars
      ...defaultHeaders
    } = currentHeaders

    const headers = this.requestHolder.get(AUTOCONTENTTYPE) ? defaultHeaders : currentHeaders

    const request = createRequest(
      method,
      api,
      { ...headers, ...this.requestHolder.get(CUSTOMHEADERS) },
      withParams(resource, { _metadata: false, ...params }),
      data && this.requestHolder.get(RAWBODY) ? data : JSON.stringify(data)
    )

    this.requestHolder.unset()

    return { request, options }
  }

  withFetchOptions = fetchOptions => this.requestHolder.set(FETCHOPTIONS, fetchOptions)

  withCustomHeaders = customHeaders => this.requestHolder.set(CUSTOMHEADERS, customHeaders)

  withAutoContentType = () => this.requestHolder.set(AUTOCONTENTTYPE, true)

  withRawBody = () => this.requestHolder.set(RAWBODY, true)
}
