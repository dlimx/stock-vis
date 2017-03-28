import { SET_CODE, SET_DATA } from './actions'

const DEFAULT_STATE = {
  searchTerm: '',
  data: [[]]
}

const setCode = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {code: action.code})
  return newState
}

const setData = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {data: action.data})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CODE:
      return setCode(state, action)
    case SET_DATA:
      return setData(state, action)
    default:
      return state
  }
}

export default rootReducer
