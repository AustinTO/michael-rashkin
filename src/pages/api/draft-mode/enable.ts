import { sanityClient, sanityConfig } from '../../../lib/sanity';
import { enableDraftMode } from '../../../lib/draftMode';

export async function GET({ request }: { request: Request }) {
  if (!sanityConfig.token) {
    return new Response('Missing SANITY_READ_TOKEN', { status: 500 });
  }

  const clientWithToken = sanityClient.withConfig({
    token: sanityConfig.token,
    useCdn: false
  });

  return enableDraftMode(request, clientWithToken);
}
