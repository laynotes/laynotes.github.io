import React, { useState, useEffect } from 'react';
import {
  Layers, Network, Database, Download, Monitor,
  Book, Moon, Sun, ArrowRight, ChevronRight,
  Cpu, Shield, Zap, CheckCircle2, Server, Globe,
  TerminalSquare, Box, Play, FileText
} from 'lucide-react';
import MarkdownDoc, { getDocToc } from './MarkdownDoc.jsx';

const PRODUCTS = {
  tunet: {
    id: 'tunet',
    name: 'KunTunet',
    slogan: '轻量 TCP 内网穿透，中转多路复用 · TLS · Dashboard',
    accent: '#f97316',
    accentSoft: '#fff7ed',
    accentDark: '#431407',
    accentBorder: '#fed7aa',
    accentBorderDark: '#9a3412',
    icon: Network,
    tags: ['TCP 穿透', 'TLS 加密', 'Token 认证', '桌面客户端'],
    features: [
      { title: 'TCP 中转穿透', desc: '内网 Client 主动连公网 Server，把本地 TCP 服务映射到公网端口，外网即可访问。' },
      { title: 'TLS + Token', desc: '支持证书加密与 Token 认证（含多 Agent、过期与撤销），适合正式环境部署。' },
      { title: 'Dashboard 监控', desc: '内置 Web 管理面板，查看在线 Agent、隧道状态与流量统计。' },
      { title: '断线自愈', desc: '自动重连、心跳检测，Client 常驻后网络抖动可自行恢复。' }
    ],
    intro: 'KunTunet 通过一台公网中转服务器，把内网机器上的 TCP 服务暴露到公网端口。提供服务端、命令行客户端，以及可视化桌面客户端，适合 SSH、数据库、Web 等 TCP 场景。',
    techStack: 'Server + Client + 桌面 GUI · Windows / macOS / Linux',
    version: 'v1.3',
    quickStart: [
      { comment: '# 1. 公网机器启动服务端' },
      { cmd: 'KunTunetServer -control 0.0.0.0:7000 -token YOUR_TOKEN -mgmt 127.0.0.1:8001' },
      { comment: '# 2. 内网机器启动客户端（映射本地 8080 → 公网 9000）' },
      { cmd: 'KunTunetClient -server PUBLIC_IP:7000 -token YOUR_TOKEN -name web -remote 0.0.0.0:9000 -local 127.0.0.1:8080' },
      { comment: '# 3. 外网访问映射端口' },
      { cmd: 'curl http://PUBLIC_IP:9000' },
      { comment: '# 4. 浏览器打开 Dashboard' },
      { cmd: '# http://PUBLIC_IP:8001' }
    ]
  },
  terminal: {
    id: 'terminal',
    name: 'KunTerminal',
    slogan: 'AI Copilot 加持的跨平台 SSH / SFTP 终端',
    accent: '#22c55e',
    accentSoft: '#f0fdf4',
    accentDark: '#052e16',
    accentBorder: '#bbf7d0',
    accentBorderDark: '#166534',
    icon: TerminalSquare,
    tags: ['AI Copilot', 'Skills 插件', '多模态', 'SSH / SFTP'],
    features: [
      { title: 'AI Copilot 运维助手', desc: '结合当前终端会话与远程文件上下文，解释报错、生成排查命令、推进 AI Task；支持 OpenAI 兼容 API 与本地 AI CLI。' },
      { title: 'Skills 与多模态', desc: '内置 Skills 推荐；可附带截图 / 图片提问，让 AI 看日志画面与配置片段再给建议。' },
      { title: '交互式 SSH 终端', desc: '多 Tab 会话管理，同时操作多台服务器；本地终端与远程会话并列。' },
      { title: 'SFTP / IDE 一体', desc: '可视化传文件，IDE 改远程配置后立刻在终端验证，可一键把文件发给 AI 分析。' }
    ],
    intro: 'KunTerminal 把 SSH、SFTP、远程 IDE 与 AI Copilot 放在同一桌面端：连上主机后即可边操作边问 AI，适合排障、改配置与批量运维。支持云端 API 与本地 CLI，数据与会话留在本机。',
    techStack: '桌面客户端 · AI Copilot · Windows / macOS / Linux',
    version: 'v1.6.0',
    quickStart: [
      { comment: '# 1. 安装并打开 KunTerminal，登记主机后「极速连通」' },
      { cmd: '# 连接管理 → 登记主机 → 极速连通' },
      { comment: '# 2. 系统设置 → AI 助手：选择 OpenAI 或本地 AI CLI' },
      { cmd: '# 填写 Base URL / 模型 / API Key，或本地命令' },
      { comment: '# 3. 终端工具栏打开 AI Copilot，结合会话提问 / 跑 AI Task' },
      { cmd: '# 可附带图片；也可从 IDE 把文件发给 AI' }
    ]
  },
  sql: {
    id: 'sql',
    name: 'KunSQL',
    slogan: 'AI Copilot 驱动的多引擎数据库客户端',
    accent: '#0ea5e9',
    accentSoft: '#f0f9ff',
    accentDark: '#0c4a6e',
    accentBorder: '#bae6fd',
    accentBorderDark: '#075985',
    icon: Database,
    tags: ['AI Copilot', 'Skills / 知识库', '多引擎', '执行计划'],
    features: [
      { title: 'AI Copilot 写 SQL / 解读', desc: '右侧 Copilot 结合库表上下文生成查询、解释结果与执行计划；支持 @ 引用 Schema 对象。' },
      { title: 'Skills 插件与知识库', desc: '按场景挂载 Skills，沉淀团队 SQL / 规范到知识库，让 AI 回答更贴合你们的库。' },
      { title: '多引擎统一工作台', desc: 'PostgreSQL、MySQL、SQLite、SQL Server、MongoDB、Redis、ClickHouse 等一站连接与浏览。' },
      { title: '查询 · 计划 · 导出', desc: 'Monaco 编辑器运行 / 运行全部 / 执行计划；结果导出 CSV / TSV / JSON / SQL。' }
    ],
    intro: 'KunSQL 是带 AI Copilot 的本地多引擎数据库客户端：连上库后即可边查边问，生成 SQL、解读执行计划、基于知识库答疑。凭据加密保存在本机，可选云端 API 或本地 AI CLI。',
    techStack: '桌面客户端 · AI Copilot · Windows / macOS / Linux',
    version: 'v1.0.1',
    quickStart: [
      { comment: '# 1. 安装 KunSQL，新建连接并「测试连接」→「连接」' },
      { cmd: '# 选择引擎 → 填写地址账号 → 连接' },
      { comment: '# 2. 设置 → AI 助手：配置 OpenAI 兼容 API 或本地 CLI' },
      { cmd: '# 可启用 Skills / 知识库' },
      { comment: '# 3. 展开右侧 AI Copilot，@ 引用表后提问或生成 SQL' },
      { cmd: '# 也可用工具栏「执行计划」交给 AI 解读' }
    ]
  }
};

const SYNERGY_CASES = [
  { p1: 'tunet', p2: 'terminal', desc: '穿透内网后 SSH / SFTP，并用 AI Copilot 排障' },
  { p1: 'tunet', p2: 'sql', desc: '外网连内网库，AI Copilot 辅助写 SQL / 读计划' }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [docsTab, setDocsTab] = useState('overview');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  const navigate = (page, opts = {}) => {
    setCurrentPage(page);
    if (page === 'docs' && opts.docsTab) {
      setDocsTab(opts.docsTab);
    }
    window.scrollTo(0, 0);
  };

  return (
    <div className={isDark ? 'dark theme-dark' : ''}>
      <div style={{ background: 'var(--canvas)', color: 'var(--text)', minHeight: '100vh' }}
           className="font-sans transition-colors duration-300">

        <nav className="sticky top-0 z-50 backdrop-blur-md border-b"
             style={{ background: isDark ? 'rgba(17,24,39,0.85)' : 'rgba(255,255,255,0.78)', borderColor: 'var(--line-soft)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigate('home')}>
                <div className="p-1.5 rounded-btn" style={{ background: 'var(--primary)' }}>
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  Kun <span style={{ color: 'var(--primary)' }}>Suite</span>
                </span>
              </div>

              <div className="hidden md:flex space-x-8">
                <button onClick={() => navigate('home')}
                  className="text-sm font-medium transition-colors"
                  style={{ color: currentPage === 'home' ? 'var(--primary)' : 'var(--muted-strong)' }}>
                  首页
                </button>

                <div className="relative group">
                  <button className="text-sm font-medium flex items-center gap-1"
                          style={{ color: 'var(--muted-strong)' }}>
                    工具列表 <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 rounded-card shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                       style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
                    {Object.values(PRODUCTS).map(p => (
                      <button key={p.id} onClick={() => navigate(p.id)}
                        className="w-full text-left px-4 py-3 text-sm flex items-center gap-3 first:rounded-t-card last:rounded-b-card transition-colors"
                        style={{ color: 'var(--text)' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--primary-soft)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                        <p.icon className="w-4 h-4" style={{ color: p.accent }} /> {p.name}
                      </button>
                    ))}
                  </div>
                </div>

                <button onClick={() => navigate('download')}
                  className="text-sm font-medium transition-colors"
                  style={{ color: currentPage === 'download' ? 'var(--primary)' : 'var(--muted-strong)' }}>
                  下载中心
                </button>
                <button onClick={() => navigate('docs')}
                  className="text-sm font-medium transition-colors"
                  style={{ color: currentPage === 'docs' ? 'var(--primary)' : 'var(--muted-strong)' }}>
                  文档
                </button>
              </div>

              <div className="flex items-center gap-4">
                <button onClick={() => setIsDark(!isDark)} className="icon-button" title="切换主题">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        <main style={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
          {currentPage === 'home' && <HomePage navigate={navigate} isDark={isDark} />}
          {['tunet', 'terminal', 'sql'].includes(currentPage) && (
            <ProductPage product={PRODUCTS[currentPage]} navigate={navigate} isDark={isDark} />
          )}
          {currentPage === 'download' && <DownloadPage navigate={navigate} isDark={isDark} />}
          {currentPage === 'docs' && (
            <DocsPage navigate={navigate} isDark={isDark} activeTab={docsTab} setActiveTab={setDocsTab} />
          )}
        </main>

        <footer className="py-12 mt-20 border-t"
                style={{ background: 'var(--sidebar)', borderColor: 'var(--line-soft)' }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-6 h-6" style={{ color: 'var(--primary)' }} />
                <span className="font-bold text-lg">Kun Suite</span>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                致力于打造现代化、轻量级、开箱即用的自研运维工具集合。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>核心产品</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                {Object.values(PRODUCTS).map(p => (
                  <li key={p.id}><button onClick={() => navigate(p.id)} className="transition-colors" style={{ color: 'var(--muted)' }}
                    onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>{p.name}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>资源支持</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                <li><button onClick={() => navigate('download')} className="transition-colors" style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>统一发版中心</button></li>
                <li><button onClick={() => navigate('docs')} className="transition-colors" style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>使用与部署文档</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>关于</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                <li><button onClick={() => navigate('docs')} className="transition-colors" style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>使用与部署文档</button></li>
                <li><button onClick={() => navigate('download')} className="transition-colors" style={{ color: 'var(--muted)' }}
                  onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
                  onMouseLeave={e => e.currentTarget.style.color = 'var(--muted)'}>版本与下载</button></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t text-sm text-center"
               style={{ borderColor: 'var(--line-soft)', color: 'var(--muted)' }}>
            © {new Date().getFullYear()} KunTools Team. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  );
}

function HomePage({ navigate, isDark }) {
  return (
    <div className="animate-slide-up">
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 blur-3xl rounded-full pointer-events-none"
             style={{ background: isDark ? 'rgba(49,104,244,0.06)' : 'rgba(6,182,212,0.1)' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            一站式自研 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">运维工具集</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light" style={{ color: 'var(--muted)' }}>
            内网穿透 · AI 终端 · AI 数据库客户端 · 轻量开箱即用
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('core-tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="button button-primary button-lg group">
              浏览全部工具 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('docs')}
              className="button button-lg">
              <Book className="w-4 h-4" /> 阅读使用文档
            </button>
          </div>
        </div>
      </section>

      <section id="core-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">核心产品矩阵</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(PRODUCTS).map(product => (
            <ProductCard key={product.id} product={product} navigate={navigate} isDark={isDark} />
          ))}
        </div>
      </section>

      <section className="py-20 mt-12 border-y" style={{ background: isDark ? 'rgba(17,24,39,0.4)' : 'rgba(241,245,249,0.5)', borderColor: 'var(--line-soft)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">套件联动，释放无限潜能</h2>
            <p style={{ color: 'var(--muted)' }}>Kun Suite 工具并非孤立，它们可以无缝搭配，形成完整的内网运维方案。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SYNERGY_CASES.map((synergy, idx) => {
              const P1 = PRODUCTS[synergy.p1];
              const P2 = PRODUCTS[synergy.p2];
              return (
                <div key={idx} className="flex flex-col gap-3 p-6 rounded-card border shadow-panel"
                     style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 w-2/5">
                      <div className="p-2 rounded-btn" style={{ background: P1.accentSoft }}>
                        <P1.icon className="w-5 h-5" style={{ color: P1.accent }} />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{P1.name}</span>
                    </div>
                    <div className="flex-1 flex justify-center font-bold text-xl" style={{ color: 'var(--line)' }}>+</div>
                    <div className="flex items-center gap-3 w-2/5 flex-row-reverse text-right">
                      <div className="p-2 rounded-btn" style={{ background: P2.accentSoft }}>
                        <P2.icon className="w-5 h-5" style={{ color: P2.accent }} />
                      </div>
                      <span className="font-semibold text-sm sm:text-base">{P2.name}</span>
                    </div>
                  </div>
                  <p className="text-sm text-center" style={{ color: 'var(--muted)' }}>{synergy.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="max-w-4xl mx-auto mt-6 text-center text-sm font-medium py-3 rounded-btn border border-dashed"
               style={{ color: 'var(--muted-strong)', background: 'var(--surface)', borderColor: 'var(--line)' }}>
            例如：KunTunet 打通网络后，用 KunTerminal / KunSQL 远程操作，并借助 AI Copilot 排障与写 SQL。
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-2">工具集市</h2>
          <p style={{ color: 'var(--muted)' }} className="text-sm">轻量网络工具、运维脚本陆续更新中...</p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="border-2 border-dashed rounded-card p-6 flex flex-col items-center justify-center text-center h-48 opacity-50 cursor-not-allowed transition-opacity hover:opacity-80"
                 style={{ borderColor: 'var(--line)' }}>
              <Box className="w-8 h-8 mb-3" style={{ color: 'var(--muted)' }} />
              <span className="font-medium" style={{ color: 'var(--muted-strong)' }}>模块研发中</span>
              <span className="text-xs mt-1" style={{ color: 'var(--muted)' }}>Coming Soon</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function ProductCard({ product, navigate, isDark }) {
  const isAI = product.id === 'terminal' || product.id === 'sql';
  return (
    <div className="rounded-card p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col relative"
         style={{ background: 'var(--surface)', borderColor: isDark ? product.accentBorderDark : product.accentBorder }}>
      {isAI && (
        <span className="absolute top-4 right-4 text-[10px] font-bold px-2 py-0.5 rounded-full border"
              style={{ color: product.accent, borderColor: product.accent, background: product.accentSoft }}>
          AI Copilot
        </span>
      )}
      <div className="w-14 h-14 rounded-xl flex items-center justify-center mb-6" style={{ background: product.accentSoft }}>
        <product.icon className="w-7 h-7" style={{ color: product.accent }} />
      </div>
      <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
      <p className="mb-6 flex-grow" style={{ color: 'var(--muted)' }}>{product.slogan}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {product.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2.5 py-1 text-xs font-medium rounded-input"
                style={{ background: isDark ? 'rgba(255,255,255,0.06)' : '#f1f5f9', color: 'var(--muted-strong)' }}>
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <button onClick={() => navigate(product.id)} className="button-primary flex-1 py-2 text-sm">
          查看详情
        </button>
        <button onClick={() => navigate('download')} className="icon-button" style={{ width: '38px', height: '38px' }}>
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

function ProductPage({ product, navigate, isDark }) {
  if (!product) return null;
  const Icon = product.icon;

  return (
    <div className="animate-slide-up">
      <div className="relative overflow-hidden pt-16 pb-20 border-b" style={{ borderColor: isDark ? product.accentBorderDark : product.accentBorder }}>
        <div className="absolute inset-0 opacity-40 pointer-events-none" style={{ background: product.accentSoft }}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-card shadow-xl flex items-center justify-center mb-6 border"
               style={{ background: 'var(--surface)', borderColor: isDark ? product.accentBorderDark : product.accentBorder }}>
            <Icon className="w-10 h-10" style={{ color: product.accent }} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4 justify-center">
            {product.name}
            <span className="text-sm px-3 py-1 rounded-full border" style={{ color: product.accent, borderColor: product.accent, opacity: 0.8 }}>
              {product.version}
            </span>
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mb-4" style={{ color: 'var(--muted-strong)' }}>
            {product.slogan}
          </p>
          <p className="text-sm md:text-base max-w-3xl mb-8 leading-relaxed" style={{ color: 'var(--muted)' }}>
            {product.intro}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {product.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 shadow-panel rounded-btn text-sm font-medium border"
                    style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: product.accent }} /> {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => navigate('download')} className="button button-primary button-lg hover:-translate-y-0.5 transition-all"
              style={{ boxShadow: '0 8px 24px rgba(30,58,138,0.3)' }}>
              <Download className="w-5 h-5" /> 立即下载 {product.name}
            </button>
            <button onClick={() => navigate('docs', { docsTab: product.id })} className="button button-lg">
              <Book className="w-5 h-5" /> 使用文档
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className="w-6 h-6" style={{ color: product.accent }} /> 核心特性
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feat, idx) => (
                <div key={idx} className="p-6 rounded-card border shadow-panel"
                     style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
                  <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Play className="w-6 h-6" style={{ color: product.accent }} /> 快速上手
            </h2>
            <div className="rounded-card overflow-hidden shadow-2xl border" style={{ background: '#0f172a', borderColor: '#334155' }}>
              <div className="px-4 py-3 flex items-center gap-2 border-b" style={{ background: '#1e293b', borderColor: '#334155' }}>
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="ml-4 text-xs font-mono text-slate-400">bash — {product.name.toLowerCase()}</span>
              </div>
              <div className="p-6 font-mono text-sm text-slate-300 leading-relaxed overflow-x-auto">
                {product.quickStart.map((line, i) => (
                  line.comment ? (
                    <div key={i} className="text-slate-500 mt-2 first:mt-0">{line.comment}</div>
                  ) : (
                    <div key={i} className="mb-2">
                      {line.cmd.startsWith('#') ? (
                        <span className="text-slate-500">{line.cmd}</span>
                      ) : (
                        <><span className="text-green-400">$</span> {line.cmd}</>
                      )}
                    </div>
                  )
                ))}
                <div className="mt-3 animate-pulse" style={{ color: product.accent }}>
                  INFO [0000] {product.name} ready.
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
          <div className="p-6 rounded-card border" style={{ background: isDark ? 'var(--surface)' : '#f8fafc', borderColor: 'var(--line-soft)' }}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Cpu className="w-5 h-5" style={{ color: 'var(--muted)' }} /> 运行形态
            </h3>
            <p className="text-sm font-mono p-3 rounded-input border" style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)', color: 'var(--muted-strong)' }}>
              {product.techStack}
            </p>
          </div>

          <div className="p-6 rounded-card border" style={{ background: isDark ? 'var(--surface)' : '#f8fafc', borderColor: 'var(--line-soft)' }}>
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" style={{ color: 'var(--muted)' }} /> 数据与隐私
            </h3>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              连接配置与凭据保存在本机，不经过第三方云端。正式环境请配合 TLS / 只读账号等安全实践。
            </p>
          </div>

          <div className="p-6 rounded-card border" style={{ background: isDark ? 'var(--surface)' : '#f8fafc', borderColor: 'var(--line-soft)' }}>
            <h3 className="font-bold mb-4">相关资源</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <button onClick={() => navigate('docs', { docsTab: product.id })}
                   className="flex items-center gap-2 transition-colors" style={{ color: 'var(--muted-strong)' }}
                   onMouseEnter={e => e.currentTarget.style.color = product.accent}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-strong)'}>
                  <Book className="w-4 h-4" /> 使用与部署文档
                </button>
              </li>
              <li>
                <button onClick={() => navigate('download')}
                   className="flex items-center gap-2 transition-colors" style={{ color: 'var(--muted-strong)' }}
                   onMouseEnter={e => e.currentTarget.style.color = product.accent}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-strong)'}>
                  <Download className="w-4 h-4" /> 前往下载中心
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function DocsPage({ navigate, isDark, activeTab, setActiveTab }) {
  const tabs = [
    { id: 'overview', label: '文档首页', icon: FileText },
    ...Object.values(PRODUCTS).map(p => ({ id: p.id, label: p.name, icon: p.icon, accent: p.accent }))
  ];
  const accent = PRODUCTS[activeTab]?.accent || 'var(--primary)';
  const toc = getDocToc(activeTab);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="animate-slide-up max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">使用与部署文档</h1>
        <p className="text-sm md:text-base" style={{ color: 'var(--muted)' }}>
          Markdown 源文件维护，按产品查看完整安装、部署与操作说明。
        </p>
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold transition-all flex items-center gap-2 border"
              style={{
                background: active ? 'var(--primary)' : 'var(--surface)',
                borderColor: active ? 'var(--primary)' : 'var(--line)',
                color: active ? '#ffffff' : 'var(--muted-strong)',
                boxShadow: active ? '0 4px 14px rgba(30,58,138,0.25)' : 'none'
              }}>
              <Icon className="w-4 h-4" style={active || !tab.accent ? undefined : { color: tab.accent }} /> {tab.label}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">
        <aside className="hidden lg:block sticky top-24">
          <div className="rounded-card border p-4" style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
            <div className="text-xs font-bold mb-3 uppercase tracking-wide" style={{ color: 'var(--muted)' }}>本页目录</div>
            <nav className="space-y-1 max-h-[70vh] overflow-y-auto">
              {toc.map(item => (
                <button key={item.id} onClick={() => scrollTo(item.id)}
                  className="w-full text-left text-sm px-2 py-1.5 rounded-btn transition-colors"
                  style={{ color: 'var(--muted-strong)', paddingLeft: item.level === 3 ? 16 : 8 }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--primary-soft)'; e.currentTarget.style.color = 'var(--primary)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--muted-strong)'; }}>
                  {item.text}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <article className="rounded-card border shadow-panel overflow-hidden min-w-0" style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
          <div className="p-6 md:p-8" style={{ borderLeft: `4px solid ${accent}` }}>
            <MarkdownDoc tab={activeTab} setActiveTab={setActiveTab} accent={accent} />
          </div>

          {PRODUCTS[activeTab] && (
            <div className="px-6 py-4 border-t flex flex-wrap gap-3" style={{ borderColor: 'var(--line-soft)', background: isDark ? 'rgba(255,255,255,0.02)' : '#f8fafc' }}>
              <button onClick={() => navigate(activeTab)} className="button-primary text-sm px-4 py-2">
                查看产品介绍
              </button>
              <button onClick={() => navigate('download')} className="button text-sm px-4 py-2">
                <Download className="w-4 h-4" /> 前往下载
              </button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

function DownloadPage({ navigate, isDark }) {
  const [activeTab, setActiveTab] = useState('tunet');

  const downloads = {
    Windows: [
      { arch: 'x86_64 (64-bit)', type: '安装包 (.exe)', size: '—' },
      { arch: 'x86_64 (64-bit)', type: '绿色便携版 (.zip)', size: '—' }
    ],
    macOS: [
      { arch: 'Apple Silicon (arm64)', type: '磁盘映像 (.dmg)', size: '—' },
      { arch: 'Intel (x86_64)', type: '磁盘映像 (.dmg)', size: '—' }
    ],
    Linux: [
      { arch: 'x86_64 (amd64)', type: '压缩包 (.tar.gz)', size: '—' },
      { arch: 'arm64', type: '压缩包 (.tar.gz)', size: '—' }
    ]
  };

  const activeProduct = PRODUCTS[activeTab];
  const osIcons = { Windows: Monitor, macOS: Server, Linux: Globe };
  const osColors = { Windows: '#3b82f6', macOS: 'var(--text)', Linux: '#ca8a04' };

  return (
    <div className="animate-slide-up max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">统一发版中心</h1>
        <p style={{ color: 'var(--muted)' }}>选择所需工具及对应系统架构进行下载。</p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Object.values(PRODUCTS).map(p => {
          const active = activeTab === p.id;
          const Icon = p.icon;
          return (
            <button key={p.id} onClick={() => setActiveTab(p.id)}
              className="px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 border"
              style={{
                background: active ? 'var(--primary)' : 'var(--surface)',
                borderColor: active ? 'var(--primary)' : 'var(--line)',
                color: active ? '#ffffff' : 'var(--muted-strong)',
                boxShadow: active ? '0 4px 14px rgba(30,58,138,0.3)' : 'none'
              }}>
              <Icon className="w-4 h-4" /> {p.name}
            </button>
          );
        })}
      </div>

      <div className="rounded-card border shadow-panel overflow-hidden" style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
        <div className="p-6 border-b flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
             style={{ borderColor: 'var(--line-soft)', background: activeProduct.accentSoft }}>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              {activeProduct.name}
              <span className="text-sm px-2 py-0.5 rounded-input border"
                    style={{ background: 'var(--surface)', color: activeProduct.accent, borderColor: isDark ? activeProduct.accentBorderDark : activeProduct.accentBorder }}>
                Latest {activeProduct.version}
              </span>
            </h2>
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>{activeProduct.slogan}</p>
          </div>
          <button onClick={() => navigate('docs', { docsTab: activeTab })} className="text-sm font-medium hover:underline" style={{ color: activeProduct.accent }}>
            查看使用文档 →
          </button>
        </div>

        <div className="p-6">
          {Object.entries(downloads).map(([os, files]) => {
            const OsIcon = osIcons[os];
            return (
              <div key={os} className="mb-10 last:mb-0">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b pb-2" style={{ borderColor: 'var(--line-soft)' }}>
                  <OsIcon className="w-5 h-5" style={{ color: osColors[os] }} /> {os}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {files.map((file, idx) => (
                    <div key={idx} className="flex flex-col p-4 rounded-card border transition-colors group"
                         style={{ background: isDark ? 'rgba(255,255,255,0.03)' : '#f8fafc', borderColor: 'var(--line-soft)' }}
                         onMouseEnter={e => e.currentTarget.style.borderColor = activeProduct.accent}
                         onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--line-soft)'}>
                      <span className="font-semibold">{file.arch}</span>
                      <span className="text-xs mt-1 mb-4" style={{ color: 'var(--muted)' }}>{file.type} • {file.size}</span>
                      <button className="button-primary mt-auto w-full py-2 flex items-center justify-center gap-2" disabled title="下载通道即将开放">
                        <Download className="w-4 h-4" /> 即将开放
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8 text-center text-sm" style={{ color: 'var(--muted)' }}>
        下载安装后，请参阅 <button onClick={() => navigate('docs')} className="hover:underline" style={{ color: 'var(--primary)' }}>使用与部署文档</button> 完成配置。
      </div>
    </div>
  );
}
