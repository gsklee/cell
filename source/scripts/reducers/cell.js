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
    triggerGlycolysisStep1: (state, action) => state + 1
  },

  ADP: {
    triggerGlycolysisStep1: (state, action) => state + 1
  },

  ATP: {
    triggerGlycolysisStep1: (state, action) => state - 1
  },

  Glc: {
    addGlucose: (state, action) => state + 50,

    triggerGlycolysisStep1: (state, action) => state - 1
  },

  G6P: {
    triggerGlycolysisStep1: (state, action) => state + 1
  }
}, defaultState.cell);
