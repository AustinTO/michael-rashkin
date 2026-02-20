import { toHTML } from '@portabletext/to-html';

// Minimal portable text -> HTML conversion.
// You can extend `components` to handle custom blocks later.
export function portableTextToHtml(value: any[] | undefined): string {
  if (!value || value.length === 0) return '';
  return toHTML(value, {
    components: {
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
