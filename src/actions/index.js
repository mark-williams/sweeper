export const NEW_GAME = 'NEW_GAME';
export const PROBE = 'PROBE';

export const newGame = () => (
  {
    type: NEW_GAME,
    payload: null
  }
);

export const probeCell = (cellId) => ({
  type: PROBE,
  payload: cellId
});
