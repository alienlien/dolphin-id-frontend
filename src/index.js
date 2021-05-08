import React from 'react';
// import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import rootReducer from './reducers'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore, compose } from 'redux'
import { render } from 'react-dom'
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas/index';

const sagaMiddleware = createSagaMiddleware()

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const store = createStore(reducers, /* preloadedState, */ composeEnhancers(
//     applyMiddleware(promise)
// ));

const store = createStore(
    rootReducer, /* preloadedState, */
    composeEnhancers(
        applyMiddleware(sagaMiddleware),
    ),
)

sagaMiddleware.run(rootSaga)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
