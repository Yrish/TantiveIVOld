import { createStore, applyMiddleware, compose } from 'redux'
import createReducer from "./createReducer"

const initialStore = {}
const middleware = []
const enhancers = []

if (process.env.NODE_ENV == 'dev') {
  const devToolsExtension = window.devToolsExtension

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const compEnhancers = compose(
  applyMiddleware(...middleware), ...enhancers
)

const store = createStore(
  createReducer(),
  initialStore,
  compEnhancers,
)

store.dynamicReducers = {}

export function addReducer(name, reducer) {
  store.dynamicReducers[name] = reducer
  store.replaceReducer(createReducer(store.dynamicReducers))
}

export default store
