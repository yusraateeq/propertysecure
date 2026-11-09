import type { MetadataRoute } from 'next';
import { business } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: new URL('/sitemap.xml', business.url).toString(),
  };
}
