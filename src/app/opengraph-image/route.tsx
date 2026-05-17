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
          padding: 56,
          background: '#EDE8DF',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 12,
            letterSpacing: 4,
            color: '#8A8580',
            textTransform: 'uppercase',
          }}
        >
          BASE CHAIN
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div
            style={{
              display: 'flex',
              fontSize: 80,
              color: '#1C1C1A',
              fontWeight: 300,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            Blackjack
          </div>
          <div style={{ display: 'flex', gap: 20, marginTop: 12 }}>
            {[
              { rank: 'A', suit: 'S', red: false },
              { rank: 'K', suit: 'H', red: true },
            ].map(({ rank, suit, red }) => (
              <div
                key={rank}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: 64,
                  height: 90,
                  paddingTop: 8,
                  paddingBottom: 8,
                  paddingLeft: 10,
                  paddingRight: 10,
                  background: '#F5F1EA',
                  border: '1px solid #D4CFC7',
                  borderRadius: 6,
                  fontSize: 18,
                  color: red ? '#DC2626' : '#1C1C1A',
                  fontFamily: 'monospace',
                }}
              >
                <div style={{ display: 'flex' }}>{rank}</div>
                <div style={{ display: 'flex', alignSelf: 'flex-end', transform: 'rotate(180deg)' }}>{rank}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            fontSize: 18,
            color: '#8A8580',
            letterSpacing: 1,
          }}
        >
          Beat the dealer. Play Now.
        </div>
      </div>
    ),
    { width: 900, height: 600 },
  );
}
