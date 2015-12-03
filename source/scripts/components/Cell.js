// < Cell/> Component
// ==================
//
// This file defines the React component `< Cell/>`.
//
// Import Modules
// --------------
//
// ### NPM Modules

import React from 'react';

// Define & Export Module
// ----------------------
//
// This module contains `< Cell/>`.

export default class Cell extends React.Component {
  static propTypes = {
    cell: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidUpdate () {
    const {
      cell,
      actions: {triggerGlycolysisStep1}
    } = this.props;

    setTimeout(() => {
      cell.Glc > 0 && triggerGlycolysisStep1();
    }, 100);
  }

  render () {
    const {
      cell: {Glc, G6P}
    } = this.props;

    return (
      <ul>
        <li>D-Glucose: {Glc}</li>
        <li>α-D-Glucose-6-phosphate: {G6P}</li>
      </ul>
    );
  }
}
