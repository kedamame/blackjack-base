export const SCORES_CONTRACT = (
  process.env.NEXT_PUBLIC_SCORES_CONTRACT ?? ''
) as `0x${string}`;

export const SCORES_ABI = [
  {
    name: 'record',
    type: 'function',
    inputs: [
      { name: 'wins', type: 'uint32' },
      { name: 'losses', type: 'uint32' },
      { name: 'pushes', type: 'uint32' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    name: 'getScore',
    type: 'function',
    inputs: [{ name: 'player', type: 'address' }],
    outputs: [
      { name: 'wins', type: 'uint32' },
      { name: 'losses', type: 'uint32' },
      { name: 'pushes', type: 'uint32' },
    ],
    stateMutability: 'view',
  },
  {
    name: 'ScoreRecorded',
    type: 'event',
    inputs: [
      { name: 'player', type: 'address', indexed: true },
      { name: 'wins', type: 'uint32', indexed: false },
      { name: 'losses', type: 'uint32', indexed: false },
      { name: 'pushes', type: 'uint32', indexed: false },
    ],
  },
] as const;
