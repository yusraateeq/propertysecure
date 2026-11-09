import type { Metadata, Viewport } from 'next';
import { Manrope, Merriweather } from 'next/font/google';
import type { ReactNode } from 'react';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { MobileCallButton } from '@/components/layout/MobileCallButton';
import { MotionProvider } from '@/components/providers/MotionProvider';
import { TopBar } from '@/components/layout/TopBar';
import { business, socials } from '@/lib/site';
import './globals.css';

const manrope = Manrope({
  subsets: ['latin'],
  variable: '--font-manrope',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

const merriweather = Merriweather({
  subsets: ['latin'],
  variable: '--font-merriweather',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  metadataBase: new URL(business.url),
  title: {
    default: 'Property Security Services, Inc | Los Angeles Security Guards',
    template: '%s | Property Security Services, Inc',
  },
  description: 'Property Security Services, Inc provides professional commercial, residential, retail, construction, and emergency security services throughout California.',
  applicationName: business.name,
  icons: { icon: '/icons/favicon.png', apple: '/icons/favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: business.url,
    siteName: business.name,
    title: 'Property Security Services, Inc',
    description: 'Professional security services for commercial, residential, retail, event, and construction properties throughout California.',
    images: [{ url: '/images/original-site/sl4-revslider.jpg', width: 1600, height: 800, alt: 'Security officers beside a patrol vehicle' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description: 'Professional security and personal protection services throughout California.',
    images: ['/images/original-site/sl4-revslider.jpg'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#082C46',
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${business.url}/#business`,
  name: business.name,
  url: business.url,
  logo: `${business.url}/images/original-site/LOGGGG.png`,
  image: `${business.url}/images/original-site/sl4-revslider.jpg`,
  telephone: business.phoneDisplay,
  email: business.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '10722 White Oak Ave Ste 4',
    addressLocality: 'Granada Hills',
    addressRegion: 'CA',
    postalCode: '91344',
    addressCountry: 'US',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '16:00',
  },
  sameAs: socials.map((social) => social.href),
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${manrope.variable} ${merriweather.variable}`}>
      <body>
        <MotionProvider>
          <a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-lg bg-gold px-4 py-3 font-heading text-[15px] font-bold text-navy-deep transition-transform focus:translate-y-0">Skip to main content</a>
          <TopBar />
          <Header />
          <main id="main-content">{children}</main>
          <Footer />
          <MobileCallButton />
        </MotionProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema).replace(/</g, '\\u003c') }} />
      </body>
    </html>
  );
}
