import React, { useState, useEffect } from 'react';
import { 
  Layers, Network, Terminal, Monitor, Download, 
  Book, Github, Moon, Sun, ArrowRight, ChevronRight, 
  Cpu, Shield, Zap, CheckCircle2, Server, Globe,
  TerminalSquare, Box, Play
} from 'lucide-react';

// --- 数据配置区 (未来新增工具只需在此添加) ---
const PRODUCTS = {
  tunet: {
    id: 'tunet',
    name: 'KunTunet',
    slogan: '高性能轻量内网穿透，P2P / 中转双模式',
    theme: {
      text: 'text-orange-500',
      bg: 'bg-orange-500',
      lightBg: 'bg-orange-50 dark:bg-orange-950/30',
      border: 'border-orange-200 dark:border-orange-800',
      hover: 'hover:border-orange-500'
    },
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
    theme: {
      text: 'text-green-500',
      bg: 'bg-green-500',
      lightBg: 'bg-green-50 dark:bg-green-950/30',
      border: 'border-green-200 dark:border-green-800',
      hover: 'hover:border-green-500'
    },
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
    theme: {
      text: 'text-purple-500',
      bg: 'bg-purple-500',
      lightBg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-200 dark:border-purple-800',
      hover: 'hover:border-purple-500'
    },
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

export default function KunSuiteApp() {
  const [currentPage, setCurrentPage] = useState('home'); // home, tunet, terminal, desk, download
  const [isDark, setIsDark] = useState(false);

  // 初始化检查系统主题
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  const navigate = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div className={isDark ? 'dark' : ''}>
      <div className="min-h-screen bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-200 font-sans transition-colors duration-300">
        
        {/* --- Navbar --- */}
        <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div 
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => navigate('home')}
              >
                <div className="p-1.5 bg-cyan-500 rounded-lg group-hover:bg-cyan-600 transition-colors">
                  <Layers className="w-6 h-6 text-white" />
                </div>
                <span className="font-bold text-xl tracking-tight">
                  Kun <span className="text-cyan-600 dark:text-cyan-400">Suite</span>
                </span>
              </div>

              {/* Center Menu (Desktop) */}
              <div className="hidden md:flex space-x-8">
                <button onClick={() => navigate('home')} className={`text-sm font-medium transition-colors hover:text-cyan-500 ${currentPage === 'home' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400'}`}>首页</button>
                <div className="relative group">
                  <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500 flex items-center gap-1">
                    工具列表 <ChevronRight className="w-4 h-4 rotate-90" />
                  </button>
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-100 dark:border-slate-700 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                    {Object.values(PRODUCTS).map(p => (
                      <button 
                        key={p.id}
                        onClick={() => navigate(p.id)} 
                        className="w-full text-left px-4 py-3 text-sm hover:bg-slate-50 dark:hover:bg-slate-700/50 flex items-center gap-3 first:rounded-t-xl last:rounded-b-xl"
                      >
                        <p.icon className={`w-4 h-4 ${p.theme.text}`} /> {p.name}
                      </button>
                    ))}
                  </div>
                </div>
                <button onClick={() => navigate('download')} className={`text-sm font-medium transition-colors hover:text-cyan-500 ${currentPage === 'download' ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-600 dark:text-slate-400'}`}>下载中心</button>
                <button className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-cyan-500">文档</button>
              </div>

              {/* Right Icons */}
              <div className="flex items-center gap-4">
                <a href="#" className="text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setIsDark(!isDark)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* --- Main Content Route --- */}
        <main className="min-h-[calc(100vh-64px-300px)]">
          {currentPage === 'home' && <HomePage navigate={navigate} />}
          {['tunet', 'terminal', 'desk'].includes(currentPage) && <ProductPage product={PRODUCTS[currentPage]} navigate={navigate} />}
          {currentPage === 'download' && <DownloadPage navigate={navigate} />}
        </main>

        {/* --- Footer --- */}
        <footer className="bg-slate-100 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <Layers className="w-6 h-6 text-cyan-500" />
                <span className="font-bold text-lg">Kun Suite</span>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                致力于打造现代化、轻量级、开箱即用的自研运维工具集合。
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">核心产品</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                {Object.values(PRODUCTS).map(p => (
                  <li key={p.id}><button onClick={() => navigate(p.id)} className="hover:text-cyan-500">{p.name}</button></li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">资源支持</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><button onClick={() => navigate('download')} className="hover:text-cyan-500">统一发版中心</button></li>
                <li><a href="#" className="hover:text-cyan-500">使用文档库</a></li>
                <li><a href="#" className="hover:text-cyan-500">API 参考</a></li>
                <li><a href="#" className="hover:text-cyan-500">常见问题 (FAQ)</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-slate-900 dark:text-white">关于开源</h4>
              <ul className="space-y-2 text-sm text-slate-500 dark:text-slate-400">
                <li><a href="#" className="hover:text-cyan-500">GitHub 仓库</a></li>
                <li><a href="#" className="hover:text-cyan-500">Gitee 镜像</a></li>
                <li><a href="#" className="hover:text-cyan-500">开源协议 (MIT)</a></li>
                <li><a href="#" className="hover:text-cyan-500">更新日志</a></li>
              </ul>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-8 border-t border-slate-200 dark:border-slate-800 text-sm text-center text-slate-400">
            © {new Date().getFullYear()} KunTools Team. All rights reserved. 
          </div>
        </footer>

      </div>
    </div>
  );
}

// ==========================================
// 页面组件：首页 (总览页)
// ==========================================
function HomePage({ navigate }) {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-32 md:pb-36 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-cyan-500/10 dark:bg-cyan-500/5 blur-3xl rounded-full pointer-events-none"></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6">
            一站式自研 <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">运维工具集</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 mb-10 font-light">
            内网穿透 · 终端管理 · 远程桌面 · 及更多轻量实用小工具
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => { document.getElementById('core-tools').scrollIntoView({ behavior: 'smooth' }) }}
              className="w-full sm:w-auto px-8 py-3.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full font-medium transition-all shadow-lg shadow-cyan-500/30 flex items-center justify-center gap-2 group"
            >
              浏览全部工具 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('download')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white dark:bg-slate-800 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700 hover:border-cyan-500 dark:hover:border-cyan-500 rounded-full font-medium transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" /> 前往下载中心
            </button>
          </div>
        </div>
      </section>

      {/* Core Tools Section */}
      <section id="core-tools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">核心产品矩阵</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {Object.values(PRODUCTS).map(product => (
            <div 
              key={product.id}
              className={`bg-white dark:bg-slate-900 rounded-2xl p-6 border ${product.theme.border} ${product.theme.hover} transition-all duration-300 hover:-translate-y-1 hover:shadow-xl group flex flex-col`}
            >
              <div className={`w-14 h-14 rounded-xl ${product.theme.lightBg} flex items-center justify-center mb-6`}>
                <product.icon className={`w-7 h-7 ${product.theme.text}`} />
              </div>
              <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-6 flex-grow">{product.slogan}</p>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {product.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="px-2.5 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <button 
                  onClick={() => navigate(product.id)}
                  className={`flex-1 py-2 rounded-lg text-sm font-medium text-white ${product.theme.bg} opacity-90 hover:opacity-100 transition-opacity`}
                >
                  查看详情
                </button>
                <button 
                  onClick={() => navigate('download')}
                  className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-cyan-500 hover:border-cyan-500 dark:hover:text-cyan-400 transition-colors"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Synergy Section */}
      <section className="bg-slate-100/50 dark:bg-slate-900/50 py-20 mt-12 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">套件联动，释放无限潜能</h2>
            <p className="text-slate-500 dark:text-slate-400">Kun Suite 工具并非孤立，它们可以无缝搭配，形成完整的内网运维方案。</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SYNERGY_CASES.map((synergy, idx) => {
              const P1 = PRODUCTS[synergy.p1];
              const P2 = PRODUCTS[synergy.p2];
              return (
                <div key={idx} className="flex items-center justify-between bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
                  <div className="flex items-center gap-3 w-2/5">
                    <div className={`p-2 rounded-lg ${P1.theme.lightBg}`}><P1.icon className={`w-5 h-5 ${P1.theme.text}`} /></div>
                    <span className="font-semibold text-sm sm:text-base">{P1.name}</span>
                  </div>
                  <div className="flex-1 flex justify-center text-slate-300 dark:text-slate-600 font-bold text-xl">+</div>
                  <div className="flex items-center gap-3 w-2/5 flex-row-reverse text-right">
                    <div className={`p-2 rounded-lg ${P2.theme.lightBg}`}><P2.icon className={`w-5 h-5 ${P2.theme.text}`} /></div>
                    <span className="font-semibold text-sm sm:text-base">{P2.name}</span>
                  </div>
                  {/* Tooltip style description */}
                  <div className="absolute mt-24 w-full left-0 text-center text-sm font-medium text-cyan-600 dark:text-cyan-400 opacity-0 md:opacity-100 md:relative md:mt-0 md:w-auto md:left-auto md:text-left hidden">
                    {/* Visual spacer on desktop if needed, currently integrated text below */}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="max-w-4xl mx-auto mt-6 text-center text-sm font-medium text-slate-500 bg-white dark:bg-slate-800 py-3 rounded-lg border border-slate-200 dark:border-slate-700 border-dashed">
            💡 例如：使用 KunTunet 打通网络后，直接使用 KunTerminal 和 KunDesk 进行安全的远程接管。
          </div>
        </div>
      </section>

      {/* Tools Market (Future Expansion) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">工具集市</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm">轻量网络工具、运维脚本陆续更新中...</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Placeholder items */}
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="bg-transparent border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col items-center justify-center text-center h-48 opacity-50 hover:opacity-100 transition-opacity cursor-not-allowed">
              <Box className="w-8 h-8 text-slate-400 mb-3" />
              <span className="font-medium text-slate-500 dark:text-slate-400">模块研发中</span>
              <span className="text-xs text-slate-400 mt-1">Coming Soon</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 页面组件：通用产品详情页 (模板)
// ==========================================
function ProductPage({ product, navigate }) {
  if (!product) return null;
  const { theme, icon: Icon } = product;

  return (
    <div className="animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Product Header */}
      <div className={`relative overflow-hidden pt-16 pb-20 border-b ${theme.border}`}>
        <div className={`absolute inset-0 ${theme.lightBg} opacity-50 pointer-events-none`}></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <div className={`w-20 h-20 rounded-2xl bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center mb-6 border ${theme.border}`}>
            <Icon className={`w-10 h-10 ${theme.text}`} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 flex items-center gap-4 justify-center">
            {product.name}
            <span className={`text-sm px-3 py-1 rounded-full border ${theme.text} border-current opacity-80`}>
              {product.version}
            </span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mb-8">
            {product.slogan}
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {product.tags.map(tag => (
              <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 bg-white dark:bg-slate-800 shadow-sm rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700">
                <CheckCircle2 className={`w-4 h-4 ${theme.text}`} /> {tag}
              </span>
            ))}
          </div>

          <button 
            onClick={() => navigate('download')}
            className={`px-8 py-3.5 text-white rounded-full font-medium transition-all shadow-lg flex items-center gap-2 hover:-translate-y-0.5 ${theme.bg} hover:brightness-110`}
          >
            <Download className="w-5 h-5" /> 立即下载 {product.name}
          </button>
        </div>
      </div>

      {/* Content Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-3 gap-16">
        
        {/* Left Column: Features & Quick Start */}
        <div className="lg:col-span-2 space-y-16">
          
          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Zap className={`w-6 h-6 ${theme.text}`} /> 核心特性
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.features.map((feat, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-xl shadow-sm">
                  <h3 className="font-bold text-lg mb-2">{feat.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Start Mockup */}
          <section>
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
              <Play className={`w-6 h-6 ${theme.text}`} /> 快速上手
            </h2>
            <div className="bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-slate-700">
              <div className="bg-slate-800 px-4 py-3 flex items-center gap-2 border-b border-slate-700">
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
                <div className={`${theme.text} mt-2 animate-pulse`}>INFO [0000] {product.name} initialized successfully. Ready to connect.</div>
              </div>
            </div>
          </section>
        </div>

        {/* Right Column: Meta info */}
        <div className="space-y-8">
          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
              <Cpu className="w-5 h-5 text-slate-400" /> 技术架构
            </h3>
            <p className="text-sm font-mono bg-white dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300">
              {product.techStack}
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-slate-800 dark:text-white">
              <Shield className="w-5 h-5 text-slate-400" /> 开源协议
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              本项目采用 <strong className="text-slate-900 dark:text-white">MIT License</strong>，允许商用、修改及分发。
            </p>
          </div>

          <div className="bg-slate-50 dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
            <h3 className="font-bold mb-4 text-slate-800 dark:text-white">相关资源</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className={`flex items-center gap-2 text-slate-600 dark:text-slate-400 ${theme.hover} hover:${theme.text} transition-colors`}>
                  <Book className="w-4 h-4" /> 官方完整文档
                </a>
              </li>
              <li>
                <a href="#" className={`flex items-center gap-2 text-slate-600 dark:text-slate-400 ${theme.hover} hover:${theme.text} transition-colors`}>
                  <Github className="w-4 h-4" /> GitHub 源码库
                </a>
              </li>
            </ul>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 页面组件：统一发版/下载中心
// ==========================================
function DownloadPage({ navigate }) {
  const [activeTab, setActiveTab] = useState('tunet');

  // 模拟下载列表数据
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

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">统一发版中心</h1>
        <p className="text-slate-500 dark:text-slate-400">选择所需工具及对应系统架构进行下载。</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {Object.values(PRODUCTS).map(p => (
          <button
            key={p.id}
            onClick={() => setActiveTab(p.id)}
            className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === p.id 
                ? `${p.theme.bg} text-white shadow-md` 
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
            }`}
          >
            <p.icon className="w-4 h-4" /> {p.name}
          </button>
        ))}
      </div>

      {/* Download Content Board */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        
        {/* Header info */}
        <div className={`p-6 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${activeProduct.theme.lightBg} bg-opacity-30`}>
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-3">
              {activeProduct.name} 
              <span className={`text-sm px-2 py-0.5 rounded border bg-white dark:bg-slate-800 ${activeProduct.theme.text} ${activeProduct.theme.border}`}>
                Latest {activeProduct.version}
              </span>
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">更新时间: 2024-05-20 | 包含最新安全补丁及性能优化。</p>
          </div>
          <button className={`text-sm font-medium hover:underline ${activeProduct.theme.text}`}>查看更新日志 &rarr;</button>
        </div>

        {/* OS Lists */}
        <div className="p-6">
          {Object.entries(downloads).map(([os, files]) => (
            <div key={os} className="mb-10 last:mb-0">
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                {os === 'Windows' && <Monitor className="w-5 h-5 text-blue-500" />}
                {os === 'macOS' && <Server className="w-5 h-5 text-slate-700 dark:text-slate-300" />}
                {os === 'Linux' && <Globe className="w-5 h-5 text-yellow-600" />}
                {os}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {files.map((file, idx) => (
                  <div key={idx} className="flex flex-col p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-cyan-500 dark:hover:border-cyan-500 transition-colors bg-slate-50 dark:bg-slate-800/50 group">
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{file.arch}</span>
                    <span className="text-xs text-slate-500 dark:text-slate-400 mt-1 mb-4">{file.type} • {file.size}</span>
                    <button className="mt-auto flex items-center justify-center gap-2 w-full py-2 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-200 group-hover:bg-cyan-500 group-hover:text-white group-hover:border-cyan-500 transition-all">
                      <Download className="w-4 h-4" /> 点击下载
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Source Code */}
      <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
        需要源码编译？请前往 <a href="#" className="text-cyan-600 hover:underline">GitHub Releases</a> 下载 Source code (zip/tar.gz)。
      </div>
    </div>
  );
}