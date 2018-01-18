import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ToastContainer, toast } from 'react-toastify';
import * as actions from '../actions';
import Board from './Board';
import logo from '../logo.svg';
import '../style/App.css';

const gameOverToastOptions = {
  type: toast.TYPE.WARNING
};
const gameWonToastOptions = {
  type: toast.TYPE.SUCCESS
};


class App extends Component {
  render() {
    if (this.props.explodedMineKey) {
      toast('Game over! You lost.', gameOverToastOptions);
    }

    if (this.props.gameWon) {
      toast('Congratulations! You won.', gameWonToastOptions);
    }

    return (
      <div className="App">
        <ToastContainer />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="mainContainer">
          <button onClick={this.props.newGame}>Start new game</button>
          <Board cells={this.props.cells} onCellClick={this.props.probeCell} explodedMineKey={this.props.explodedMineKey} />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  explodedMineKey: PropTypes.string,
  gameWon: PropTypes.bool,
  newGame: PropTypes.func,
  probeCell: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    cells: state.cells,
    explodedMineKey: state.explodedMineKey,
    gameWon: state.gameWon
  };
};

export default connect(mapStateToProps, actions)(App);
