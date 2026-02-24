export type SanitySlug = { current: string };

export type EvidenceStrength = 'High' | 'Moderate' | 'Low' | 'Unclear';

export type SourceRef = {
  _key?: string;
  title: string;
  url: string;
  year?: number;
  sourceType?: string;
  note?: string;
};

export type EvidenceSnapshot = {
  claimSummary?: string;
  evidenceStrength?: EvidenceStrength;
  whatWouldChangeMyMind?: string[];
  lastReviewedDate?: string;
};

export type Topic = {
  _id: string;
  _type: 'topic';
  title: string;
  slug: string;
  intro?: string;
  heroImage?: any;
  updatedAt?: string;
  publishedAt?: string;

  // long-form
  body?: any[];
  evidenceSnapshot?: EvidenceSnapshot;
  whatWeKnow?: any[];
  whatWeDontKnowYet?: any[];
  myInterpretation?: any[];
  keyTakeaways?: string[];
  bestReferences?: SourceRef[];
};

export type InsightContentType = 'Evidence Brief' | 'Deep Dive' | 'Myth Check' | 'Opinion';

export type Insight = {
  _id: string;
  _type: 'insight';
  title: string;
  slug: string;
  contentType: InsightContentType;
  primaryTopic?: { _id: string; title: string; slug: string };
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  summaryBullets?: string[];
  body?: any[];
  sources?: SourceRef[];
  heroImage?: any;
};

export type PolicyNote = {
  _id: string;
  _type: 'policyNote';
  title: string;
  slug: string;
  contentType: 'Policy Note';
  policyLens?: string;
  primaryTopic?: { _id: string; title: string; slug: string };
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
  summaryBullets?: string[];
  body?: any[];
  sources?: SourceRef[];
  heroImage?: any;
};

export type MediaPlatform = 'YouTube' | 'Podcast' | 'Interview';

export type MediaEpisode = {
  _id: string;
  _type: 'mediaEpisode';
  title: string;
  slug: string;
  heroImage?: any;
  heroImageAlt?: string;
  platform: MediaPlatform;
  embedUrl: string;
  shortDescription?: string;
  keyPoints?: string[];
  timestampOutline?: { time: string; label: string; _key?: string }[];
  transcript?: any[];
  sources?: SourceRef[];
  primaryTopic?: { _id: string; title: string; slug: string };
  tags?: string[];
  publishedAt?: string;
  updatedAt?: string;
};

export type CardContentType = 'Video' | InsightContentType | 'Policy Note';

export type ContentCardItem = {
  _id: string;
  _type: 'mediaEpisode' | 'insight' | 'policyNote';
  title: string;
  slug: string;
  contentType: CardContentType;
  date?: string;
  excerpt?: string;
  topic?: { title: string; slug: string };
};

export type SiteSettings = {
  _id: string;
  _type: 'siteSettings';
  siteTitle?: string;
  featuredTopicsHeading?: string;
  latestHeading?: string;
  mostReadHeading?: string;
  heroActions?: { label: string; href: string; variant?: 'primary' | 'default' }[];
  credentialsLine?: string;
  credentialsLinkLabel?: string;
  credentialsLinkHref?: string;
  homePillars?: { title: string; description?: string; buttonLabel?: string; buttonHref?: string }[];
  featuredTopics?: Topic[];
  pinnedContent?: ContentCardItem[];
};

export type ContentPage = {
  _id: string;
  _type: 'contentPage';
  title: string;
  path: string;
  description?: string;
  heroImage?: any;
  heroImageAlt?: string;
  body: any[];
};

export type LegalPage = {
  _id: string;
  _type: 'legalPage';
  title: string;
  slug: string;
  body: any[];
};
