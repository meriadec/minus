import { createStore, applyMiddleware, compose } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'

import reducer from 'reducers'
import api from 'middlewares/api'

export default (history, initialState) => {
  const devTools = __BROWSER__ && window.devToolsExtension ? window.devToolsExtension() : f => f
  const middlewares = [routerMiddleware(history), thunk, api]
  const enhancers = compose(applyMiddleware(...middlewares), devTools)
  const store = createStore(reducer, initialState, enhancers)

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}
