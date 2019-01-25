import isArray from "lodash/isArray"
import isPlainObject from "lodash/isPlainObject"
import isNull from "lodash/isNull"
import isUndefined from "lodash/isUndefined"

const isParam = value => !isNull(value) && !isUndefined(value) && value !== ""

const param = (query, params, key, prefix = "", forcedKey) => {
  const param = forcedKey || (prefix ? `${prefix}.${key}` : key)
  const value = params[key]
  return [query, `${param}=${value}`].join(query === "" ? "" : "&")
}

const listParam = (query, params, key, prefix = "") => {
  return [
    query,
    params.reduce((query, _, i) => {
      const forcedKey = prefix ? `${prefix}.${key}` : key
      // Objects???
      return param(query, params, i, "", forcedKey)
    }, "")
  ].join(query === "" ? "" : "&")
}

const getQuery = (params, prefix = "", old = "") => (result, key) => {
  const query = [old, result].join(result === "" || old === "" ? "" : "&")
  if (isParam(params[key])) {
    if (isPlainObject(params[key])) {
      const getSubQuery = getQuery(params[key], prefix ? `${prefix}.${key}` : key, query)
      return Object.keys(params[key]).reduce(getSubQuery, "")
    }
    if (isArray(params[key])) return listParam(query, params[key], key, prefix)
    return param(query, params, key, prefix)
  }
  return query
}

export default params => {
  const query = Object.keys(params).reduce(getQuery(params), "")
  const unique = query.split("&").filter((c, i, a) => a.indexOf(c) === i)
  return unique.join(unique.length > 1 ? "&" : "")
}
