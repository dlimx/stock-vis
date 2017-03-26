import { SET_CODE } from './actions'

const DEFAULT_STATE = {
  searchTerm: ''
}

const setCode = (state, action) => {
  const newState = {}
  Object.assign(newState, state, {code: action.code})
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CODE:
      return setCode(state, action)
    default:
      return state
  }
}

export default rootReducer
