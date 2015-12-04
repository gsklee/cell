// Example Reducer
// ===============
//
// This file defines a Redux reducer example.
//
// Import Modules
// --------------
//
// ### Local Modules

import {defaultState} from 'scripts/configs';
import {createReducers} from 'scripts/helpers';

// Export Module
// -------------
//
// This module contains Redux reducers described in the following [labelled state transition system](http://www.mcrl2.org/dev/user_manual/articles/lts.html) schema.
//
// See also https://en.wikipedia.org/wiki/Transition_system.

export default createReducers({
  H: {
    phosphorylate: (state, action) => state + 1
  },

  ADP: {
    phosphorylate: (state, action) => state + 1
  },

  ATP: {
    phosphorylate: (state, action) => state - 1
  },

  Glc: {
    addGlucose: (state, action) => state + 50,

    phosphorylate: (state, action) => state - Math.sign(action.payload.Glc)
  },

  G6P: {
    phosphorylate: (state, action) => state + Math.sign(action.payload.Glc),

    isomerize: (state, action) => state - Math.sign(action.payload.G6P - action.payload.F6P)
  },

  F6P: {
    isomerize: (state, action) => state + Math.sign(action.payload.G6P - action.payload.F6P)
  }
}, defaultState.cell);
