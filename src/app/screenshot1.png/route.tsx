import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Screenshot 1: Game in progress — player's turn
export async function GET() {
  const W = 1284;
  const H = 2778;
  const PAD = 64;
  const CARD_W = 260;
  const CARD_H = 364;
  const CARD_R = 20;

  const SYM: Record<string, string> = { S: '♠', H: '♥', D: '♦', C: '♣' };

  function Card({ rank, suit, red, faceDown }: { rank: string; suit: string; red?: boolean; faceDown?: boolean }) {
    if (faceDown) {
      return (
        <div style={{
          display: 'flex', width: CARD_W, height: CARD_H,
          background: '#1C1C1A', borderRadius: CARD_R,
          paddingTop: 10, paddingBottom: 10, paddingLeft: 10, paddingRight: 10,
        }}>
          <div style={{
            display: 'flex', flex: 1,
            border: '1px solid #363634', borderRadius: CARD_R - 4,
          }} />
        </div>
      );
    }
    const color = red ? '#C0392B' : '#1C1C1A';
    const pipColor = red ? '#EDD8D5' : '#CCCAC6';
    const sym = SYM[suit] ?? suit;
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: CARD_W, height: CARD_H, background: '#FDFAF5',
        border: '1px solid #D4CFC7', borderRadius: CARD_R,
        paddingTop: 24, paddingBottom: 24, paddingLeft: 28, paddingRight: 28,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 38, color, lineHeight: 1 }}>{sym}</div>
        </div>
        <div style={{ display: 'flex', alignSelf: 'center' }}>
          <div style={{ display: 'flex', fontSize: 108, color: pipColor, lineHeight: 1 }}>{sym}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
          <div style={{ display: 'flex', fontSize: 68, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 38, color, lineHeight: 1 }}>{sym}</div>
        </div>
      </div>
    );
  }

  return new ImageResponse(
    (
      <div style={{
        width: W, height: H, display: 'flex', flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#EDE8DF', fontFamily: 'sans-serif',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          paddingTop: 100, paddingBottom: 56,
          paddingLeft: PAD, paddingRight: PAD,
          borderBottom: '1px solid #D4CFC7',
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>BASE CHAIN</div>
            <div style={{ display: 'flex', fontSize: 96, fontWeight: 300, color: '#1C1C1A', letterSpacing: -2, lineHeight: 1 }}>Blackjack</div>
          </div>
          <div style={{ display: 'flex', gap: 56 }}>
            {[{ l: 'W', v: '3' }, { l: 'L', v: '1' }, { l: 'P', v: '0' }].map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#8A8580' }}>{l}</div>
                <div style={{ display: 'flex', fontSize: 72, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>DEALER</div>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>10</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Card rank="K" suit="S" />
            <Card rank="" suit="" faceDown />
          </div>
        </div>

        {/* VS divider with decorative suits */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, paddingLeft: PAD, paddingRight: PAD }}>
          <div style={{ display: 'flex', gap: 48 }}>
            <div style={{ display: 'flex', fontSize: 164, color: '#D0CCC4', lineHeight: 1 }}>♠</div>
            <div style={{ display: 'flex', fontSize: 164, color: '#E2D0CC', lineHeight: 1 }}>♥</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 32, width: '100%' }}>
            <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
            <div style={{ display: 'flex', fontSize: 22, letterSpacing: 12, color: '#C0BBB3' }}>VS</div>
            <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
          </div>
        </div>

        {/* Player */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>YOU</div>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>17</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Card rank="Q" suit="D" red />
            <Card rank="7" suit="S" />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', gap: 24,
          paddingLeft: PAD, paddingRight: PAD, paddingBottom: 100, paddingTop: 48,
          borderTop: '1px solid #D4CFC7',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 120, background: '#1C1C1A', color: '#EDE8DF',
            fontSize: 28, letterSpacing: 10,
          }}>HIT</div>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 120, border: '1px solid #1C1C1A', color: '#1C1C1A',
            fontSize: 28, letterSpacing: 10,
          }}>STAND</div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
