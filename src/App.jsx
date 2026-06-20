import React, { useState, useEffect } from 'react';
import {
  Layers, Network, Monitor, Download,
  Book, Moon, Sun, ArrowRight, ChevronRight,
  Cpu, Shield, Zap, CheckCircle2, Server, Globe,
  TerminalSquare, Box, Play
} from 'lucide-react';

// --- GitHub 品牌图标 (lucide 已移除，自定义 SVG) ---
function GitHubIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

// --- 数据配置区 ---
const PRODUCTS = {
  tunet: {
    id: 'tunet',
    name: 'KunTunet',
    slogan: '高性能轻量内网穿透，P2P / 中转双模式',
    accent: '#f97316',       // orange-500
    accentSoft: '#fff7ed',   // orange-50
    accentDark: '#431407',   // orange-950/30
    accentBorder: '#fed7aa', // orange-200
    accentBorderDark: '#9a3412', // orange-800
    icon: Network,
    tags: ['Go 开发', '跨平台', 'TCP/UDP', 'HTTP 映射'],
    features: [
      { title: 'P2P 直连打洞', desc: '基于 STUN/TURN 的智能穿透，NAT 穿透成功率高达 95%以上，极低延迟。' },
      { title: '多路复用', desc: '单 TCP 连接承载多并发请求，高吞吐量下依然稳定不断流。' },
      { title: '全协议支持', desc: '原生支持 TCP, UDP, HTTP, HTTPS 等多种协议映射。' },
      { title: '零配置客户端', desc: '极简的配置文件，支持命令行一行启动，开箱即用。' }
    ],
    techStack: 'Go + Yaml + QUIC 协议栈',
    version: 'v1.4.2'
  },
  terminal: {
    id: 'terminal',
    name: 'KunTerminal',
    slogan: '跨平台 SSH 终端管理器，完美替代主流工具',
    accent: '#22c55e',
    accentSoft: '#f0fdf4',
    accentDark: '#052e16',
    accentBorder: '#bbf7d0',
    accentBorderDark: '#166534',
    icon: TerminalSquare,
    tags: ['多标签', '密钥登录', 'SFTP', '批量运维'],
    features: [
      { title: '多 Tab 标签页', desc: '沉浸式多窗口管理，支持分屏显示，轻松应对多台服务器操作。' },
      { title: '一键 SFTP', desc: '内置可视化文件管理器，拖拽上传下载，与终端无缝切换。' },
      { title: '批量脚本执行', desc: '支持编写常用脚本片段，一键下发至多台机器批量执行。' },
      { title: '云端同步', desc: '支持加密备份配置至 Git 仓库，多设备无缝同步主机列表。' }
    ],
    techStack: 'Wails + Go + React + xterm.js',
    version: 'v2.1.0'
  },
  desk: {
    id: 'desk',
    name: 'KunDesk',
    slogan: 'WebRTC P2P 点对点远程桌面控制工具',
    accent: '#a855f7',
    accentSoft: '#faf5ff',
    accentDark: '#3b0764',
    accentBorder: '#e9d5ff',
    accentBorderDark: '#6b21a8',
    icon: Monitor,
    tags: ['低延迟', '免公网', '跨平台', '内网联动'],
    features: [
      { title: '极致低延迟', desc: '基于 WebRTC 实时音视频技术，局域网/同城网络下毫秒级延迟。' },
      { title: '端到端加密', desc: '控制信令和视频流全链路 DTLS/SRTP 加密，杜绝中间人窃听。' },
      { title: '自适应画质', desc: '动态码率控制，弱网环境下自动降低分辨率保障流畅度。' },
      { title: '剪贴板同步', desc: '支持文本、小文件通过数据通道双向快速拷贝。' }
    ],
    techStack: 'Rust + WebRTC + React',
    version: 'v0.9.5-beta'
  }
};

const SYNERGY_CASES = [
  { p1: 'tunet', p2: 'terminal', desc: '穿透内网服务器直接无感 SSH 连接' },
  { p1: 'tunet', p2: 'desk', desc: '外网安全地远程控制内网办公电脑' }
];

/* ============================================
   主应用
   ============================================ */
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className={isDark ? 'dark theme-dark' : ''}>
      <div style={{ background: 'var(--canvas)', color: 'var(--text)', minHeight: '100vh' }}
           className="font-sans transition-colors duration-300">

        {/* --- Navbar --- */}
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
                {[
                  { key: 'home', label: '首页' },
                ].map(item => (
                  <button key={item.key} onClick={() => navigate(item.key)}
                    className="text-sm font-medium transition-colors"
                    style={{ color: currentPage === item.key ? 'var(--primary)' : 'var(--muted-strong)' }}>
                    {item.label}
                  </button>
                ))}

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
                <button className="text-sm font-medium" style={{ color: 'var(--muted-strong)' }}>文档</button>
              </div>

              <div className="flex items-center gap-4">
                <a href="#" style={{ color: 'var(--muted)' }} className="hover:opacity-80 transition-colors">
                  <GitHubIcon className="w-5 h-5" />
                </a>
                <button onClick={() => setIsDark(!isDark)} className="icon-button" title="切换主题">
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- Main --- */}
        <main style={{ minHeight: 'calc(100vh - 64px - 300px)' }}>
          {currentPage === 'home' && <HomePage navigate={navigate} isDark={isDark} />}
          {['tunet', 'terminal', 'desk'].includes(currentPage) && <ProductPage product={PRODUCTS[currentPage]} navigate={navigate} isDark={isDark} />}
          {currentPage === 'download' && <DownloadPage navigate={navigate} isDark={isDark} />}
        </main>

        {/* --- Footer --- */}
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
                <li><a href="#" style={{ color: 'var(--muted)' }}>使用文档库</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>API 参考</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>常见问题 (FAQ)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4" style={{ color: 'var(--text)' }}>关于开源</h4>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
                <li><a href="#" style={{ color: 'var(--muted)' }}>GitHub 仓库</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>Gitee 镜像</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>开源协议 (MIT)</a></li>
                <li><a href="#" style={{ color: 'var(--muted)' }}>更新日志</a></li>
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

/* ============================================
   首页
   ============================================ */
function HomePage({ navigate, isDark }) {
  return (
    <div className="animate-slide-up">
      {/* Hero */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 blur-3xl rounded-full pointer-events-none"
             style={{ background: isDark ? 'rgba(49,104,244,0.06)' : 'rgba(6,182,212,0.1)' }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            一站式自研 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">运维工具集</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 font-light" style={{ color: 'var(--muted)' }}>
            内网穿透 · 终端管理 · 远程桌面 · 及更多轻量实用小工具
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => document.getElementById('core-tools')?.scrollIntoView({ behavior: 'smooth' })}
              className="button-primary flex items-center justify-center gap-2 group" style={{ height: '48px', padding: '0 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 500 }}>
              浏览全部工具 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button onClick={() => navigate('download')}
              className="button flex items-center justify-center gap-2" style={{ height: '48px', padding: '0 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 500 }}>
              <Download className="w-4 h-4" /> 前往下载中心
            </button>
          </div>
        </div>
      </section>

      {/* Core Tools */}
      <section id="core-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">核心产品矩阵</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(PRODUCTS).map(product => (
            <ProductCard key={product.id} product={product} navigate={navigate} isDark={isDark} />
          ))}
        </div>
      </section>

      {/* Synergy */}
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
                <div key={idx} className="flex items-center justify-between p-6 rounded-card border shadow-panel"
                     style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
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
              );
            })}
          </div>
          <div className="max-w-4xl mx-auto mt-6 text-center text-sm font-medium py-3 rounded-btn border border-dashed"
               style={{ color: 'var(--muted-strong)', background: 'var(--surface)', borderColor: 'var(--line)' }}>
            💡 例如：使用 KunTunet 打通网络后，直接使用 KunTerminal 和 KunDesk 进行安全的远程接管。
          </div>
        </div>
      </section>

      {/* Tools Market */}
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

/* --- 产品卡片 --- */
function ProductCard({ product, navigate, isDark }) {
  return (
    <div className="rounded-card p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col"
         style={{ background: 'var(--surface)', borderColor: isDark ? product.accentBorderDark : product.accentBorder }}>
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

/* ============================================
   产品详情页
   ============================================ */
function ProductPage({ product, navigate, isDark }) {
  if (!product) return null;
  const Icon = product.icon;

  return (
    <div className="animate-slide-up">
      {/* Header */}
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
          <p className="text-lg md:text-xl max-w-2xl mb-8" style={{ color: 'var(--muted-strong)' }}>
            {product.slogan}
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {product.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 shadow-panel rounded-btn text-sm font-medium border"
                    style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)' }}>
                <CheckCircle2 className="w-4 h-4" style={{ color: product.accent }} /> {tag}
              </span>
            ))}
          </div>

          <button onClick={() => navigate('download')} className="button-primary flex items-center gap-2 hover:-translate-y-0.5 transition-all"
            style={{ height: '48px', padding: '0 32px', borderRadius: '999px', fontSize: '15px', fontWeight: 500, boxShadow: '0 8px 24px rgba(30,58,138,0.3)' }}>
            <Download className="w-5 h-5" /> 立即下载 {product.name}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        <div className="lg:col-span-2 space-y-16">
          {/* Features */}
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

          {/* Quick Start */}
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
                <div className="text-slate-500"># 1. 下载并解压客户端</div>
                <div className="mb-4"><span className="text-green-400">$</span> tar -zxvf {product.name.toLowerCase()}-linux-amd64.tar.gz</div>
                <div className="text-slate-500"># 2. 赋予执行权限</div>
                <div className="mb-4"><span className="text-green-400">$</span> chmod +x ./{product.name.toLowerCase()}</div>
                <div className="text-slate-500"># 3. 一键运行</div>
                <div><span className="text-green-400">$</span> ./{product.name.toLowerCase()} start</div>
                <div className="mt-2 animate-pulse" style={{ color: product.accent }}>INFO [0000] {product.name} initialized successfully. Ready to connect.</div>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {[
            { icon: Cpu, title: '技术架构', content: product.techStack, mono: true },
            { icon: Shield, title: '开源协议', content: null, mono: false },
          ].map((card, i) => (
            <div key={i} className="p-6 rounded-card border" style={{ background: isDark ? 'var(--surface)' : '#f8fafc', borderColor: 'var(--line-soft)' }}>
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <card.icon className="w-5 h-5" style={{ color: 'var(--muted)' }} /> {card.title}
              </h3>
              {card.mono ? (
                <p className="text-sm font-mono p-3 rounded-input border" style={{ background: 'var(--surface)', borderColor: 'var(--line-soft)', color: 'var(--muted-strong)' }}>
                  {card.content}
                </p>
              ) : (
                <p className="text-sm" style={{ color: 'var(--muted)' }}>
                  本项目采用 <strong style={{ color: 'var(--text)' }}>MIT License</strong>，允许商用、修改及分发。
                </p>
              )}
            </div>
          ))}

          <div className="p-6 rounded-card border" style={{ background: isDark ? 'var(--surface)' : '#f8fafc', borderColor: 'var(--line-soft)' }}>
            <h3 className="font-bold mb-4">相关资源</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="flex items-center gap-2 transition-colors" style={{ color: 'var(--muted-strong)' }}
                   onMouseEnter={e => e.currentTarget.style.color = product.accent}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-strong)'}>
                  <Book className="w-4 h-4" /> 官方完整文档
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2 transition-colors" style={{ color: 'var(--muted-strong)' }}
                   onMouseEnter={e => e.currentTarget.style.color = product.accent}
                   onMouseLeave={e => e.currentTarget.style.color = 'var(--muted-strong)'}>
                  <GitHubIcon className="w-4 h-4" /> GitHub 源码库
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================
   下载中心
   ============================================ */
function DownloadPage({ navigate, isDark }) {
  const [activeTab, setActiveTab] = useState('tunet');

  const downloads = {
    Windows: [
      { arch: 'x86_64 (64-bit)', type: '安装包 (.exe)', size: '15.2 MB' },
      { arch: 'x86_64 (64-bit)', type: '绿色便携版 (.zip)', size: '12.8 MB' },
      { arch: 'arm64', type: '绿色便携版 (.zip)', size: '12.5 MB' }
    ],
    macOS: [
      { arch: 'Apple Silicon (M1/M2/M3)', type: '磁盘映像 (.dmg)', size: '16.5 MB' },
      { arch: 'Intel (x86_64)', type: '磁盘映像 (.dmg)', size: '17.1 MB' }
    ],
    Linux: [
      { arch: 'x86_64 (amd64)', type: '压缩包 (.tar.gz)', size: '14.0 MB' },
      { arch: 'arm64', type: '压缩包 (.tar.gz)', size: '13.5 MB' },
      { arch: 'deb', type: 'Debian/Ubuntu (.deb)', size: '14.2 MB' }
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

      {/* Tabs */}
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

      {/* Board */}
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
            <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>更新时间: 2024-05-20 | 包含最新安全补丁及性能优化。</p>
          </div>
          <button className="text-sm font-medium hover:underline" style={{ color: activeProduct.accent }}>查看更新日志 →</button>
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
                      <button className="button-primary mt-auto w-full py-2 flex items-center justify-center gap-2">
                        <Download className="w-4 h-4" /> 点击下载
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
        需要源码编译？请前往 <a href="#" className="hover:underline" style={{ color: 'var(--primary)' }}>GitHub Releases</a> 下载 Source code (zip/tar.gz)。
      </div>
    </div>
  );
}
