import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://blackjack-base.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'eyJmaWQiOjIxMTE4OSwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweEFBZTM5NEQ1MWUyYzBhOTczNWUwQmI2NzdFMTJmMjE1MjVCRWI1NTIifQ',
      payload: 'eyJkb21haW4iOiJibGFja2phY2stYmFzZS52ZXJjZWwuYXBwIn0',
      signature: 'WlfBirJpfEIt8Cf/UonW3QzpQa+LCbZG4AKpUJ+M5Gl/+n3HZwhD9iUf8WtsosITasIeDkrNc4QcCwy/yLb3pRs=',
    },
    miniapp: {
      version: '1',
      name: 'Blackjack on Base',
      homeUrl: APP_URL,
      iconUrl: `${APP_URL}/icon.png`,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#EDE8DF',
      subtitle: 'Beat the dealer on Base',
      description:
        'Classic single-player blackjack. No stakes, pure strategy. Beat the dealer in this minimal, elegant card game built on Base.',
      screenshotUrls: [
        `${APP_URL}/screenshot1.png`,
        `${APP_URL}/screenshot2.png`,
        `${APP_URL}/screenshot3.png`,
      ],
      primaryCategory: 'games',
      tags: ['blackjack', 'cards', 'base', 'game', 'casino'],
      heroImageUrl: `${APP_URL}/og-image.png`,
      tagline: 'Beat the dealer on Base',
      ogTitle: 'Blackjack on Base',
      ogDescription: 'Classic single-player blackjack. Beat the dealer.',
      ogImageUrl: `${APP_URL}/og-image.png`,
      requiredChains: ['eip155:8453'],
      requiredCapabilities: [],
      noindex: false,
    },
  });
}
