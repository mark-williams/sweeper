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
        adjacentMineCount: 0,
        mined: hasMine()
      };
      row.push(item);
    }
    cells.push(row);
  }

  return { cells };
};

const isOutOfBounds = (row, col) => {
  return row < 0 || row >= HEIGHT || col < 0 || col >= WIDTH;
};

const getAdjacentCells = (cells, row, col) => {
  const adjacents = [];
  for (let rowIndex = row - 1; rowIndex <= row + 1; rowIndex++) {
    if (cells[rowIndex]) {
      for (let colIndex = col - 1; colIndex <= col + 1; colIndex++) {
        if (rowIndex !== row || colIndex !== col) {
          if (cells[rowIndex][colIndex]) {
            adjacents.push(cells[rowIndex][colIndex]);
          }
        }
      }
    }
  }

  return adjacents;
};

const getAdjacentCellsMineCount = (cells, row, col) => {
  const adjacents = getAdjacentCells(cells, row, col);

  return adjacents.reduce((tot, c) => {
    if (c.mined) {
      return tot + 1;
    }

    return tot;
  },
  0);
};

const clearCell = (cells, key) => {
  const cell = getIndexesFromKey(key);
  if (isOutOfBounds(cell.row, cell.col)) {
    return cells;
  }

  if (cells[cell.row][cell.col].cleared || cells[cell.row][cell.col].mined) {
    return cells;
  }

  const adjacentMineCount = getAdjacentCellsMineCount(cells, cell.row, cell.col);

  let newCells = cells.map((row) => {
    return row.map((item) => {
      if (!item.cleared && !item.mined) {
        if (item.key === key) {
          return { ...item, cleared: true, adjacentMineCount };
        }
      }
      return item;
    });
  });

  if (adjacentMineCount) {
    return newCells;
  }

  const adjacents = getAdjacentCells(cells, cell.row, cell.col);
  adjacents.forEach(c => {
    newCells = clearCell(newCells, c.key);
  });

  return newCells;
};

const minesReducer = (state = getInitialState(), action) => {
  switch (action.type) {
  case PROBE:
    return { cells: clearCell(state.cells, action.payload) };

  default:
    return state;
  }
};

export default minesReducer;
export { clearCell };
