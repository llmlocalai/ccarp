export const module4Html = `
<header class="page">
    <div class="kicker">Module 4 · ~20 pages in course</div>
    <h1>Stakeholder Engagement, Lifecycle &amp; GTM</h1>
    <div class="sub">Exam domains: D6 (all five objectives), plus D1 (value pillars) and D3/D5 (route selection, residency)</div>
    
  </header>

  <p class="en-first"><b>Lifecycle framework running through this module:</b> discovery → design → handoff → monitoring → iteration. Knowing which phase a decision belongs to tells you when that phase is allowed to close.</p>
  <div class="card trap">
    <p><b>Scope note:</b> demo design, joint scoping with Anthropic's Applied AI team, GTM partnership maps, and the "reuse potential" outcome-doc field are all <b>Partner Track, out of scope for CCAR-P</b>. Selecting the reuse-potential field is always wrong on this exam.</p>
  </div>

  <h2>4.1 Discovery is structured elicitation <span class="pill d6">D6</span></h2>
  <div class="card">
    <p>Three steps: listen to the business goal; translate it into requirements, assumptions, and open constraints; write each one down before the conversation moves on.</p>
    <table>
      <tr><th>Category</th><th>Ask</th><th>Note</th></tr>
      <tr><td>Must do</td><td>Capabilities stated as business outcomes</td><td>This is where you split Claude / system / human</td></tr>
      <tr><td>Must not do</td><td>Prohibited actions; cases that must go to a human</td><td><b>Stakeholders rarely volunteer this — ask for it</b></td></tr>
      <tr><td>Must cost</td><td>Latency targets, per-interaction cost ceiling, call-volume forecast</td><td>Feeds sizing and SLAs</td></tr>
      <tr><td>Must prove</td><td>Evidence obligations, especially regulated settings</td><td>Cheaper to find now than at legal review</td></tr>
    </table>
    <p><b>Translation is the core skill.</b> Experience words ("seamless," "fast," "simple," "just a quick check") are a signal to dig deeper. Ask: what would break that experience? what must still hold when something goes wrong? Answers become testable constraints (a p95 target, a handoff rule, a safe failure state).</p>
    <p><b>Output: a translation table,</b> one row per item: their words → implied constraint → architecture decision → assumption to confirm.</p>
    <ul>
      <li>"It just reads the form and routes it" → routing is very likely a deterministic rule.</li>
      <li>"The reviewer will check it anyway" → very likely a mandatory authorization gate.</li>
      <li>"We're healthcare, handle data carefully" → a formal evidence obligation; audit trail and data handling are requirements from day one.</li>
    </ul>
    <p><b>Requirement vs. assumption:</b> a requirement traces to something a stakeholder said. An assumption traces to nothing — an untraceable assumption is the most dangerous kind.</p>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>The architect proposes a design mid-call, the stakeholder agrees, questions stop, and a hidden constraint surfaces weeks later. Don't propose a solution before all four question categories are asked.</p>
  </div>

  <h2>4.2 Framing tradeoffs <span class="pill d6">D6</span></h2>
  <div class="card">
    <p>The goal is an informed decision by the other side, not a conclusion reached for them. Every tradeoff states:</p>
    <ul>
      <li>What we get.</li>
      <li>What we give up.</li>
      <li><b>The cost of reversing the choice once the system is built around it</b> (most readouts skip this).</li>
      <li>In regulated settings, the effect on compliance posture.</li>
    </ul>
    <p>Deliver a <b>decision package:</b> options considered, evaluation criteria, recommendation, residual risk. The stakeholder has to defend this decision to their own leadership. Lead with business outcomes; state limitations honestly.</p>
    <table>
      <tr><th>Tradeoff</th><th>Get</th><th>Give up / reversal cost</th></tr>
      <tr><td>Stuffing context per call vs. retrieval</td><td>Simpler at first</td><td>Per-call cost and latency rise at scale; reversing means rearchitecting after costs spiked</td></tr>
      <tr><td>Cutting logging for lower latency</td><td>Smoother UX</td><td>Visibility drops; a compliance gap in regulated settings</td></tr>
      <tr><td>Single route vs. multi-platform</td><td>Simpler auth and logging</td><td>Less flexibility on region/procurement; a later residency requirement can get stuck switching</td></tr>
    </table>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>A correct answer to the question asked (per-call cost) is not the same as informed approval — not if no one converted it to monthly cost at production scale, and no one explained the cost of reversing the choice.</p>
  </div>

  <h2>4.3 Feedback loops and SLAs <span class="pill d6">D6</span></h2>
  <div class="card">
    <p>Deployments drift quietly. <b>A feedback loop is a decision layer built on top of observability:</b> Signals → Triage → Decide → Act → Review.</p>
    <p><b>An SLA states:</b> what's measured, what counts as breach, what breach triggers. <b>Every threshold must trace to a source:</b> latency → the experience expectation from discovery; availability → business criticality; quality → eval acceptance criteria.</p>
    <p><b>Cost is the most commonly broken expectation.</b> Production scale is often one to two orders of magnitude above the pilot. Give the sponsor a real-scale usage forecast and a cost-control plan (caching, model tiering, budget alerts) before the first bill lands.</p>
    <p><b>Regulated deployments need calendar-triggered checkpoints</b> even when every metric is green (periodic output audits, scheduled residency confirmation). <b>Escalation triggers are predefined</b> (an agreed threshold or a calendar date), not reactive.</p>
    <table>
      <tr><th>Triage category</th><th>Criterion</th><th>Example</th></tr>
      <tr><td>Noise</td><td>Nothing changed, or a one-time event that self-resolved / has a known cause</td><td>One malformed request from a known buggy client; a successful 2am retry; error rate flat after a new template shipped</td></tr>
      <tr><td>Internal monitoring</td><td>Something changed, but within budget or explained</td><td>p99 up 40ms but still within budget; token use up and matching known seasonal peak</td></tr>
      <tr><td>Architect review</td><td>A persistent trend that raises a design question</td><td>Eval score declining three weeks running</td></tr>
      <tr><td>Stakeholder review</td><td>Crosses a line the stakeholder owns, or a planned regulated checkpoint</td><td>Per-interaction cost over the agreed threshold; a scheduled residency confirmation; a quarterly output audit</td></tr>
    </table>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>Mistaking strong observability for a feedback loop. A slowly declining eval score never trips an error-rate alert; with no trend trigger and no owner, the problem surfaces months later. Set triggers for slow drift. Also: error rate is the wrong metric for a prompt change; eval checks belong in the pre-release gate.</p>
  </div>

  <h2>4.4 Documentation for handoff and audit <span class="pill d6">D6</span></h2>
  <div class="card">
    <table>
      <tr><th>Reader</th><th>Needs</th></tr>
      <tr><td>Incoming engineer (successor)</td><td>Decisions plus <b>rejected options and why</b>, or they'll reopen a load-bearing choice</td></tr>
      <tr><td>Compliance reviewer</td><td>Obligation → control → owner → evidence. No verbal assertions accepted</td></tr>
      <tr><td>A future architect returning later</td><td>Dated decisions, assumptions explicitly labeled, open items with owners</td></tr>
    </table>
    <p><b>Completeness test:</b> could a competent architect who wasn't present safely modify the system after reading this? Checklist fields: decision (dated), rejected alternatives, tradeoff (get/cost/reversal), owner, evidence, audit readiness.</p>
    <div class="pract card">
      <h4>Practice: placing documentation artifacts — a logged weak spot</h4>
      <p>Two tests: (1) who's the <b>primary</b> reader, successor or reviewer? (2) does it record <b>reasoning/intent</b>, or <b>proof</b> of what happened?</p>
      <ul>
        <li><b>Handoff / intent:</b> architecture diagram, assumptions register, <b>decision log with rationale</b> (a successor reads this first, to avoid reopening a settled decision).</li>
        <li><b>Handoff / evidence:</b> deployment runbook.</li>
        <li><b>Compliance / evidence:</b> control register with evidence links, test-result summary.</li>
        <li><b>Compliance / intent:</b> empty. Not every quadrant needs an entry.</li>
      </ul>
      <p>Government-practice trap: in FIAR, a documented management rationale counts as audit evidence, which pulls the decision log toward the compliance side. The course classifies by primary reader and function instead.</p>
    </div>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>A detailed architecture diagram with no stated rationale. A successor changes the context strategy for performance and silently breaks a data-residency constraint. A diagram shows "what," not "why."</p>
  </div>

  <h2>4.5 Entry points and outcome documentation at scale <span class="pill d6">D6</span> <span class="pill d3">D3</span> <span class="pill d5">D5</span></h2>
  <div class="card">
    <p><b>Multi-platform traps:</b> model ID strings differ by route; cloud-provider routes lag on features; Bedrock and Vertex require explicit region configuration (accepting a default or global endpoint is the classic residency violation).</p>
    <p><b>Write an entry-point responsibility map before writing integration code:</b> which route owns which task, and why. It stops a route chosen for one job from silently taking on another.</p>
    <table>
      <tr><th>Route</th><th>Pick when</th></tr>
      <tr><td>Direct API</td><td>Newest features arrive first, fewest hops. Default unless procurement or residency points elsewhere</td></tr>
      <tr><td>Bedrock</td><td>Partner standardized on AWS, needs in-region execution; requires explicit region config</td></tr>
      <tr><td>Vertex</td><td>Partner standardized on GCP with a Vertex procurement channel</td></tr>
      <tr><td>Foundry</td><td>Behavior depends on hosting form; verify residency per model</td></tr>
    </table>
    <div class="pract card">
      <h4>Practice: primary vs. secondary route — a logged weak spot</h4>
      <ul>
        <li><b>Procurement and data residency decide the primary route first,</b> ahead of cost or latency. AWS-standardized + a Moderate-level in-region obligation → Bedrock is primary.</li>
        <li><b>Latency decides what the secondary route is used for — never the primary.</b> Direct API carries latency-sensitive, unregulated work.</li>
        <li>"None required" for a secondary route is correct only when nothing requires lower latency than the primary provides.</li>
        <li>Principle: governance constraints exclude options first (pass/fail); cost and convenience only decide among what's left.</li>
      </ul>
    </div>
    <table>
      <tr><th>Outcome-doc field</th><th>Purpose</th></tr>
      <tr><td>1. Use case &amp; scope boundary</td><td>What changed</td></tr>
      <tr><td>2. Metric before</td><td>Baseline captured at the start</td></tr>
      <tr><td>3. Metric after</td><td>Same metric, post-launch, same definition</td></tr>
      <tr><td>4. Auditable control</td><td>What makes the comparison credible (e.g. an authorization log)</td></tr>
      <tr><td>5. Measurement owner</td><td>Who keeps measuring after the project ends</td></tr>
      <tr><td>6. <span class="new">[Partner Track]</span> Reuse potential</td><td>Never correct on this exam</td></tr>
    </table>
    <p><b>Pick fields by the question asked:</b> a reusable value story → before + after metrics. Compliance sign-off → control + owner.</p>
    <p><b>Trap:</b> writing the outcome doc from easily exported technical metrics (call volume, latency, error rate). That proves the system ran, not that it changed anything. A CFO needs before/after business metrics backed by an auditable control.</p>
    <p><b>Phase gating:</b> the outcome doc decides whether to expand. Early data is often insufficient — name an owner, confirm the control is logging, and schedule completion at a milestone rather than publishing a premature conclusion.</p>
  </div>

  <h2>4.6 Worked example: seven decisions for a regulated, multi-platform rollout</h2>
  <div class="card">
    <ol>
      <li><b>Discovery:</b> a "must prove" constraint (every clinician-authorized output has an audit trail) becomes a requirement.</li>
      <li><b>Tradeoff:</b> cutting logging for latency — state the gain, the loss, the reversal cost, the compliance risk.</li>
      <li><b>Feedback loop:</b> a calendar-triggered audit rule, owned by compliance, independent of metrics.</li>
      <li><b>Documentation:</b> a decision-log entry on explicit in-region routing, naming the rejected global endpoint and why.</li>
      <li><b>Entry point:</b> primary = the partner's standardized cloud route with an explicit region; secondary = Direct API for unregulated work.</li>
      <li><b>Outcome doc:</b> a baseline cycle-time metric, the same metric post-launch, an authorization log as the control.</li>
      <li><b>Phase gate:</b> is post-launch data sufficient? If not, name an owner and a completion date.</li>
    </ol>
  </div>

  <div class="card weak">
    <h4>Your logged weak spots — Module 4</h4>
    <ul>
      <li><b>Document architectures and provide implementation guidance:</b> classify by primary reader and function; never select "reuse potential."</li>
      <li><b>Manage stakeholder feedback loops:</b> internal monitoring requires a real change — no change = noise.</li>
      <li>Government-practice note: your governance background is a real strength, but the exam's framework sometimes differs (decision log = handoff, not compliance).</li>
    </ul>
  </div>

  <h3>Module 4 self-test</h3>
  <div class="card">
    <ol>
      <li>Name discovery's four question categories. Which one do stakeholders rarely volunteer?</li>
      <li>What four elements belong in a tradeoff readout? Which is usually missing?</li>
      <li>A metric has declined for six weeks with no alert. What's missing?</li>
      <li>Where should latency, availability, and quality thresholds each come from?</li>
      <li>Which two outcome-doc fields answer "can this be reused as a value story"?</li>
      <li>What configuration mistake commonly breaks data residency on a cloud-provider route?</li>
    </ol>
  </div>

  <h3>中文要点</h3>
  <div class="card">
    <p class="zh">Discovery 用四类问题：必须做、不能做、成本、必须证明。"不能做"利益相关者很少主动说，要主动问。问完之前不要给方案。</p>
    <p class="zh">Tradeoff 要讲：得到什么、放弃什么、事后反悔的代价（最常漏）、对合规的影响。</p>
    <p class="zh">反馈闭环是 observability 之上的决策层。SLA 阈值要有来源；受监管场景要有按日历触发的审计；缓慢漂移也要有触发器。</p>
    <p class="zh">文档按主要读者和功能归类：决策日志属于交接/意图，控制登记表属于合规/证据。</p>
    <p class="zh">主路线由采购和数据驻留决定，延迟只决定次路线的用途。成果文档要有前后业务指标和可审计控制；reuse potential 永远不选。</p>
  </div>

  <div class="footer-nav">
    <a href="/module-3">← Module 3</a>
    <a href="/module-5">Module 5: Team Enablement &amp; Ops Productivity →</a>
  </div>
`;
