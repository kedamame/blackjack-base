import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Embed image 900x600 — text left, cards right (cards start at x≥460, safe from frame clipping)
export async function GET() {
  const W = 900;
  const H = 600;
  const CARD_W = 155;
  const CARD_H = 220; // ≈1.42:1 ratio (real card 3.5:2.5); bottom corner is abs-positioned so no overflow
  const CARD_R = 12;

  const SYM: Record<string, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };

  function Card({ rank, suit, red }: { rank: string; suit: string; red?: boolean }) {
    const color = red ? '#C0392B' : '#1C1C1A';
    const pipColor = red ? '#EDD8D5' : '#CCCAC6';
    const sym = SYM[suit] ?? suit;
    return (
      <div style={{
        display: 'flex', flexDirection: 'column',
        position: 'relative',
        width: CARD_W, height: CARD_H, background: '#FDFAF5',
        border: '1px solid #D4CFC7', borderRadius: CARD_R,
        paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20,
      }}>
        {/* Top corner */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 24, color, lineHeight: 1 }}>{sym}</div>
        </div>
        {/* Center pip — flex:1 fills remaining space so pip is always centered */}
        <div style={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', fontSize: 64, color: pipColor, lineHeight: 1 }}>{sym}</div>
        </div>
        {/* Bottom corner — absolutely pinned so it can never push past the card border */}
        <div style={{
          position: 'absolute',
          bottom: 18, right: 20,
          display: 'flex', flexDirection: 'column', gap: 2,
          transform: 'rotate(180deg)',
        }}>
          <div style={{ display: 'flex', fontSize: 42, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 24, color, lineHeight: 1 }}>{sym}</div>
        </div>
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H, display: 'flex',
        background: '#EDE8DF', fontFamily: 'sans-serif',
      }}>
        {/* Left: Text (460px) — starts at x=0 but has paddingLeft:56 so text at x=56 */}
        <div style={{
          display: 'flex', width: 460, flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 52, paddingBottom: 52,
          paddingLeft: 56, paddingRight: 32,
        }}>
          <div style={{ display: 'flex', fontSize: 13, letterSpacing: 6, color: '#8A8580' }}>
            BASE CHAIN
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', fontSize: 72, fontWeight: 300, color: '#1C1C1A', letterSpacing: -2, lineHeight: 1 }}>
              Blackjack
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ display: 'flex', width: 36, height: 1, background: '#C4A882' }} />
              <div style={{ display: 'flex', fontSize: 17, letterSpacing: 10, color: '#A0784A', fontWeight: 700 }}>
                BLACKJACK
              </div>
              <div style={{ display: 'flex', width: 36, height: 1, background: '#C4A882' }} />
            </div>
            <div style={{ display: 'flex', fontSize: 100, fontWeight: 700, color: '#1C1C1A', lineHeight: 1 }}>
              21
            </div>
          </div>

          <div style={{ display: 'flex', fontSize: 16, color: '#8A8580', letterSpacing: 1 }}>
            Beat the dealer. Play on Base.
          </div>
        </div>

        {/* Vertical divider (1px) */}
        <div style={{
          display: 'flex', width: 1, background: '#D4CFC7',
          marginTop: 56, marginBottom: 56,
        }} />

        {/* Right: Cards (439px) — cards start at x≈517, never clips left edge */}
        <div style={{ display: 'flex', width: 439, alignItems: 'center' }}>
          <div style={{ display: 'flex', width: 56 }} />
          <div style={{ display: 'flex', gap: 20 }}>
            <Card rank="A" suit="S" />
            <Card rank="K" suit="H" red />
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
