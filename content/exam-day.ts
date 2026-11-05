export const examDayHtml = `
<header class="page">
    <div class="kicker">Section 8 equivalent</div>
    <h1>Exam-Day Strategy</h1>
    <div class="sub">Wed Dec 2, 2026 · 10:00am · online proctored, English · CCAR-P · Exam Guide v1.0</div>
    
  </header>

  <h2>Format and scoring <span class="new">per Guide v1.0</span></h2>
  <div class="card">
    <ul>
      <li>63 items, 120 minutes, single-select and multiple-response.</li>
      <li>Scaled score 100–1,000; pass = 720.</li>
      <li>Criterion-referenced: measured against a fixed standard, not against other candidates.</li>
      <li>Score report: pass/fail, scaled score, and percent-correct by domain. <b>Domain percentages do not decide pass/fail</b> — only the total scaled score does.</li>
    </ul>
  </div>

  <h2>Pacing</h2>
  <figure>
    <svg viewBox="0 0 860 150" xmlns="http://www.w3.org/2000/svg">
      <style>.t{font:13px sans-serif; fill:#e7ecf7} .s{font:12px sans-serif; fill:#9fb0cf}</style>
      <rect x="20" y="20" width="820" height="36" rx="6" fill="#161d2e" stroke="#2a3550"/>
      <rect x="20" y="20" width="410" height="36" rx="6" fill="#5aa9ff"/>
      <text class="t" x="225" y="43" text-anchor="middle" fill="#06101e">Minute 0–60: items 1–32</text>
      <text class="t" x="635" y="43" text-anchor="middle">Minute 60–120: items 33–63</text>
      <text class="s" x="430" y="80" text-anchor="middle">~1.9 min / item average</text>
      <text class="s" x="430" y="100" text-anchor="middle">Stuck past 2.5 min → flag it and move on</text>
    </svg>
    <figcaption>63 items / 120 minutes. Target: roughly item 32 at the 60-minute mark.</figcaption>
  </figure>

  <h2>Multiple-response items</h2>
  <div class="card">
    <p>The stem states how many to select. Select exactly that many; each selected option must stand on its own as correct — don't pad to reach a round number.</p>
  </div>

  <h2>Per-item method</h2>
  <div class="card rule">
    <ol>
      <li>Underline the specific risk or constraint the stem names.</li>
      <li>Locate the step on the decision chain (Overview §3).</li>
      <li>Eliminate options that solve a different risk, substitute instruction for structure, or only detect without preventing.</li>
      <li>Pick the lightest option that removes the root cause.</li>
    </ol>
  </div>

  <h2>Content character</h2>
  <div class="card">
    <p>The Professional exam reads like a client engagement, not a syntax quiz. It tests judgment, not API parameter names, CLI flags, or file paths. If an option hinges on syntax, judge it by the underlying concept instead.</p>
    <p class="zh">节奏：每题约 1.9 分钟，60 分钟时到第 32 题左右，卡住超过 2.5 分钟就标记跳过。</p>
  </div>

  <h2>Watch your own tendencies</h2>
  <div class="card trap">
    <ul>
      <li>Leaning toward detective controls (trace IDs, logging) over preventive ones.</li>
      <li>Substituting agency/government practice for the course's framing.</li>
      <li>Treating "add an instruction" as a structural fix.</li>
      <li>Answering correctly but not being able to state why — if you can't name the rule, you got lucky, not right.</li>
    </ul>
  </div>

  <h2>Logistics</h2>
  <div class="card">
    <ul>
      <li>Check-in opens 2:30pm (if testing at that slot) — confirm your own appointment's check-in window with Pearson VUE.</li>
      <li>Bring a valid, unexpired, government-issued photo ID matching your registration name exactly.</li>
      <li>Clear your desk; no phone, no smartwatch; stay in webcam view the whole session if testing online.</li>
      <li>Accept the confidentiality/NDA before the exam starts, or the session ends with no refund.</li>
    </ul>
    <p class="zh">带与报名姓名一致的有效证件，清空桌面，始终在摄像头范围内。</p>
  </div>

  <h2>Readiness gate (your own rule)</h2>
  <div class="card weak">
    <p>Only declare yourself ready after two mixed 63-item mocks at 80%+ overall, with no domain below 65%. If Mock 2 on Mon Nov 30 misses that bar, reschedule before the 24-hour cutoff to keep the $175 fee.</p>
  </div>

  <div class="footer-nav">
    <a href="/cheat-sheet">← Cheat Sheet</a>
    <a href="/objectives">Objective Index →</a>
  </div>
`;
