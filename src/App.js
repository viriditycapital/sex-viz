import React from 'react';
import PenisSize from './pages/PenisSize';

/**
 * Plan:
 * - Navbar probably, on the top for different data sets
 *
 * Current projects:
 * - Virginity loss, number of sexual partners
 * - Penis size
 */
class App extends React.Component {
  render () {
    return (
      <div>
        <PenisSize />
      </div>
    );
  }
}

export default App;