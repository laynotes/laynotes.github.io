/** Kun Suite 使用与部署文档（面向最终用户，不含开发打包） */

export const DOCS = {
  overview: {
    title: '文档首页',
    subtitle: '选择下方产品，查看安装、部署与日常使用说明。',
    sections: [
      {
        id: 'intro',
        heading: '套件组成',
        blocks: [
          {
            type: 'p',
            text: 'Kun Suite 包含三款独立桌面 / 服务端工具：KunTunet 打通内网，KunTerminal 提供 AI Copilot 加持的 SSH / SFTP，KunDB 提供 AI Copilot 驱动的多引擎查库。'
          },
          {
            type: 'cards',
            items: [
              { id: 'tunet', name: 'KunTunet', desc: '内网穿透：公网部署 Server，内网跑 Client / 桌面端，把 TCP 服务映射出去。' },
              { id: 'terminal', name: 'KunTerminal', desc: 'AI Copilot 加持的 SSH / SFTP 终端：会话上下文排障、Skills、多模态图片提问。' },
              { id: 'db', name: 'KunDB', desc: 'AI Copilot 驱动的多引擎数据库客户端：写 SQL、读执行计划、Skills / 知识库。' }
            ]
          }
        ]
      },
      {
        id: 'combo',
        heading: '典型组合',
        blocks: [
          {
            type: 'ol',
            items: [
              '映射 SSH：KunTunet 将内网 22 端口映射到公网 → KunTerminal 连接后用 AI Copilot 排障。',
              '映射数据库：KunTunet 映射 5432 / 3306 等 → KunDB 连库后用 AI Copilot 写 SQL / 读计划。',
              '映射 Web / 其他 TCP：KunTunet 映射对应端口后，浏览器或业务系统直接访问公网地址。'
            ]
          }
        ]
      }
    ]
  },

  tunet: {
    title: 'KunTunet 使用与部署',
    subtitle: '把内网 TCP 服务安全映射到公网：部署服务端 → 配置客户端 / 桌面端 → 验证连通。',
    sections: [
      {
        id: 'scene',
        heading: '1. 这是做什么的',
        blocks: [
          {
            type: 'p',
            text: 'KunTunet 通过一台有公网 IP 的中转服务器，把内网机器上的 TCP 服务（Web、SSH、数据库等）暴露到公网端口。外网访问「公网 IP:映射端口」时，流量经隧道转发到内网本地服务。'
          },
          {
            type: 'code',
            label: '流量路径',
            lines: [
              '外网用户',
              '  →  公网服务器:映射端口（如 9000）',
              '  →  KunTunetServer（控制口如 7000）',
              '  →  隧道',
              '  →  KunTunetClient / 桌面端',
              '  →  内网本地服务（如 127.0.0.1:8080）'
            ]
          }
        ]
      },
      {
        id: 'prepare',
        heading: '2. 开始前准备',
        blocks: [
          {
            type: 'ul',
            items: [
              '一台有公网 IP 的服务器：安装 KunTunetServer',
              '一台内网机器：安装 KunTunetClient，或安装 KunTunet 桌面客户端',
              '防火墙放行：控制端口（如 7000）以及每一个映射端口（如 9000）',
              '服务端与客户端使用相同 Token（正式环境建议 Token 文件 + TLS）'
            ]
          },
          {
            type: 'tip',
            text: '下载中心里的「服务端包」含 Server / Client / Admin；桌面 GUI 是单独安装包，不要和服务端包搞混。'
          }
        ]
      },
      {
        id: 'server',
        heading: '3. 部署服务端（公网机器）',
        blocks: [
          {
            type: 'ol',
            items: [
              '从下载中心获取对应系统的服务端包，解压得到 KunTunetServer。',
              '先用测试方式启动（静态 Token + 管理面板）：',
              '浏览器打开 http://服务器IP:8001，可看到在线 Agent、隧道与流量（约 3 秒刷新）。',
              '正式环境请改用 TLS + Token 文件启动（见下方命令）。',
              'Linux 可用发布包内脚本安装为系统服务：编辑配置后执行 install-server-service.sh，再用 systemctl 启停。'
            ]
          },
          {
            type: 'code',
            label: '测试启动',
            lines: [
              'KunTunetServer -control 0.0.0.0:7000 -token YOUR_SECRET_TOKEN -mgmt 127.0.0.1:8001'
            ]
          },
          {
            type: 'code',
            label: '正式启动（TLS + Token 文件）',
            lines: [
              'KunTunetServer \\',
              '  -control 0.0.0.0:7000 \\',
              '  -mgmt 127.0.0.1:8001 \\',
              '  -token-file /etc/kuntunet/tokens.json \\',
              '  -tls-cert /etc/kuntunet/server.crt \\',
              '  -tls-key /etc/kuntunet/server.key'
            ]
          },
          {
            type: 'kv',
            rows: [
              ['-control', '客户端连上来的控制地址，公网一般用 0.0.0.0:7000'],
              ['-mgmt', 'Dashboard / 管理 API，如 127.0.0.1:8001'],
              ['-token', '与客户端共享的认证口令'],
              ['-token-file', '多 Agent Token、过期与撤销（正式环境推荐）'],
              ['-tls-cert / -tls-key', '启用 TLS']
            ]
          }
        ]
      },
      {
        id: 'client-cli',
        heading: '4. 部署命令行客户端（内网机器）',
        blocks: [
          {
            type: 'p',
            text: '假设内网 Web 在 127.0.0.1:8080，要映射到公网 9000 端口：'
          },
          {
            type: 'code',
            label: '启动客户端',
            lines: [
              'KunTunetClient \\',
              '  -server PUBLIC_IP:7000 \\',
              '  -token YOUR_SECRET_TOKEN \\',
              '  -name web \\',
              '  -remote 0.0.0.0:9000 \\',
              '  -local 127.0.0.1:8080'
            ]
          },
          {
            type: 'p',
            text: '启用 TLS 时追加：-tls -tls-ca ca.crt。也可用配置文件：KunTunetClient -config client.json。'
          },
          {
            type: 'kv',
            rows: [
              ['-server', '公网服务端控制地址'],
              ['-token', '必须与服务端一致'],
              ['-name', '隧道名称，同一 Server 内勿重复'],
              ['-remote', '服务端上监听的映射地址，公网访问用 0.0.0.0:端口'],
              ['-local', '内网真实服务地址']
            ]
          },
          {
            type: 'warn',
            text: '远程地址写成 127.0.0.1:9000 时，映射口只在服务器本机可访问，外网连不上。公网暴露请用 0.0.0.0:端口。'
          },
          {
            type: 'ul',
            items: [
              '启动前可校验：KunTunetClient check -config client.json',
              '运行中查看状态：KunTunetClient status',
              '停止：前台运行按 Ctrl+C；若装成服务则用系统服务停止'
            ]
          }
        ]
      },
      {
        id: 'client-gui',
        heading: '5. 使用桌面客户端',
        blocks: [
          {
            type: 'p',
            text: '安装 KunTunet 桌面端后，左侧有四个入口：控制面板、隧道配置、系统日志、系统设置。'
          },
          {
            type: 'ol',
            items: [
              '打开「系统设置」→「核心配置」：填写「服务器地址」（如 公网IP:7000）、「客户端 ID」、「身份令牌」；需要时填写「备用服务器」。',
              '「安全连接」：按需开启「启用 TLS」，填写「CA 文件」「Server Name」；排障时可临时「跳过证书校验」。',
              '「连接策略」：可调心跳间隔、连接超时、重连最小 / 最大间隔。',
              '打开「隧道配置」→「新建隧道」：填写「隧道名称」「本地地址」（如 127.0.0.1:8080）、「远程地址」（如 0.0.0.0:9000），可选「隧道组 ID」→「保存」。',
              '在「控制面板」或「隧道配置」中打开该隧道的「运行」开关，启动隧道；再拨一次即可停止。',
              '「控制面板」可看运行状态、隧道数量（运行中 / 总数）；「系统日志」查看实时日志。'
            ]
          },
          {
            type: 'tip',
            text: '有隧道正在运行时，「系统设置」会被锁定；改服务器地址或 Token 前请先停止隧道。配置会在启动隧道时写入本机。'
          }
        ]
      },
      {
        id: 'verify',
        heading: '6. 验证与排障',
        blocks: [
          {
            type: 'ol',
            items: [
              '内网先确认本地服务：curl http://127.0.0.1:8080',
              '外网访问映射：curl http://PUBLIC_IP:9000（非 HTTP 可用 nc -vz PUBLIC_IP 9000）',
              '打开 Dashboard http://PUBLIC_IP:8001，确认 Agent 在线、隧道存在'
            ]
          },
          {
            type: 'ul',
            items: [
              'Agent 不在线：核对 Token、控制端口防火墙、TLS 证书与 CA',
              '映射不通：确认映射端口已放行，-remote 为 0.0.0.0，-local 指向正确进程',
              '桌面端改不了设置：先停止所有运行中的隧道'
            ]
          }
        ]
      },
      {
        id: 'combo',
        heading: '7. 与其他产品联动',
        blocks: [
          {
            type: 'ul',
            items: [
              'SSH：-local 127.0.0.1:22，映射到公网端口后，用 KunTerminal 连接并用 AI Copilot 排障',
              '数据库：映射 5432 / 3306 等后，KunDB 连跳板地址并用 AI Copilot 写 SQL'
            ]
          }
        ]
      }
    ]
  },

  terminal: {
    title: 'KunTerminal 使用指南',
    subtitle: '安装 → 登记主机 → 极速连通 → 打开 AI Copilot 排障；SSH / SFTP / IDE 一体。',
    sections: [
      {
        id: 'ai',
        heading: '1. AI Copilot（核心能力）',
        blocks: [
          {
            type: 'p',
            text: 'KunTerminal 内置 AI Copilot：可结合当前终端输出、远程文件与截图，解释报错、生成排查命令，并以 AI Task 推进运维步骤。支持「OpenAI 兼容 API」与「本地 AI CLI」。'
          },
          {
            type: 'ol',
            items: [
              '打开「系统设置」→「AI 助手」。',
              '选择「OpenAI」：填写 Base URL / 模型 / API Key；或「本地 AI CLI」：填写本机命令。',
              '点「持久化保存」，回到「SSH 终端」，在工具栏打开 AI Copilot。',
              '对着当前会话提问，例如「这条报错怎么排」「给出重启服务并检查日志的命令」。',
              '需要看图时：附带截图 / 日志画面（多模态，视模型是否支持）。',
              '从「IDE」把远程配置文件发给 AI，分析风险点与依赖。',
              'Skills 会按问题自动推荐；可在设置中管理 Skills。'
            ]
          },
          {
            type: 'tip',
            text: '涉及 sudo / 交互确认的命令，AI 不会静默代跑，会提示你在终端手动执行后再继续任务。'
          }
        ]
      },
      {
        id: 'install',
        heading: '2. 安装与首次打开',
        blocks: [
          {
            type: 'ol',
            items: [
              '从下载中心安装对应系统的 KunTerminal。',
              '左侧导航：连接管理、SSH 终端、SFTP 文件传输、IDE、系统设置。',
              '首次进入「SSH 终端」通常已有「本地终端」标签，属正常现象。'
            ]
          }
        ]
      },
      {
        id: 'add-host',
        heading: '3. 登记主机',
        blocks: [
          {
            type: 'ol',
            items: [
              '「连接管理」→「登记主机」。',
              '填写「服务器别名」「主机 IP / 域名」「端口」「登录用户名」，可选分组。',
              '「身份校验凭据」选「密码校验」或「SSH 密钥对」后「确认保存」。'
            ]
          }
        ]
      },
      {
        id: 'connect',
        heading: '4. 连接与多标签终端',
        blocks: [
          {
            type: 'ol',
            items: [
              '列表中点「极速连通」（或先「测试」）。',
              '进入远程标签输入命令；工具栏可开 Commands 与 AI Copilot。',
              '「+」可开本地终端或再连其他主机。',
              '断开：回到「连接管理」点「安全断开」。'
            ]
          },
          {
            type: 'warn',
            text: '若弹出「服务器主机密钥已变更」，确认环境无误后可选「删除旧记录并重连」。'
          }
        ]
      },
      {
        id: 'sftp',
        heading: '5. SFTP 与 IDE',
        blocks: [
          {
            type: 'ul',
            items: [
              '「SFTP 文件传输」：左右端点选本地或远程，拖拽或「传到右侧 / 左侧」；底部有传输队列。',
              '「IDE」：远程文件树 + 编辑器 + 嵌入终端；改完可立刻验证，也可发给 AI 分析。'
            ]
          }
        ]
      },
      {
        id: 'faq',
        heading: '6. 常见问题',
        blocks: [
          {
            type: 'ul',
            items: [
              'Copilot 无响应：检查 AI 模式、密钥 / 本地命令是否已「持久化保存」',
              '连接超时：检查 Host / 端口、sshd 与安全组',
              '只能内网访问：先用 KunTunet 映射 22，再填公网 IP 与映射端口'
            ]
          }
        ]
      }
    ]
  },

  db: {
    title: 'KunDB 使用指南',
    subtitle: '安装 → 连库 → 展开 AI Copilot 写 SQL / 读计划；Skills 与知识库可沉淀团队经验。',
    sections: [
      {
        id: 'ai',
        heading: '1. AI Copilot（核心能力）',
        blocks: [
          {
            type: 'p',
            text: 'KunDB 右侧 AI Copilot 面向查库：生成与改写 SQL、解释结果与执行计划，并通过 @ 引用库表对象带上真实 Schema。支持 OpenAI 兼容 API、本地 AI CLI，以及 Skills 插件与知识库。'
          },
          {
            type: 'ol',
            items: [
              '打开「设置」→「AI 助手」。',
              '选择「OpenAI 兼容 API」或「本地 AI CLI」，配置模型与密钥 / 本地命令。',
              '按需启用「Skills 插件」「知识库」，沉淀表说明与排查手册。',
              '回到「数据库连接」，点击「展开 AI Copilot」。',
              '连接目标库后，在对话里 @ 表 / 对象再提问，例如「按用户统计近 7 天订单」。',
              '也可先点工具栏「执行计划」，把计划交给 Copilot 解读优化建议。'
            ]
          },
          {
            type: 'tip',
            text: '生产库建议打开连接「只读」或「全局只读模式」，再让 AI 生成语句，避免误写。'
          }
        ]
      },
      {
        id: 'install',
        heading: '2. 安装与界面',
        blocks: [
          {
            type: 'ol',
            items: [
              '从下载中心安装 KunDB。',
              '左侧活动栏：「数据库连接」「数据库图表分析」「设置」。',
              '主视图：左连接树、中编辑器与结果、右 AI Copilot。'
            ]
          }
        ]
      },
      {
        id: 'new-conn',
        heading: '3. 新建连接',
        blocks: [
          {
            type: 'ol',
            items: [
              '连接面板「+」→「新建连接」。',
              '三步向导：选择类型 → 基础信息（含「只读」）→ 高级参数（SSL 等）。',
              '「测试连接」通过后「保存」，再在树上「连接」。'
            ]
          }
        ]
      },
      {
        id: 'query',
        heading: '4. 查询、计划与导出',
        blocks: [
          {
            type: 'ul',
            items: [
              '「运行」/「运行全部」/「执行计划」；结果区可看结果、消息、计划、JSON、图表',
              '「导出」：当前结果或完整查询 → CSV / TSV / JSON / SQL',
              '对象右键可快速「查询数据」「生成 COUNT / INSERT / DDL」'
            ]
          }
        ]
      },
      {
        id: 'readonly',
        heading: '5. 只读与安全',
        blocks: [
          {
            type: 'ul',
            items: [
              '连接级「只读」与设置里的「全局只读模式」',
              '密码与 AI Key 均本机加密存储',
              '生产库建议只读账号 + 客户端只读双重保护'
            ]
          }
        ]
      },
      {
        id: 'faq',
        heading: '6. 常见问题',
        blocks: [
          {
            type: 'ul',
            items: [
              'Copilot 答非所问：先连接库并 @ 相关表，或把表说明写入知识库',
              '连不上：核对引擎、端口、防火墙；内网库可配合 KunTunet',
              '写操作被拒：检查只读开关是否开启'
            ]
          }
        ]
      }
    ]
  }
};
