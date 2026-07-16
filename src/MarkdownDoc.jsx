import { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

import overviewMd from '../content/docs/overview.md?raw';
import kuntunetMd from '../content/docs/kuntunet.md?raw';
import kunterminalMd from '../content/docs/kunterminal.md?raw';
import kunsqlMd from '../content/docs/kunsql.md?raw';

const DOC_LINK_TO_TAB = {
  'overview.md': 'overview',
  'kuntunet.md': 'tunet',
  'kunterminal.md': 'terminal',
  'kunsql.md': 'sql',
};

const DOC_MARKDOWN = {
  overview: overviewMd,
  tunet: kuntunetMd,
  terminal: kunterminalMd,
  sql: kunsqlMd,
};

const imageModules = import.meta.glob('../content/docs/images/**/*', {
  eager: true,
  query: '?url',
  import: 'default',
});

function resolveDocImage(src) {
  if (!src || src.startsWith('http') || src.startsWith('data:')) return src;
  const cleaned = src.replace(/^\.\//, '').replace(/^\//, '');
  const needle = cleaned.startsWith('images/') ? cleaned : `images/${cleaned}`;
  for (const [key, url] of Object.entries(imageModules)) {
    const normalized = key.replace(/\\/g, '/');
    if (normalized.endsWith(`/content/docs/${needle}`) || normalized.endsWith(`/${needle}`)) {
      return url;
    }
  }
  return null;
}

function stripHtmlComments(md) {
  return md.replace(/<!--[\s\S]*?-->/g, '').trim();
}

function extractToc(md) {
  const toc = [];
  for (const line of md.split('\n')) {
    const m = /^(#{2,3})\s+(.+)$/.exec(line.trim());
    if (!m) continue;
    const text = m[2].replace(/[#*`[\]]/g, '').trim();
    const id = slugify(text);
    toc.push({ level: m[1].length, text, id });
  }
  return toc;
}

function slugify(text) {
  return String(text)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u4e00-\u9fff-]/g, '')
    .replace(/-+/g, '-');
}

function textFromChildren(children) {
  if (children == null || typeof children === 'boolean') return '';
  if (typeof children === 'string' || typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(textFromChildren).join('');
  if (typeof children === 'object' && children.props) return textFromChildren(children.props.children);
  return '';
}

function DocImage({ src, alt }) {
  const resolved = resolveDocImage(src);
  if (resolved) {
    return (
      <img
        src={resolved}
        alt={alt || ''}
        className="rounded-card border my-4 max-w-full"
        style={{ borderColor: 'var(--line-soft)' }}
      />
    );
  }
  return (
    <div
      className="my-4 rounded-card border-2 border-dashed p-8 text-center"
      style={{ borderColor: 'var(--line)', background: 'var(--canvas)' }}
    >
      <div className="text-sm font-medium mb-1" style={{ color: 'var(--muted-strong)' }}>
        {alt || '截图占位'}
      </div>
      <div className="text-xs font-mono break-all" style={{ color: 'var(--muted)' }}>
        {src}
      </div>
      <div className="text-xs mt-2" style={{ color: 'var(--muted)' }}>
        请将截图放到 content/docs/ 对应路径后刷新
      </div>
    </div>
  );
}

export function getDocToc(tab) {
  const raw = DOC_MARKDOWN[tab] || DOC_MARKDOWN.overview;
  return extractToc(stripHtmlComments(raw));
}

export default function MarkdownDoc({ tab, setActiveTab, accent }) {
  const source = useMemo(() => {
    const raw = DOC_MARKDOWN[tab] || DOC_MARKDOWN.overview;
    return stripHtmlComments(raw);
  }, [tab]);

  const components = useMemo(() => ({
    h2: ({ children, ...props }) => {
      const id = slugify(textFromChildren(children));
      return (
        <h2 id={id} className="scroll-mt-28" {...props}>
          {children}
        </h2>
      );
    },
    h3: ({ children, ...props }) => {
      const id = slugify(textFromChildren(children));
      return (
        <h3 id={id} className="scroll-mt-28" {...props}>
          {children}
        </h3>
      );
    },
    img: ({ src, alt }) => <DocImage src={src} alt={alt} />,
    a: ({ href = '', children, ...props }) => {
      const file = href.replace(/^\.\//, '').split('#')[0];
      const targetTab = DOC_LINK_TO_TAB[file];
      if (targetTab && setActiveTab) {
        return (
          <button
            type="button"
            className="font-medium underline-offset-2 hover:underline"
            style={{ color: accent || 'var(--primary)' }}
            onClick={() => setActiveTab(targetTab)}
          >
            {children}
          </button>
        );
      }
      return (
        <a href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" {...props}>
          {children}
        </a>
      );
    },
    blockquote: ({ children }) => (
      <blockquote
        className="border-l-4 pl-4 my-4 py-2 not-italic rounded-r-card"
        style={{ borderColor: accent || 'var(--primary)', color: 'var(--muted-strong)', background: 'var(--primary-soft)' }}
      >
        {children}
      </blockquote>
    ),
  }), [accent, setActiveTab]);

  return (
    <div
      className="prose prose-slate max-w-none dark:prose-invert
        prose-headings:scroll-mt-28 prose-headings:font-bold
        prose-a:no-underline hover:prose-a:underline
        prose-code:before:content-none prose-code:after:content-none
        prose-pre:bg-slate-900 prose-pre:border prose-pre:border-slate-700
        prose-table:text-sm"
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
