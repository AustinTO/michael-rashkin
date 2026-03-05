import { disableDraftMode } from '../../../../lib/draftMode';

export async function GET() {
  return disableDraftMode();
}
