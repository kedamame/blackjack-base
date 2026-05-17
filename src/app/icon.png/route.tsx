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
          alignItems: 'center',
          justifyContent: 'center',
          background: '#EDE8DF',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: 700,
            height: 700,
            background: '#1C1C1A',
            borderRadius: 120,
          }}
        >
          <div
            style={{
              fontSize: 320,
              color: '#EDE8DF',
              fontFamily: 'serif',
              lineHeight: 1,
              display: 'flex',
            }}
          >
            21
          </div>
        </div>
      </div>
    ),
    { width: 1024, height: 1024 },
  );
}
