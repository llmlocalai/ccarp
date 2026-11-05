export const productionPlaybookHtml = `
<header class="page">
    <div class="kicker">Applying the exam, not just passing it</div>
    <h1>From Exam Rules to Production: The Obligation Q&amp;A Agent</h1>
    <div class="sub">One running use case, carried through all seven domains, with the architect's reasoning at each decision — not just the answer.</div>
  </header>

  <p class="en-first"><b>The use case:</b> a budget analyst wants to ask a Claude-based assistant plain-English questions about DoD obligation data pulled from public FedFM sources — "What did we obligate against this appropriation last quarter?" — instead of filing a data-pull ticket and waiting two days for an answer that is already stale by the time it arrives. This is the same shape as my CCAR-P capstone: a TypeScript agent over public FedFM obligation data, backed by an architecture decision record, an eval harness, a risk register, and a stakeholder brief. Treat this page as that capstone's design review, written out in full, the way a principal architect would actually defend it to a skeptical stakeholder — not a glossary of terms.</p>
  <p class="zh">本页用一个真实案例贯穿全部考试领域：一个基于 Claude 的问答助手，让预算分析师用自然语言查询联邦财务管理（FedFM）的公开拨款数据，取代手动拉数据、等两天还可能过期的工单流程。这就是我 CCAR-P 毕业项目的真实样子：一个基于 TypeScript 的智能体，配有架构决策记录、评测框架、风险台账和业务方简报。把这页当成毕业项目的完整设计评审，而不是术语表。</p>

  <h2>Overview: why this shape, before any step</h2>
  <div class="card">
    <p><b>The trap in this kind of project is starting from the technology</b> ("let's build a Claude agent") instead of the failure mode you're actually defending against. A budget analyst asking for an obligation figure is not primarily a natural-language problem. It is primarily a <b>trust</b> problem: the number has to be right, traceable to its source, and clearly dated, because it will end up in a briefing to someone who did not watch it get produced. Every architectural choice below follows from that one sentence. Get the trust properties right first; the chat interface is the easy 10%.</p>
    <p>That reframing is what separates an architect's design from a developer's demo. A demo optimizes for "it answered the question." A production system optimizes for "it answered the question, and if it's wrong, I can prove why, who's accountable, and how fast I'll know."</p>
  </div>

  <figure>
    <svg viewBox="0 0 860 360" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:13px sans-serif; fill:#e7ecf7} .ls{font:11px sans-serif; fill:#9fb0cf} .lh{font:12.5px sans-serif; fill:#0f1420; font-weight:700} .ar{font:18px sans-serif; fill:#5a6a8f}</style>
      <rect x="20" y="16" width="150" height="58" rx="8" fill="#5aa9ff"/>
      <text class="lh" x="34" y="40">Analyst question</text>
      <text class="ls" x="34" y="58" fill="#06101e">entry point / UI</text>
      <text class="ar" x="182" y="52">→</text>
      <rect x="208" y="16" width="150" height="58" rx="8" fill="#9b7bff"/>
      <text class="lh" x="222" y="40" fill="#0c0620">Intent router</text>
      <text class="ls" x="222" y="58" fill="#0c0620">which question type</text>
      <text class="ar" x="370" y="52">→</text>
      <rect x="396" y="16" width="170" height="58" rx="8" fill="#ff8a5b"/>
      <text class="lh" x="410" y="40" fill="#1f0c02">Scoped retrieval tools</text>
      <text class="ls" x="410" y="58" fill="#1f0c02">getObligationsByTAS, etc.</text>
      <text class="ar" x="578" y="52">→</text>
      <rect x="604" y="16" width="150" height="58" rx="8" fill="#5aa9ff"/>
      <text class="lh" x="618" y="40">Claude (Sonnet)</text>
      <text class="ls" x="618" y="58" fill="#06101e">cached system prompt</text>
      <text class="ar" x="430" y="110" transform="rotate(90 430 110)">→</text>
      <rect x="604" y="124" width="150" height="58" rx="8" fill="#e5484d"/>
      <text class="lh" x="618" y="148" fill="#2a0a07">Output validator</text>
      <text class="ls" x="618" y="166" fill="#2a0a07">tool-sourced numbers only</text>
      <text class="ar" x="590" y="160">←</text>
      <rect x="396" y="124" width="170" height="58" rx="8" fill="#38b26a"/>
      <text class="lh" x="410" y="148" fill="#06220f">Response + data-as-of</text>
      <text class="ls" x="410" y="166" fill="#06220f">UI render</text>
      <rect x="20" y="220" width="820" height="110" rx="8" fill="#161d2e" stroke="#2a3550"/>
      <text class="lt" x="36" y="246" font-weight="700">Wrapped the whole time:</text>
      <text class="ls" x="36" y="268">Trace ID on every call (latency, cost, params) · Eval harness runs against every prompt/tool change, scored by segment</text>
      <text class="ls" x="36" y="288">Risk register entry per failure mode (owner, control, evidence) · Server-side session scope, never a user-claimed role</text>
      <text class="ls" x="36" y="308">None of this is bolted on after launch &mdash; it is designed in from Step 1, the same way an internal control is designed into a process, not inspected in afterward.</text>
    </svg>
    <figcaption>The request path is a bounded workflow, not an open-ended agent loop: question in, routed retrieval, grounded synthesis, structural validation, dated answer out &mdash; with tracing, eval, and risk ownership wrapped around every stage, not added at the end.</figcaption>
  </figure>

  <h2>What's actually at stake</h2>
  <div class="card">
    <table>
      <tr><th>Stakeholder</th><th>What they actually care about</th><th>Cost of getting it wrong</th><th>Who owns the control</th></tr>
      <tr><td>Budget analyst</td><td>A fast, correct answer they can act on without re-verifying it by hand</td><td>Re-does the manual pull anyway; the tool loses trust after one bad answer</td><td>Product owner (sets accuracy bar)</td></tr>
      <tr><td>CFO / front office</td><td>Any number quoted up the chain is defensible under scrutiny</td><td>A wrong figure in a briefing becomes a credibility problem, not just a bug ticket</td><td>Architect (output validator design)</td></tr>
      <tr><td>Data/platform team</td><td>The agent doesn't become an unbounded, unmonitored query surface against production data</td><td>Uncontrolled load, a security finding, or an audit question with no evidence trail</td><td>Architect + security review (tool scoping, authz)</td></tr>
      <tr><td>Auditor (FIAR/DODIG lens)</td><td>Every control has a named owner and evidence, same as any other financial process control</td><td>An NFR-style finding against the system itself</td><td>Risk register owner</td></tr>
    </table>
    <p>Naming these four up front is what makes every later tradeoff decidable. A design that's fast for the analyst but unauditable for the CFO is not a good design &mdash; it's a deferred finding.</p>
  </div>
  <p class="zh">架构设计前先把利益相关方和风险讲清楚：分析师要速度和可信，CFO 要经得起追问，数据团队要防止失控的查询面，审计视角要求每个控制都有责任人和证据。把这四点先定下来，后面每一步的取舍才有依据。</p>

  <h2>Step 1 · Discovery before design <span class="pill d6">D6</span> <span class="obj">Conduct structured discovery and requirement gathering</span></h2>
  <div class="card">
    <p>The request arrives as "build us a chatbot that can answer anything about our obligations." That sentence is not a requirement; it's a wish, and it's the single most common way these projects get the architecture wrong before anyone writes code. If you let "anything" stand, you will over-build toward an open-ended agent for a problem that is actually a bounded, enumerable lookup-and-aggregate task.</p>
  </div>
  <div class="card rule">
    <p><b>Work the discovery in this order:</b></p>
    <ol>
      <li><b>Pin the data boundary.</b> Which FedFM extracts, exactly, and on what refresh cadence? "All our financial data" is not a boundary; "the public obligation extract, refreshed nightly" is.</li>
      <li><b>Enumerate the question types, don't describe them.</b> Sit with the analyst and collect eleven real questions they've asked a human for in the last month. If you can sort them into four or five repeatable shapes (lookup by TAS, lookup by period, period-over-period comparison, roll-up by appropriation), that's your real scope &mdash; not "anything."</li>
      <li><b>Price the failure.</b> What does a wrong number cost here, specifically? A misquoted obligation figure heading into a CFO briefing is not the same severity as a wrong answer in an internal FAQ bot. This number drives how much you invest in the validator in Step 7, not a vague "be careful."</li>
      <li><b>Write down what's explicitly out of scope for v1.</b> No write access. No cross-system reconciliation. No analysis beyond the enumerated question shapes. Out-of-scope items you name now are the ones you won't quietly build halfway through.</li>
      <li><b>Get the scope signed, not just discussed.</b> A one-paragraph scope note the stakeholder actually reads and agrees to is worth more than a requirements doc nobody re-opens.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Why it matters here</th></tr>
      <tr><td>Cost of skipping this step</td><td>Low today, high later &mdash; a pattern chosen for the wrong scope means rebuilding the retrieval and tool layer, not tuning a prompt</td></tr>
      <tr><td>Risk if scope stays vague</td><td>You build an agent (open-ended) for a workflow (bounded) problem, inheriting cost, latency, and failure-surface you didn't need</td></tr>
      <tr><td>Decision owner</td><td>Product/business owner defines the requirement; architect translates it into the pattern decision in Step 2</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "Why not just start building? We can refine scope as we go."</summary>
    <div class="answer"><b>A:</b> Scope drift here isn't free &mdash; it changes the architecture, not just the UI. "Anything about our obligations" implies open-ended reasoning over an unbounded tool set (points toward an agent); "answer these five question shapes against this dataset" implies a bounded, routable workflow. Picking the pattern before the scope is fixed means rebuilding the retrieval and tool layer later, not just adjusting a prompt. Structured discovery first: what data, what question shapes, what failure costs, what's explicitly out of scope.</div>
  </details>
  <p class="zh">先完成结构化需求挖掘：锁定数据边界、把问题归纳成几种可枚举的类型（而不是"什么都能问"）、量化出错代价、明确 v1 不做的事，并让业务方对范围签字确认。这些决定了后面该选工作流还是智能体。</p>

  <h2>Step 2 · Pattern selection <span class="pill d1">D1</span> <span class="obj">Select appropriate architectural patterns</span></h2>
  <div class="card">
    <p>With Step 1's question shapes in hand, lay them against the three patterns the exam cares about: an augmented single call (one retrieval, one answer, no branching), a workflow (routing and/or chaining across a known set of steps), or an agent (the model decides its own next tool call in a loop it controls). The obligation Q&amp;A set &mdash; lookup, compare, roll-up &mdash; is enumerable: you can draw the full decision tree today. That's the textbook case for a routing workflow, not an agent.</p>
  </div>
  <div class="card rule">
    <p><b>How to make the call, step by step:</b></p>
    <ol>
      <li><b>Draw the decision tree from Step 1's question shapes.</b> If you can draw it completely on a whiteboard in twenty minutes, the path is enumerable.</li>
      <li><b>Identify the routing key.</b> Here it's question type (lookup/compare/roll-up) plus the entities named in it (TAS, period). A classification step picks the branch; each branch calls a fixed, known sequence of tools.</li>
      <li><b>Stress-test for the agent case.</b> Ask: is there a real question shape where the <i>number of steps and which tools get called can't be known in advance</i>? If every real example you collected in Step 1 fits a fixed branch, you don't have that case yet.</li>
      <li><b>Default to the cheaper, more constrained pattern and upgrade only on evidence.</b> A workflow is easier to test exhaustively (you can enumerate every branch in your eval set), cheaper to run, and has a bounded failure surface. An agent earns its added cost, latency, and risk only when the path truly isn't enumerable in advance.</li>
      <li><b>Document the choice in the ADR</b> with the specific question shapes that justified it, so a future "let's just make it an agent" conversation has something concrete to argue against.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Workflow (chosen)</th><th>Agent (rejected here)</th></tr>
      <tr><td>Cost per query</td><td>Lower &mdash; fixed, known tool calls per branch</td><td>Higher &mdash; variable tool-call count, harder to bound</td></tr>
      <tr><td>Latency</td><td>Predictable, easier to meet an SLA</td><td>Variable; a reasoning loop can run long</td></tr>
      <tr><td>Testability</td><td>Every branch is enumerable in the eval set</td><td>Harder to exhaustively test an open decision space</td></tr>
      <tr><td>Risk surface</td><td>Bounded to the fixed tool set per branch</td><td>Broader; any reachable tool combination is in play</td></tr>
      <tr><td>Decision owner</td><td colspan="2">Architect, with the question inventory from Step 1 as evidence</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "Shouldn't it be an agent, so it can handle anything the analyst asks later?"</summary>
    <div class="answer"><b>A:</b> "Later" isn't "now," and building for an imagined future question inherits real cost today: unbounded tool-call risk, variable latency, and a test surface you can't fully enumerate. If a genuinely open-ended question type shows up in production &mdash; something that doesn't fit any of the known branches &mdash; that's a scoped v2 decision with its own discovery pass, eval set, and risk review. It is not a reason to carry agent overhead from day one for a problem that's enumerable today.</div>
  </details>
  <p class="zh">问题类型可枚举（查询、比较、汇总），可以完整画出决策树，这正是路由工作流的典型场景，而不是自主智能体。智能体的额外成本、延迟和风险只有在路径确实无法预先枚举时才值得承担；为"以后可能会问的问题"现在就上智能体，是在为假设的未来买单。</p>

  <h2>Step 3 · Model and context engineering <span class="pill d2">D2</span> <span class="obj">Select models based on trade-offs; optimize context windows</span></h2>
  <div class="card">
    <p>Context design and model choice are two separate decisions that get conflated constantly. Context design decides <i>what the model sees on this call</i>. Model choice decides <i>which tier processes it</i>. Get the first one wrong and no model tier fixes it; get the second one wrong and you're overpaying or under-delivering on a correctly-scoped call.</p>
  </div>
  <div class="card rule">
    <p><b>Context design, concretely:</b></p>
    <ol>
      <li><b>Separate what's static from what's per-query.</b> Static: role, output schema, the handful of formatting rules (how to present a dollar figure, how to state the data-as-of date). Per-query: the specific obligation records the current question needs.</li>
      <li><b>Put the static block first, and enable prompt caching.</b> Every call reuses the same cached prefix; you pay the full cost once per cache window, not per call.</li>
      <li><b>Never paste obligation data into the system prompt.</b> It's retrieved per question through the Step 4 tools. The system prompt describes the schema and the rules for using that data, not the data itself.</li>
      <li><b>Resist "just add the whole glossary for safety."</b> If a term isn't needed to answer the current question, it doesn't belong in this call's context &mdash; it belongs in the retrieval layer, fetched only when a question actually touches it (progressive discovery, not monolithic context).</li>
    </ol>
    <p><b>Model tier, concretely:</b> Sonnet-class for the narration step. The task is grounded synthesis &mdash; take verified tool output, state it clearly with the right caveats &mdash; not frontier-level reasoning. Pick the smallest tier that clears the Step 6 eval bar on the golden set, and re-check that choice if the question set ever grows harder, not by default assumption.</p>
  </div>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Note</th></tr>
      <tr><td>Cost</td><td>Caching the static prefix plus a smaller model tier are the two biggest levers; both compound across call volume</td></tr>
      <tr><td>Latency</td><td>A shorter, targeted per-query context beats a bloated one on time-to-first-token, cache or not</td></tr>
      <tr><td>Quality</td><td>Grounding comes from retrieval accuracy, not context volume &mdash; a bigger prompt doesn't make a number more correct</td></tr>
      <tr><td>Maintainability</td><td>A static system prompt plus a documented retrieval contract is easier to version than a growing, undifferentiated context blob</td></tr>
      <tr><td>Decision owner</td><td>Architect (context shape), with engineering validating the model tier against the eval harness</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "For accuracy, why not load the whole FMR glossary and the full chart of accounts into the system prompt?"</summary>
    <div class="answer"><b>A:</b> That's monolithic context: most of it is irrelevant to any single question, it inflates cost and latency on every single call whether or not it's used, and it doesn't actually improve grounding &mdash; the model still isn't verifying a number against it, it's pattern-matching nearby text. Progressive discovery does the opposite: retrieve only the chart-of-accounts entry and the obligation record the current question actually needs, so every token in context is load-bearing for that specific answer.</div>
  </details>
  <p class="zh">把稳定不变的内容（角色、输出格式、展示规则）放在提示词最前面并开启缓存；具体拨款数字按问题从检索层获取，不整段塞进系统提示词。模型选择能通过评测门槛的最小档位，而不是默认选最大模型；上下文越大不代表答案越准，关键在于检索是否命中。</p>

  <h2>Step 4 · Integration protocol <span class="pill d3">D3</span> <span class="obj">Evaluate connection protocols (MCP, API/CLI, agent-to-agent)</span></h2>
  <div class="card">
    <p>This decision is purely about <i>who else needs this tool surface, and when</i>. The retrieval and aggregation functions here are called directly from the app's own backend. A direct tool/function call is the right choice because there is exactly one caller: this app, this request path, nothing else in the environment needs to discover or reuse these functions right now.</p>
  </div>
  <div class="card rule">
    <p><b>Work the decision this way, every time:</b></p>
    <ol>
      <li><b>Count real consumers today, not hoped-for ones.</b> One app, one backend, one request path → direct call. Multiple distinct Claude clients (a dashboard, a Slack bot, another team's app) genuinely needing the same tool surface → MCP earns its overhead.</li>
      <li><b>Check who owns versioning and change risk.</b> A direct call versions with the app that owns it. An MCP server becomes a shared dependency with its own release discipline the moment a second consumer attaches &mdash; don't take on that discipline before you need it.</li>
      <li><b>Separate "shareable in principle" from "shared now."</b> Almost any tool is shareable in principle. That's not the test. The test is whether a second real caller exists today.</li>
      <li><b>Leave an extraction seam, don't pre-build the abstraction.</b> Keep the retrieval functions cleanly separated from the app's request-handling code so that, if a second consumer does show up, wrapping them in an MCP server is a refactor, not a rewrite.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Direct call (chosen)</th><th>MCP (not yet)</th></tr>
      <tr><td>Overhead</td><td>Minimal &mdash; one caller, one contract</td><td>Server to run, version, and secure independently</td></tr>
      <tr><td>Change risk</td><td>Low &mdash; changes and consumer live together</td><td>Any breaking change now affects every attached client</td></tr>
      <tr><td>When it's the right call</td><td>Single consumer, current state</td><td>Multiple distinct Claude clients need the identical tool set</td></tr>
      <tr><td>Decision owner</td><td colspan="2">Architect, revisited the moment a second real consumer is proposed</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "Our team's internal dashboards might also want this later &mdash; shouldn't we build it as an MCP server now, just in case?"</summary>
    <div class="answer"><b>A:</b> "Might later" is the same trap as Step 1's "anything." A direct call is simpler to secure, debug, and version while there's exactly one consumer. If a second real client shows up needing the same tool set, that's the trigger to extract an MCP server &mdash; not a hypothetical future consumer today. Building for an imagined client adds operational surface area (a server to run, version, and secure) with no current benefit, and the extraction is cheap later if the retrieval functions were kept cleanly separated to begin with.</div>
  </details>
  <p class="zh">这个决定只看一件事：现在真正有几个调用方。本案例检索和聚合函数由本应用后端直接调用，属于直接的工具调用，不用 MCP；MCP 的开销（独立运行、版本管理、安全维护）只有在多个不同的 Claude 客户端确实需要共用同一套工具时才值得承担。保持检索层与业务逻辑解耦，未来真有第二个调用方时再抽取成 MCP 服务。</p>

  <h2>Step 5 · Tool scope and least privilege <span class="pill d3">D3</span> <span class="obj">Evaluate tool/agent configuration for capability bloat; analyze authorization requirements</span></h2>
  <div class="card">
    <p>This is the step my own instinct fights hardest, and it's worth naming why: enterprise and government practice trains you to add a check in front of a broad capability (log it, confirm it, review it later). The architect's answer here is structurally different: don't grant the broad capability at all. Every exam item that smells like this one wants removal, not detection.</p>
  </div>
  <div class="card rule">
    <p><b>Scoping the tool surface, concretely:</b></p>
    <ol>
      <li><b>Start from the five question shapes in Step 1</b>, not from "what could this data store do." Each shape gets exactly one tool: <code>getObligationsByTAS</code>, <code>getObligationsByPeriod</code>, <code>compareObligationPeriods</code>, <code>rollUpByAppropriation</code>.</li>
      <li><b>Parameterize, don't generalize.</b> Each tool takes typed, validated parameters (a TAS string, a period range) and returns only the fields the UI is allowed to show. No tool accepts a raw query string.</li>
      <li><b>Make write access structurally absent, not merely unused.</b> There is no update/delete/export tool in the configuration at all &mdash; not a read-only flag on a powerful tool, an actually absent capability.</li>
      <li><b>Resolve authorization server-side from the session</b>, never from a role or scope the incoming message claims. "I'm an analyst with export rights" typed into a chat box is not an authorization source.</li>
      <li><b>Review the tool list itself as a standing control.</b> Before every release, ask: does every tool in this list still map to a real, current question shape? A tool nobody's workflow uses anymore is bloat sitting in the attack surface for no benefit.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Narrow, parameterized tools (chosen)</th><th>Generic query tool (rejected)</th></tr>
      <tr><td>Build speed</td><td>Slower upfront &mdash; one tool per shape</td><td>Faster upfront &mdash; one tool does everything</td></tr>
      <tr><td>Risk surface</td><td>Bounded to exactly the enumerated shapes</td><td>Unbounded &mdash; anything expressible in the query language</td></tr>
      <tr><td>What enforces safety</td><td>Structure (the tool literally cannot do more)</td><td>Wording (a prompt instruction hoping the model won't)</td></tr>
      <tr><td>Decision owner</td><td colspan="2">Architect, with security review signing off the final tool list</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "A single generic run_query tool would be so much faster to build than four narrow ones. Can't we just tell it in the prompt to only run safe, read-only queries?"</summary>
    <div class="answer"><b>A:</b> A prompt instruction is not an enforceable guardrail &mdash; it's a suggestion the model can be argued, confused, or injected out of, and it fails exactly under adversarial or ambiguous input, which is precisely when it matters most. A generic query tool is capability bloat: it hands the model the power to do far more than its role requires, and the only thing standing between that power and a bad outcome is wording. The architect's answer is to remove the capability: ship only the narrow, parameterized tools the role actually needs, so there is no destructive path to prevent in the first place.</div>
  </details>
  <p class="zh">只提供与五种问题类型对应的少量、参数化、只读工具，没有通用查询工具，也没有任何写入能力。权限由服务端根据会话解析，不接受用户在对话里自称的角色。提示词里的"请只读、别乱改"不是可执行的护栏；架构师的做法是直接移除多余能力，而不是靠指令约束，并把工具清单本身作为每次发布前的常规审查项。</p>

  <h2>Step 6 · Evaluation harness <span class="pill d4">D4</span> <span class="obj">Define evaluation metrics; design evaluation datasets and test frameworks</span></h2>
  <div class="card">
    <p>The eval harness is written before the production code, not after, because it's what turns "I think this works" into a measurable claim. For an obligation Q&amp;A agent, most of what matters has a verifiable correct answer &mdash; which argues for code-based scoring as the default, with LLM-as-judge reserved for the narrower slice that genuinely needs judgment.</p>
  </div>
  <div class="card rule">
    <p><b>Building the harness, step by step:</b></p>
    <ol>
      <li><b>Build the golden dataset from real questions, not invented ones.</b> Pull the same question inventory from Step 1, and for each one, record the exact correct figure from the source extract at a known point in time.</li>
      <li><b>Score every numeric claim with code.</b> Exact match (or a defined tolerance for rounding) against the golden source. This is deterministic; there is no reason to pay for a judge call on a check a script can make.</li>
      <li><b>Reserve LLM-as-judge for narrative quality only.</b> Clarity, whether the data-as-of date is stated, whether the right caveats appear when data is incomplete. Give the judge a tight rubric and a small label set, and calibrate it against a human-labeled sample before trusting its scores.</li>
      <li><b>Segment the results before reading the average.</b> Break scores out by appropriation type and by TAS category. A regression hiding in one high-visibility segment is exactly the failure a single blended average will hide.</li>
      <li><b>Re-run the full suite on every prompt, tool, or model-version change.</b> No exceptions for "small" edits &mdash; the smallest wording change can shift grounding behavior in ways intuition won't catch.</li>
      <li><b>Watch for a stale golden set.</b> If the underlying FedFM extract refreshes and the golden answers don't get re-derived, the suite starts measuring agreement with outdated numbers, not correctness.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Scoring method</th><th>Use for</th><th>Cost</th><th>Weakness</th></tr>
      <tr><td>Code-based</td><td>Every numeric obligation figure, date formatting, schema of the tool-call output</td><td>Near zero; never drifts</td><td>Can't judge tone or explanatory quality</td></tr>
      <tr><td>LLM-as-judge</td><td>Narrative clarity, caveat presence, tone</td><td>About one call per item</td><td>Needs calibration; inconsistent at edge cases</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "The last prompt change raised our average eval score from 91% to 94%. Ship it?"</summary>
    <div class="answer"><b>A:</b> Not yet &mdash; check the segments first. If the average rose because performance improved broadly but one appropriation-type segment dropped from 95% to 70%, that's a regression hiding behind a better average, and it's exactly the kind of high-risk slice a CFO's office would notice first, not an edge case anyone can quietly ignore. An improved average with a regressed high-risk segment doesn't ship until that segment is fixed or the regression is explicitly accepted, in writing, by whoever owns that risk.</div>
  </details>
  <p class="zh">能用确定性数字核对的内容（拨款金额、日期格式）用代码评分，不花成本请大模型做裁判；叙述质量（是否说明数据截止日期、措辞是否清晰）才用小规模的 LLM 评委打分，并先用人工标注校准。结果必须按细分维度（拨款类型、TAS）查看，总体平均分提高但某个高风险细分退步时不能上线。每次改动提示词、工具或模型版本都要重跑整套评测。</p>

  <h2>Step 7 · Guardrails and the risk register <span class="pill d5">D5</span> <span class="obj">Implement guardrails and safety controls; identify risks and failure modes</span></h2>
  <div class="card">
    <p>Guardrails here are structural, not conversational. The single highest-value rule: every dollar figure the analyst sees must trace back to a tool-returned value. The model is never allowed to be the last word on what number appears on screen.</p>
  </div>
  <div class="card rule">
    <p><b>Building this in, concretely:</b></p>
    <ol>
      <li><b>Make the rendering layer the enforcement point, not the prompt.</b> The UI component that displays a dollar figure accepts only values that arrived through a validated tool-call result object &mdash; it has no code path that renders a number pulled from free-form model text.</li>
      <li><b>Validate the tool-output schema before it reaches the model's context.</b> If a retrieval call returns something malformed, that's a fail-closed condition, not a best-effort pass-through.</li>
      <li><b>Build the risk register like a corrective action plan.</b> For each failure mode &mdash; stale data shown as current, a misattributed TAS, an unauthorized export attempt &mdash; write the specific control, name an owner, and define what evidence proves the control is operating (a log query, a test result, a config screenshot).</li>
      <li><b>Treat human review as a designed step for the highest-stakes outputs</b>, not a fallback for when the model seems unsure. If an answer is heading into a CFO-facing export, route it through a lightweight review step by design, not by exception.</li>
      <li><b>Review the register on a calendar cadence</b>, the same discipline as a FIAR/DODIG control test, not only after an incident prompts a look.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Failure mode</th><th>Control</th><th>Evidence</th></tr>
      <tr><td>Model states a figure not backed by a tool result</td><td>Rendering layer rejects non-tool-sourced numbers</td><td>Unit test on the render component; eval case that attempts this</td></tr>
      <tr><td>Stale extract shown as current</td><td>Every response carries a data-as-of date sourced from the extract's own timestamp</td><td>Spot-check against the extract's refresh log</td></tr>
      <tr><td>User-claimed role grants extra access</td><td>Authorization resolved server-side from session only</td><td>Security review sign-off; penetration test note</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "Can't we just add a line to the prompt: 'never make up a number, always be accurate'?"</summary>
    <div class="answer"><b>A:</b> That's an instruction, not a guardrail, and it fails exactly when it matters most &mdash; under ambiguous or adversarial input, which is the scenario any real guardrail has to survive. The structural fix is to make it architecturally impossible for a non-tool-sourced number to reach the screen: the rendering layer only accepts figures that arrived through a tool call's structured output. That's a control you can point to in an audit, with a test that proves it, not a sentence you hope the model honors.</div>
  </details>
  <p class="zh">护栏是结构性的，不是对话式的：界面上显示的每个数字都必须来自工具返回的结构化结果，渲染层没有任何代码路径能显示模型自由生成的数字；工具返回的数据在进入模型上下文前先校验格式，格式不对就直接失败而不是勉强放行。风险台账的每一项都要有责任人、具体控制措施和证据，和 FIAR/DODIG 的整改计划一样按日历节奏定期复查，而不是只在出事后才想起来看。</p>

  <h2>Step 8 · Observability and lifecycle <span class="pill d7">D7</span> <span class="pill d6">D6</span> <span class="obj">Monitor system performance; support lifecycle phases</span></h2>
  <div class="card">
    <p>Launch is the midpoint of this project, not the end. The two things an infrastructure dashboard will never show you: slow answer-quality drift, and whether the business actually believes the thing is working. Both need their own instrumentation and their own owner.</p>
  </div>
  <div class="card rule">
    <p><b>Running it in production, concretely:</b></p>
    <ol>
      <li><b>Trace every tool call</b> with latency, cost, and the query parameters that triggered it, tied to a shared trace ID per request so a bad answer can be reconstructed end to end.</li>
      <li><b>Separate uptime monitoring from quality monitoring.</b> Infra dashboards (error rates, latency, 5xx counts) answer "is it up." A sampled output-quality score, read by segment, on its own schedule, answers "are the answers still good" &mdash; a different failure mode entirely.</li>
      <li><b>Set a trend trigger, not just a threshold alert.</b> A slow decline across weeks won't fire a single-point alert; it needs an owned, periodic look at the trend line itself.</li>
      <li><b>Run a calendar-based audit, independent of alerts</b>, appropriate to a regulated financial-data domain &mdash; the same logic as a periodic control test that happens whether or not anything looks wrong.</li>
      <li><b>Pin model and dependency versions, and gate every version swap</b> through the Step 6 eval suite with a pre-set pass threshold, rather than auto-upgrading and finding out from user complaints.</li>
      <li><b>Report to the stakeholder in auditable-control-backed terms:</b> ticket volume avoided, time-to-answer, eval pass rate by segment &mdash; never a vague "productivity gain" claim with no control or measurement behind it.</li>
    </ol>
  </div>
  <div class="card">
    <table>
      <tr><th>Signal</th><th>Catches</th><th>Cadence</th></tr>
      <tr><td>Infra dashboard (latency, errors)</td><td>Outages, dependency failures, timeouts</td><td>Real-time alerting</td></tr>
      <tr><td>Sampled output-quality score, by segment</td><td>Retrieval drift, stale index, subtle grounding regressions</td><td>Continuous sampling + periodic review</td></tr>
      <tr><td>Calendar audit</td><td>Anything neither of the above was built to catch</td><td>Fixed schedule, regardless of alerts</td></tr>
    </table>
  </div>
  <details class="qa">
    <summary>Q: "The dashboards are all green. Why would we need a separate quality review?"</summary>
    <div class="answer"><b>A:</b> Infrastructure dashboards show the system is up; they don't show the answers are still good. Retrieval drift, a stale index after a FedFM refresh, or a quietly unpinned model version can degrade answer quality while every uptime metric stays green the whole time. That's why sampled output-quality scoring, split by segment, runs on its own schedule &mdash; it's catching a different failure mode than the one infra monitoring was ever designed to catch.</div>
  </details>
  <p class="zh">上线只是项目的中点，不是终点。基础设施监控显示系统在运行，不代表答案质量没有下降；检索漂移、索引过期或模型版本被悄悄升级都可能在各项运行指标全绿的情况下发生。因此需要独立的、按细分抽样的输出质量评分，并按固定节奏做日历审查，而不只是依赖告警。向业务方汇报的指标必须有可审计的控制支撑（避免的工单量、响应时间、按细分的评测通过率），而不是空泛的"提升了效率"。</p>

  <h2>Putting it together</h2>
  <div class="card trap">
    <p><b>The pattern across all eight steps is the same one:</b> whenever my instinct, trained by years of enterprise and government practice, reached for a detective control &mdash; more logging, a confirmation prompt, a prompt instruction, "we'll catch it in review" &mdash; the better answer was almost always structural: remove the capability, retrieve instead of stuff the context, scope the tool narrowly, validate the output shape at the boundary, resolve authorization server-side, separate uptime from quality monitoring. That's the lens the exam rewards, and it's the same lens that survives a real design review. Building the capstone alongside the study is what made the lens automatic instead of memorized.</p>
  </div>

  <div class="footer-nav">
    <a href="/about">← About / How I Passed in a Week</a>
    <a href="/enterprise-ai-sme">Enterprise AI Architecture SME →</a>
  </div>
`;
