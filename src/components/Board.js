import React from 'react';
import { connect } from 'react-redux';
import { probeCell } from '../actions';

class Board extends React.Component {
  constructor(props) {
    super(props);
  }

  renderItems = item => {
    const className = item ? 'clear' : '';
    return (
      <td className={className}>
        <div onClick={() => this.props.onCellClick(item)}>
          {item}
        </div>
      </td>
    );
  }

  renderRow = row => {
    return (
      <tr>
        {row.map(this.renderItems)}
      </tr>
    );
  }

  render = () => {
    return (
      <div className="board">
        <table>
          {this.props.data.map(this.renderRow)}
        </table>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCellClick: id => dispatch(probeCell(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Board);
