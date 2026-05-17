import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Screenshot 2: Blackjack! (natural 21)
export async function GET() {
  const W = 1284;
  const H = 2778;
  const PAD = 64;
  const CARD_W = 260;
  const CARD_H = 364;
  const CARD_R = 20;

  function Card({ rank, suit, red, faceDown }: { rank: string; suit: string; red?: boolean; faceDown?: boolean }) {
    if (faceDown) {
      return (
        <div style={{
          display: 'flex', width: CARD_W, height: CARD_H,
          background: '#2A2A28', borderRadius: CARD_R,
          border: '1px solid #1a1a18',
        }} />
      );
    }
    const color = red ? '#C0392B' : '#1C1C1A';
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: CARD_W, height: CARD_H, background: '#F5F1EA',
        border: '1px solid #D4CFC7', borderRadius: CARD_R,
        paddingTop: 28, paddingBottom: 28, paddingLeft: 32, paddingRight: 32,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 36, color }}>{suit}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
          <div style={{ display: 'flex', fontSize: 72, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 36, color }}>{suit}</div>
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
            {[{ l: 'W', v: '6' }, { l: 'L', v: '2' }, { l: 'P', v: '1' }].map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#8A8580' }}>{l}</div>
                <div style={{ display: 'flex', fontSize: 72, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>DEALER</div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Card rank="Q" suit="H" red />
            <Card rank="" suit="" faceDown />
          </div>
        </div>

        {/* Result banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, paddingLeft: PAD, paddingRight: PAD }}>
          <div style={{ flex: 1, height: 1, background: '#C4A882', display: 'flex' }} />
          <div style={{ display: 'flex', fontSize: 32, letterSpacing: 12, color: '#A0784A', fontWeight: 600 }}>BLACKJACK</div>
          <div style={{ flex: 1, height: 1, background: '#C4A882', display: 'flex' }} />
        </div>

        {/* Player — Ace + King = 21 */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>YOU</div>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>21</div>
          </div>
          <div style={{ display: 'flex', gap: 24 }}>
            <Card rank="A" suit="S" />
            <Card rank="K" suit="H" red />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 24,
          paddingLeft: PAD, paddingRight: PAD, paddingBottom: 100, paddingTop: 48,
          borderTop: '1px solid #D4CFC7',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 120, background: '#1C1C1A', color: '#EDE8DF',
            fontSize: 28, letterSpacing: 10,
          }}>DEAL AGAIN</div>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, letterSpacing: 8, color: '#A0784A',
          }}>NATURAL BLACKJACK - 3:2</div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
