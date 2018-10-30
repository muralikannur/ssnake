import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import setupSocket from './sockets'
import reducers from './reducers'
import handleNewMessage from './sagas'
//import username from './utils/name'
import {login,addUser} from './actions'


const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const enhancer = composeEnhancers(
  applyMiddleware(sagaMiddleware),
);

const store = createStore(
	reducers,
	enhancer
)

let gameConfig = {userid:0}

//let userName = prompt("Please enter your name");
const socket = setupSocket(store.dispatch)


sagaMiddleware.run(handleNewMessage, {socket})


ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, 
	document.getElementById('root')
	);
registerServiceWorker();



