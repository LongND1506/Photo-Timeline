import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import {store} from './main'
import  {persistor} from './main'
import { PersistGate } from 'redux-persist/integration/react'
import * as actions from './actions'
import jwt from 'jsonwebtoken'
import styles from 'react-responsive-carousel/lib/styles/carousel.min.css';
//Check for token and update application state if required
const token = localStorage.getItem('token');
if (token) {
    if(jwt.decode(token).exp>Date.now()/1000)
         store.dispatch(actions.persistLoginState())
    else
        localStorage.removeItem('token')
}
// const store=createStore(rootReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
    <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
            <BrowserRouter>
                <App />
            </BrowserRouter>
        {/* </PersistGate> */}
    </Provider> 
, document.getElementById('root'));
registerServiceWorker();
