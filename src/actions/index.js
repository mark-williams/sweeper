export const PROBE = 'PROBE';

export const probeCell = (cellId) => ({
  type: PROBE,
  payload: cellId
});
