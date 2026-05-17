import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Screenshot 3: Dealer busts — YOU WIN
export async function GET() {
  const W = 1284;
  const H = 2778;
  const PAD = 64;
  const CARD_W = 220;
  const CARD_H = 308;
  const CARD_R = 16;

  function Card({ rank, suit, red }: { rank: string; suit: string; red?: boolean }) {
    const color = red ? '#C0392B' : '#1C1C1A';
    return (
      <div style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        width: CARD_W, height: CARD_H, background: '#F5F1EA',
        border: '1px solid #D4CFC7', borderRadius: CARD_R,
        paddingTop: 24, paddingBottom: 24, paddingLeft: 28, paddingRight: 28,
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 30, color }}>{suit}</div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>
          <div style={{ display: 'flex', fontSize: 60, fontWeight: 700, color, lineHeight: 1 }}>{rank}</div>
          <div style={{ display: 'flex', fontSize: 30, color }}>{suit}</div>
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
            {[{ l: 'W', v: '4' }, { l: 'L', v: '3' }, { l: 'P', v: '0' }].map(({ l, v }) => (
              <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 8 }}>
                <div style={{ display: 'flex', fontSize: 24, letterSpacing: 6, color: '#8A8580' }}>{l}</div>
                <div style={{ display: 'flex', fontSize: 72, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>{v}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer — busted with 3 cards */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>DEALER</div>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 300, color: '#C0392B', lineHeight: 1 }}>22</div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Card rank="9" suit="C" />
            <Card rank="6" suit="H" red />
            <Card rank="7" suit="S" />
          </div>
        </div>

        {/* Result banner */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, paddingLeft: PAD, paddingRight: PAD }}>
          <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
          <div style={{ display: 'flex', fontSize: 32, letterSpacing: 12, color: '#1C1C1A', fontWeight: 600 }}>YOU WIN</div>
          <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
        </div>

        {/* Player */}
        <div style={{ display: 'flex', flexDirection: 'column', paddingLeft: PAD, paddingRight: PAD, gap: 40 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 28 }}>
            <div style={{ display: 'flex', fontSize: 26, letterSpacing: 8, color: '#8A8580' }}>YOU</div>
            <div style={{ display: 'flex', fontSize: 56, fontWeight: 300, color: '#1C1C1A', lineHeight: 1 }}>18</div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <Card rank="8" suit="D" red />
            <Card rank="K" suit="S" />
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          paddingLeft: PAD, paddingRight: PAD, paddingBottom: 100, paddingTop: 48,
          borderTop: '1px solid #D4CFC7',
        }}>
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
            height: 120, background: '#1C1C1A', color: '#EDE8DF',
            fontSize: 28, letterSpacing: 10,
          }}>DEAL AGAIN</div>
        </div>
      </div>
    ),
    { width: W, height: H },
  );
}
