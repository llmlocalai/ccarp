export const enterpriseAiSmeHtml = `
<header class="page">
    <div class="kicker">Beyond the exam &mdash; the operating mindset</div>
    <h1>The Enterprise AI Architecture SME: How, What, Why, Where</h1>
    <div class="sub">Grounded in 2026 adoption data, not opinion &mdash; and why most enterprises are stuck two rungs below where the real value lives.</div>
  </header>

  <p class="en-first"><b>The thesis of this page:</b> passing CCAR-P proves you know the architect's decision rules. Being the SME other people in your enterprise turn to for AI architecture is a different, broader job: knowing <i>why</i> most AI investment in 2026 still isn't moving the income statement, <i>where</i> the actual leverage sits in the stack, and <i>how</i> to move your organization's deployments up to where frontier labs already operate &mdash; which is deep inside code, scripting, and DevOps, not the chatbot layer most enterprises stop at. Every statistic on this page is cited; this is a research brief, not a motivational one.</p>
  <p class="zh">本页主旨：通过 CCAR-P 认证证明你掌握了架构师的判断规则；但成为企业里大家依赖的 AI 架构 SME 是另一件更大的事——要清楚为什么 2026 年大部分 AI 投入仍没有转化为财务回报，真正的杠杆点在技术栈的哪一层，以及如何把组织的部署水平提升到前沿实验室已经达到的层次：深入代码、脚本和 DevOps，而不是停留在大多数企业止步的聊天机器人层面。页面中的每个数据都附有来源。</p>

  <h2>Why: the gap is real, measured, and widening between winners and everyone else</h2>
  <div class="card">
    <p>McKinsey's 2026 State of AI survey (1,719 executives, 97 countries) found that only <b>37%</b> of organizations can attribute any earnings impact to AI &mdash; unchanged from the prior year despite record spending &mdash; and just <b>6%</b> attribute 5%+ of EBIT to AI and call the impact significant. Roughly <b>90%</b> of function-level AI use cases are still stuck in pilot. Separately, MIT's widely cited 2025 "State of AI in Business" study found <b>95%</b> of corporate generative AI pilots fail to deliver measurable ROI &mdash; the finding researchers now call the "GenAI Divide." Adoption is not the bottleneck; 88% of organizations already use AI somewhere. <b>Impact</b> is the bottleneck, and impact tracks a specific architectural choice, not model quality.</p>
  </div>

  <figure>
    <svg viewBox="0 0 860 220" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:13px sans-serif; fill:#e7ecf7} .ls{font:11.5px sans-serif; fill:#9fb0cf} .big{font:40px sans-serif; font-weight:800}</style>
      <rect x="40" y="30" width="340" height="150" rx="12" fill="#2a1414" stroke="#e5484d" stroke-width="2"/>
      <text class="big" x="210" y="100" text-anchor="middle" fill="#ff8a7a">~30%</text>
      <text class="lt" x="210" y="130" text-anchor="middle">ROI, blended average</text>
      <text class="ls" x="210" y="150" text-anchor="middle">when AI is layered onto an</text>
      <text class="ls" x="210" y="166" text-anchor="middle">unchanged existing workflow</text>
      <rect x="480" y="30" width="340" height="150" rx="12" fill="#1c2412" stroke="#d4af37" stroke-width="2"/>
      <text class="big" x="650" y="100" text-anchor="middle" fill="#f0c75e">~30x</text>
      <text class="lt" x="650" y="130" text-anchor="middle">ROI, among high performers</text>
      <text class="ls" x="650" y="150" text-anchor="middle">when the workflow itself is</text>
      <text class="ls" x="650" y="166" text-anchor="middle">redesigned around AI first</text>
    </svg>
    <figcaption>Same AI, roughly a 100x difference in measured return &mdash; driven entirely by whether the workflow was redesigned around AI or AI was bolted onto the existing one. (McKinsey State of AI 2026, via AIJourn analysis)</figcaption>
  </figure>

  <div class="card rule">
    <p><b>What separates the 6% of high performers, concretely:</b></p>
    <ol>
      <li><b>They redesign the workflow, not just the interface.</b> ~75% of high performers redid the underlying process around AI, versus ~25% of everyone else &mdash; the single most distinguishing fact in the entire dataset.</li>
      <li><b>They set revenue and innovation goals, not only cost-cutting ones.</b> A chatbot that only saves individual time rarely shows up in the P&amp;L; a redesigned process that changes throughput or quality does.</li>
      <li><b>They build clean, connected data foundations before deploying agents</b>, rather than pointing an agent at whatever data happens to be reachable.</li>
      <li><b>They measure, with a named owner.</b> High performers are roughly twice as likely to have defined impact-measurement processes and visible senior-leadership accountability for the number.</li>
      <li><b>They scale agents into real production functions</b>, not pilots: 40% of $1B+ revenue companies are scaling agents in at least one function (up from 27% a year earlier); smaller firms are flat at 22%.</li>
    </ol>
  </div>
  <p class="zh">McKinsey 2026 年的调研（1719 位高管，97 个国家）显示：只有 37% 的组织能把任何盈利影响归因于 AI，仅 6% 认为 AI 带来了 5% 以上 EBIT 的显著影响；约 90% 的用例仍停留在试点阶段。MIT 2025 年的报告发现 95% 的企业生成式 AI 试点未能产生可衡量的回报，这一现象被称为"GenAI 鸿沟"。真正拉开差距的不是模型能力，而是是否围绕 AI 重新设计了工作流——这一项决定了投资回报率是 30% 还是 30 倍。</p>

  <h2>What: the SME's actual scope, and what it is not</h2>
  <div class="card">
    <p>An enterprise AI architecture SME is the person who turns "we should use AI for this" into a production system with a measured business outcome, a named risk owner, and a lifecycle plan &mdash; and who can explain, to a skeptical CFO, exactly why this deployment will land in the 6% and not the 94%. That is a distinct job from three roles people often conflate it with:</p>
    <table>
      <tr><th>Role</th><th>What it actually owns</th><th>Where it stops short of the SME</th></tr>
      <tr><td>Prompt engineer</td><td>Wording and structure of a single prompt or prompt template</td><td>Doesn't own architecture, integration, eval, or the production lifecycle</td></tr>
      <tr><td>ML / model engineer</td><td>Training, fine-tuning, or evaluating a model in isolation</td><td>Doesn't own how the model fits into a business workflow, tool surface, or risk posture</td></tr>
      <tr><td>AI product manager</td><td>Roadmap, prioritization, and the business case</td><td>Doesn't own the technical tradeoffs &mdash; integration protocol, context strategy, guardrail design</td></tr>
      <tr><td><b>Enterprise AI architecture SME</b></td><td>The full chain: discovery &rarr; pattern &rarr; integration &rarr; context/model &rarr; eval &rarr; guardrails &rarr; observability &rarr; lifecycle, <i>and</i> which of the three roles above should own each piece</td><td>&mdash;</td></tr>
    </table>
  </div>
  <p class="zh">企业 AI 架构 SME 的职责是把"我们应该用 AI 做这个"变成一个有明确业务结果、责任人和生命周期计划的生产系统，并能向持怀疑态度的 CFO 解释清楚为什么这个项目会落在那 6% 而不是 94% 里。这与提示工程师、模型工程师、AI 产品经理的职责都不同，SME 负责的是贯穿发现、模式选择、集成、模型与上下文、评测、护栏、可观测性和生命周期的完整链条。</p>

  <h2>How: the thinking process, as a loop, not a checklist</h2>
  <div class="card">
    <p>The exam's decision chain (discovery, pattern, architecture, context/model, integration, eval, safety, stakeholder, handoff) is the right skeleton, but a working SME runs it as a loop, not a one-way pipeline, because production systems degrade and the loop is how you catch that before a stakeholder does.</p>
  </div>

  <figure>
    <svg viewBox="0 0 860 300" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:12.5px sans-serif; fill:#e7ecf7} .ls{font:11px sans-serif; fill:#9fb0cf} .lh{font:12.5px sans-serif; fill:#0f1420; font-weight:700}</style>
      <rect x="20" y="20" width="180" height="56" rx="8" fill="#5aa9ff"/>
      <text class="lh" x="34" y="44">1 &middot; Discover</text>
      <text class="ls" x="34" y="62" fill="#06101e">real workflow, real failure cost</text>
      <rect x="230" y="20" width="180" height="56" rx="8" fill="#9b7bff"/>
      <text class="lh" x="244" y="44" fill="#0c0620">2 &middot; Redesign</text>
      <text class="ls" x="244" y="62" fill="#0c0620">the process, not just the UI</text>
      <rect x="440" y="20" width="180" height="56" rx="8" fill="#ff8a5b"/>
      <text class="lh" x="454" y="44" fill="#1f0c02">3 &middot; Architect</text>
      <text class="ls" x="454" y="62" fill="#1f0c02">pattern, context, integration</text>
      <rect x="650" y="20" width="190" height="56" rx="8" fill="#38b26a"/>
      <text class="lh" x="664" y="44" fill="#06220f">4 &middot; Build small</text>
      <text class="ls" x="664" y="62" fill="#06220f">narrowest tool surface that works</text>
      <rect x="650" y="112" width="190" height="56" rx="8" fill="#e5484d"/>
      <text class="lh" x="664" y="136" fill="#2a0a07">5 &middot; Evaluate</text>
      <text class="ls" x="664" y="154" fill="#2a0a07">by segment, before and after</text>
      <rect x="440" y="112" width="180" height="56" rx="8" fill="#d4af37"/>
      <text class="lh" x="454" y="136" fill="#2a2004">6 &middot; Govern</text>
      <text class="ls" x="454" y="154" fill="#2a2004">risk register, owner, evidence</text>
      <rect x="230" y="112" width="180" height="56" rx="8" fill="#5aa9ff"/>
      <text class="lh" x="244" y="136">7 &middot; Scale</text>
      <text class="ls" x="244" y="154" fill="#06101e">only after the gate is cleared</text>
      <rect x="20" y="112" width="180" height="56" rx="8" fill="#9b7bff"/>
      <text class="lh" x="34" y="136" fill="#0c0620">8 &middot; Watch for drift</text>
      <text class="ls" x="34" y="154" fill="#0c0620">quality, cost, and model version</text>
      <rect x="20" y="210" width="820" height="72" rx="8" fill="#161d2e" stroke="#2a3550"/>
      <text class="lt" x="36" y="236" font-weight="700">The loop, not the list:</text>
      <text class="ls" x="36" y="258">Step 8 feeds back into Step 1. A drifted deployment isn't a new problem &mdash; it's the same loop, run again, on a system that already exists.</text>
      <text class="ls" x="36" y="276">The SME's actual output isn't a diagram. It's a defensible answer to "why will this work, and how will we know if it stops."</text>
    </svg>
    <figcaption>Eight stations, run as a closed loop. The architect's real differentiator is station 2 &mdash; most failed deployments skip straight from "discover" to "architect" without ever redesigning the underlying process.</figcaption>
  </figure>

  <div class="card rule">
    <p><b>The habit that separates a working SME from a credentialed one:</b></p>
    <ol>
      <li><b>Refuse the first framing.</b> "We need a chatbot for X" is a solution pitched as a requirement. Push back to the actual workflow and its real failure cost before accepting any pattern.</li>
      <li><b>Ask what changes in the process, not just what gets automated.</b> If the answer is "nothing, we just add an AI step," that's the ~30% ROI path. If the answer involves removing a handoff, a wait state, or a manual reconciliation, that's the ~30x path.</li>
      <li><b>Size the real cost before committing to a pattern.</b> Gartner's estimate that agentic workflows consume 5&ndash;30x the tokens of a standard chatbot query is not a rounding error at scale &mdash; it changes whether an agent pattern is even affordable for the volume in question.</li>
      <li><b>Write the eval and the risk register before the demo</b>, not after it impresses someone. A demo that can't yet say how it will be measured is not yet an architecture.</li>
      <li><b>Revisit the decision on a schedule, not only on complaint.</b> Model versions, token costs, and retrieval indexes all drift quietly; the loop in station 8 is a calendar commitment, not a reaction.</li>
    </ol>
  </div>
  <p class="zh">考试的决策链（发现、模式、架构、上下文与模型、集成、评测、护栏、业务方沟通、交接）仍是正确的骨架，但真正发挥作用的 SME 把它当作一个闭环来运行，而不是一次性的流水线：第 8 步（监测质量漂移）会反馈回第 1 步。多数失败的部署都是从"发现"直接跳到"架构"，跳过了最关键的"重新设计流程"这一步——这正是 30% 回报和 30 倍回报之间的分水岭。</p>

  <h2>Where: the leverage ladder &mdash; and why most enterprises stop on the bottom two rungs</h2>
  <div class="card">
    <p>AI's first mainstream products were chat interfaces, so "AI deployment" and "chatbot" became synonymous in most enterprises' mental model. But the labs that build these models don't run their own businesses that way. The highest-leverage use of AI in 2026 isn't talking to customers &mdash; it's writing, testing, and shipping the software that runs the business, including the AI systems themselves. That's not a hypothesis; it's what the frontier labs' own internal numbers show.</p>
  </div>

  <figure>
    <svg viewBox="0 0 860 340" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:12px sans-serif; fill:#e7ecf7} .ls{font:10.5px sans-serif; fill:#9fb0cf} .lv{font:12px sans-serif; font-weight:700}</style>
      <rect x="50" y="260" width="130" height="50" fill="#5a6a8f"/>
      <text class="lv" x="115" y="285" text-anchor="middle" fill="#0a0e18">1</text>
      <text class="lt" x="115" y="325" text-anchor="middle">Chatbot /</text>
      <text class="lt" x="115" y="340" text-anchor="middle">summarization</text>
      <rect x="210" y="210" width="130" height="100" fill="#6b84b8"/>
      <text class="lv" x="275" y="245" text-anchor="middle" fill="#0a0e18">2</text>
      <text class="lt" x="275" y="325" text-anchor="middle">RAG / retrieval</text>
      <rect x="370" y="150" width="130" height="160" fill="#5aa9ff"/>
      <text class="lv" x="435" y="195" text-anchor="middle" fill="#06101e">3</text>
      <text class="lt" x="435" y="325" text-anchor="middle">Workflow</text>
      <text class="lt" x="435" y="340" text-anchor="middle">orchestration</text>
      <rect x="530" y="90" width="130" height="220" fill="#38b26a"/>
      <text class="lv" x="595" y="140" text-anchor="middle" fill="#06220f">4</text>
      <text class="lt" x="595" y="325" text-anchor="middle">Agentic coding</text>
      <text class="lt" x="595" y="340" text-anchor="middle">&amp; DevOps</text>
      <rect x="690" y="30" width="140" height="280" fill="#d4af37"/>
      <text class="lv" x="760" y="80" text-anchor="middle" fill="#2a2004">5</text>
      <text class="lt" x="760" y="325" text-anchor="middle">Frontier: AI builds</text>
      <text class="lt" x="760" y="340" text-anchor="middle">and ships its own stack</text>
    </svg>
    <figcaption>Leverage increases left to right. Rung 1&ndash;2 is where ~90% of enterprise AI use cases sit today (McKinsey). Rung 4&ndash;5 is where Google (75% of new code AI-generated), Anthropic (by its own account, the large majority of its production code), and NatWest (35%+ across 12,000 engineers) already operate.</figcaption>
  </figure>

  <div class="card">
    <table>
      <tr><th>Rung</th><th>What it looks like</th><th>Typical leverage</th><th>Who's actually there</th></tr>
      <tr><td>1. Chatbot / summarization</td><td>Q&amp;A over documents, meeting summaries, a support bot</td><td>Low &mdash; individual time saved, rarely reaches the P&amp;L</td><td>~90% of enterprise function-level use cases (McKinsey)</td></tr>
      <tr><td>2. RAG / retrieval</td><td>Grounded answers over a knowledge base or dataset</td><td>Low-medium &mdash; better accuracy, same workflow shape</td><td>Most "AI search" and internal-knowledge deployments</td></tr>
      <tr><td>3. Workflow orchestration</td><td>Routing, multi-step chains, human-in-the-loop approvals</td><td>Medium-high &mdash; starts changing the process itself</td><td>High-performer segment of enterprise deployments</td></tr>
      <tr><td>4. Agentic coding &amp; DevOps</td><td>Agents writing, testing, reviewing, and shipping code; CI/CD agents</td><td>High &mdash; directly compounds engineering throughput</td><td>Google (75% of new code), NatWest (35%+, 12,000 engineers), Booking.com (+16% throughput, 3,500 engineers), ClickHouse (99% flaky-test reduction via Claude Opus 4.5 agents)</td></tr>
      <tr><td>5. Frontier: AI builds its own stack</td><td>AI writing the large majority of the code behind the AI systems themselves</td><td>Highest &mdash; compounding, self-reinforcing</td><td>Anthropic and other frontier labs, by their own public statements</td></tr>
    </table>
  </div>
  <p class="zh">AI 最早的主流产品是聊天界面，导致许多企业把"部署 AI"等同于"做个聊天机器人"。但真正打造这些模型的实验室自己并不是这样用的：2026 年杠杆最高的 AI 用法不是和客户聊天，而是编写、测试、交付运行业务的软件——包括 AI 系统本身。Google 称新代码中 75% 由 AI 生成（2024 年 10 月仅为 25%），NatWest 约 1.2 万名工程师中生产代码 35% 以上由 AI 辅助完成，这些都不是假设，而是已经发生的事实。</p>

  <h2>The underutilization problem, stated plainly</h2>
  <div class="card trap">
    <p>Here is the uncomfortable asymmetry: the organizations that built these models run on AI-written code at a scale most enterprises haven't attempted, while the median enterprise deployment is a summarization or FAQ bot layered onto an unchanged process. That gap is not a maturity curve that closes on its own &mdash; McKinsey's data shows the EBIT-impact number hasn't moved in two years despite record spending. The gap closes only when an architect deliberately moves the organization's AI investment off rung 1&ndash;2 and onto rung 3&ndash;5, which requires redesigning a real workflow, not adding a chat widget to an existing one.</p>
  </div>
  <div class="card rule">
    <p><b>What moving up the ladder actually requires, by rung:</b></p>
    <ol>
      <li><b>From chatbot to RAG:</b> ground every answer in a retrieval step against a real, governed data source &mdash; stop letting the model answer from parametric memory on anything that must be accurate.</li>
      <li><b>From RAG to workflow:</b> stop treating the AI step as the whole system. Identify the handoffs, approvals, and manual reconciliations around it and fold them into an orchestrated process with defined routes.</li>
      <li><b>From workflow to agentic coding/DevOps:</b> treat your own engineering organization as the first production customer. The GitHub/Microsoft data shows up to 55% faster task completion and ~43% higher commit volume on AI-assisted teams &mdash; but only where agents were given a scoped tool surface (Step 5 of the companion Production Playbook page) and a real eval gate, not unrestricted access with a hope.</li>
      <li><b>From DevOps to frontier:</b> let the AI system's own build, test, and deployment pipeline be the proving ground for new agentic patterns before they're pointed at customer-facing workflows. ClickHouse's agents generated roughly 700 pull requests fixing CI issues in two months precisely because the CI pipeline was treated as a legitimate, high-value target for agentic work &mdash; not a side project next to the "real" AI initiative.</li>
    </ol>
  </div>
  <details class="qa">
    <summary>Q: "We're not a software company. Why would agentic coding and DevOps be our highest-leverage AI use case?"</summary>
    <div class="answer"><b>A:</b> Every enterprise of any size already runs internal software &mdash; reporting pipelines, reconciliation scripts, integration glue, internal tools &mdash; built and maintained by an engineering or IT function that is almost always understaffed relative to its backlog. That function is the one place in the organization where "AI does the first draft, a human reviews it" maps directly onto an existing, well-understood review discipline (code review), with code-based evaluation (tests) already built into the culture. It's the lowest-friction place to prove the ~30x pattern before asking a less technical business function to redesign its workflow around AI with less institutional muscle memory for verifying the output.</div>
  </details>
  <p class="zh">最前沿的 AI 实验室自己的代码库由 AI 编写的比例，远超多数企业尝试的程度，而典型企业的部署却只是在未改变的流程上加一个摘要或问答机器人。这个差距不会自动缩小——McKinsey 的数据显示，尽管投入创纪录，两年来 EBIT 影响的比例都没有变化。差距的缩小需要架构师主动把 AI 投入从第 1-2 层推到第 3-5 层，这意味着重新设计一个真实的工作流，而不是在现有流程上加一个聊天窗口。</p>

  <h2>Skills and perspective the role actually demands</h2>
  <div class="grid3">
    <div class="card">
      <p><b>Systems thinking over feature thinking.</b> See the whole request-to-outcome path, including the handoffs nobody put on the original diagram, not just the model call in the middle of it.</p>
    </div>
    <div class="card">
      <p><b>Tradeoff fluency, named out loud.</b> Cost, latency, quality, risk, maintainability &mdash; and who owns each one &mdash; stated explicitly in every design review, not left implicit.</p>
    </div>
    <div class="card">
      <p><b>A security and governance reflex.</b> Reach for removing a capability before reaching for a confirmation prompt; treat authorization and data handling as structural, not advisory.</p>
    </div>
    <div class="card">
      <p><b>Evaluation literacy.</b> Know when a check belongs in code versus in an LLM-as-judge versus in human review, and read results by segment before trusting an average.</p>
    </div>
    <div class="card">
      <p><b>Stakeholder translation, in both directions.</b> Turn "make it smarter" into a measurable requirement, and turn a token-cost tradeoff into a sentence a CFO will act on.</p>
    </div>
    <div class="card">
      <p><b>A bias toward the workflow, not the widget.</b> The instinct to ask "what changes in the process" before "what AI feature do we add" is, per the data above, the single highest-leverage habit in the whole job.</p>
    </div>
  </div>
  <p class="zh">这个角色真正需要的能力：系统性思维（看清整条路径，而不只是中间的模型调用）、把成本/延迟/质量/风险的取舍讲清楚并指明负责人、安全与治理的本能反应（优先移除权限而不是加确认提示）、评测素养（知道什么该用代码检查、什么该用大模型评委、什么该人工复核，并按细分而非总体平均去看结果）、双向的业务方沟通能力，以及始终优先思考"流程要怎么变"而不是"要加什么 AI 功能"的习惯——这正是全部数据中杠杆最高的一条。</p>

  <h2>Putting it to work: a decision aid for your next request</h2>
  <div class="card">
    <table>
      <tr><th>If someone asks for&hellip;</th><th>First question to ask</th><th>Likely rung</th></tr>
      <tr><td>"A chatbot that can answer questions about X"</td><td>What specific workflow does this replace, and what changes in it besides the interface?</td><td>1&ndash;2, unless redesigned</td></tr>
      <tr><td>"Summarize these documents for the team"</td><td>What decision does the summary feed, and how will you know if it's wrong?</td><td>1</td></tr>
      <tr><td>"Automate this multi-step approval process"</td><td>Which steps are enumerable, and where does a human stay in the loop by design?</td><td>3</td></tr>
      <tr><td>"Help our engineers ship faster"</td><td>What's the narrowest, most measurable slice &mdash; code review, test generation, CI triage &mdash; to pilot with a real eval gate?</td><td>4</td></tr>
      <tr><td>"We want to be AI-first"</td><td>Which real, bounded workflow will you redesign first, and what's the before/after metric that proves it?</td><td>Depends entirely on the answer</td></tr>
    </table>
    <p>The common thread: the SME's job is never to accept the request as framed. It's to find the real workflow underneath it, and to have the research-backed conviction to argue for rung 3&ndash;5 when the request, as asked, would only ever reach rung 1.</p>
  </div>
  <p class="zh">面对每一个新需求，SME 的第一反应不应该是接受对方描述的方案，而是找出背后真实的工作流，并有数据支撑的底气去争取第 3-5 层的方案，而不是止步于对方最初要求的第 1 层。</p>

  <h2>Sources &amp; further reading</h2>
  <div class="card">
    <ul>
      <li>McKinsey, <i>The State of AI in 2026</i> &mdash; survey of 1,719 executives across 97 countries; EBIT impact, pilot-stage data, workflow-redesign findings. Summarized via <a href="https://digitalstrategy-ai.com/mckinsey-state-of-ai-2026" target="_blank" rel="noopener">digitalstrategy-ai.com</a> and <a href="https://www.techtimes.com/articles/325590/20260826/record-ai-spending-cant-move-earnings-needle-94-enterprises-mckinsey-finds.htm" target="_blank" rel="noopener">Tech Times</a>.</li>
      <li>MIT, <i>State of AI in Business 2025</i> (NANDA initiative) &mdash; the 95%-of-pilots-fail finding and the "GenAI Divide" framing. Via <a href="https://fortune.com/2025/08/18/mit-report-95-percent-generative-ai-pilots-at-companies-failing-cfo" target="_blank" rel="noopener">Fortune</a> and <a href="https://computing.co.uk/news/2025/ai/mit-report-95pc-corporate-generative-ai-pilots-fail" target="_blank" rel="noopener">Computing.co.uk</a>.</li>
      <li>Google (Sundar Pichai), on the share of new code generated by AI rising to ~75%, up from ~25% in October 2024. Via <a href="https://www.techspot.com/news/112152-google-ai-now-generates-75-new-code-up.html" target="_blank" rel="noopener">TechSpot</a>.</li>
      <li>Anthropic, public statements on the share of its own production code authored by Claude. Reported across multiple outlets, figures ranging roughly 80&ndash;90% depending on the measure and date cited &mdash; treat the exact figure as directional, not precise.</li>
      <li>GitHub/Microsoft developer research &mdash; AI-authored code share (~46% average, ~61% for Java, up from 27% in 2022), task-completion speed, and commit-volume findings; NatWest (~12,000 engineers, 35%+ AI-assisted production code) and Booking.com (~3,500 engineers, +16% throughput) case data, via <a href="https://keyholesoftware.com/agentic-ai-in-the-software-development-lifecycle-2026-adoption-and-impact-data/" target="_blank" rel="noopener">Keyhole Software</a>.</li>
      <li>ClickHouse engineering, on AI coding agents (Claude Opus 4.5) cutting flaky-test noise ~99% and generating ~700 CI-fixing pull requests over two months. Via <a href="https://www.pulse.bot/devops/news/clickhouse-reports-ai-coding-agents-cut-flaky-test-noise-by-99-and-boost-devops-speed-0a404617-a4ed-403a-83c4-35b790160c89/" target="_blank" rel="noopener">Pulse.bot</a>.</li>
      <li>Gartner, on agentic workflows consuming 5&ndash;30x the tokens of a standard chatbot query, and rising per-interaction cost, cited via the McKinsey/Tech Times coverage above.</li>
    </ul>
    <p>Figures above are the best available secondary-source reporting as of November 2026 and vary by methodology across outlets; treat exact percentages as directional evidence of scale and direction, not audited figures.</p>
  </div>
  <p class="zh">本页所有数据均标注来源，截至 2026 年 11 月，不同机构的统计方法不同，具体数字请作为趋势和量级的参考，而非精确的审计数字。</p>

  <div class="footer-nav">
    <a href="/production-playbook">← Production Playbook</a>
    <a href="/">Overview →</a>
  </div>
`;
