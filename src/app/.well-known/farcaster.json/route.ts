import { NextResponse } from 'next/server';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://blackjack-base.vercel.app';

export async function GET() {
  return NextResponse.json({
    accountAssociation: {
      header: 'REPLACE_WITH_WARPCAST_MANIFEST_HEADER',
      payload: 'REPLACE_WITH_WARPCAST_MANIFEST_PAYLOAD',
      signature: 'REPLACE_WITH_WARPCAST_MANIFEST_SIGNATURE',
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
