export const module1Html = `
<header class="page">
    <div class="kicker">Module 1 · 34 pages / 11 checkpoints in course</div>
    <h1>Claude Platform &amp; Solution Design</h1>
    <div class="sub">Exam domains: D1 (most), D2 (models, prompting, caching, Skills), D3 (RAG, protocols, progressive vs. monolithic), D5 (regulated-industry routing)</div>
    
  </header>

  <p class="en-first"><b>This module answers:</b> facing a business problem, what does Claude own? What shape does the work take? Which reference architecture fits? Where does the solution touch Claude?</p>

  <h2>1.1 Four decisions, in order</h2>
  <div class="card">
    <ol>
      <li><b>Decomposition</b> — what Claude owns, what the existing system owns, what a human owns.</li>
      <li><b>Pattern</b> — augmented call, workflow, or agent.</li>
      <li><b>Reference architecture</b> — which mature shape applies.</li>
      <li><b>Touchpoints</b> — entry point, model, context strategy, delivery route.</li>
    </ol>
    <p>Getting the order wrong causes expensive rework. The habit the course wants: say out loud which decision you're facing right now, because each one rewards a different move.</p>
  </div>

  <h2>1.2 How Claude behaves <span class="tag">foundation</span></h2>
  <div class="card">
    <p><b>Context overflow behavior</b> (verify exact codes before stating): a prompt too long is rejected before generation (too many tokens → 400 <code>invalid_request_error</code>; payload too large → 413 <code>request_too_large</code>). If the prompt fits but output hits the cap, generation stops early with a context-window-class stop reason. Measure with the response's <code>usage</code> field and the token-count API — never estimate from character ratios.</p>
    <p><b>Course case:</b> a reconciliation pipeline shipped with zero checks because a demo looked deterministic. Non-determinism is the entire reason an eval framework exists.</p>
  </div>

  <h2>1.3 Three independent platform layers</h2>
  <figure>
    <svg viewBox="0 0 860 230" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:13px sans-serif; fill:#e7ecf7} .ls{font:11.5px sans-serif; fill:#9fb0cf} .lh{font:13px sans-serif; fill:#0f1420; font-weight:700}</style>
      <rect x="20" y="20" width="800" height="54" rx="8" fill="#5aa9ff"/>
      <text class="lh" x="36" y="52">Entry point — what the user/system touches</text>
      <text class="ls" x="520" y="52" fill="#06101e">Claude.ai · Claude Code · Cowork · Chrome · Excel · your own app</text>
      <rect x="20" y="88" width="800" height="54" rx="8" fill="#9b7bff"/>
      <text class="lh" x="36" y="120" fill="#0c0620">Build-time interface — what engineers code against</text>
      <text class="ls" x="560" y="120" fill="#0c0620">Direct API · SDK · MCP · Agent SDK</text>
      <rect x="20" y="156" width="800" height="54" rx="8" fill="#ff8a5b"/>
      <text class="lh" x="36" y="188" fill="#1f0c02">Delivery route — whose infrastructure serves the call</text>
      <text class="ls" x="560" y="188" fill="#1f0c02">Anthropic 1P · Bedrock · Vertex · Foundry</text>
    </svg>
    <figcaption>Every deployment has all three layers. Conflating them is how a developer tool ends up in a non-developer's hands.</figcaption>
  </figure>

  <h2>1.4 Seven primitives, one job each</h2>
  <div class="card">
    <table>
      <tr><th>Primitive</th><th>Sole job</th><th>Use when</th></tr>
      <tr><td>Tools</td><td>Act</td><td>Model needs to call a function: fetch a result or perform an action</td></tr>
      <tr><td>MCP</td><td>Connect</td><td>The same tool set must serve multiple Claude clients (reuse)</td></tr>
      <tr><td>Subagents</td><td>Isolate / parallelize</td><td>A scoped subtask needs a clean independent context, or needs to run in parallel</td></tr>
      <tr><td>Hooks</td><td>Guarantee</td><td>A rule must hold every time — deterministic code on lifecycle events the model cannot skip</td></tr>
      <tr><td>Skills</td><td>Package a procedure</td><td>A repeatable process needs versioning, sharing, governance (SKILL.md + optional scripts)</td></tr>
      <tr><td>Agent Teams</td><td>Coordinate peers</td><td>Several agents each own part of the goal</td></tr>
      <tr><td>Dynamic Workflows</td><td>Compose at runtime</td><td>Steps must assemble at runtime; they can't be fixed in advance</td></tr>
    </table>
    <p><b>Rule:</b> use the fewest primitives the requirement needs. Every added one adds latency, tokens, and a surface that needs observability and governance. Patterns (augmented call, workflow, agent, multi-agent) are assemblies of these primitives.</p>
  </div>

  <h3>Tool vs. MCP vs. Skill vs. Hook — four dimensions, not four alternatives</h3>
  <div class="card">
    <table>
      <tr><th>Dimension</th><th>Answers</th><th>Finance analogy</th></tr>
      <tr><td>Tool</td><td>What the model can do (capability; model decides whether to call it)</td><td>A transaction code</td></tr>
      <tr><td>MCP</td><td>How tools/resources/prompts are shared across clients (protocol)</td><td>A standard interface opening a transaction to multiple systems</td></tr>
      <tr><td>Skill</td><td>How to do a procedure well (packaged expertise; can specify which tools to use)</td><td>An SOP or desk procedure</td></tr>
      <tr><td>Hook</td><td>What must happen (enforcement outside the model)</td><td>An automatic preventive edit check that blocks posting</td></tr>
    </table>
    <p>A Skill sits on top of tools; tools are never built on top of a Skill. Packaging (Skill) and sharing (MCP) change distribution, not enforcement.</p>
  </div>

  <h2>1.5 Decomposition and delegation <span class="pill d1">D1</span></h2>
  <div class="card">
    <ul>
      <li><b>Claude:</b> language understanding, summarizing, drafting, planning, acting through tools, perception (reading a label photo).</li>
      <li><b>Existing system:</b> anything already reliable — rules engine, system-of-record database, policy table, computation, email/payment systems.</li>
      <li><b>Human:</b> judgment, exceptions, approvals, safety decisions, unrecoverable money.</li>
    </ul>
    <p><b>Three ownership tests:</b> reversibility, stakes, accountability. The output is a delegation map (AI owns / human owns / Claude drafts + human decides).</p>
    <p><b>Reframe:</b> don't ask "where can Claude help?" Ask "where do the four model properties make Claude more suitable than a system that already does this correctly?" Claude can attempt every step — that is not the test.</p>
  </div>
  <div class="card pract">
    <h4>Practice: the three-question sort</h4>
    <ul>
      <li>Is it a system-of-record fact, a calculation, or an eligibility rule? → <b>Existing system.</b> Claude can call it as a tool and narrate the result.</li>
      <li>Is it high-consequence, irreversible, over a threshold, or safety-related? → <b>Human.</b> Claude can draft or flag.</li>
      <li>Is it language or perception work with a human or system checking the next step? → <b>Claude.</b></li>
      <li>Split compound steps: "tell the engineer whether warranty applies" = system decides, Claude narrates. "Issue the refund" = system determines eligibility, human approves payment.</li>
    </ul>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>Stuffing a deterministic business rule (threshold, eligibility, priority, coverage) into the prompt to "simplify" the design. It works cleanly in a demo and fails quietly on messy input, surfacing later through an audit rather than monitoring. Rules stay in code; Claude extracts, the system decides.</p>
  </div>

  <h2>1.6 Pattern selection <span class="pill d1">D1</span></h2>
  <div class="card">
    <table>
      <tr><th>Pattern</th><th>Control flow lives in</th><th>Use when</th></tr>
      <tr><td>Augmented LLM</td><td>One call, your code around it</td><td>Scoped, verifiable task; can add tools, retrieval, thinking</td></tr>
      <tr><td>Workflow</td><td>Your code (named steps)</td><td>Steps are known in advance; error cost and observability matter</td></tr>
      <tr><td>Agent</td><td>The model</td><td>The path genuinely can't be enumerated; errors are acceptable and recoverable</td></tr>
    </table>
    <p><b>Workflow sub-patterns:</b> chaining (sequential handoff), routing (classifier picks a path), parallelization (independent units run together, then merge or vote), evaluator-optimizer (generate, score, revise until it passes or hits a retry cap). Combine freely; start with the simplest.</p>
    <p><b>Five deciding factors, in order — the first one that excludes a pattern wins:</b> predictability, error cost, observability, latency budget, cost.</p>
    <p><b>Production agents need:</b> a lean tool set, a per-turn budget, explicit permissions, and stop conditions.</p>
    <p><b>Quality-fix order:</b> improve the prompt → add tools or retrieval → a stronger pattern (evaluator-optimizer) → fine-tuning last. Fine-tune only when volume is huge and inference cost is the binding constraint, or there's a hard latency ceiling, or a formatting-consistency problem the prompt can't solve — it locks you to a model version, and Claude fine-tuning access is limited and needs confirming with your account team.</p>
    <p><b>Packaging spectrum:</b> prompt-only → direct tool call → Skill. Pick Skill when the process repeats, crosses teams, and needs versioning and rollback.</p>
  </div>
  <div class="card trap">
    <h4>Exam trap</h4>
    <p>"The task feels open-ended, so pick agent" — wrong if the real paths are enumerable. Agents create an audit gap: compliance can't find one deterministic approval step. An unpinned model version with no re-validation gate is a governance gap in any pattern. Agents are not necessarily more expensive — accumulated context and call count drive cost, not the pattern label.</p>
  </div>

  <h2>1.7 Multi-agent orchestration <span class="pill d1">D1</span></h2>
  <div class="card">
    <ul>
      <li><b>Orchestrator:</b> owns the goal, decomposition, delegation, aggregation. Does not do subtask work itself.</li>
      <li><b>Subagents:</b> each owns one scoped unit, runs in a clean context, returns a structured result.</li>
      <li><b>Design explicitly:</b> how you decompose, the result schema, conflict rules, gap rules.</li>
      <li><b>Failure asymmetry:</b> a subagent failure is usually recoverable; an orchestrator failure usually isn't. Make subagent work idempotent and retryable (unit IDs; retries don't duplicate writes). Checkpoint orchestrator state.</li>
      <li><b>Cost:</b> every subagent carries its own context, and the orchestrator pays again to aggregate. Use multi-agent only when the work truly exceeds one context.</li>
    </ul>
    <table>
      <tr><th>Failure</th><th>Lands in</th><th>Design response</th></tr>
      <tr><td>Subagent returns malformed or empty result</td><td>Subagent boundary (recoverable)</td><td>Validate every result; retry or reassign that unit; log the gap, don't fail the whole run</td></tr>
      <tr><td>Two subagents conflict</td><td>Aggregation stage (recoverable)</td><td>Explicit conflict rule, or escalate to a human</td></tr>
      <tr><td>Orchestrator loses goal or state</td><td>Orchestrator (usually unrecoverable)</td><td>Protect state; checkpoint so a failure can resume</td></tr>
      <tr><td>Fragmented trace</td><td>Observability (cuts across layers)</td><td>One shared trace ID across orchestrator and subagents</td></tr>
    </table>
  </div>
  <div class="card pract">
    <h4>Practice: multi-agent design review checklist</h4>
    <ul>
      <li><b>Coverage check at aggregation:</b> returned result count must equal dispatched unit count; call out gaps explicitly ("9,850 of 10,000 classified, 150 missing"). The most dangerous failure is a confident, complete-looking summary built on missing units.</li>
      <li>Validate every subagent result; retry or flag failed units.</li>
      <li>Explicit conflict-resolution rule, or escalate to a human.</li>
      <li>One shared trace ID.</li>
      <li>HITL gate before anything irreversible; sample low-risk operations.</li>
      <li>Fix where the failure happened — don't paper over it upstream.</li>
    </ul>
  </div>

  <h2>1.8 Reference architectures <span class="pill d1">D1</span></h2>
  <div class="card">
    <table>
      <tr><th>Architecture</th><th>Done well</th><th>Typical failure</th></tr>
      <tr><td>Agent</td><td>Goal + bounded tools + turn budget + success criteria</td><td>State-changing tools, unbounded autonomy, no human review</td></tr>
      <tr><td>RAG</td><td>Stable corpus, chunked and indexed, relevant chunks placed in context</td><td><b>Used for live state</b> (order status, inventory, queue, balance)</td></tr>
      <tr><td>Document pipeline (evaluator-optimizer)</td><td>OCR → schema extraction → validation → exception routing</td><td>No exception path; low-confidence extractions with no human gate</td></tr>
      <tr><td>Ticket triage (routing)</td><td>Detect intent → docs retrieval / transactional API / human approval</td><td>Retrieval used for live state; no human escalation; agent shipped before measuring a routed workflow</td></tr>
      <tr><td>Coding agent</td><td>Agentic exploration, then deterministic edit/test/review steps</td><td>Edits and commits with no review gate; no language-specific regression eval</td></tr>
    </table>
    <p><b>#1 mistake:</b> letting retrieval do a tool call's job. Symptoms: stale chunks, answers that change on every reindex, answers that contradict the database. A better embedding model, faster refresh, or a tuned similarity threshold won't fix it. Call the system of record. Similar is not the same as true.</p>
    <p>Only combine two architectures when their failure modes differ. Each needs its own eval set — a healthy overall score can hide one failing component.</p>
  </div>

  <h2>1.9 RAG pipeline design <span class="pill d3">D3</span></h2>
  <div class="card">
    <p><b>Two independent decisions.</b> Chunking looks at the corpus itself (its structure). Indexing looks at how queries are phrased (the query mix the whole corpus faces).</p>
    <table>
      <tr><th>Decision</th><th>Option</th><th>Use when</th></tr>
      <tr><td>Chunking</td><td>Fixed-size + overlap</td><td>Homogeneous, weakly structured text; simplest</td></tr>
      <tr><td>Chunking</td><td>Semantic</td><td>Each chunk must stand alone as coherent prose</td></tr>
      <tr><td>Chunking</td><td>Hierarchical</td><td>Numbered-section documents (contracts, manuals, policy, FMR) where section context carries meaning — keep a section-path on each chunk</td></tr>
      <tr><td>Indexing</td><td>Dense (embedding)</td><td>Paraphrase, concept, intent matching</td></tr>
      <tr><td>Indexing</td><td>Sparse (BM25 / keyword)</td><td>Exact tokens: part numbers, citations, error codes, TAS/SFIS codes</td></tr>
      <tr><td>Indexing</td><td>Hybrid + reciprocal rank fusion (RRF)</td><td>Mixed query patterns — the common production case. RRF sums 1/(k+rank) across lists; needs only rank, no score calibration; the lowest-tuning default</td></tr>
    </table>
    <p><b>Always state the three-way tradeoff:</b> retrieval quality vs. latency vs. maintenance cost. Smaller chunks + hybrid indexing raise quality and latency together. Larger chunks + dense-only is cheaper and faster but misses exact codes. An answer that skips the tradeoff is incomplete.</p>
    <p><b>Risk:</b> a confident answer built on the wrong chunk looks identical to a correct one. Measure retrieval with a labeled set; a pipeline that's correct at launch quietly degrades as documents grow.</p>
    <p><b>Retrieval routing (live vs. static):</b> a router can be keyword rules (cheap, brittle), a classifier step (testable), or agent-chosen (flexible, hardest to audit). Misrouting: a query that sounds static but needs live data gets sent to RAG and returns a stale answer; a query needing both gets single-label routed and half-answered. Fix: multi-label routing; default to the database with a data-as-of note when uncertain; log routing; score routing accuracy separately in the eval set.</p>
  </div>

  <h2>1.10 Model and context strategy <span class="pill d2">D2</span> <span class="pill d3">D3</span></h2>
  <div class="card">
    <p><b>Four terms to keep separate:</b> context window (what the model sees this call), retrieval (knowledge fetched and placed in the window), persistent application state (owned by your system, reached through tools), summaries/memory (managed by the application; the model has no native memory).</p>
    <p><b>Model-tier rule:</b> default Sonnet. Move up to Opus only when eval shows Sonnet falls short. Move down to Haiku only when eval shows the loss is acceptable. Not choosing a tier means you chose the most expensive one.</p>
    <p><b>Per-step model selection</b> (Haiku for classification, Sonnet for summarization, Opus only where proven necessary) is the standard fix for cost and latency overruns.</p>
    <p><b>Context capacity planning:</b> the window is a ceiling, not a target. Budget by the largest realistic conversation plus retrieval content, system prompt, scratch space, and growth margin.</p>
  </div>
  <div class="card">
    <table>
      <tr><th>Strategy</th><th>Fits</th><th>Failure point / cost</th></tr>
      <tr><td>Monolithic</td><td>Scoped tasks, stable cacheable prefixes, reasoning that genuinely needs everything visible at once</td><td>Context accumulates per turn; cost grows linearly; quality drops before the hard limit; irrelevant entries cause wrong picks</td></tr>
      <tr><td>Progressive (default)</td><td>Most production work: carry only what the next step needs; discover tools/docs on demand</td><td>Long-range coherence weakens; harder to cache; harder to reconstruct step-N inputs when debugging</td></tr>
      <tr><td>Retrieval</td><td>Corpus bigger than the window, fast-changing sources, citations needed</td><td>Cross-document synthesis, chunking that splits a table or code block, recall misses</td></tr>
      <tr><td>Compaction</td><td>Long-running sessions</td><td>Summaries drop identifiers, numbers, one-time decisions; mostly irreversible; fidelity is hard to evaluate</td></tr>
    </table>
  </div>
  <div class="card pract">
    <h4>Practice: progressive discovery vs. monolithic — a logged weak spot</h4>
    <ul>
      <li>Ask first: what share of the loaded context is relevant to a typical request? If most of it isn't (60 tools loaded, 3–5 used), <b>reduce what's loaded</b>: keep a small core set, discover the rest on demand. This lowers cost, latency, and mis-selection together.</li>
      <li>Don't answer by "stacking another instruction on top of what's loaded." That adds tokens while the confusing entries stay in front of the model.</li>
      <li>Caching lowers the cost of a repeated prefix — it doesn't fix mis-selection.</li>
      <li>Monolithic wins only when the set is small and almost every call uses all of it.</li>
      <li>Four design questions: what's needed at the start (monolithic baseline)? what's needed in the next few steps (progressive window)? what's needed on demand (retrieval)? what can be safely compacted (compaction policy)?</li>
    </ul>
  </div>
  <div class="card">
    <h4>Extended thinking <span class="new">verify current docs</span></h4>
    <p>Reasoning in separate thinking tokens. Thinking tokens bill as output tokens and add latency. Current models use <b>adaptive thinking</b>: the model decides per-request whether and how much to think, steered by an effort level (low / medium / high / xhigh / max); <code>max_tokens</code> caps thinking plus answer together. A fixed <code>budget_tokens</code> is the older control. Raise effort only when eval shows a gap the prompt can't close; never turn it on for a routing classifier. Effort is the knob, eval is the gate.</p>
    <h4>Swapping models is a release</h4>
    <p>Gate every swap with: (1) a curated, tiered test set, (2) a scoring function, (3) a pass/fail threshold set before the run. Segment-level thresholds enable partial migration — easy segments move to the cheaper model, hard segments stay on the strong one.</p>
  </div>

  <h2>1.11 Prompting as architecture <span class="pill d2">D2</span></h2>
  <div class="card">
    <p><b>A reusable system prompt needs:</b> role and scope, must-do/must-not constraints, and an output contract. Vagueness at scale is a defect repeated on every request.</p>
    <p><b>Templates:</b> parameterized slots inside a fixed frame. Guardrails live in the frame, so filling slots can't remove the constraint.</p>
    <p>An underspecified guardrail is worse than none — it looks like a control. Prefer structural enforcement (an output contract/schema, a deterministic check) over prose.</p>
    <p>What actually ships is the prompt-plus-model pair. Any model swap requires re-evaluating the prompt.</p>
    <table>
      <tr><th>Technique</th><th>Use when</th><th>Stem signal</th></tr>
      <tr><td>Zero-shot</td><td>Clear, scoped task; try this first</td><td>Categories already listed; standard summarization</td></tr>
      <tr><td>Few-shot</td><td>Format or judgment criteria are easier shown than described</td><td>Receipts in varying layouts</td></tr>
      <tr><td>Chain-of-thought</td><td>The answer depends on a reasoning path with several interacting conditions</td><td>A liability call with three interacting conditions</td></tr>
    </table>
    <p>Every tier up adds tokens and latency. Few-shot examples need maintenance and can introduce bias if unbalanced. Distractor: adding examples or CoT to a simple task.</p>
  </div>
  <div class="card">
    <h4>Prompt caching <span class="pill d2">Sample Q2 pattern</span></h4>
    <p>The cache saves a <b>prefix</b> — it hits only when everything before the breakpoint is identical. <b>Order rule: static first, dynamic last.</b> Putting a per-request document before fixed content breaks the prefix.</p>
    <p>Prefix byte order is <code>tools → system → messages</code>. A change at one layer invalidates that layer and everything after it. CLAUDE.md text lives inside messages.</p>
    <p>Up to 4 breakpoints you place; each one caches everything before it. Below the model's minimum cacheable length, nothing caches — and no error is raised.</p>
    <p>Only worthwhile when the same prefix repeats within the TTL (default 5 min, refreshed on hit; a 1-hour option also exists). Writes cost more than normal input; reads cost a small fraction. <span class="new">Verify before use:</span> cache write ≈1.25× base input price (5-min TTL) or 2× (1-hour); cache read ≈0.1×; minimum cacheable length 512–4,096 tokens depending on model. Changing thinking/effort settings invalidates the message-layer cache. Confirm with <code>cache_creation_input_tokens</code> / <code>cache_read_input_tokens</code> in <code>usage</code>.</p>
    <p>Two enablement paths: a top-level <code>cache_control</code> (automatic), or <code>cache_control</code> on the last stable content block (you choose the breakpoint).</p>
    <p>Distractors: truncating the document, downgrading blindly, moving content into few-shot, raising <code>max_tokens</code>.</p>
  </div>
  <div class="card pract">
    <h4>Practice: reusable prompt assets</h4>
    <ul>
      <li><b>Cost follows prefix order:</b> role, tone, output contract, guardrails = stable prefix; ticket + manual section go after the breakpoint.</li>
      <li><b>Safety follows structure:</b> guardrails written into the output contract (fields the reply must satisfy), ideally plus a deterministic output check.</li>
      <li><b>Governance follows packaging:</b> a stable, high-frequency, org-wide process becomes a versioned Skill. Copy-pasted prompts drift.</li>
      <li><b>Prompt library vs. Skill:</b> a library suits fragments a team assembles itself; a Skill suits a stable process needing approval and rollback, distributed across teams.</li>
    </ul>
  </div>

  <h2>1.12 Entry points, interfaces, routes, governance <span class="pill d3">D3</span> <span class="pill d5">D5</span> <span class="pill d7">D7</span></h2>
  <div class="card">
    <p><b>Selection order:</b> entry point (fits user and work) → build-time interface (fits team) → delivery route (fits cloud and compliance). Governance constraints exclude options before cost or convenience.</p>
    <table>
      <tr><th>Entry point</th><th>Fits</th><th>Notes</th></tr>
      <tr><td>Claude.ai (Team/Enterprise)</td><td>Knowledge workers, no dev needed</td><td>Team: admin console, SSO, no training on customer content. Enterprise: SCIM, retention controls, audit logs, Compliance API, HIPAA-ready with BAA. Cannot embed into other products</td></tr>
      <tr><td>Claude Code</td><td>Engineers</td><td>Not for non-engineering workflows; never a product backend</td></tr>
      <tr><td>Cowork / Chrome / Excel</td><td>Non-devs working files, web apps, spreadsheets</td><td>Permission scope and review matter more here</td></tr>
      <tr><td>Your own API/SDK app</td><td>Your product, or governed internal tooling</td><td>Retries, streaming, observability, UI, audit are all on you</td></tr>
    </table>
    <table>
      <tr><th>Build-time interface</th><th>Pick when</th></tr>
      <tr><td>Direct API</td><td>Maximum control, maximum responsibility</td></tr>
      <tr><td>SDK</td><td>Same capability, more ergonomic per language; default for embedding</td></tr>
      <tr><td>MCP</td><td>A tool server must serve <b>multiple</b> Claude clients. One client only → an extra protocol hop and a server to build/secure for no payoff. MCP tools are still invoked via tool use — MCP and tool use are different layers, not alternatives</td></tr>
      <tr><td>Agent SDK</td><td>Running a managed multi-turn agent loop inside your product (Claude Code's engine). Not for single request/response; you lose per-turn control</td></tr>
      <tr><td>Agent-to-agent</td><td>Delegating to a peer agent with its own goals and reasoning. Reading data needs one tool, not another agent</td></tr>
    </table>
    <p><b>Shortcut:</b> single request/response → API or SDK. Tools shared across clients → MCP. Multi-turn agent inside a product → Agent SDK.</p>
  </div>

  <h3>Claude Code's layers</h3>
  <figure>
    <svg viewBox="0 0 860 210" xmlns="http://www.w3.org/2000/svg">
      <style>.lt{font:12.5px sans-serif; fill:#0f1420; font-weight:700} .ls{font:11px sans-serif; fill:#0f1420}</style>
      <rect x="20" y="20" width="800" height="76" rx="8" fill="#5aa9ff"/>
      <text class="lt" x="36" y="44">Shaping — what it knows, what it does</text>
      <text class="ls" x="36" y="64">CLAUDE.md (always loaded conventions) · Skills (loaded on demand, keeps context lean)</text>
      <text class="ls" x="36" y="80">subagents (tool-limited isolated helpers) · MCP servers</text>
      <rect x="20" y="108" width="800" height="76" rx="8" fill="#ff8a5b"/>
      <text class="lt" x="36" y="132">Governing — what it can touch</text>
      <text class="ls" x="36" y="152">hooks (deterministic gates) · permission modes (default / acceptEdits / plan / auto / dontAsk / bypassPermissions — verify latest list)</text>
      <text class="ls" x="36" y="168">sandboxing (filesystem &amp; network isolation)</text>
    </svg>
    <figcaption>Permission decides what an agent can touch; a hook decides what must happen before/after an action; sandboxing enforces the boundary at the environment level.</figcaption>
  </figure>
  <div class="card">
    <p><b>Skill as an integration mechanism <span class="new">added</span>:</b> mounted via a container's skills parameter, managed through the Skills endpoint, versioned like any other asset. A Skill needs the code-execution tool, which adds a sandbox dependency — weigh it against MCP and direct tool calls.</p>
    <p><b>CLAUDE.md is not a system prompt.</b> Claude Code puts Anthropic's system prompt in the <code>system</code> field and inserts CLAUDE.md into <code>messages</code>. Analogy: system prompt = the published regulation, same for everyone; CLAUDE.md = your office's desk guide. Neither is enforced. "Write it into CLAUDE.md" is a distractor for a "never allowed" rule.</p>
  </div>

  <h3>Delivery routes and regulated constraints</h3>
  <div class="card">
    <p>The model behaves the same on every route. What differs: billing, identity (API key / IAM / Google credential / Entra ID), region, contract, model ID strings, and feature lag (cloud-provider routes often trail first-party).</p>
    <p>Default to first-party with no cloud commitment or when you need the newest features; otherwise follow the partner's existing cloud agreement.</p>
    <table>
      <tr><th>Constraint</th><th>What it decides</th></tr>
      <tr><td>Privilege (law firm)</td><td>The firm must <b>own</b> the audit trail: API/SDK behind the firm's own app, SSO, and approved gateway. Enterprise logs living on Anthropic's infrastructure = an audit trail exists, not that the firm owns it</td></tr>
      <tr><td>HIPAA</td><td>BAA must cover the exact config/features (beta features often excluded); minimize PHI; use reference IDs</td></tr>
      <tr><td>GDPR / residency</td><td>Each request is pinned to a region. Direct API region is US or global only, so EU residency points to a cloud-provider route. GDPR itself doesn't mandate EU residency</td></tr>
      <tr><td>FedRAMP / DoD</td><td>Claude for Government (FedRAMP High), Bedrock GovCloud (FedRAMP High, IL4/5), Vertex Assured Workloads. Claude Enterprise / Direct API have no FedRAMP authorization. Government environments trail on model availability</td></tr>
      <tr><td>Internal policy</td><td>CIO-approved route beats engineering convenience; reuse existing SSO, data classification, logging</td></tr>
    </table>
  </div>

  <h3>Stack and request lifecycle</h3>
  <div class="card">
    <p>Bottom-up: <b>model</b> (reads the request, writes text or tool <b>requests</b>) → <b>Claude API</b> (contract + server features: caching, tool protocol, thinking, batching, billing) → <b>client SDK</b> (HTTP, auth, retries; adds no model capability) → <b>Agent SDK runtime</b> (run loop, executes tools, checks permissions, fires hooks, loads CLAUDE.md) → <b>application</b>.</p>
    <p>The model only <b>requests</b> a tool call; the runtime <b>executes</b> it. That's why hooks and permissions live in the runtime.</p>
    <p>The API is stateless; every turn resends the whole conversation. That's why caching matters. One user message can cost several API calls.</p>
    <p><span class="new">Loop control:</span> <code>stop_reason</code> of <code>tool_use</code> means the runtime executes the tool and continues; <code>end_turn</code> means the loop ends.</p>
  </div>

  <div class="card trap">
    <h4>Exam traps — Module 1</h4>
    <ul>
      <li>Picking Claude Code before knowing who the user is (a bank teller won't use a terminal).</li>
      <li>Adding MCP for a single client "because it's on the menu."</li>
      <li>Putting a high-consequence check (compliance) on the least deterministic component (subagent, prompt) instead of server-side code.</li>
      <li>Right entry point, wrong reason (Bedrock "for residency" when the actual reason is BAA coverage) — graded as entry-point-plus-reason pairs.</li>
      <li>Decision order: (1) who is the user? (2) any hard governance/contract constraint? (3) real-time system integration needed? (4) latency and infrastructure. The first constraint that excludes options wins.</li>
    </ul>
  </div>

  <h2>1.13 Assembly: five decisions every architecture answer needs</h2>
  <div class="card">
    <table>
      <tr><th>Decision</th><th>Law-firm contract review: correct answer</th></tr>
      <tr><td>1. Entry point</td><td>Direct API/SDK in a lean internal web app, behind SSO and an approved gateway (privilege excludes Claude.ai)</td></tr>
      <tr><td>2. Pattern</td><td>Workflow, parallel by section + a strict-schema eval step (work splits cleanly — no open-ended agent)</td></tr>
      <tr><td>3. Decomposition</td><td>Claude extracts, classifies against the playbook, drafts edits. Playbook is versioned in the firm's system, retrieved by clause (not pasted into the system prompt). Pulling docs from iManage = a tool</td></tr>
      <tr><td>4. Model + context</td><td>Default Sonnet, progressive context, extended thinking only on clauses eval proves need it (not Opus everywhere)</td></tr>
      <tr><td>5. HITL</td><td>A senior lawyer signs off every output; low-confidence clauses are flagged</td></tr>
    </table>
    <p>Each wrong option misses exactly one decision. Always check all five.</p>
  </div>

  <h3>Module 1 self-test</h3>
  <div class="card">
    <ol>
      <li>A partner wants Claude to enforce a fixed dollar threshold. Who should own the threshold, and why does failure surface late if it doesn't?</li>
      <li>Name the five pattern-selection factors, in order.</li>
      <li>A parallel review run reports "all sections reviewed" but two subagents timed out. Which control is missing?</li>
      <li>A user asks both "find clause 14.2" and "how do we usually handle Y?" Which index type, and how are results merged?</li>
      <li>Caching isn't saving money because a per-request document sits above the fixed instructions. How do you fix it?</li>
      <li>Only one internal app will ever call these tools. MCP or direct tool call? State the tradeoff.</li>
    </ol>
  </div>

  <h3>中文要点</h3>
  <div class="card">
    <p class="zh">模块 1 的核心是四个按顺序做的决策：工作分解、模式选择、参考架构、接入点与模型/上下文策略。</p>
    <p class="zh">确定性规则、实时数据、计算交给现有系统；语言工作交给 Claude；高风险决定交给人。</p>
    <p class="zh">能列举路径就用 workflow；只有路径确实无法预知时才用 agent。多 agent 汇总要做覆盖率检查。</p>
    <p class="zh">RAG 只用于稳定知识，实时状态用 tool 查询系统记录。分块看文档结构，索引看查询组合，并说明取舍。</p>
    <p class="zh">默认 Sonnet，换模型要用事先定好阈值的 eval 把关。渐进式发现减少加载量，不要叠加指令。</p>
    <p class="zh">只有一个客户端不需要 MCP。CLAUDE.md 和 Skill 都是指导，不是强制执行。合规先于成本筛选路线。</p>
  </div>

  <div class="footer-nav">
    <a href="/">← Overview</a>
    <a href="/module-2">Module 2: Enterprise Integration &amp; Production →</a>
  </div>
`;
