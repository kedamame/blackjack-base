import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#EDE8DF',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            padding: '60px 48px 32px',
            borderBottom: '1px solid #D4CFC7',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', fontSize: 20, letterSpacing: 6, color: '#8A8580' }}>BASE CHAIN</div>
            <div style={{ display: 'flex', fontSize: 64, fontWeight: 300, color: '#1C1C1A', letterSpacing: -1 }}>Blackjack</div>
          </div>
          <div style={{ display: 'flex', gap: 40 }}>
            {[{ label: 'W', val: '2' }, { label: 'L', val: '4' }, { label: 'P', val: '0' }].map(({ label, val }) => (
              <div key={label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                <div style={{ display: 'flex', fontSize: 18, letterSpacing: 4, color: '#8A8580' }}>{label}</div>
                <div style={{ display: 'flex', fontSize: 48, fontWeight: 300, color: '#1C1C1A' }}>{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Dealer */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '48px 48px 0', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <div style={{ display: 'flex', fontSize: 18, letterSpacing: 5, color: '#8A8580' }}>DEALER</div>
            <div style={{ display: 'flex', fontSize: 36, fontWeight: 300, color: '#1C1C1A' }}>22</div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ rank: '9' }, { rank: '6' }, { rank: '7' }].map(({ rank }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 120,
                  height: 172,
                  padding: '16px 20px',
                  background: '#F5F1EA',
                  border: '1px solid #D4CFC7',
                  borderRadius: 12,
                  fontSize: 28,
                  color: '#1C1C1A',
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ display: 'flex' }}>{rank}</div>
                <div style={{ display: 'flex', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>{rank}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Divider with YOU WIN */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '48px 48px' }}>
          <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
          <div style={{ display: 'flex', fontSize: 18, letterSpacing: 8, color: '#1C1C1A', fontWeight: 600 }}>YOU WIN</div>
          <div style={{ flex: 1, height: 1, background: '#D4CFC7', display: 'flex' }} />
        </div>

        {/* Player */}
        <div style={{ display: 'flex', flexDirection: 'column', padding: '0 48px', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
            <div style={{ display: 'flex', fontSize: 18, letterSpacing: 5, color: '#8A8580' }}>YOU</div>
            <div style={{ display: 'flex', fontSize: 36, fontWeight: 300, color: '#1C1C1A' }}>18</div>
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            {[{ rank: '8' }, { rank: 'K' }].map(({ rank }, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 120,
                  height: 172,
                  padding: '16px 20px',
                  background: '#F5F1EA',
                  border: '1px solid #D4CFC7',
                  borderRadius: 12,
                  fontSize: 28,
                  color: '#1C1C1A',
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ display: 'flex' }}>{rank}</div>
                <div style={{ display: 'flex', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>{rank}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', marginTop: 'auto', padding: '32px 48px', borderTop: '1px solid #D4CFC7' }}>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '28px 0',
              background: '#1C1C1A',
              color: '#EDE8DF',
              fontSize: 22,
              letterSpacing: 6,
            }}
          >
            DEAL AGAIN
          </div>
        </div>
      </div>
    ),
    { width: 1284, height: 2778 },
  );
}
