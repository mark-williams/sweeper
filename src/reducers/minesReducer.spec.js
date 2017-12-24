import { clearCells } from './minesReducer';

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
  let cells;
  beforeEach(() => {
    cells = testCells;
  });

  it('should clear cell', () => {
    const results = clearCells(cells, '0:0');
    expect(results[0][0].cleared).toBe(true);
  });

  it('should clear immediate neighbours', () => {
    const results = clearCells(cells, '1:1');
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

  it('should clear all neighbours', () => {
    const results = clearCells(cells, '1:1');
    expect(results[0][3].cleared).toBe(true);
  });
});
