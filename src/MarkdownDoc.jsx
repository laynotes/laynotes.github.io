import { useMemo, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { Copy, Check } from 'lucide-react';
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

function PreWithCopy({ children }) {
  const [copied, setCopied] = useState(false);
  const text = textFromChildren(children).replace(/\n$/, '');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="code-block relative my-4 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--line-soft)' }}>
      <button
        type="button"
        onClick={handleCopy}
        className="absolute top-2.5 right-2.5 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border transition-colors"
        style={{
          background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(15,23,42,0.72)',
          borderColor: copied ? 'rgba(34,197,94,0.45)' : 'rgba(148,163,184,0.35)',
          color: copied ? '#4ade80' : '#e2e8f0',
          backdropFilter: 'blur(6px)',
        }}
        aria-label={copied ? '已复制' : '复制代码'}
      >
        {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
        {copied ? '已复制' : '复制'}
      </button>
      <pre className="!m-0 !rounded-none overflow-x-auto bg-slate-900 text-slate-100 p-4 pt-12 text-sm leading-relaxed">
        {children}
      </pre>
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
        style={{
          borderColor: accent || 'var(--primary)',
          color: 'var(--muted-strong)',
          background: 'color-mix(in srgb, var(--primary) 12%, var(--surface))',
        }}
      >
        {children}
      </blockquote>
    ),
    pre: ({ children }) => <PreWithCopy>{children}</PreWithCopy>,
    code: ({ className, children, ...props }) => {
      const isBlock = typeof className === 'string' && className.includes('language-');
      if (isBlock) {
        return (
          <code className={className} {...props}>
            {children}
          </code>
        );
      }
      return (
        <code
          className="px-1.5 py-0.5 rounded text-[0.9em] font-medium"
          style={{
            background: 'var(--canvas)',
            color: 'var(--text)',
            border: '1px solid var(--line-soft)',
          }}
          {...props}
        >
          {children}
        </code>
      );
    },
  }), [accent, setActiveTab]);

  return (
    <div className="markdown-body prose max-w-none prose-headings:scroll-mt-28 prose-headings:font-bold prose-a:no-underline hover:prose-a:underline prose-code:before:content-none prose-code:after:content-none prose-pre:p-0 prose-pre:bg-transparent prose-table:text-sm">
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]} components={components}>
        {source}
      </ReactMarkdown>
    </div>
  );
}
