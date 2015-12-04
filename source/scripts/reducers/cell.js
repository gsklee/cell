// Example Reducer
// ===============
//
// This file defines a Redux reducer example.
//
// Import Modules
// --------------
// ### NPM Modules

import {keys} from 'bound-native-methods/object';

// ### Local Modules

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

function isReactive (payload) {
  return payload::keys().every(reactant => payload[reactant] > 0);
}

// Export Module
// -------------
//
// This module contains Redux reducers described in the following [labelled state transition system](http://www.mcrl2.org/dev/user_manual/articles/lts.html) schema.
//
// See also https://en.wikipedia.org/wiki/Transition_system.

export default createReducers({
  H: {
    phosphorylate: (state, action) => isReactive(action.payload) ? state + 1 : state
  },

  ADP: {
    phosphorylate: (state, action) => isReactive(action.payload) ? state + 1 : state
  },

  ATP: {
    phosphorylate: (state, action) => isReactive(action.payload) ? state - 1 : state
  },

  Glc: {
    addGlucose: (state, action) => state + 60,

    phosphorylate: (state, action) => action.payload.Glc && isReactive(action.payload) ? state - 1 : state
  },

  G6P: {
    phosphorylate: (state, action) => action.payload.Glc && isReactive(action.payload) ? state + 1 : state,

    interconvert: (state, action) => action.payload[0].G6P && isReactive(action.payload[+action.payload.isReversing]) ? state - (action.payload.isReversing ? -1 : 1) : state
  },

  F6P: {
    interconvert: (state, action) => action.payload[0].G6P && isReactive(action.payload[+action.payload.isReversing]) ? state + (action.payload.isReversing ? -1 : 1) : state,

    phosphorylate: (state, action) => action.payload.F6P && isReactive(action.payload) ? state - 1 : state
  },

  F16BP: {
    phosphorylate: (state, action) => action.payload.F6P && isReactive(action.payload) ? state + 1 : state,

    interconvert: (state, action) => action.payload[0].F16BP && isReactive(action.payload[+action.payload.isReversing]) ? state - (action.payload.isReversing ? -1 : 1) : state
  },

  GADP: {
    interconvert: (state, action) => action.payload[0].F16BP && isReactive(action.payload[+action.payload.isReversing]) ? state + (action.payload.isReversing ? -1 : 1)
                                   : action.payload[0].DHAP && isReactive(action.payload[+action.payload.isReversing]) ? state + (action.payload.isReversing ? -1 : 1)
                                   : state
  },

  DHAP: {
    interconvert: (state, action) => action.payload[0].F16BP && isReactive(action.payload[+action.payload.isReversing]) ? state + (action.payload.isReversing ? -1 : 1)
                                   : action.payload[0].DHAP && isReactive(action.payload[+action.payload.isReversing]) ? state - (action.payload.isReversing ? -1 : 1)
                                   : state
  }
}, defaultState.cell);
