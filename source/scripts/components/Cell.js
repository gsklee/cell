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
      cell: {Glc, G6P, F6P},
      actions: {phosphorylate, isomerize}
    } = this.props;

    setTimeout(() => {
      phosphorylate({Glc});
      isomerize({G6P, F6P});
    }, 100);
  }

  render () {
    const {
      cell: {H, ADP, ATP, Glc, G6P, F6P}
    } = this.props;

    return (
      <ul>
        <li>Hydron: {H}</li>
        <li>Adenosine Diphosphate: {ADP}</li>
        <li>Adenosine Triphosphate: {ATP}</li>
        <li>D-Glucose: {Glc}</li>
        <li>α-D-Glucose-6-Phosphate: {G6P}</li>
        <li>β-D-Fructose 6-phosphate: {F6P}</li>
      </ul>
    );
  }
}
