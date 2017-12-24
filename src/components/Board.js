import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { probeCell } from '../actions';


class Board extends React.Component {
  renderItems = item => {
    const className = item.cleared ? 'clear' : '';
    return (
      <td key={item.key} className={className}>
        <div onClick={() => this.props.onCellClick(item.key)}>
          {item.mined ? 'x' : <span>&nbsp;</span> }
        </div>
      </td>
    );
  }

  renderRow = (row, idx) => {
    return (
      <tr key={idx}>
        {row.map(this.renderItems)}
      </tr>
    );
  }

  render = () => {
    return (
      <div className="board">
        <table>
          <tbody>
            {this.props.cells.map(this.renderRow)}
          </tbody>
        </table>
      </div>
    );
  }
}

Board.propTypes = {
  cells: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.object)),
  onCellClick: PropTypes.func
};

const mapStateToProps = state => {
  return {
    cells: state.cells
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: id => dispatch(probeCell(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
