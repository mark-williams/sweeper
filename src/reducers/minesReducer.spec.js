import { clearCells } from './minesReducer';

const testCells = [
  [{ key: '0:0', cleared: false, mined: false }]
];

describe('minesReducer', () => {
  let cells;
  beforeEach(() => {
    cells = testCells;
  });

  it('should run', () => {
    const results = clearCells(cells, '0:0');
    expect(results[0][0].cleared).toBe(true);
  });
});
