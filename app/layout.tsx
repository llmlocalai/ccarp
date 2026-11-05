import type { Metadata } from "next";
import "./globals.css";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: {
    default: "CCAR-P Study | Claude Certified Architect – Professional",
    template: "%s · CCAR-P Study",
  },
  description:
    "A bilingual, black-and-gold study site for the Claude Certified Architect – Professional (CCAR-P) exam: big-picture decision chain, five modules, cheat sheet, objective index, official sample questions, and how Peter Shang passed it in a week.",
  metadataBase: new URL("https://ccarpnote.vercel.app"),
};

const themeInitScript = `
(function() {
  try {
    var saved = localStorage.getItem('ccarp-theme');
    var theme = saved === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <NavBar />
        <main>{children}</main>
        <footer className="border-t border-[var(--border)] py-10">
          <div className="site-wrap flex flex-col items-center gap-2 text-center text-[13px] text-[var(--muted)] sm:flex-row sm:justify-between sm:text-left">
            <span>Built from the CCAR-P Exam Guide v1.0, course notes, and a personal weak-spot tracker. Practice material only — not affiliated with or certified by Anthropic.</span>
            <span className="whitespace-nowrap">Passed CCAR-P: Nov 2026</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
