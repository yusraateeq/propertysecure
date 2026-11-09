import type { MetadataRoute } from 'next';
import { business, services, splitServices } from '@/lib/site';

const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/areas-we-serve',
  '/contact-us',
  '/construction-security',
  '/employment',
  '/policies-procedure',
  '/privacy-policy',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const serviceRoutes = [...services, ...splitServices]
    .filter((service) => service.detailHref.startsWith('/services/'))
    .map((service) => service.detailHref);

  return [...new Set([...staticRoutes, ...serviceRoutes])].map((route) => ({
    url: new URL(route, business.url).toString(),
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }));
}
