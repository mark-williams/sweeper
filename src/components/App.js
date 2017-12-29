import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { newGame } from '../actions';
import Board from './Board';
import logo from '../logo.svg';
import '../style/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <div className="mainContainer">
          <button onClick={this.props.onNewGame}>Start new game</button>
          <Board />
        </div>
      </div>
    );
  }
}

App.propTypes = {
  onNewGame: PropTypes.func
};

const mapStateToProps = () => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    onNewGame: () => dispatch(newGame())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
