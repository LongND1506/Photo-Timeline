import { createStore, applyMiddleware,compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import rootReducer from './reducer'
import mySaga from './saga/sagas'
import jwt from 'jsonwebtoken'
import * as actions from './actions'
const persistConfig = {
  key: 'root',
  storage:storage,
  blacklist:['auth']
}
const persistedReducer = persistReducer(persistConfig, rootReducer)
//Require Auth middleware
const authMiddleware=({dispatch,getState})=>next=>action=>{
  let token=localStorage.getItem('token')
  if(token&&jwt.decode(token).exp<Date.now()/1000){
      return next(actions.tokenExpired()) 
  }
  return next(action)
}
// create the saga middleware
const sagaMiddleware = createSagaMiddleware()  

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(authMiddleware,sagaMiddleware)
  // other store enhancers if any
);
export const store = createStore(
    rootReducer,
    enhancer
)
export const persistor = persistStore(store)
// then run the saga
sagaMiddleware.run(mySaga)

// render the application