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
          justifyContent: 'space-between',
          padding: 80,
          background: '#EDE8DF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              letterSpacing: 4,
              color: '#8A8580',
              textTransform: 'uppercase',
            }}
          >
            BASE CHAIN
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 96,
              color: '#1C1C1A',
              fontWeight: 300,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Blackjack
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#8A8580',
              letterSpacing: 1,
            }}
          >
            Classic single-player blackjack. Beat the dealer.
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div style={{ display: 'flex', gap: 24 }}>
            {['A', 'K', 'Q', 'J'].map((rank) => (
              <div
                key={rank}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 72,
                  height: 100,
                  paddingTop: 10,
                  paddingBottom: 10,
                  paddingLeft: 12,
                  paddingRight: 12,
                  background: '#F5F1EA',
                  border: '1px solid #D4CFC7',
                  borderRadius: 8,
                  fontSize: 20,
                  color: '#1C1C1A',
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ display: 'flex' }}>{rank}</div>
                <div style={{ display: 'flex', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>{rank}</div>
              </div>
            ))}
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 14,
              letterSpacing: 3,
              color: '#8A8580',
              textTransform: 'uppercase',
            }}
          >
            Farcaster Miniapp
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
