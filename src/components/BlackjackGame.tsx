'use client';

import { useReducer, useCallback, useState, useEffect } from 'react';
import { useAccount, useConnect } from 'wagmi';
import { base } from 'wagmi/chains';
import { encodeFunctionData } from 'viem';
import { SCORES_CONTRACT, SCORES_ABI } from '@/lib/scores-contract';
import { PlayingCard } from './Card';
import { useFarcasterMiniApp } from '@/lib/farcaster';
import {
  initialState,
  dealGame,
  hit,
  stand,
  type GameState,
  type GameResult,
} from '@/lib/blackjack';

type Action = { type: 'DEAL' } | { type: 'HIT' } | { type: 'STAND' };

function reducer(state: GameState, action: Action): GameState {
  switch (action.type) {
    case 'DEAL':
      return dealGame(state);
    case 'HIT':
      return hit(state);
    case 'STAND':
      return stand(state);
    default:
      return state;
  }
}

const RESULT_LABELS: Record<NonNullable<GameResult>, string> = {
  win: 'YOU WIN',
  lose: 'DEALER WINS',
  push: 'PUSH',
  blackjack: 'BLACKJACK',
};

const RESULT_COLORS: Record<NonNullable<GameResult>, string> = {
  win: 'text-stone-900',
  lose: 'text-rose-600',
  push: 'text-stone-500',
  blackjack: 'text-amber-700',
};

const BASE_CHAIN_HEX = '0x2105'; // 8453
const BASE_CHAIN_PARAMS = {
  chainId: BASE_CHAIN_HEX,
  chainName: 'Base',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: ['https://mainnet.base.org'],
  blockExplorerUrls: ['https://basescan.org'],
};

type EthProvider = {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
};

function shortAddr(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function BlackjackGame() {
  const { isInMiniApp, isLoading: miniAppLoading } = useFarcasterMiniApp();
  const [state, dispatch] = useReducer(reducer, initialState());
  const [showConnectors, setShowConnectors] = useState(false);

  const { address, isConnected, connector } = useAccount();
  const { connect, connectors, isPending: connectPending } = useConnect();
  const [txPending, setTxPending] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [txSuccess, setTxSuccess] = useState(false);

  // Farcaster context: auto-connect after SDK has set up window.ethereum
  useEffect(() => {
    if (miniAppLoading || !isInMiniApp || isConnected || connectPending) return;
    const inj = connectors.find((c) => c.id === 'injected');
    if (inj) connect({ connector: inj });
  }, [miniAppLoading, isInMiniApp, isConnected, connectPending, connect, connectors]);

  const txReset = useCallback(() => {
    setTxPending(false);
    setTxHash(null);
    setTxSuccess(false);
  }, []);

  const onDeal = useCallback(() => {
    txReset();
    dispatch({ type: 'DEAL' });
  }, [txReset]);
  const onHit = useCallback(() => dispatch({ type: 'HIT' }), []);
  const onStand = useCallback(() => dispatch({ type: 'STAND' }), []);

  const onRecordWin = useCallback(async () => {
    if (!address || !connector) return;
    setTxPending(true);
    try {
      const provider = await connector.getProvider() as EthProvider;

      // Check actual chain — never trust wagmi's cached chainId
      const chainHex = await provider.request({ method: 'eth_chainId' }) as string;
      if (parseInt(chainHex, 16) !== base.id) {
        try {
          await provider.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: BASE_CHAIN_HEX }],
          });
        } catch (err) {
          if ((err as { code?: number }).code === 4902) {
            await provider.request({
              method: 'wallet_addEthereumChain',
              params: [BASE_CHAIN_PARAMS],
            });
          } else throw err;
        }
      }

      const data = encodeFunctionData({
        abi: SCORES_ABI,
        functionName: 'record',
        args: [state.wins, state.losses, state.pushes],
      });
      const hash = await provider.request({
        method: 'eth_sendTransaction',
        params: [{ from: address, to: SCORES_CONTRACT, data, value: '0x0' }],
      }) as string;

      setTxHash(hash);
      setTxSuccess(true);
    } catch {
      // user rejected or chain switch failed — silently revert
    } finally {
      setTxPending(false);
    }
  }, [address, connector, state.result, state.wins, state.losses, state.pushes]);

  const isPlaying = state.phase === 'playing';
  const isResult = state.phase === 'result';
  const isIdle = state.phase === 'idle';
  const isWin = state.result === 'win' || state.result === 'blackjack';

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#EDE8DF] text-stone-900 select-none">
      {/* Header */}
      <header className="flex items-end justify-between px-6 pt-8 pb-4 border-b border-stone-300">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-1">Base Chain</p>
          <h1 className="text-2xl font-light tracking-tight leading-none">Blackjack</h1>
        </div>
        <div className="flex items-end gap-5 text-right">
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400">W</p>
            <p className="text-xl font-light tabular-nums">{state.wins}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400">L</p>
            <p className="text-xl font-light tabular-nums">{state.losses}</p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase text-stone-400">P</p>
            <p className="text-xl font-light tabular-nums">{state.pushes}</p>
          </div>
        </div>
      </header>

      {/* Wallet bar */}
      <div className="flex items-center justify-between px-6 py-2 border-b border-stone-200">
        {isConnected && address ? (
          <span className="text-xs font-mono text-stone-400">{shortAddr(address)}</span>
        ) : (
          <span className="text-xs text-stone-400">Wallet not connected</span>
        )}
        {!miniAppLoading && !isInMiniApp && !isConnected && (
          <button
            onClick={() => setShowConnectors(true)}
            className="text-xs tracking-[0.15em] uppercase text-stone-600 border border-stone-400 px-3 py-1 hover:border-stone-900 hover:text-stone-900 transition-colors"
          >
            Connect
          </button>
        )}
      </div>

      {/* Table */}
      <div className="flex flex-col flex-1 px-6 py-6 gap-6">

        {/* Dealer area */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-stone-400">Dealer</span>
            {(isPlaying || isResult) && (
              <span className="text-lg font-light tabular-nums">{state.dealerScore}</span>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            {state.dealerHand.map((card, i) => (
              <PlayingCard key={i} card={card} />
            ))}
            {isIdle && (
              <div className="w-16 h-24 rounded-lg border border-dashed border-stone-300 bg-transparent" />
            )}
          </div>
        </section>

        {/* Divider with result */}
        <div className="flex items-center gap-4 py-2">
          <div className="flex-1 h-px bg-stone-300" />
          {isResult && state.result && (
            <span className={`text-xs tracking-[0.25em] uppercase font-medium ${RESULT_COLORS[state.result]}`}>
              {RESULT_LABELS[state.result]}
            </span>
          )}
          {!isResult && (
            <span className="text-xs tracking-[0.25em] uppercase text-stone-300">vs</span>
          )}
          <div className="flex-1 h-px bg-stone-300" />
        </div>

        {/* Player area */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-stone-400">You</span>
            {(isPlaying || isResult) && (
              <span className="text-lg font-light tabular-nums">{state.playerScore}</span>
            )}
          </div>
          <div className="flex gap-3 flex-wrap">
            {state.playerHand.map((card, i) => (
              <PlayingCard key={i} card={card} />
            ))}
            {isIdle && (
              <div className="w-16 h-24 rounded-lg border border-dashed border-stone-300 bg-transparent" />
            )}
          </div>
        </section>
      </div>

      {/* Actions */}
      <footer className="px-6 pb-8 pt-4 border-t border-stone-300">
        {(isIdle || isResult) && (
          <div className="space-y-3">
            {isResult && isWin && !txSuccess && SCORES_CONTRACT && (
              <button
                onClick={onRecordWin}
                disabled={txPending || !address}
                className="w-full py-3 border border-stone-900 text-stone-900 text-sm tracking-[0.2em] uppercase hover:bg-stone-100 transition-colors disabled:opacity-40"
              >
                {txPending ? 'Recording...' : 'Record Win on Base'}
              </button>
            )}
            {txSuccess && txHash !== null && (
              <a
                href={`https://basescan.org/tx/${txHash}`}
                target="_blank"
                rel="noreferrer"
                className="block w-full py-3 text-center border border-stone-400 text-stone-500 text-xs tracking-[0.2em] uppercase hover:border-stone-900 hover:text-stone-900 transition-colors"
              >
                Recorded on Base
              </a>
            )}
            <button
              onClick={onDeal}
              className="w-full py-4 bg-stone-900 text-[#EDE8DF] text-sm tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors"
            >
              {isIdle ? 'Deal' : 'Deal Again'}
            </button>
            {isResult && state.result === 'blackjack' && (
              <p className="text-center text-xs tracking-widest text-amber-700 uppercase">
                Natural Blackjack - 3:2
              </p>
            )}
          </div>
        )}
        {isPlaying && (
          <div className="flex gap-3">
            <button
              onClick={onHit}
              className="flex-1 py-4 bg-stone-900 text-[#EDE8DF] text-sm tracking-[0.2em] uppercase hover:bg-stone-800 transition-colors"
            >
              Hit
            </button>
            <button
              onClick={onStand}
              className="flex-1 py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-[#EDE8DF] transition-colors"
            >
              Stand
            </button>
          </div>
        )}
      </footer>

      {/* Connector bottom sheet (browser only) */}
      {showConnectors && (
        <div
          className="fixed inset-0 bg-black/40 flex items-end z-50"
          onClick={() => setShowConnectors(false)}
        >
          <div
            className="w-full bg-[#EDE8DF] px-6 pt-6 pb-10 space-y-3"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-4">
              Connect Wallet
            </p>
            {connectors.map((connector) => (
              <button
                key={connector.id}
                onClick={() => {
                  connect({ connector });
                  setShowConnectors(false);
                }}
                className="w-full py-4 border border-stone-900 text-stone-900 text-sm tracking-[0.2em] uppercase hover:bg-stone-900 hover:text-[#EDE8DF] transition-colors"
              >
                {connector.name}
              </button>
            ))}
            <button
              onClick={() => setShowConnectors(false)}
              className="w-full py-3 text-stone-400 text-xs tracking-[0.2em] uppercase"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
