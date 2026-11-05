export const samplesHtml = `
<header class="page">
    <div class="kicker">Section 8 of the Exam Guide · your calibration baseline — never reused as quiz items</div>
    <h1>Official Sample Questions</h1>
    <div class="sub">These three items are from Anthropic's Exam Guide v1.0 itself. They are not quiz practice — they are the baseline style and difficulty your tutor matches everything else against.</div>
    
  </header>

  <div class="quiz">
    <div class="stem">Sample 1 · Domain 3 — Integration<br>
    A team exposes a customer-support agent that can read tickets, draft replies, issue refunds, and delete user accounts. Support staff only ever need to read tickets and draft replies. Applying least-privilege principles, which change best reduces risk?</div>
    <span class="opt" data-id="A" onclick="pickOpt(this,'B')">A. Add logging to the refund and delete tools so misuse can be audited later.</span>
    <span class="opt" data-id="B" onclick="pickOpt(this,'B')">B. Remove the refund and delete tools from the agent's configuration entirely.</span>
    <span class="opt" data-id="C" onclick="pickOpt(this,'B')">C. Keep all tools but add a confirmation prompt before refunds and deletions.</span>
    <span class="opt" data-id="D" onclick="pickOpt(this,'B')">D. Replace the agent with a larger model that follows instructions more reliably.</span>
    <button class="reveal-btn" onclick="revealQuiz(this,'B')">Reveal answer</button>
    <div class="rationale">
      <b>B is correct.</b> Least privilege means removing capabilities the role doesn't require — eliminating the attack surface rather than monitoring or guarding it. Logging (A) and confirmations (C) are detective/compensating controls, not removal of unnecessary privilege. Model size (D) is unrelated to authorization scope.
      <p class="zh">最小权限意味着移除角色不需要的能力，消除攻击面而不是监控或防护它。日志（A）和确认（C）是检测型/补偿型控制，不是移除不必要的权限。模型大小（D）与授权范围无关。</p>
    </div>
  </div>

  <div class="quiz">
    <div class="stem">Sample 2 · Domain 2 — Models, Prompting &amp; Context<br>
    An application sends the same 8,000-token system prompt and policy document on every request, followed by a short, varying user message. Latency and cost are both concerns. Which optimization most directly addresses both?</div>
    <span class="opt" data-id="A" onclick="pickOpt(this,'C')">A. Truncate the policy document to the first 1,000 tokens.</span>
    <span class="opt" data-id="B" onclick="pickOpt(this,'C')">B. Switch to the smallest available model regardless of task fit.</span>
    <span class="opt" data-id="C" onclick="pickOpt(this,'C')">C. Place the static system prompt and policy before the dynamic content and enable prompt caching.</span>
    <span class="opt" data-id="D" onclick="pickOpt(this,'C')">D. Move the policy document into a few-shot example block.</span>
    <button class="reveal-btn" onclick="revealQuiz(this,'C')">Reveal answer</button>
    <div class="rationale">
      <b>C is correct.</b> Ordering stable content first and enabling prompt caching lets repeated prefixes be reused, reducing both time-to-first-token and per-request cost without discarding required context. Truncation (A) loses needed policy; downsizing blindly (B) risks quality; relocating to few-shot (D) doesn't create a cacheable, reusable prefix.
      <p class="zh">把稳定内容放在前面并开启 prompt 缓存，可以复用重复前缀，同时降低首字延迟和每次请求成本，且不丢失所需内容。截断（A）丢失了政策内容；盲目降档（B）有质量风险；移到少样本示例（D）不会形成可缓存的复用前缀。</p>
    </div>
  </div>

  <div class="quiz">
    <div class="stem">Sample 3 · Domain 4 — Evaluation &amp; Optimization<br>
    A RAG system suddenly returns confident but incorrect answers after a document refresh, while latency and model version are unchanged. What is the most likely first place to investigate?</div>
    <span class="opt" data-id="A" onclick="pickOpt(this,'B')">A. The model weights have silently changed.</span>
    <span class="opt" data-id="B" onclick="pickOpt(this,'B')">B. The retrieval/indexing step is returning irrelevant or stale chunks.</span>
    <span class="opt" data-id="C" onclick="pickOpt(this,'B')">C. The temperature setting is too low.</span>
    <span class="opt" data-id="D" onclick="pickOpt(this,'B')">D. The context window has shrunk.</span>
    <button class="reveal-btn" onclick="revealQuiz(this,'B')">Reveal answer</button>
    <div class="rationale">
      <b>B is correct.</b> Confident-but-wrong answers following a document refresh, with model and latency unchanged, point to retrieval feeding the model poor context — for example a broken re-index or mismatched embeddings. The other options would not be specifically triggered by a document refresh.
      <p class="zh">文档刷新后出现自信但错误的答案，而模型和延迟未变，指向检索向模型提供了劣质上下文——例如重建索引损坏或 embedding 不匹配。其他选项都不会特别由文档刷新触发。</p>
    </div>
  </div>

  <div class="card trap">
    <p>These three items are never reused as quiz content in any session — they are the baseline the tutor calibrates every generated item against. Real exam content is under NDA; everything else in this package is a practice item only, never a claim of having come from the live bank.</p>
  </div>

  
  <div class="footer-nav">
    <a href="/objectives">← Objective Index</a>
    <a href="/about">About / How I Passed in a Week →</a>
  </div>
`;
