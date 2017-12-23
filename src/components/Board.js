import React from 'react';

const data = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 1, 1, 0],
  [0, 0, 0, 1, 0],
  [0, 0, 0, 0, 0]
];

const renderItems = item => {
  const className = item ? 'clear' : '';
  return (
    <td className={className}>
      <div>
        {item}
      </div>
    </td>
  );
};

const renderRow = row => {
  return (
    <tr>
      {row.map(renderItems)}
    </tr>
  );
};

const Board = () => {
  return (
    <div className="board">
      <table>
        {data.map(renderRow)}
      </table>
    </div>
  );
};

export default Board;