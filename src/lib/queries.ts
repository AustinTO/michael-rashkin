export const Q = {
  contentPageByPath: `*[_type == "contentPage" && path == $path][0] {
      _id,
      _type,
      title,
      path,
      description,
      heroImage,
      heroImageAlt,
      body
    }`,

  legalPageBySlug: `*[_type == "legalPage" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      body
    }`,

  siteSettings: `*[_type == "siteSettings"][0] {
      _id,
      _type,
      siteTitle,
      featuredTopicsHeading,
      latestHeading,
      mostReadHeading,
      heroActions,
      credentialsLine,
      credentialsLinkLabel,
      credentialsLinkHref,
      homePillars,
      featuredTopics[]->{
        _id,
        _type,
        title,
        "slug": slug.current,
        intro,
        heroImage,
        updatedAt,
        publishedAt
      },
      pinnedContent[]->{
        _id,
        _type,
        title,
        "slug": slug.current,
        heroImage,
        heroImageAlt,
        embedUrl,
        "date": coalesce(updatedAt, publishedAt, _updatedAt),
        "contentType": select(
          _type == "mediaEpisode" => "Video",
          _type == "policyNote" => "Policy Note",
          _type == "insight" => contentType
        ),
        "excerpt": coalesce(shortDescription, array::join(summaryBullets[0...2], " • "), "")
      }
    }`,

  // Topics
  allTopics: `*[_type == "topic" && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      intro,
      heroImage,
      updatedAt,
      publishedAt
    }`,

  topicBySlug: `*[_type == "topic" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      intro,
      heroImage,
      updatedAt,
      publishedAt,
      body,
      evidenceSnapshot {
        claimSummary,
        evidenceStrength,
        whatWouldChangeMyMind,
        lastReviewedDate
      },
      whatWeKnow,
      whatWeDontKnowYet,
      myInterpretation,
      keyTakeaways,
      bestReferences[] {
        _key,
        title,
        "url": url,
        year,
        sourceType,
        note
      }
    }`,

  // Lists
  latestContent: `*[_type in ["mediaEpisode","insight","policyNote"] && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc)[0...12] {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      embedUrl,
      "date": coalesce(updatedAt, publishedAt, _updatedAt),
      // Normalize to a single field for UI pills
      "contentType": select(
        _type == "mediaEpisode" => "Video",
        _type == "policyNote" => "Policy Note",
        _type == "insight" => contentType
      ),
      // Best-effort excerpt
      "excerpt": coalesce(shortDescription, array::join(summaryBullets[0...2], " • "), ""),
      "topic": primaryTopic->{title, "slug": slug.current}
    }`,

  allInsights: `*[_type == "insight" && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      embedUrl,
      contentType,
      publishedAt,
      updatedAt,
      "date": coalesce(updatedAt, publishedAt, _updatedAt),
      "excerpt": array::join(summaryBullets[0...2], " • "),
      "topic": primaryTopic->{title, "slug": slug.current}
    }`,

  insightBySlug: `*[_type == "insight" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      contentType,
      publishedAt,
      updatedAt,
      summaryBullets,
      body,
      sources[] {
        _key,
        title,
        "url": url,
        year,
        sourceType,
        note
      },
      heroImage,
      primaryTopic->{_id, title, "slug": slug.current},
      tags
    }`,

  allPolicyNotes: `*[_type == "policyNote" && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      embedUrl,
      "contentType": "Policy Note",
      policyLens,
      publishedAt,
      updatedAt,
      "date": coalesce(updatedAt, publishedAt, _updatedAt),
      "excerpt": array::join(summaryBullets[0...2], " • "),
      "topic": primaryTopic->{title, "slug": slug.current}
    }`,

  policyBySlug: `*[_type == "policyNote" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      "contentType": "Policy Note",
      policyLens,
      publishedAt,
      updatedAt,
      summaryBullets,
      body,
      sources[] {
        _key,
        title,
        "url": url,
        year,
        sourceType,
        note
      },
      heroImage,
      primaryTopic->{_id, title, "slug": slug.current},
      tags
    }`,

  allMedia: `*[_type == "mediaEpisode" && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      platform,
      embedUrl,
      shortDescription,
      publishedAt,
      updatedAt,
      "date": coalesce(updatedAt, publishedAt, _updatedAt),
      "contentType": "Video",
      "excerpt": shortDescription,
      "topic": primaryTopic->{title, "slug": slug.current}
    }`,

  mediaBySlug: `*[_type == "mediaEpisode" && slug.current == $slug][0] {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      platform,
      embedUrl,
      shortDescription,
      keyPoints,
      timestampOutline,
      transcript,
      sources[] {
        _key,
        title,
        "url": url,
        year,
        sourceType,
        note
      },
      publishedAt,
      updatedAt,
      primaryTopic->{_id, title, "slug": slug.current},
      tags
    }`,

  relatedByTopicId: `*[_type in ["mediaEpisode","insight","policyNote"] && primaryTopic._ref == $topicId && defined(slug.current)]
    | order(coalesce(updatedAt, publishedAt, _updatedAt) desc) {
      _id,
      _type,
      title,
      "slug": slug.current,
      heroImage,
      heroImageAlt,
      embedUrl,
      "date": coalesce(updatedAt, publishedAt, _updatedAt),
      "contentType": select(
        _type == "mediaEpisode" => "Video",
        _type == "policyNote" => "Policy Note",
        _type == "insight" => contentType
      ),
      "excerpt": coalesce(shortDescription, array::join(summaryBullets[0...2], " • "), ""),
      "topic": primaryTopic->{title, "slug": slug.current}
    }`
};
