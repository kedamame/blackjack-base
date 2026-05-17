import { type Card } from '@/lib/blackjack';

const SUIT_SYMBOLS: Record<string, string> = {
  S: '♠',
  H: '♥',
  D: '♦',
  C: '♣',
};

const RED_SUITS = new Set(['H', 'D']);

interface CardProps {
  card: Card;
  small?: boolean;
}

export function PlayingCard({ card, small = false }: CardProps) {
  if (card.faceDown) {
    return (
      <div
        className={`
          relative flex items-center justify-center rounded-lg border border-stone-300
          bg-stone-800 select-none
          ${small ? 'w-10 h-14 text-xs' : 'w-16 h-24 text-sm'}
        `}
      >
        <div className="w-full h-full rounded-lg opacity-20 bg-[repeating-linear-gradient(45deg,#fff,#fff_2px,transparent_2px,transparent_8px)]" />
      </div>
    );
  }

  const isRed = RED_SUITS.has(card.suit);
  const symbol = SUIT_SYMBOLS[card.suit] ?? card.suit;
  const colorClass = isRed ? 'text-rose-600' : 'text-stone-900';

  return (
    <div
      className={`
        relative flex flex-col justify-between rounded-lg border border-stone-200
        bg-[#F5F1EA] shadow-sm select-none font-mono
        ${small ? 'w-10 h-14 p-1 text-xs' : 'w-16 h-24 p-2 text-sm'}
      `}
    >
      <div className={`font-bold leading-none ${colorClass}`}>
        <div>{card.rank}</div>
        <div className="text-xs">{symbol}</div>
      </div>
      <div className={`self-end rotate-180 font-bold leading-none ${colorClass}`}>
        <div>{card.rank}</div>
        <div className="text-xs">{symbol}</div>
      </div>
    </div>
  );
}
