import { PROBE } from '../actions';

const WIDTH = 10;
const HEIGHT = 10;

const getKey = (row, col) => (`${row}:${col}`);
const getIndexesFromKey = (key) => {
  const indexes = key.split(':');
  return { row: parseInt(indexes[0], 10), col: parseInt(indexes[1], 10) };
};

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

const isCellOrNeighbour = (key, rowIndex, colIndex) => {
  const selected = getIndexesFromKey(key);
  if (rowIndex >= selected.row - 1 && rowIndex <= selected.row + 1) {
    if (colIndex >= selected.col - 1 && colIndex <= selected.col + 1) {
      return true;
    }
  }

  return false;
};

const clearCells = (cells, key) => {
  return cells.map((row, rowIndex) => {
    return row.map((item, colIndex) => {
      if (!item.cleared && !item.mined) {
        if (isCellOrNeighbour(key, rowIndex, colIndex)) {
          return { ...item, cleared: true };
        }
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
export { clearCells };
