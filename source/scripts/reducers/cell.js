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
    phosphorylate: (state, action) => action.payload.ATP > 0 ? state + Math.sign(action.payload[action.payload.reactant]) : state
  },

  ADP: {
    phosphorylate: (state, action) => action.payload.ATP > 0 ? state + Math.sign(action.payload[action.payload.reactant]) : state
  },

  ATP: {
    phosphorylate: (state, action) => action.payload.ATP > 0 ? state - Math.sign(action.payload[action.payload.reactant]) : state
  },

  Glc: {
    addGlucose: (state, action) => state + 60,

    phosphorylate: (state, action) => action.payload.reactant === 'Glc' && action.payload.ATP > 0 ? state - Math.sign(action.payload.Glc) : state
  },

  G6P: {
    phosphorylate: (state, action) => action.payload.reactant === 'Glc' && action.payload.ATP > 0 ? state + Math.sign(action.payload.Glc) : state,

    isomerize: (state, action) => state - Math.sign(action.payload.G6P - action.payload.F6P)
  },

  F6P: {
    isomerize: (state, action) => state + Math.sign(action.payload.G6P - action.payload.F6P),

    phosphorylate: (state, action) => action.payload.reactant === 'F6P' && action.payload.ATP > 0 ? state - Math.sign(action.payload.F6P) : state
  },

  F16BP: {
    phosphorylate: (state, action) => action.payload.reactant === 'F6P' && action.payload.ATP > 0 ? state + Math.sign(action.payload.F6P) : state,

    split: (state, action) => state - Math.sign(action.payload.F16BP)
  },

  GADP: {
    split: (state, action) => state + Math.sign(action.payload.F16BP)
  },

  DHAP: {
    split: (state, action) => state + Math.sign(action.payload.F16BP)
  }
}, defaultState.cell);
