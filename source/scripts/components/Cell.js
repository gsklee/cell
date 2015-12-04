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

function getRandomInteger (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default class Cell extends React.Component {
  static propTypes = {
    cell: React.PropTypes.object.isRequired,
    actions: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    setInterval(() => {
      const {
        cell: {ATP, Glc, G6P, F6P, F16BP},
        actions: {phosphorylate, isomerize, split}
      } = this.props;

      const reactions = {
        0: () => phosphorylate({ATP, Glc, reactant: 'Glc'}),
        1: () => isomerize({G6P, F6P}),
        2: () => phosphorylate({ATP, F6P, reactant: 'F6P'}),
        3: () => split({F16BP})
      };

      reactions[getRandomInteger(0, 3)]();
    }, 100);
  }

  render () {
    const {
      cell: {H, ADP, ATP, Glc, G6P, F6P, F16BP, GADP, DHAP}
    } = this.props;

    return (
      <ul>
        <li>Hydron: {H}</li>
        <li>Adenosine Diphosphate: {ADP}</li>
        <li>Adenosine Triphosphate: {ATP}</li>
        <li>D-Glucose: {Glc}</li>
        <li>α-D-Glucose-6-Phosphate: {G6P}</li>
        <li>β-D-Fructose-6-Phosphate: {F6P}</li>
        <li>β-D-Fructose-1,6-Bisphosphate: {F16BP}</li>
        <li>D-Glyceraldehyde-3-Phosphate: {GADP}</li>
        <li>Dihydroxyacetone Phosphate: {DHAP}</li>
      </ul>
    );
  }
}
