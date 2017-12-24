import { PROBE } from '../actions';

const WIDTH = 10;
const HEIGHT = 10;

const getKey = (row, col) => (`${row}:${col}`);

const hasMine = () => {
  return (Math.random() * 10) < 1;
};

const getInitialState = () => {
  const cells = [];
  for (let rowIndex = 0; rowIndex < HEIGHT; rowIndex++) {
    const row = [];
    for (let colIndex = 0; colIndex < WIDTH; colIndex++) {
      const item = {
        key: getKey(rowIndex, colIndex),
        cleared: false,
        mined: hasMine()
      };
      row.push(item);
    }
    cells.push(row);
  }

  return { cells };
};

const clearCells = (cells, key) => {
  return cells.map(r => {
    return r.map(item => {
      if (!item.cleared && item.key === key) {
        return { ...item, cleared: true };
      }
      return item;
    });
  });
};

const minesReducer = (state = getInitialState(), action) => {
  switch (action.type) {
  case PROBE:
    return { cells: clearCells(state.cells, action.payload) };

  default:
    return state;
  }
};

export default minesReducer;
