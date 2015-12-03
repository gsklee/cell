// < App/> Entry Container
// =======================
//
// This file defines the React entry container `< App/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';
import {connect} from 'react-redux';

// ### Local Modules

import * as actions from 'scripts/actions';
import Cell from 'scripts/components/Cell';

// Define & Export Module
// ----------------------
//
// This module contains the ***Redux-connected < App/>***.

export default @connect(state => state, actions) class App extends React.Component {
  static propTypes = {
    cell: React.PropTypes.object.isRequired,
    react: React.PropTypes.func.isRequired,
    addGlucose: React.PropTypes.func.isRequired
  }

  render () {
    const {
      cell,
      react,
      addGlucose
    } = this.props;

    return (
      <main>
        <h1>Cell</h1>
        <section>
          <button onClick = {addGlucose}>Add 600 D-Glucose</button>
          <Cell
            cell = {cell}
            actions = {{react}}
          />
        </section>
      </main>
    );
  }
}
