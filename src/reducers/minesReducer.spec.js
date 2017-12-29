import minesReducer, { clearCell, getMines } from './minesReducer';
import _ from 'lodash';
import { newGame } from '../actions';

const testCells = [
  [
    { key: '0:0', cleared: false, mined: false },
    { key: '0:1', cleared: false, mined: false },
    { key: '0:2', cleared: false, mined: false },
    { key: '0:3', cleared: false, mined: false }
  ],
  [
    { key: '1:0', cleared: false, mined: false },
    { key: '1:1', cleared: false, mined: false },
    { key: '1:2', cleared: false, mined: false },
    { key: '1:3', cleared: false, mined: false }
  ],
  [
    { key: '2:0', cleared: false, mined: false },
    { key: '2:1', cleared: false, mined: false },
    { key: '2:2', cleared: false, mined: false },
    { key: '2:3', cleared: false, mined: false }
  ],
  [
    { key: '3:0', cleared: false, mined: false },
    { key: '3:1', cleared: false, mined: false },
    { key: '3:2', cleared: false, mined: false },
    { key: '3:3', cleared: false, mined: false }
  ]
];

describe('minesReducer', () => {
  describe('reducer', () => {
    it('if no state supplied should return default', () => {
      // eslint-disable-next-line no-undefined
      const result = minesReducer(undefined, { type: 'DUMMY' });
      expect(result).toBeDefined();
      expect(result.cells && result.cells.length > 0).toBe(true);
    });

    describe('probe action', () => {
      it('if probed cell has mine should set this as part of state', () => {
        const state = {
          cells: [
            [{ key: '0:0' }, { key: '0:1' }, { key: '0:2', mined: true }]
          ]
        };
        const result = minesReducer(state, { type: 'PROBE', payload: '0:2' });
        expect(result.explodedMineKey).toEqual('0:2');
      });
    });

    describe('new game action', () => {
      let result;
      beforeEach(() => {
        // Clear some of the cells
        const midGameCells = _.flatten(testCells)
          .map((cell, index) => (index % 2 ? cell : { ...cell, cleared: true }));
        const state = { cells: testCells };
        result = minesReducer(state, newGame());
      });

      it('should reset all cells', () => {
        expect(_.flatten(result.cells).some(c => c.cleared)).toBe(false);
      });

      it('should lay some mines', () => {
        expect(_.flatten(result.cells).some(c => c.mined)).toBe(true);
      });
    });
  });

  describe('helpers', () => {
    let cells;
    beforeEach(() => {
      cells = testCells;
    });

    it('lay mines should return an object with keys for each mine', () => {
      const mines = getMines(cells);
      expect(Object.keys(mines).length > 0).toBe(true);
    });

    it('should clear cell', () => {
      const results = clearCell(cells, '0:0');
      expect(results[0][0].cleared).toBe(true);
    });

    it('should clear immediate neighbours', () => {
      const results = clearCell(cells, '1:1');
      expect(results[0][0].cleared).toBe(true);
      expect(results[0][1].cleared).toBe(true);
      expect(results[0][2].cleared).toBe(true);
      expect(results[1][0].cleared).toBe(true);
      expect(results[1][1].cleared).toBe(true);
      expect(results[1][2].cleared).toBe(true);
      expect(results[2][0].cleared).toBe(true);
      expect(results[2][1].cleared).toBe(true);
      expect(results[2][2].cleared).toBe(true);
    });

    it('should clear all unmined neighbours', () => {
      const results = clearCell(cells, '1:1');

      const allCells = _.flatten(results);
      const unCleared = allCells.filter(c => c.cleared === false);
      expect(unCleared.length).toBe(0);
    });

    it('should not clear all mined neighbours', () => {
      cells[0][0].mined = cells[1][0].mined = true;
      const results = clearCell(cells, '2:2');

      const allCells = _.flatten(results);
      const unCleared = allCells.filter(c => c.cleared === false);
      expect(unCleared.length).toBe(2);
    });
  });
});
