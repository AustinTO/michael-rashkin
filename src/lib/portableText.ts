import { toHTML } from '@portabletext/to-html';
import { urlFor } from './image';

// Minimal portable text -> HTML conversion.
// You can extend `components` to handle custom blocks later.
export function portableTextToHtml(value: any[] | undefined): string {
  if (!value || value.length === 0) return '';
  return toHTML(withAutolinkedUrls(value), {
    components: {
      types: {
        portableImage: ({ value }) => {
          const imageUrl = value?.asset ? urlFor(value).width(1400).quality(82).format('webp').url() : '';
          if (!imageUrl) return '';
          const alt = escapeAttr((value?.alt as string) || '');
          const caption = value?.caption ? String(value.caption) : '';
          return caption
            ? `<figure><img src="${escapeAttr(imageUrl)}" alt="${alt}" loading="lazy" /><figcaption>${escapeHtml(caption)}</figcaption></figure>`
            : `<img src="${escapeAttr(imageUrl)}" alt="${alt}" loading="lazy" />`;
        }
      },
      marks: {
        link: ({ children, value }) => {
          const href = (value?.href as string) || '#';
          const isExternal = /^https?:\/\//.test(href);
          const rel = isExternal ? 'noopener noreferrer' : undefined;
          const target = isExternal ? '_blank' : undefined;
          const childText = String(children ?? '');
          const isAutoLink = childText === href;
          return `<a href="${escapeAttr(href)}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''}${isAutoLink ? ' data-auto-link="true"' : ''}>${children}</a>`;
        }
      }
    }
  });
}

function withAutolinkedUrls(blocks: any[]): any[] {
  return blocks.map((block, blockIndex) => {
    if (block?._type !== 'block' || !Array.isArray(block.children)) {
      return block;
    }

    const markDefs = Array.isArray(block.markDefs) ? [...block.markDefs] : [];
    let markCounter = 0;
    let changed = false;

    const children = block.children.flatMap((child: any, childIndex: number) => {
      if (child?._type !== 'span' || typeof child.text !== 'string' || !child.text.includes('http')) {
        return [child];
      }

      const existingLinkMarks = new Set(
        markDefs
          .filter((def) => def?._type === 'link' && typeof def?._key === 'string')
          .map((def) => def._key)
      );

      if (Array.isArray(child.marks) && child.marks.some((mark: string) => existingLinkMarks.has(mark))) {
        return [child];
      }

      const parts = splitTextByUrls(child.text);
      if (parts.length === 1) {
        return [child];
      }

      changed = true;
      return parts.map((part) => {
        if (!part.isUrl) {
          return {
            ...child,
            _key: `${child._key || `span-${blockIndex}-${childIndex}`}-${markCounter++}`,
            text: part.text
          };
        }

        const markKey = `auto-link-${blockIndex}-${childIndex}-${markCounter++}`;
        markDefs.push({
          _key: markKey,
          _type: 'link',
          href: part.text
        });

        return {
          ...child,
          _key: `${child._key || `span-${blockIndex}-${childIndex}`}-${markCounter++}`,
          text: part.text,
          marks: [...(child.marks || []), markKey]
        };
      });
    });

    if (!changed) {
      return block;
    }

    return {
      ...block,
      children,
      markDefs
    };
  });
}

function splitTextByUrls(text: string): Array<{ text: string; isUrl: boolean }> {
  const urlPattern = /(https?:\/\/[^\s<]+)/g;
  const parts: Array<{ text: string; isUrl: boolean }> = [];
  let lastIndex = 0;

  for (const match of text.matchAll(urlPattern)) {
    const url = match[0];
    const index = match.index ?? 0;

    if (index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, index), isUrl: false });
    }

    const trimmed = trimTrailingPunctuation(url);
    parts.push({ text: trimmed.url, isUrl: true });

    if (trimmed.trailing) {
      parts.push({ text: trimmed.trailing, isUrl: false });
    }

    lastIndex = index + url.length;
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), isUrl: false });
  }

  return parts.length ? parts : [{ text, isUrl: false }];
}

function trimTrailingPunctuation(url: string): { url: string; trailing: string } {
  const match = url.match(/^(.*?)([),.;!?]+)?$/);
  return {
    url: match?.[1] || url,
    trailing: match?.[2] || ''
  };
}

function escapeAttr(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
