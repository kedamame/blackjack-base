'use client';

import { useReducer, useCallback } from 'react';
import { PlayingCard } from './Card';
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

export function BlackjackGame() {
  const [state, dispatch] = useReducer(reducer, initialState());

  const onDeal = useCallback(() => dispatch({ type: 'DEAL' }), []);
  const onHit = useCallback(() => dispatch({ type: 'HIT' }), []);
  const onStand = useCallback(() => dispatch({ type: 'STAND' }), []);

  const isPlaying = state.phase === 'playing';
  const isResult = state.phase === 'result';
  const isIdle = state.phase === 'idle';

  return (
    <div className="flex flex-col h-full min-h-screen bg-[#EDE8DF] text-stone-900 select-none">
      {/* Header */}
      <header className="flex items-end justify-between px-6 pt-8 pb-4 border-b border-stone-300">
        <div>
          <p className="text-xs tracking-[0.2em] uppercase text-stone-500 mb-1">Base Chain</p>
          <h1 className="text-2xl font-light tracking-tight leading-none">Blackjack</h1>
        </div>
        <div className="flex gap-5 text-right">
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

      {/* Table */}
      <div className="flex flex-col flex-1 px-6 py-6 gap-6">

        {/* Dealer area */}
        <section className="flex-1 flex flex-col">
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-xs tracking-[0.2em] uppercase text-stone-400">Dealer</span>
            {(isPlaying || isResult) && (
              <span className="text-lg font-light tabular-nums">
                {state.dealerScore}
              </span>
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
            <span
              className={`text-xs tracking-[0.25em] uppercase font-medium ${RESULT_COLORS[state.result]}`}
            >
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
              <span className="text-lg font-light tabular-nums">
                {state.playerScore}
              </span>
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
    </div>
  );
}
