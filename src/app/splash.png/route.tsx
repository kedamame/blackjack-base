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
            fontSize: 96,
            color: '#1C1C1A',
            fontFamily: 'serif',
            fontWeight: 'bold',
            display: 'flex',
          }}
        >
          21
        </div>
      </div>
    ),
    { width: 200, height: 200 },
  );
}
