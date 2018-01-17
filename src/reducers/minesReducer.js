import _ from 'lodash';
import { NEW_GAME, PROBE } from '../actions';

const WIDTH = 10;
const HEIGHT = 10;
const MINES_PERCENTAGE = 10;

const getKey = (row, col) => (`${row}:${col}`);
const getIndexesFromKey = (key) => {
  const indexes = key.split(':');
  return { row: parseInt(indexes[0], 10), col: parseInt(indexes[1], 10) };
};

const getMines = (cells) => {
  const flattenedCells = _.flatten(cells);
  const numberofCells = flattenedCells.length;
  const mines = {};
  while (Object.keys(mines).length < (MINES_PERCENTAGE * numberofCells / 100)) {
    const index = Math.floor(Math.random() * numberofCells);
    if (mines.hasOwnProperty(flattenedCells[index].key) === false) {
      mines[flattenedCells[index].key] = true;
    }
  }

  return mines;
};

const layMines = (cells, mines) => {
  return cells.map(row => {
    return row.map(item => {
      return !!mines[item.key] ? { ...item, mined: true } : item;
    });
  });
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
        mined: false
      };
      row.push(item);
    }
    cells.push(row);
  }

  const mines = getMines(cells);
  const newCells = layMines(cells, mines);

  return { cells: newCells, mines: mines, explodedMineKey: null, gameWon: false };
};

const isOutOfBounds = (row, col) => {
  return row < 0 || row >= HEIGHT || col < 0 || col >= WIDTH;
};

const isMined = (state, cell) => (state.mines.hasOwnProperty(cell));

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

const resetCells = (cells) => {
  const newCells = cells.map((row) => {
    return row.map(c => ({ ...c, cleared: false, mined: false, adjacentMineCount: 0 }));
  });

  return layMines(newCells);
};

const isGameWon = (cells) => {
  const uncleared = _.flatten(cells).some(c => {
    return !c.mined && !c.cleared;
  });

  return !uncleared;
};

const minesReducer = (state = getInitialState(), action) => {
  switch (action.type) {
  case NEW_GAME:
    return { ...state, cells: resetCells(state.cells), explodedMineKey: null, gameWon: false };

  case PROBE:
    if (isGameWon(state.cells) || state.explodedMineKey) {
      return state;
    }

    // const currentCell = getCell(state.cells, action.payload);
    if (isMined(state, action.payload)) {
      return { ...state, explodedMineKey: action.payload };
    }

    const updatedCells = clearCell(state.cells, action.payload);
    return { ...state, cells: updatedCells, gameWon: isGameWon(updatedCells) };

  default:
    return state;
  }
};

export default minesReducer;

export { isMined, clearCell, getMines, isGameWon };


