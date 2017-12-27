import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { probeCell } from '../actions';


class Board extends React.Component {
  renderItem = item => {
    return (
      <td key={item.key} className={this.getClassName(item)}>
        <div onClick={() => this.props.onCellClick(item.key)}>
          {this.getCellContent(item)}
        </div>
      </td>
    );
  }

  getClassName = item => {
    if (item.cleared) {
      return 'clear';
    }
    if (item.key === this.props.explodedMineKey) {
      return 'exploded';
    }

    return '';
  }

  getCellContent = item => {
    if (item.mined) {
      return <span>X</span>;
    }

    return item.adjacentMineCount ? <span>{item.adjacentMineCount}</span> : <span>&nbsp;</span>;
  }

  renderRow = (row, idx) => {
    return (
      <tr key={idx}>
        {row.map(this.renderItem)}
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
  onCellClick: PropTypes.func,
  explodedMineKey: PropTypes.string
};

const mapStateToProps = state => {
  return {
    cells: state.cells,
    explodedMineKey: state.explodedMineKey
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: id => dispatch(probeCell(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
