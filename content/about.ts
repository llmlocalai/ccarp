export const aboutHtml = `
<header class="page">
<div class="kicker">About the author</div>
<h1>How I Passed CCAR-P in One Week</h1>
<div class="sub">Peter Shang (ds) · AI Portfolio Manager, DoD Financial Management · Passed CCAR-P, Nov 2026</div>
</header>

<h2>Who I am</h2>
<div class="card">
<p>I lead three teams building AI, ML, and RPA automation for DoD financial management, with hands-on depth in federal accounting systems, audit remediation under FIAR and DODIG, and budget execution analytics. I came into this exam as an architect who already knew how to run a program, and had to learn how Anthropic wants that judgment applied to Claude specifically.</p>
</div>

<h2>Why one week</h2>
<div class="card">
<p>I did not have a training budget or a training calendar. I had a test date and a job that does not pause for study time. So I treated certification prep like I treat an audit remediation plan: define the finding, define the control, define the evidence, then execute on a schedule tight enough that slipping is visible immediately.</p>
<p>The finding, in this case, was a gap between what I already knew (governance, audit, stakeholder management, lifecycle delivery) and what the exam actually tests (Claude model and context tradeoffs, integration protocol choices, tool capability bloat, progressive discovery versus monolithic context, observability, formal LLM evaluation). I did not spend time relearning what I already knew. I spent nearly all of it on the five items above.</p>
</div>

<h2>The method</h2>
<div class="card rule">
<ol>
<li><b>Map the blueprint before opening a single page.</b> Seven exam domains, weighted 17/13/19/16/14/14/7. D3 Integration is the single largest domain, and it is split across two different course modules, not covered in one place. Knowing that up front changes how you allocate the week.</li>
<li><b>Build one decision chain and force every scenario through it.</b> Discovery, decomposition, pattern, reference architecture, entry point and route, model and context, sizing and feasibility, integration layers, eval gates, safety stack, stakeholder communication, handoff. Every exam item lands on exactly one step of that chain. Naming the step before reading the options cuts the choices in half immediately.</li>
<li><b>Write down ten judgment rules as tie-breakers.</b> Remove beats prevent beats instruct beats detect. Solve the risk the stem actually names, not a nearby one. Lightest solution that works. Governance first, ahead of cost and convenience. Structure beats a sentence in a prompt. These ten rules resolved almost every two-option tie I hit in practice.</li>
<li><b>Track weak spots by name, not by feeling.</b> After every practice set I logged the specific Section 6 objective I missed, by its exact title, and drilled it on a spaced schedule: next session, then three days later, then a week later. A miss reset the clock. This is the same discipline as a corrective action plan after an NFR. You do not get to call a control fixed because it felt better.</li>
<li><b>Run two full mixed mock exams before the real one.</b> 63 items, 120 minutes, scored by domain. I did not call myself ready until both mocks cleared the readiness bar across every domain. A mock that misses the bar is not a pass, it is a schedule change.</li>
</ol>
</div>

<h2>The hardest domain, for me</h2>
<div class="card trap">
<p>Everything in Domain 3, Integration, and parts of Domain 2, was the real gap. Not because the ideas are exotic. Because my instinct, formed by years of enterprise and government practice, kept pulling me toward detective controls (logging, confirmation prompts, more monitoring) when the exam wants the architect's answer: remove the capability, or put a deterministic control in front of it. My own governance background was a real asset almost everywhere else in this exam, and a real liability right here. Watching for that specific blind spot, instead of trusting general experience, is what closed the gap in days instead of weeks.</p>
</div>

<h2>What I used my existing stack for</h2>
<div class="card">
<p>I did not study this cold. I built a capstone alongside the prep: an Obligation Q&amp;A agent in TypeScript over public FedFM obligation data, with an architecture decision record, an eval harness, a risk register, and a stakeholder brief. I already build Next.js and Vercel applications with RAG over Neon pgvector, and I had agent experience from the Hugging Face Agents Course. The exam does not test whether you can code. It tests whether you can reason like the architect who has to defend the design to a skeptical stakeholder. Building something real alongside the study gave every abstract rule a concrete case to check it against.</p>
</div>

<h2>The site you are reading</h2>
<div class="card">
<p>This whole site is the actual material I used: the module notes mapped to exam domains, the one-page cheat sheet, the objective coverage index, Anthropic's own three sample questions as a calibration baseline, and this page. I kept it bilingual, English first and Chinese second, because writing the Chinese summary forced me to restate each rule in my own words a second time, which is its own form of retrieval practice.</p>
</div>

<h3>中文</h3>
<div class="card">
<p class="zh">我带领三个团队，负责国防部财务管理的 AI、ML 和 RPA 自动化，在联邦会计系统和 FIAR、DODIG 审计整改方面有扎实的实践经验。一周通过 CCAR-P 的方法：先摸清七个领域的权重和覆盖范围，建一条贯穿所有场景的决策链，写下十条用于打破平局的判断规则，按考点名称而不是感觉记录薄弱环节并按间隔复习，考前完成两次混合模考并在每个领域都达到准入标准才认为自己准备好。我最大的短板在集成领域，习惯性地倾向检测型控制（日志、确认提示），而考试想要的是架构师的答案：移除权限，或者用确定性控制挡在前面。</p>
</div>

<div class="footer-nav">
<a href="/samples">← Official Samples</a>
<a href="/">Overview →</a>
</div>
`;
