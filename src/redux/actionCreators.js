import { SET_CODE, SET_DATA, ADD_COMPARE, DELETE_COMPARE } from './actions'

export function setCode (code) {
  return { type: SET_CODE, code }
}

export function setData (data) {
  return { type: SET_DATA, data }
}

export function addCompare (cCode, cData) {
  return { type: ADD_COMPARE, cCode, cData }
}

export function deleteCompare (cCode) {
  return { type: DELETE_COMPARE, cCode }
}
