export const productionPlaybookHtml = `
<header class="page">
    <div class="kicker">Applying the exam, not just passing it</div>
    <h1>From Exam Rules to Production: The Obligation Q&amp;A Agent</h1>
    <div class="sub">One running use case, carried through every domain, with the stakeholder questions you actually get asked.</div>
  </header>

  <p class="en-first"><b>The use case:</b> a budget analyst wants to ask a Claude-based assistant plain-English questions about DoD obligation data pulled from public FedFM sources — "What did we obligate against this appropriation last quarter?" — instead of filing a data-pull ticket. This is the same shape as my CCAR-P capstone (TypeScript, FedFM obligation data, ADR, eval harness, risk register, stakeholder brief). Each step below is a real design decision on that build, tagged to the Section 6 objective it exercises, with the question a skeptical stakeholder actually asked and the answer that holds up.</p>
  <p class="zh">本页用一个真实案例贯穿七个考试领域：一个基于 Claude 的问答助手，让预算分析师用自然语言查询联邦财务管理（FedFM）的公开拨款数据，取代手动拉数据的工单流程。每一步都是我 CCAR-P 毕业项目中的真实设计决策，并标注对应的第六节考点。</p>

  <h2>Step 1 · Discovery before design <span class="pill d6">D6</span></h2>
  <div class="card">
    <p>The request arrives as "build us a chatbot that can answer anything about our obligations." That sentence is not a requirement, it is a wish. Before writing a line of architecture, pin down: which data (public FedFM extracts, what refresh cadence), which questions (lookups and aggregates, not open-ended analysis), what "wrong" costs (a misquoted obligation figure in front of a CFO is not a cosmetic bug), and what's explicitly out of scope for v1 (no write access, no cross-system reconciliation).</p>
  </div>
  <details class="qa">
    <summary>Q: "Why not just start building? We can refine scope as we go."</summary>
    <div class="answer"><b>A:</b> Scope drift here isn't free — it changes the architecture. "Anything about our obligations" implies open-ended reasoning (points toward an agent); "answer these eleven question types against this dataset" implies a bounded workflow. Picking the pattern before the scope is fixed means rebuilding later. Structured discovery first: what data, what questions, what failure costs, what's out of scope.</div>
  </details>
  <p class="zh">先完成结构化需求挖掘，再谈架构：数据范围、问题类型、出错代价、v1 明确不做的事，这些决定了后面该选工作流还是智能体。</p>

  <h2>Step 2 · Pattern selection <span class="pill d1">D1</span></h2>
  <div class="card">
    <p>The question set is enumerable: lookup by Treasury Account Symbol, lookup by period, compare two periods, roll up by appropriation. That's a routing workflow over a retrieval step and a narration step, not an autonomous agent deciding its own next action. An agent earns its cost and risk when the path truly isn't enumerable in advance.</p>
  </div>
  <details class="qa">
    <summary>Q: "Shouldn't it be an agent, so it can handle anything the analyst asks later?"</summary>
    <div class="answer"><b>A:</b> "Later" isn't "now." An agent adds unbounded tool-call risk, latency, and cost for flexibility this version doesn't need. If a genuinely open-ended question type shows up in production, that's a scoped v2 decision with its own eval and risk review — not a reason to carry agent overhead from day one.</div>
  </details>
  <p class="zh">问题类型可枚举，适合用带检索和生成步骤的路由工作流，而不是自主智能体；智能体的额外成本和风险只有在路径确实无法预先枚举时才值得。</p>

  <h2>Step 3 · Model and context engineering <span class="pill d2">D2</span></h2>
  <div class="card">
    <p>The system prompt holds the static pieces — role, output schema, the handful of rules on how to present a dollar figure and a data-as-of date — placed first and cached. The obligation figures themselves are never pasted into the system prompt; they're retrieved per question. Model tier: Sonnet-class for the narration step, since the task is grounded synthesis, not frontier reasoning; the smallest tier that clears the eval bar, not the largest available.</p>
  </div>
  <details class="qa">
    <summary>Q: "For accuracy, why not load the whole FMR glossary and the full chart of accounts into the system prompt?"</summary>
    <div class="answer"><b>A:</b> That's monolithic context: most of it is irrelevant to any single question, it inflates cost and latency on every call, and it doesn't improve grounding — the model still isn't verifying a number against it, just pattern-matching nearby text. Progressive discovery does the opposite: retrieve only the chart-of-accounts entry and the obligation record the current question actually needs, so every token in context is load-bearing.</div>
  </details>
  <p class="zh">系统提示只放稳定不变的角色和输出格式，并开启缓存；具体拨款数字按问题检索，不整段塞进提示词。模型选能通过评测门槛的最小档位，而不是默认选最大模型。</p>

  <h2>Step 4 · Integration protocol <span class="pill d3">D3</span></h2>
  <div class="card">
    <p>The retrieval and aggregation functions are called directly from the app's own backend — a direct tool/function call, not MCP. MCP earns its overhead when multiple distinct Claude clients need the same tool surface; here there is exactly one caller, this app.</p>
  </div>
  <details class="qa">
    <summary>Q: "Our team's internal dashboards might also want this later — shouldn't we build it as an MCP server now, just in case?"</summary>
    <div class="answer"><b>A:</b> "Might later" is the same trap as Step 1. A direct call is simpler to secure, debug, and version while there's one consumer. If a second real client shows up needing the same tool set, that's the trigger to extract an MCP server — not a hypothetical future consumer today. Building for an imagined client adds surface area with no current benefit.</div>
  </details>
  <p class="zh">检索和聚合函数由本应用后端直接调用，属于直接的工具调用，不用 MCP；MCP 的价值在于多个不同的 Claude 客户端需要共用同一套工具时才体现，这里只有一个调用方。</p>

  <h2>Step 5 · Tool scope and least privilege <span class="pill d3">D3</span></h2>
  <div class="card">
    <p>The agent's tool surface is a short list of narrow, parameterized, read-only functions — <code>getObligationsByTAS</code>, <code>getObligationsByPeriod</code>, <code>compareObligationPeriods</code> — each returning only the fields the UI is allowed to show. There is no generic query tool.</p>
  </div>
  <details class="qa">
    <summary>Q: "A single generic run_query tool would be so much faster to build than four narrow ones. Can't we just tell it in the prompt to only run safe, read-only queries?"</summary>
    <div class="answer"><b>A:</b> A prompt instruction is not an enforceable guardrail — it's a suggestion the model can be argued or injected out of. A generic query tool is capability bloat: it hands the model the power to do far more than its role requires, and the only thing standing between that power and a bad outcome is wording. The architect's answer is to remove the capability: ship only the narrow, parameterized tools the role actually needs, so there is no destructive path to prevent in the first place.</div>
  </details>
  <p class="zh">只提供少量、范围明确、只读的参数化工具，没有通用查询工具。提示词里的"请只读、别乱改"不是可执行的护栏；架构师的做法是直接移除多余能力，而不是靠指令约束。</p>

  <h2>Step 6 · Evaluation harness <span class="pill d4">D4</span></h2>
  <div class="card">
    <p>A golden set of obligation questions with known-correct numeric answers is scored with code — exact match against the source extract, not an LLM judge, because the check is deterministic. A smaller LLM-as-judge pass grades only the narrative quality of the response (clarity, whether the data-as-of date is stated). Results are read by segment — by appropriation type and by TAS — not only as an overall average.</p>
  </div>
  <details class="qa">
    <summary>Q: "The last prompt change raised our average eval score from 91% to 94%. Ship it?"</summary>
    <div class="answer"><b>A:</b> Not yet — check the segments first. If the average rose because performance improved broadly but one appropriation-type segment dropped from 95% to 70%, that's a regression hiding behind a better average, and it's exactly the kind of high-risk slice a CFO's office would notice first. An improved average with a regressed high-risk segment doesn't ship until that segment is fixed or explicitly waived by whoever owns that risk.</div>
  </details>
  <p class="zh">能用确定性数字核对的问题用代码评分，不用大模型做裁判；叙述质量用小规模的 LLM 评委打分。结果按细分维度（拨款类型、TAS）查看，总体平均分提高但某个高风险细分退步时不能上线。</p>

  <h2>Step 7 · Guardrails and the risk register <span class="pill d5">D5</span></h2>
  <div class="card">
    <p>Every dollar figure shown to the analyst must trace back to a tool-returned value — the UI renders numbers only from a structured tool result, never from free-form generated text, so there's no path for the model to "round" or invent a figure. Authorization is resolved server-side from the session, never from a role the user's message claims. Each risk register entry — stale data shown as current, a misattributed TAS, an unauthorized export — gets an owner, a specific control, and a form of evidence, the same shape as an NFR corrective action plan.</p>
  </div>
  <details class="qa">
    <summary>Q: "Can't we just add a line to the prompt: 'never make up a number, always be accurate'?"</summary>
    <div class="answer"><b>A:</b> That's an instruction, not a guardrail, and it fails exactly when it matters most — under ambiguous or adversarial input. The structural fix is to make it architecturally impossible for a non-tool-sourced number to reach the screen: the rendering layer only accepts figures that arrived through a tool call's structured output. That's a control you can point to in an audit, not a sentence you hope the model honors.</div>
  </details>
  <p class="zh">界面上显示的每个数字都必须来自工具返回的结构化结果，不接受模型自由生成的数字；权限由服务端根据会话解析，不采信用户自称的角色。风险台账的每一项都要有负责人、具体控制措施和证据，和 NFR 整改计划一样。</p>

  <h2>Step 8 · Observability and lifecycle <span class="pill d7">D7</span> <span class="pill d6">D6</span></h2>
  <div class="card">
    <p>Every tool call is traced with latency, cost, and the query parameters that triggered it. Monitoring watches for a slow quality drift, not only hard outages — a trend trigger with an owner, plus a calendar-based audit cadence appropriate to a regulated data domain. The stakeholder brief reports auditable-control-backed before/after metrics (ticket volume avoided, time-to-answer), never a vague "productivity gain" claim with nothing behind it.</p>
  </div>
  <details class="qa">
    <summary>Q: "The dashboards are all green. Why would we need a separate quality review?"</summary>
    <div class="answer"><b>A:</b> Infrastructure dashboards show the system is up; they don't show the answers are still good. Retrieval drift, a stale index after a FedFM refresh, or a quietly unpinned model version can degrade answer quality while every uptime metric stays green. That's why sampled output-quality scoring, split by segment, runs on its own schedule — it's a different failure mode than the one infra monitoring catches.</div>
  </details>
  <p class="zh">基础设施监控显示系统在运行，不代表答案质量没有下降；检索漂移、索引过期或模型版本被悄悄升级都可能在各项运行指标全绿的情况下发生。因此需要独立的、按细分抽样的输出质量评分，并按合规节奏定期审查。汇报给业务方的指标必须有可审计的控制支撑，而不是空泛的"提升了效率"。</p>

  <div class="card trap">
    <p><b>The pattern across all eight steps:</b> whenever my instinct reached for a detective control — more logging, a confirmation prompt, a prompt instruction — the exam's (and the production system's) better answer was almost always structural: remove the capability, retrieve instead of stuff, scope the tool narrowly, validate the output shape, resolve authorization server-side. That's the same lens the exam rewards; it just took a real build to make it automatic.</p>
  </div>

  <div class="footer-nav">
    <a href="/about">← About / How I Passed in a Week</a>
    <a href="/">Overview →</a>
  </div>
`;
