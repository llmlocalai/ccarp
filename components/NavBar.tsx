"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const modules = [
  { href: "/module-1", label: "M1 · Platform & Design" },
  { href: "/module-2", label: "M2 · Integration & Production" },
  { href: "/module-3", label: "M3 · Responsible AI & Risk" },
  { href: "/module-4", label: "M4 · Stakeholder & Lifecycle" },
  { href: "/module-5", label: "M5 · Team Enablement" },
];

const resources = [
  { href: "/cheat-sheet", label: "Cheat Sheet" },
  { href: "/objectives", label: "Objective Index" },
  { href: "/samples", label: "Official Samples" },
  { href: "/exam-day", label: "Exam Day" },
  { href: "/production-playbook", label: "Production Playbook" },
  { href: "/enterprise-ai-sme", label: "Enterprise AI Architecture SME" },
];

function Dropdown({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[13.5px] text-[var(--muted)] transition hover:text-[var(--accent)]"
      >
        {label}
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-xl border border-[var(--border)] bg-[var(--panel)] p-1.5 shadow-xl">
          {items.map((it) => (
            <Link
              key={it.href}
              href={it.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-[13.5px] text-[var(--text)] transition hover:bg-[var(--panel2)] hover:text-[var(--accent)]"
            >
              {it.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function NavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[var(--bg)]/90 backdrop-blur-md">
      <div className="site-wrap flex h-14 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-[var(--text)]">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[var(--accent)] bg-[var(--bg2)] text-[13px] font-bold text-[var(--accent)]">C</span>
          <span className="text-[15px]">CCAR&#8209;P<span className="text-[var(--accent)] font-normal"> Study</span></span>
        </Link>

        {/* desktop: top-right nav */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link href="/" className="rounded-md px-2.5 py-1.5 text-[13.5px] text-[var(--muted)] transition hover:text-[var(--accent)]">
            Overview
          </Link>
          <Dropdown label="Modules" items={modules} />
          <Dropdown label="Resources" items={resources} />
          <Link href="/about" className="rounded-md px-2.5 py-1.5 text-[13.5px] text-[var(--muted)] transition hover:text-[var(--accent)]">
            About
          </Link>
          <div className="ml-2 border-l border-[var(--border)] pl-3">
            <ThemeToggle />
          </div>
        </nav>

        {/* mobile toggle */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            aria-label="Open menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] text-[var(--text)]"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 6l12 12M18 6L6 18" /></svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18" /></svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-[var(--border)] bg-[var(--bg)] md:hidden">
          <div className="site-wrap flex flex-col gap-0.5 py-3">
            <Link onClick={() => setMobileOpen(false)} href="/" className="rounded-md px-3 py-2 text-[14px] text-[var(--text)] hover:bg-[var(--panel)]">Overview</Link>
            <div className="mt-1 px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">Modules</div>
            {modules.map((m) => (
              <Link onClick={() => setMobileOpen(false)} key={m.href} href={m.href} className="rounded-md px-3 py-2 text-[14px] text-[var(--text)] hover:bg-[var(--panel)]">{m.label}</Link>
            ))}
            <div className="mt-1 px-3 pb-1 text-[11px] font-semibold uppercase tracking-wide text-[var(--accent)]">Resources</div>
            {resources.map((r) => (
              <Link onClick={() => setMobileOpen(false)} key={r.href} href={r.href} className="rounded-md px-3 py-2 text-[14px] text-[var(--text)] hover:bg-[var(--panel)]">{r.label}</Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
