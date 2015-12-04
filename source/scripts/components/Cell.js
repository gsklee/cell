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
        cell: {H, H2O, Pi, ADP, ATP, NAD, NADH, Glc, G6P, F6P, F16BP, GADP, DHAP, _13BPG, _3PG, _2PG, PEP},
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
          isReversing: GADP / (F16BP + GADP) > Math.random()
        }),

        4: () => interconvert({
          0: {DHAP},
          1: {GADP},
          isReversing: GADP / (DHAP + GADP) > Math.random()
        }),

        5: () => interconvert({
          0: {GADP, NAD, Pi},
          1: {_13BPG, NADH, H},
          isReversing: _13BPG / (GADP + _13BPG) > Math.random()
        }),

        6: () => interconvert({
          0: {_13BPG, ADP, H},
          1: {_3PG, ATP},
          isReversing: _3PG / (_13BPG + _3PG) > Math.random()
        }),

        7: () => interconvert({
          0: {_3PG},
          1: {_2PG},
          isReversing: _2PG / (_3PG + _2PG) > Math.random()
        }),

        8: () => interconvert({
          0: {_2PG},
          1: {PEP, H2O},
          isReversing: PEP / (_2PG + PEP) > Math.random()
        }),

        9: () => phosphorylate({PEP, ADP})
      };

      reactions[getRandomInteger(0, 9)]();
    }, 20);
  }

  render () {
    const {
      cell: {H, H2O, Pi, ADP, ATP, NAD, NADH, Glc, G6P, F6P, F16BP, GADP, DHAP, _13BPG, _3PG, _2PG, PEP, Pyr}
    } = this.props;

    return (
      <ul>
        <li>Hydron (H⁺): {H}</li>
        <li>Water (H2O): {H2O}</li>
        <li>Hydrogen Phosphate (Pi): {Pi}</li>
        <li>Adenosine Diphosphate (ADP): {ADP}</li>
        <li>Adenosine Triphosphate (ATP): {ATP}</li>
        <li>Nicotinamide Adenine Dinucleotide (Oxidized) (NAD⁺): {NAD}</li>
        <li>Nicotinamide Adenine Dinucleotide (Reduced) (NADH): {NADH}</li>
        <li>D-Glucose (Glc): {Glc}</li>
        <li>α-D-Glucose-6-Phosphate (G6P): {G6P}</li>
        <li>β-D-Fructose-6-PhosphateF6P (F6P): {F6P}</li>
        <li>β-D-Fructose-1,6-Bisphosphate (F1,6BP): {F16BP}</li>
        <li>D-Glyceraldehyde-3-Phosphate (GADP): {GADP}</li>
        <li>Dihydroxyacetone Phosphate (DHAP): {DHAP}</li>
        <li>D-1,3-Bisphosphoglycerate (1,3BPG): {_13BPG}</li>
        <li>3-Phosphoglycerate (3PG): {_3PG}</li>
        <li>2-Phosphoglycerate (2PG): {_2PG}</li>
        <li>Phosphoenolpyruvate (PEP): {PEP}</li>
        <li>Pyruvate (Pyr): {Pyr}</li>
      </ul>
    );
  }
}
