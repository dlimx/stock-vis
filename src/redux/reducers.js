import { SET_CODE, SET_DATA, ADD_COMPARE, DELETE_COMPARE } from './actions'

const DEFAULT_STATE = {
  code: '',
  data: [],
  comId: [],
  comData: {}
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

const addCompare = (state, action) => {
  const newState = {}
  let comId = state.comId
  if (comId && comId.indexOf(action.cCode) >= 0) {
    return {...state}
  } else {
    Object.assign(newState, state, {
      comId: [...state.comId, action.cCode],
      comData: {
        ...state.comData,
        [action.cCode]: {
          cCode: action.cCode,
          cData: action.cData
        }
      }})
    return newState
  }
}

const deleteCompare = (state, action) => {
  const newState = {}
  let deleteComId = state.comId.filter((a) => {
    return a !== action.cCode
  })
  delete state.comData[action.cCode]
  Object.assign(newState, state, {
    comId: deleteComId,
    comData: state.comData
  })
  return newState
}

const rootReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case SET_CODE:
      return setCode(state, action)
    case SET_DATA:
      return setData(state, action)
    case ADD_COMPARE:
      return addCompare(state, action)
    case DELETE_COMPARE:
      return deleteCompare(state, action)
    default:
      return state
  }
}

export default rootReducer
