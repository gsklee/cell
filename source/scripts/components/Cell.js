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
        cell: {ATP, Glc, G6P, F6P, F16BP, GADP, DHAP},
        actions: {phosphorylate, interconvert}
      } = this.props;

      const reactions = {
        0: () => phosphorylate({Glc, ATP}),
        1: () => interconvert({
          0: {G6P},
          1: {F6P},
          isReversing: F6P / (G6P + F6P) > Math.random()
        }),
        2: () => phosphorylate({F6P, ATP}),
        3: () => interconvert({
          0: {F16BP},
          1: {GADP, DHAP},
          isReversing: DHAP / (F16BP + DHAP) > Math.random()
        })
      };

      reactions[getRandomInteger(0, 3)]();
    }, 50);
  }

  render () {
    const {
      cell: {H, ADP, ATP, Glc, G6P, F6P, F16BP, GADP, DHAP}
    } = this.props;

    return (
      <ul>
        <li>Hydron (H): {H}</li>
        <li>Adenosine Diphosphate (ADP): {ADP}</li>
        <li>Adenosine Triphosphate (ATP): {ATP}</li>
        <li>D-Glucose (Glc): {Glc}</li>
        <li>α-D-Glucose-6-Phosphate (G6P): {G6P}</li>
        <li>β-D-Fructose-6-PhosphateF6P (F6P): {F6P}</li>
        <li>β-D-Fructose-1,6-Bisphosphate (F16BP): {F16BP}</li>
        <li>D-Glyceraldehyde-3-Phosphate (GADP): {GADP}</li>
        <li>Dihydroxyacetone Phosphate (DHAP): {DHAP}</li>
      </ul>
    );
  }
}
