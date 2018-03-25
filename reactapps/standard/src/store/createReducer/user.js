import createStore from '../createStore'
import update from 'immutability-helper'

const initialStore = null

const actions = {
  SET_USER: 'SET_USER'
}

export function setUser(user) {
  return {
    action: actions.SET_USER,
    data: user,
  }
}

export default createStore(initialStore, {
  [actions.SET_USER]: (state, { data }) => {
    return data
  },
})
