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

function isReactive ({payload}) {
  return payload::keys().every(reactant => payload[reactant] > 0);
}

function getStoichiometricCoefficient ({payload}, {mainReactant, isProduct}) {
  return !payload[0][mainReactant] ? 0
       : !isReactive({payload: payload[+payload.isReversing]}) ? 0
       : payload.isReversing === isProduct ? -1
       : 1;
}

// Export Module
// -------------
//
// This module contains Redux reducers described in the following [labelled state transition system](http://www.mcrl2.org/dev/user_manual/articles/lts.html) schema.
//
// See also https://en.wikipedia.org/wiki/Transition_system.

export default createReducers({
  H: {
    phosphorylate: (state, action) => state + (
      -(!!action.payload.ADP && isReactive(action)) ||
      (!!action.payload.ATP && isReactive(action))
    ),

    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: '_13BPG', isProduct: false})
    )
  },

  H2O: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: '_2PG', isProduct: true})
  },

  Pi: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: false})
  },

  ADP: {
    phosphorylate: (state, action) => state + (
      -(!!action.payload.ADP && isReactive(action)) ||
      (!!action.payload.ATP && isReactive(action))
    ),

    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: '_13BPG', isProduct: false})
  },

  ATP: {
    phosphorylate: (state, action) => state + (
      (!!action.payload.ADP && isReactive(action)) ||
      -(!!action.payload.ATP && isReactive(action))
    ),

    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: '_13BPG', isProduct: true})
  },

  NAD: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: false})
  },

  NADH: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: true})
  },

  Glc: {
    addGlucose: (state, action) => state + 60,

    phosphorylate: (state, action) => state - (!!action.payload.Glc && isReactive(action))
  },

  G6P: {
    phosphorylate: (state, action) => state + (!!action.payload.Glc && isReactive(action)),

    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'G6P', isProduct: false})
  },

  F6P: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'G6P', isProduct: true}),

    phosphorylate: (state, action) => state - (!!action.payload.F6P && isReactive(action))
  },

  F16BP: {
    phosphorylate: (state, action) => state + (!!action.payload.F6P && isReactive(action)),

    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: 'F16BP', isProduct: false})
  },

  GADP: {
    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: 'F16BP', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: 'DHAP', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: false})
    )
  },

  DHAP: {
    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: 'F16BP', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: 'DHAP', isProduct: false})
    )
  },

  _13BPG: {
    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: 'GADP', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: '_13BPG', isProduct: false})
    )
  },

  _3PG: {
    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: '_13BPG', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: '_3PG', isProduct: false})
    )
  },

  _2PG: {
    interconvert: (state, action) => state + (
      getStoichiometricCoefficient(action, {mainReactant: '_3PG', isProduct: true}) ||
      getStoichiometricCoefficient(action, {mainReactant: '_2PG', isProduct: false})
    )
  },

  PEP: {
    interconvert: (state, action) => state + getStoichiometricCoefficient(action, {mainReactant: '_2PG', isProduct: true}),

    phosphorylate: (state, action) => state - (!!action.payload.ADP && isReactive(action))
  },

  Pyr: {
    phosphorylate: (state, action) => state + (!!action.payload.ADP && isReactive(action))
  }
}, defaultState.cell);
