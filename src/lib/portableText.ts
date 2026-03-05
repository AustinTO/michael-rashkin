import { toHTML } from '@portabletext/to-html';
import { urlFor } from './image';

// Minimal portable text -> HTML conversion.
// You can extend `components` to handle custom blocks later.
export function portableTextToHtml(value: any[] | undefined): string {
  if (!value || value.length === 0) return '';
  return toHTML(value, {
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
          return `<a href="${escapeAttr(href)}"${target ? ` target="${target}"` : ''}${rel ? ` rel="${rel}"` : ''}>${children}</a>`;
        }
      }
    }
  });
}

function escapeAttr(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeHtml(input: string): string {
  return input.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
