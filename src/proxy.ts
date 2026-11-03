import { NextResponse, type NextRequest } from 'next/server';
import { listingRepository } from '@/lib/listings';

const known = new Set(listingRepository.listPublic().map((l) => l.slug));

/**
 * The detail page streams, so a notFound() inside it can only answer 200 + noindex.
 * Unknown slugs are resolved here, before rendering, so they get a real 404 status.
 */
export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/')[2] ?? '';
  if (known.has(slug)) return NextResponse.next();
  return NextResponse.rewrite(new URL('/__listing-not-found', request.url));
}

export const config = {
  matcher: '/businesses/:slug',
};
