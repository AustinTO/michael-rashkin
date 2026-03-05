import { Q } from './queries';
import { portableTextToHtml } from './portableText';
import { sanityFetch } from './sanity';
import type { ContentPage, LegalPage } from './types';

export async function getContentPage(path: string, request?: Request): Promise<{ page: ContentPage; html: string }> {
  const page = await sanityFetch<ContentPage | null>(Q.contentPageByPath, { path }, { request });
  if (!page) throw new Error(`Missing contentPage for path: ${path}`);
  return { page, html: portableTextToHtml(page.body) };
}

export async function getLegalPage(slug: string, request?: Request): Promise<{ page: LegalPage; html: string }> {
  const page = await sanityFetch<LegalPage | null>(Q.legalPageBySlug, { slug }, { request });
  if (!page) throw new Error(`Missing legalPage for slug: ${slug}`);
  return { page, html: portableTextToHtml(page.body) };
}
