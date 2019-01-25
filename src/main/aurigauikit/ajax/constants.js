export const WWSAM = "WWSAM"
export const WWSCA = "WWSCA"
export const WWSBAM = "wwsbam_frontend"
export const WWSCM = "wwscm_branch"

export const AK_START = "API-KEY/"
export const ST_START = "API-TOKEN/"
export const TOKEN_END = ":"

export const RESPONSE = {
  JSON: Symbol("JSON"),
  BLOB: Symbol("BLOB"),
  TEXT: Symbol("TEXT"),
  RAW: Symbol("RAW")
}

export const API_KEY = {
  [WWSCA]: `${AK_START}0be3584373d541c7b388215755ab199f${TOKEN_END}`,
  [WWSCM]: `${AK_START}DE01524BCAF645CBB1A29D92F0B5BA1C${TOKEN_END}`,
  [WWSAM]: `${AK_START}DE01524BCAF645CBB1A29D92F0B5BA1D${TOKEN_END}`,
  [WWSBAM]: `${AK_START}0be3584373d541c7b388215755ab199f${TOKEN_END}`
}

export const REQUEST = Symbol("REQUEST")

export const CUSTOMHEADERS = Symbol("CUSTOM_HEADERS")
export const FETCHOPTIONS = Symbol("FETCH_OPTIONS")
export const RAWBODY = Symbol("RAW_BODY")
export const AUTOCONTENTTYPE = Symbol("AUTO_CONTENT_TYPE")
export const RESET = Symbol("RESET")
export const SET = Symbol("SET")
