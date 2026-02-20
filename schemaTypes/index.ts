import topic from './topic';
import insight from './insight';
import policyNote from './policyNote';
import mediaEpisode from './mediaEpisode';
import referenceEntry from './referenceEntry';
import legalPage from './legalPage';
import correctionEntry from './correctionEntry';
import siteSettings from './siteSettings';

// Object types
import evidenceSnapshot from './objects/evidenceSnapshot';
import sourceReference from './objects/sourceReference';
import timestampItem from './objects/timestampItem';

export const schemaTypes = [
  // documents
  siteSettings,
  topic,
  mediaEpisode,
  insight,
  policyNote,
  referenceEntry,
  correctionEntry,
  legalPage,

  // objects
  evidenceSnapshot,
  sourceReference,
  timestampItem
];
