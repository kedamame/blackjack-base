import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  const W = 900;
  const H = 600;
  const CARD_W = 165;
  const CARD_H = 231;
  const CARD_R = 14;

  const SYM: Record<string, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };

  function Card({ rank, suit, red }: { rank: string; suit: string; red?: boolean }) {
    const color = red ? '#C0392B' : '#1C1C1A';
    const pipColor = red ? '#EDD8D5' : '#CCCAC6';
    const sym = SYM[suit] ?? suit;
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: CARD_W, height: CARD_H, background: '#FDFAF5',
        border: '1px solid #D4CFC7', borderRadius: CARD_R,
        paddingTop: 18, paddingBottom: 18, paddingLeft: 20, paddingRight: 20,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 26, color, lineHeight: 1 }}>{sym}</div>
        </div>
        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <div style={{ display: 'flex', fontSize: 68, color: pipColor, lineHeight: 1 }}>{sym}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
          <div style={{ display: 'flex', fontSize: 44, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 26, color, lineHeight: 1 }}>{sym}</div>
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
        {/* Left: Cards */}
        <div style={{
          display: 'flex', width: 400,
          alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ display: 'flex', gap: 20 }}>
            <Card rank="A" suit="S" />
            <Card rank="K" suit="H" red />
          </div>
        </div>

        {/* Vertical divider */}
        <div style={{
          display: 'flex', width: 1, background: '#D4CFC7',
          marginTop: 56, marginBottom: 56,
        }} />

        {/* Right: Text (900 - 400 left - 1 divider = 499) */}
        <div style={{
          display: 'flex', width: 499, flexDirection: 'column',
          justifyContent: 'space-between',
          paddingTop: 52, paddingBottom: 52,
          paddingLeft: 48, paddingRight: 52,
        }}>
          {/* Label */}
          <div style={{ display: 'flex', fontSize: 13, letterSpacing: 7, color: '#8A8580' }}>
            BASE CHAIN
          </div>

          {/* Main content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ display: 'flex', fontSize: 68, fontWeight: 300, color: '#1C1C1A', letterSpacing: -2, lineHeight: 1 }}>
              Blackjack
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 1, background: '#C4A882', display: 'flex' }} />
              <div style={{ display: 'flex', fontSize: 18, letterSpacing: 10, color: '#A0784A', fontWeight: 700 }}>
                BLACKJACK
              </div>
              <div style={{ width: 48, height: 1, background: '#C4A882', display: 'flex' }} />
            </div>
            <div style={{ display: 'flex', fontSize: 100, fontWeight: 700, color: '#1C1C1A', lineHeight: 1 }}>
              21
            </div>
          </div>

          {/* CTA */}
          <div style={{ display: 'flex', fontSize: 17, color: '#8A8580', letterSpacing: 1 }}>
            Beat the dealer. Play on Base.
          </div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
