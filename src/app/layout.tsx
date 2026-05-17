import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/components/providers/AppProvider';

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://blackjack-base.vercel.app';

const miniAppEmbed = {
  version: '1',
  imageUrl: `${APP_URL}/opengraph-image`,
  button: {
    title: 'Play Blackjack',
    action: {
      type: 'launch_miniapp',
      name: 'Blackjack on Base',
      url: APP_URL,
      splashImageUrl: `${APP_URL}/splash.png`,
      splashBackgroundColor: '#EDE8DF',
    },
  },
};

export const metadata: Metadata = {
  title: 'Blackjack on Base',
  description: 'Classic single-player blackjack. Beat the dealer on Base.',
  metadataBase: new URL(APP_URL),
  openGraph: {
    title: 'Blackjack on Base',
    description: 'Classic single-player blackjack. Beat the dealer on Base.',
    type: 'website',
    images: ['/og-image.png'],
  },
  other: {
    'fc:miniapp': JSON.stringify(miniAppEmbed),
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
