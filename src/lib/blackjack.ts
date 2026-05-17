export type Suit = 'S' | 'H' | 'D' | 'C';
export type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

export interface Card {
  suit: Suit;
  rank: Rank;
  faceDown?: boolean;
}

export type GamePhase = 'idle' | 'playing' | 'dealer' | 'result';
export type GameResult = 'win' | 'lose' | 'push' | 'blackjack' | null;

export interface GameState {
  deck: Card[];
  playerHand: Card[];
  dealerHand: Card[];
  phase: GamePhase;
  result: GameResult;
  playerScore: number;
  dealerScore: number;
  wins: number;
  losses: number;
  pushes: number;
}

const SUITS: Suit[] = ['S', 'H', 'D', 'C'];
const RANKS: Rank[] = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

export function createDeck(): Card[] {
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push({ suit, rank });
    }
  }
  return shuffle(deck);
}

function createFreshDeck(excludedCards: Card[]): Card[] {
  const excluded = new Set(excludedCards.map((c) => `${c.rank}-${c.suit}`));
  const deck: Card[] = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      if (!excluded.has(`${rank}-${suit}`)) {
        deck.push({ suit, rank });
      }
    }
  }
  return shuffle(deck);
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function cardValue(rank: Rank): number {
  if (['J', 'Q', 'K'].includes(rank)) return 10;
  if (rank === 'A') return 11;
  return parseInt(rank, 10);
}

export function handScore(hand: Card[], countHidden = false): number {
  const visible = countHidden ? hand : hand.filter((c) => !c.faceDown);
  let score = 0;
  let aces = 0;
  for (const card of visible) {
    const v = cardValue(card.rank);
    score += v;
    if (card.rank === 'A') aces++;
  }
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
}

export function isBust(score: number): boolean {
  return score > 21;
}

export function isBlackjack(hand: Card[]): boolean {
  return hand.length === 2 && handScore(hand, true) === 21;
}

export function initialState(): GameState {
  return {
    deck: [],
    playerHand: [],
    dealerHand: [],
    phase: 'idle',
    result: null,
    playerScore: 0,
    dealerScore: 0,
    wins: 0,
    losses: 0,
    pushes: 0,
  };
}

export function dealGame(state: GameState): GameState {
  // Refresh deck when fewer than 26 cards remain to prevent depletion during a hand
  const deck = state.deck.length < 26 ? createDeck() : [...state.deck];
  // Standard alternating deal: player → dealer → player → dealer(face-down)
  const [playerCard1, ...after1] = deck;
  const [dealerCard1, ...after2] = after1;
  const [playerCard2, ...after3] = after2;
  const [dealerCard2, ...remaining] = after3;

  const playerHand: Card[] = [playerCard1, playerCard2];
  const dealerHand: Card[] = [dealerCard1, { ...dealerCard2, faceDown: true }];

  const playerScore = handScore(playerHand, true);
  const dealerScore = handScore(dealerHand);

  if (isBlackjack(playerHand)) {
    const dealerRevealed = dealerHand.map((c) => ({ ...c, faceDown: false }));
    const dealerFinalScore = handScore(dealerRevealed, true);
    const result: GameResult = isBlackjack(dealerRevealed) ? 'push' : 'blackjack';
    return {
      ...state,
      deck: remaining,
      playerHand,
      dealerHand: dealerRevealed,
      phase: 'result',
      result,
      playerScore,
      dealerScore: dealerFinalScore,
      wins: result === 'blackjack' ? state.wins + 1 : state.wins,
      pushes: result === 'push' ? state.pushes + 1 : state.pushes,
    };
  }

  return {
    ...state,
    deck: remaining,
    playerHand,
    dealerHand,
    phase: 'playing',
    result: null,
    playerScore,
    dealerScore,
  };
}

export function hit(state: GameState): GameState {
  if (state.phase !== 'playing') return state;
  const inPlay = [...state.playerHand, ...state.dealerHand];
  const deck = state.deck.length === 0 ? createFreshDeck(inPlay) : state.deck;
  const [card, ...remaining] = deck;
  const playerHand = [...state.playerHand, card];
  const playerScore = handScore(playerHand, true);

  if (isBust(playerScore)) {
    const dealerRevealed = state.dealerHand.map((c) => ({ ...c, faceDown: false }));
    return {
      ...state,
      deck: remaining,
      playerHand,
      dealerHand: dealerRevealed,
      phase: 'result',
      result: 'lose',
      playerScore,
      dealerScore: handScore(dealerRevealed, true),
      losses: state.losses + 1,
    };
  }

  return { ...state, deck: remaining, playerHand, playerScore };
}

export function stand(state: GameState): GameState {
  if (state.phase !== 'playing') return state;

  let dealerHand = state.dealerHand.map((c) => ({ ...c, faceDown: false }));
  const inPlay = [...state.playerHand, ...state.dealerHand];
  let deck = state.deck.length === 0 ? createFreshDeck(inPlay) : [...state.deck];

  let dealerScore = handScore(dealerHand, true);
  while (dealerScore < 17) {
    if (deck.length === 0) deck = createFreshDeck([...state.playerHand, ...dealerHand]);
    const [card, ...remaining] = deck;
    dealerHand = [...dealerHand, { ...card, faceDown: false }];
    deck = remaining;
    dealerScore = handScore(dealerHand, true);
  }

  const playerScore = handScore(state.playerHand, true);
  let result: GameResult;
  let wins = state.wins;
  let losses = state.losses;
  let pushes = state.pushes;

  if (isBust(dealerScore)) {
    result = 'win';
    wins++;
  } else if (playerScore > dealerScore) {
    result = 'win';
    wins++;
  } else if (playerScore < dealerScore) {
    result = 'lose';
    losses++;
  } else {
    result = 'push';
    pushes++;
  }

  return {
    ...state,
    deck,
    dealerHand,
    phase: 'result',
    result,
    playerScore,
    dealerScore,
    wins,
    losses,
    pushes,
  };
}
