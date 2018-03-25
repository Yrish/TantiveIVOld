import { combineReducers } from 'redux'
import userReducer from "./user"

export default function createReducer(reducers) {
  return combineReducers({user: userReducer, ...reducers})
}
