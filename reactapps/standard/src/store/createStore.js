export default function createStore(initialState, handlers) {
  return (state = initialState, action) => {
    return handlers[action.action] ? handlers[action.action](state, action) : state
  }
}
