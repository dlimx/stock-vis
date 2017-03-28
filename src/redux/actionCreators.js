import { SET_CODE, SET_DATA } from './actions'

export function setCode (code) {
  return { type: SET_CODE, code }
}

export function setData (data) {
  return { type: SET_DATA, data }
}
