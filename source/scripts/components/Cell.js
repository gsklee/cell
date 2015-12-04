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
      actions: {phosphorylate}
    } = this.props;

    setTimeout(() => {
      cell.Glc > 0 && phosphorylate('Glc');
    }, 100);
  }

  render () {
    const {
      cell: {H, ADP, ATP, Glc, G6P}
    } = this.props;

    return (
      <ul>
        <li>Hydron: {H}</li>
        <li>Adenosine Diphosphate: {ADP}</li>
        <li>Adenosine Triphosphate: {ATP}</li>
        <li>D-Glucose: {Glc}</li>
        <li>α-D-Glucose-6-Phosphate: {G6P}</li>
      </ul>
    );
  }
}
