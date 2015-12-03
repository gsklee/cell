// Web App Initter
// ===============
//
// This file configures Redux and kicks off the rendering of the web app.
//
// Import Modules
// --------------
//
// ### NPM Modules

import 'babel-core/polyfill';
import React from 'react'; // Required by JSX
import {render} from 'react-dom';
import {applyMiddleware, createStore, combineReducers} from 'redux';
import ReduxPromise from 'redux-promise';
import createLogger from 'redux-logger';
import {Provider} from 'react-redux';

// ### Local Modules

import {defaultState} from 'scripts/configs';
import {reduceToObject} from 'scripts/helpers';
import * as reducers from 'scripts/reducers';
import App from 'scripts/containers/App';

// Configure Redux Store
// ---------------------
//
// > configureStore : Function
//
// (Reducer, ?State) -> (
//   StoreCreator
//   -> StoreEnhancer: StoreCreator
//   -> StoreEnhancer: StoreCreator
// ): Store
//
// Apply the following [Redux middleware](https://github.com/rackt/redux/blob/master/docs/advanced/Middleware.md):
//
// * [Redux Promise](https://github.com/acdlite/redux-promise) - Enable promise-based async actions
// * [Redux Logger](https://github.com/fcomb/redux-logger) - Add action logger

function configureStore (initialState) {
  return applyMiddleware(
    ReduxPromise,
    createLogger()
  )(
    createStore
  )(
    // ### Create the Root Reducer
    //
    // Create the root reducer by combining meta-reducers, which are formed by organizing reducers according to the shape of the state tree.
    //
    // Note that the initial value of the `reduce()` call is not an empty object, but contains `formReducer` from [Redux Form](https://github.com/erikras/redux-form), with `reducers.form` being plugged into it.
    //
    // Do ***not*** pass `reducers.form` directly into `plugin()` because `reducers.form` contains a `default` property not intended for consumption.
    //
    // See also https://github.com/babel/babel/issues/2544.

    combineReducers(
      defaultState::reduceToObject((_, stateName) => combineReducers(reducers[stateName]))
    ),

    initialState
  );
}

// Render the Web App
// ------------------
//
// Render the React entry container `< App/>` - which is wrapped inside the Redux container `< Provider/>` - in `<#app/>`.

render(
  <Provider store = {configureStore()}>
    <App/>
  </Provider>,

  document.getElementById('app')
);
